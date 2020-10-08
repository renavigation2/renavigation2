class RNRNavigation: UIView {
    var navigationController: UINavigationController = UINavigationController()

    @objc var isInteractivePopGestureEnabled: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        super.insertReactSubview(_: subview, at: atIndex)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        navigationController.view.frame = self.bounds
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if isInteractivePopGestureEnabled == 1 {
            navigationController.interactivePopGestureRecognizer?.isEnabled = true
        } else if isInteractivePopGestureEnabled == -1 {
            navigationController.interactivePopGestureRecognizer?.isEnabled = false
        }

        self.reactAddController(toClosestParent: navigationController)
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        changedProps.forEach({ key in
            if key == "isInteractivePopGestureEnabled" {
                if isInteractivePopGestureEnabled == -1 {
                    navigationController.interactivePopGestureRecognizer?.isEnabled = false
                } else if isInteractivePopGestureEnabled == 1 {
                    navigationController.interactivePopGestureRecognizer?.isEnabled = true
                } else {
                    navigationController.interactivePopGestureRecognizer?.isEnabled = true
                }
            }
        })
    }

    func invalidate() {
        DispatchQueue.main.async { [self] in
            navigationController.dismiss(animated: false)
            navigationController.willMove(toParent: nil)
        }
    }
}
