import RenavigationCore

var blocked = false
var blockCount = 0

class RNRModals: UIView, RNRParent {
    var modals: [RNRModalContainer] = []
    var shouldPresent: [RNRModalContainer] = []

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
        shouldPresent.removeAll(where: { $0 == subview})
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
                    shouldPresent.forEach { view in
                        present(view)
                    }
                }
            }
        }
    }

    func dismiss(_ view: RNRModalContainer) {
        var animated = true
        if view.viewController.config?.animated == -1 {
            animated = false
        }
        view.viewController.dismiss(animated: animated)
    }

    func present(_ modal: RNRModalContainer) {
        if !isReady {
            shouldPresent.append(modal)
        } else {
            let next = modals.firstIndex(where: { modal in
                !modal.isPresented
            })
            let index = modals.firstIndex(of: modal)
            if next == index {
                shouldPresent.removeAll(where: { $0 == modal })
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
                        parentViewController!.present(modal.viewController, animated: animated)
                    }
                }
                if shouldPresent.count > 0 {
                    shouldPresent.forEach({ scene in
                        present(scene)
                    })
                }
            } else {
                if !shouldPresent.contains(modal) {
                    shouldPresent.append(modal)
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
                        shouldPresent = []
                    }
                }
            }
        }
    }
}
