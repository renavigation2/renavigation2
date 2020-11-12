import RenavigationCore

var blocked = false
var blockCount = 0

class RNRModals: UIView, RNRParent {
    var modals: [RNRModalContainer] = []
    var pendingPresent: [RNRModalContainer] = []
    var pendingDismiss: [RNRModalContainer] = []

    var presenting = false

    var isReady = false
    var hasMovedToSuperview = false
    var hasMovedToWindow = false

    @objc var onWillShowView: RCTDirectEventBlock?

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        (subview as! RNRModalContainer).willMove(toSuperview: self)
        modals.insert(subview as! RNRModalContainer, at: atIndex)
        if !(subview as! RNRModalContainer).isPresented && (subview as! RNRModalContainer).isReady && isReady {
            present(subview as! RNRModalContainer)
        }
    }

    override func removeReactSubview(_ subview: UIView!) {
        modals.removeAll(where: { $0 == subview})
        pendingPresent.removeAll(where: { $0 == subview})
    }

    override func reactSubviews() -> [UIView]! {
        modals
    }

    override func didUpdateReactSubviews() {
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        hasMovedToSuperview = true
        setup()
    }

    override func didMoveToWindow() {
        super.didMoveToWindow()
        hasMovedToWindow = true
        setup()
    }

    func updateSubview(_ subview: UIView) {}

    func setup() {
        if blocked || blockCount != 0 {
            DispatchQueue.main.async { [self] in
                setup()
            }
        } else {
            if !isReady && hasMovedToSuperview && hasMovedToWindow {
                let childrenReady = areChildrenReady(modals)
                if childrenReady {
                    isReady = true
                    pendingPresent.forEach { view in
                        present(view)
                    }
                }
            }
        }
    }

    func dismiss(_ view: RNRModalContainer) {
        if !isReady || presenting {
            if !pendingDismiss.contains(view) {
                pendingDismiss.append(view)
            }
        } else {
            pendingDismiss.removeAll(where: { $0 == view })
            var animated = true
            if view.viewController.config?.animated == -1 {
                animated = false
            }
            presenting = true
            view.viewController.dismiss(animated: animated, completion: { [self] in
                presenting = false
                pendingPresent.forEach({ scene in
                    present(scene)
                })
                pendingDismiss.forEach({ scene in
                    dismiss(scene)
                })
            })
        }
    }

    func present(_ modal: RNRModalContainer) {
        if !isReady || presenting {
            if !pendingPresent.contains(modal) {
                pendingPresent.append(modal)
            }
        } else {
            let next = modals.firstIndex(where: { modal in
                !modal.isPresented
            })
            let index = modals.firstIndex(of: modal)
            if next == index {
                pendingPresent.removeAll(where: { $0 == modal })
                modal.isPresented = true
                if onWillShowView != nil {
                    if modal.reactTag != nil {
                        onWillShowView!(["view": modal.reactTag!])
                    }
                }

                var animated = true
                if modal.viewController.config?.animated == -1 {
                    animated = false
                }

                let parentViewController = getParentViewController(modal)
                if parentViewController != nil {
                    if ((parentViewController!.presentedViewController) != nil) {
                        parentViewController!.presentedViewController!.dismiss(animated: false) {
                            parentViewController!.present(modal.viewController, animated: animated)
                        }
                    } else {
                        presenting = true
                        parentViewController!.present(modal.viewController, animated: animated, completion: { [self] in
                            presenting = false
                            pendingPresent.forEach({ scene in
                                present(scene)
                            })
                            pendingDismiss.forEach({ scene in
                                dismiss(scene)
                            })
                        })
                    }
                } else if pendingPresent.count > 0 {
                    pendingPresent.forEach({ scene in
                        present(scene)
                    })
                }
            } else {
                if !pendingPresent.contains(modal) {
                    pendingPresent.append(modal)
                }
            }
        }
    }

    func getParentViewController(_ modal: RNRModalContainer) -> UIViewController? {
        if !modals.isEmpty {
            let index = modals.firstIndex(of: modal)
            if index != nil && index! > 0 {
                let prev = modals[index! - 1]
                return prev.viewController
            }
        }
        return RCTKeyWindow()?.rootViewController
    }

    func invalidate() {
        var presenting = false
        modals.forEach { modal in
            if modal.viewController.isBeingPresented || modal.viewController.isBeingDismissed {
                presenting = true
                blocked = true
            }
        }
        if presenting {
            DispatchQueue.main.async { [self] in
                invalidate()
            }
        } else {
            modals.reversed().forEach { [self] modal in
                blockCount += 1
                modal.viewController.dismiss(animated: false) {
                    blockCount -= 1
                    if blockCount == 0 {
                        blocked = false
                        modals = []
                        pendingPresent = []
                        pendingDismiss = []
                    }
                }
            }
        }
    }
}
