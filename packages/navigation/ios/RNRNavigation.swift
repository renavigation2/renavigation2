import RenavigationCore

class RNRNavigation: UIView, RNRParent {
    var navigationController: UINavigationController = UINavigationController()

    var isReady = false
    var hasMovedToSuperview = false
    var hasUpdatedReactSubviews = false

    @objc var isInteractivePopGestureEnabled: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    var hasSetDefaults = false
    var defaultIsInteractivePopGestureEnabled: Bool?

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        subview.willMove(toSuperview: self)
        super.insertReactSubview(subview, at: atIndex)
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        setup()
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        hasMovedToSuperview = true
        setup()
    }

    override func didMoveToWindow() {
        super.didMoveToWindow()
        if isReady {
            setupChildren()
        } else {
            setup()
        }
    }

    func updateSubview(_ subview: UIView) {
        setProps()
    }

    func setup() {
        setProps()
        if !isReady && hasMovedToSuperview && hasUpdatedReactSubviews {
            if reactViewController() != nil {
                let childrenReady = (reactSubviews()[0] as! RNRChild).isReady
                if childrenReady {
                    isReady = true
                    setupChildren()
                }
            } else {
                // Sometimes, when presenting from a modal, the reactViewController is not yet set, so we dispatch an
                // async call (or more than 1) to wait until reactViewController is set. This does not create issues
                // because it simply waits until this is ready before displaying the modal. If we would display the
                // modals before the reactViewController is set, the navigation inside the modal would have the wrong
                // safe area insets.
                DispatchQueue.main.async { [self] in
                    setup()
                }
            }
        }
    }

    func setupChildren() {
        reactSubviews().forEach { view in
            if view is RNRNavigationContainer {
                if reactViewController() != nil {
                    (view as! RNRNavigationContainer).setupViewController(reactViewController())
                }
            }
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        setProps()
    }

    func setProps() {
        if !hasSetDefaults {
            hasSetDefaults = true
            defaultIsInteractivePopGestureEnabled = navigationController.interactivePopGestureRecognizer?.isEnabled
        }

        reactSubviews().enumerated().forEach { (index, subview) in
            if index == 0 {
                if subview is RNRNavigationBar {
                    (subview as! RNRNavigationBar).setNavigationBar(navigationController.navigationBar)
                    navigationController.navigationBar.setNeedsLayout()
                }
            }
        }

        if isInteractivePopGestureEnabled == -1 {
            navigationController.interactivePopGestureRecognizer?.isEnabled = false
        } else if isInteractivePopGestureEnabled == 1 {
            navigationController.interactivePopGestureRecognizer?.isEnabled = true
        } else {
            navigationController.interactivePopGestureRecognizer?.isEnabled = defaultIsInteractivePopGestureEnabled != nil ? defaultIsInteractivePopGestureEnabled! : true
        }
    }
}
