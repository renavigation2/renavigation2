class RNRTabs: UIView {
    var tabBarController: UITabBarController = UITabBarController()

    override func layoutSubviews() {
        super.layoutSubviews()
        tabBarController.view.frame = self.bounds
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        self.reactAddController(toClosestParent: tabBarController)
    }
}
