import RenavigationCore

class RNRTabBar: UIView, RNRParent {
    var tabBarController: UITabBarController?
    var isReady: Bool = false
    var hasUpdatedReactSubviews = false
    var hasMovedToSuperview = false
    var hasMovedToWindow = false

    @objc var _tintColor: NSNumber?
    @objc var barTintColor: NSNumber?
    @objc var unselectedItemTintColor: NSNumber?
    @objc var selectedImageTintColor: NSNumber?
    @objc var itemPositioning: String?
    @objc var itemWidth: CGFloat = 0
    @objc var itemSpacing: CGFloat = 0
    @objc var barStyle: String?
    @objc var isTranslucent: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    var hasSetDefaults = false
    var defaultTintColor: UIColor?
    var defaultBarTintColor: UIColor?
    var defaultUnselectedItemTintColor: UIColor?
    var defaultStandardAppearance: Any?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        super.insertReactSubview(subview, at: atIndex)
        if isReady {
            setSubview(subview, at: atIndex)
        }
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if superview != nil {
            hasMovedToSuperview = true
            setup()
        } else {
            hasMovedToSuperview = false
            isReady = false
        }
    }

    override func didMoveToWindow() {
        super.didMoveToWindow()
        hasMovedToWindow = true
        setup()
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        if isReady {
            forceUpdate()
        }
        setup()
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && hasMovedToSuperview && hasMovedToWindow && superview != nil {
            let subviewsReady = areChildrenReady(subviews)
            if subviewsReady {
                isReady = true
                // setProps before setSubviews to set defaults
                setProps()
                setSubviews()

                NotificationCenter.default.removeObserver(self,
                        name: UIApplication.willEnterForegroundNotification,
                        object: nil)

                NotificationCenter.default.addObserver(self,
                        selector: #selector(appWillEnterForeground),
                        name: UIApplication.willEnterForegroundNotification,
                        object: nil)
            }
        }
    }

    // For some reason, when the app enters foreground from background state, the title of the tab bar will be cropped
    // if it is using a custom font size (something large like 15pt). Selecting a tab re-renders it correctly so we just
    // select them all then select the current tab
    @objc func appWillEnterForeground() {
        forceUpdate()
    }

    func forceUpdate() {
        if tabBarController != nil {
            let index = tabBarController!.selectedIndex
            if tabBarController!.tabBar.items != nil {
                tabBarController!.tabBar.items!.enumerated().forEach { (index, element) in
                    tabBarController?.selectedIndex = index
                }
            }
            tabBarController?.selectedIndex = index
        }
        tabBarController?.setNeedsFocusUpdate()
        tabBarController?.updateFocusIfNeeded()
        tabBarController?.tabBar.setNeedsLayout()
        tabBarController?.tabBar.setNeedsDisplay()
        tabBarController?.tabBar.layoutIfNeeded()
        tabBarController?.tabBar.layoutSubviews()
    }

    @objc override func didSetProps(_ changedProps: [String]!) {
        if isReady && tabBarController != nil {
            setProps()
            forceUpdate()
        }
    }

    func updateSubview(_ subview: UIView) {
        if isReady && tabBarController != nil {
            subviews.enumerated().forEach { (index, _subview) in
                if subview == _subview {
                    setSubview(subview, at: index)
                }
            }
            forceUpdate()
        }
    }

    func setSubviews() {
        subviews.enumerated().forEach { (index, subview) in
            setSubview(subview, at: index)
        }
    }

    func setSubview(_ subview: UIView, at atIndex: Int) {
        if atIndex == 0 { // 0 = backgroundImage
            let item = getChild(subview)
            if item is RNRImageProtocol {
                tabBarController!.tabBar.backgroundImage = (item as! RNRImageProtocol).getImage()
            } else if tabBarController!.tabBar.backgroundImage != nil {
                tabBarController!.tabBar.backgroundImage = nil
            }
        } else if atIndex == 1 { // 1 = selectionIndicatorImage
            let item = getChild(subview)
            if item is RNRImageProtocol {
                tabBarController!.tabBar.selectionIndicatorImage = (item as! RNRImageProtocol).getImage()
            } else if tabBarController!.tabBar.selectionIndicatorImage != nil {
                tabBarController!.tabBar.selectionIndicatorImage = nil
            }
        } else if atIndex == 2 { // 2 = shadowImage
            let item = getChild(subview)
            if item is RNRImageProtocol {
                tabBarController!.tabBar.shadowImage = (item as! RNRImageProtocol).getImage()
            } else if tabBarController!.tabBar.shadowImage != nil {
                tabBarController!.tabBar.shadowImage = nil
            }
        } else if atIndex == 3 { // 3 = standardAppearance
            if #available(iOS 13.0, *) {
                let item = getChild(subview)
                if item is RNRTabBarAppearance {
                    tabBarController!.tabBar.standardAppearance = (item as! RNRTabBarAppearance).getTabBarAppearance()
                } else if tabBarController!.tabBar.standardAppearance != (defaultStandardAppearance as! UITabBarAppearance) {
                    tabBarController!.tabBar.standardAppearance = (defaultStandardAppearance as! UITabBarAppearance)
                }
            }
        }
    }

    func setProps() {
        if !hasSetDefaults {
            hasSetDefaults = true
            defaultTintColor = tabBarController!.tabBar.tintColor
            defaultBarTintColor = tabBarController!.tabBar.barTintColor
            if #available(iOS 10.0, *) {
                defaultUnselectedItemTintColor = tabBarController!.tabBar.unselectedItemTintColor
            }
            if #available(iOS 13.0, *) {
                defaultStandardAppearance = tabBarController!.tabBar.standardAppearance
            }
        }

        if _tintColor != nil {
            tabBarController!.tabBar.tintColor = RCTConvert.uiColor(_tintColor)
        } else if tabBarController!.tabBar.tintColor != defaultTintColor {
            tabBarController!.tabBar.tintColor = defaultTintColor
        }

        if barTintColor != nil {
            tabBarController!.tabBar.barTintColor = RCTConvert.uiColor(barTintColor)
        } else if tabBarController!.tabBar.barTintColor != defaultBarTintColor {
            tabBarController!.tabBar.barTintColor = defaultBarTintColor
        }

        if #available(iOS 10.0, *) {
            if unselectedItemTintColor != nil {
                tabBarController!.tabBar.unselectedItemTintColor = RCTConvert.uiColor(unselectedItemTintColor)
            } else if tabBarController!.tabBar.unselectedItemTintColor != defaultUnselectedItemTintColor {
                tabBarController!.tabBar.unselectedItemTintColor = defaultUnselectedItemTintColor
            }
        }

        if itemPositioning != nil {
            if itemPositioning == "automatic" {
                tabBarController!.tabBar.itemPositioning = UITabBar.ItemPositioning.automatic
            } else if itemPositioning == "fill" {
                tabBarController!.tabBar.itemPositioning = UITabBar.ItemPositioning.fill
            } else if itemPositioning == "centered" {
                tabBarController!.tabBar.itemPositioning = UITabBar.ItemPositioning.centered
            }
        } else {
            tabBarController!.tabBar.itemPositioning = UITabBar.ItemPositioning.automatic
        }

        tabBarController!.tabBar.itemWidth = itemWidth
        tabBarController!.tabBar.itemSpacing = itemSpacing

        if barStyle != nil {
            if barStyle == "default" {
                tabBarController!.tabBar.barStyle = UIBarStyle.default
            } else if barStyle == "black" {
                tabBarController!.tabBar.barStyle = UIBarStyle.black
            } else if tabBarController!.tabBar.barStyle != UIBarStyle.default {
                tabBarController!.tabBar.barStyle = UIBarStyle.default
            }
        } else if tabBarController!.tabBar.barStyle != UIBarStyle.default {
            tabBarController!.tabBar.barStyle = UIBarStyle.default
        }

        if isTranslucent == -1 {
            tabBarController!.tabBar.isTranslucent = false
        } else if tabBarController!.tabBar.isTranslucent != true {
            tabBarController!.tabBar.isTranslucent = true
        }
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview is RNRTabs {
            tabBarController = (newSuperview as! RNRTabs).tabBarController
            setup()
        }
    }

    func invalidate() {
        NotificationCenter.default.removeObserver(self,
                name: UIApplication.willEnterForegroundNotification,
                object: nil)
    }
}
