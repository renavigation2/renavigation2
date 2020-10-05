class RNRModals: UIView {
    var modals: [RNRModalContainer] = []
    var shouldPresent: [RNRModalContainer] = []

    @objc var onWillShowView: RCTDirectEventBlock?

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        (subview as! RNRModalContainer)._reactSuperview = self
        modals.insert(subview as! RNRModalContainer, at: atIndex)
        if !(subview as! RNRModalContainer).presented && (subview as! RNRModalContainer).initialized {
            present(subview as! RNRModalContainer)
        }
    }

    override func removeReactSubview(_ subview: UIView!) {
        modals.removeAll(where: { $0 == subview})
    }

    override func reactSubviews() -> [UIView]! {
        modals
    }

    override func didUpdateReactSubviews() {
    }

    func dismiss(_ view: RNRModalContainer) {
        var animated = true
        if view.controller.config?.animated == -1 {
            animated = false
        }
        view.controller.dismiss(animated: animated)
    }

    func present(_ modal: RNRModalContainer) {
        let next = modals.firstIndex(where: { modal in
            !modal.presented
        })
        let index = modals.firstIndex(of: modal)
        if next == index {
            shouldPresent.removeAll(where: { $0 == modal })
            modal.presented = true
            if onWillShowView != nil {
                if modal.reactTag != nil {
                    onWillShowView!(["view": modal.reactTag!])
                }
            }

            var animated = true
            if modal.controller.config?.animated == -1 {
                animated = false
            }

            getParentController(modal)?.present(modal.controller, animated: animated)
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

    func getParentController(_ modal: RNRModalContainer) -> UIViewController? {
        if !modals.isEmpty {
            let parent = modals.last(where: { m in
                m !== modal
            })
            if parent != nil {
                return parent?.controller
            }
        }
        return RCTKeyWindow()?.rootViewController
    }
}
