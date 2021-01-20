import RenavigationCore

class RNRModals: UIView, RNRParent {
    var modals: [RNRModal] = []
    var pendingPresent: [RNRModal] = []
    var pendingDismiss: [RNRModal] = []

    var isReady = false
    var isPresenting = false
    var isInvalidated = false
    var hasUpdatedReactSubviews = false
    var hasMovedToWindow = false

    @objc var onWillShowView: RCTDirectEventBlock?

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        (subview as! RNRModal).willMove(toSuperview: self)
        modals.insert(subview as! RNRModal, at: atIndex)
    }

    override func removeReactSubview(_ subview: UIView!) {
        (subview as! RNRModal).parent = nil
        modals.removeAll(where: { $0 == subview })
    }

    override func reactSubviews() -> [UIView]! {
        modals
    }

    override func didUpdateReactSubviews() {
        DispatchQueue.main.async { [self] in
            hasUpdatedReactSubviews = true
            if !isReady {
                setup()
            } else {
                presentModals()
            }
        }
    }

    override func didMoveToWindow() {
        super.didMoveToWindow()
        if !isInvalidated {
            hasMovedToWindow = true
            if !isReady {
                setup()
            } else {
                presentModals()
            }
        }
    }

    func updateSubview(_ subview: UIView) {}

    func setup() {
        if window != nil && !isReady && hasMovedToWindow && hasUpdatedReactSubviews {
            let childrenReady = areChildrenReady(modals)
            if childrenReady {
                isReady = true
                presentModals()
            }
        }
    }

    func presentModals() {
        modals.filter { !$0.isPresented }.forEach { view in
            present(view)
        }
        pendingPresent.forEach({ view in
            present(view)
        })
        pendingDismiss.forEach({ view in
            dismiss(view)
        })
    }

    func present(_ modal: RNRModal) {
        if !isReady || isPresenting {
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
                if modal.controller?.config?.animated == -1 {
                    animated = false
                }

                let parentViewController = getParentViewController(modal)
                if parentViewController != nil {
                    if ((parentViewController!.presentedViewController) != nil) {
                        parentViewController!.presentedViewController!.dismiss(animated: false) {
                            parentViewController!.present(modal.controller!, animated: animated)
                        }
                    } else {
                        isPresenting = true
                        parentViewController!.present(modal.controller!, animated: animated, completion: { [self] in
                            isPresenting = false
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


    func dismiss(_ view: RNRModal) {
        if !isReady || isPresenting {
            if !pendingDismiss.contains(view) {
                pendingDismiss.append(view)
            }
        } else {
            pendingDismiss.removeAll(where: { $0 == view })
            var animated = true
            if view.controller?.config?.animated == -1 {
                animated = false
            }
            isPresenting = true
            view.controller?.dismiss(animated: animated, completion: { [self] in
                isPresenting = false
                pendingPresent.forEach({ scene in
                    present(scene)
                })
                pendingDismiss.forEach({ scene in
                    dismiss(scene)
                })
            })
        }
    }

    func getParentViewController(_ modal: RNRModal) -> UIViewController? {
        if !modals.isEmpty {
            let index = modals.firstIndex(of: modal)
            if index != nil && index! > 0 {
                let prev = modals[index! - 1]
                return prev.controller
            }
        }
        return RCTKeyWindow()?.rootViewController
    }

    func invalidate() {
        isInvalidated = true
        for modal in modals {
            if modal.isPresented && modal.controller != nil {
                modal.controller!.dismiss(animated: false, completion: {
                    modal.controller = nil
                })
            }
        }
        pendingDismiss.removeAll()
        pendingPresent.removeAll()
        modals.removeAll()
    }

    func invalidateAsync() {
        DispatchQueue.main.async { [self] in
            invalidate()
        }
    }
}
