class RNRNavigation: UIView {
    var navigationController: UINavigationController = UINavigationController()

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        super.insertReactSubview(_: subview, at: atIndex)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        navigationController.view.frame = self.bounds
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        self.reactAddController(toClosestParent: navigationController)
    }

    func invalidate() {
        DispatchQueue.main.async { [self] in
            navigationController.dismiss(animated: false)
            navigationController.willMove(toParent: nil)
        }
    }
}
