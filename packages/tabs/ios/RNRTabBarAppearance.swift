import RenavigationCore

class RNRTabBarAppearance: UIView, RNRChild, RNRParent {
    var isReady: Bool = false
    var hasUpdatedReactSubviews = false
    var hasMovedToSuperview = false

    @objc var selectionIndicatorTintColor: NSNumber?
    @objc var stackedItemPositioning: String?
    @objc var stackedItemWidth: CGFloat = 0
    @objc var stackedItemSpacing: CGFloat = 0
    @objc var backgroundEffect: String?
    @objc var _backgroundColor: NSNumber?
    @objc var backgroundImageContentMode: String?
    @objc var shadowColor: NSNumber?
    @objc var configure: String?

    var hasSetDefaults = false
    var defaultShadowColor: UIColor?
    var defaultBackgroundColor: UIColor?
    var defaultBackgroundEffect: UIBlurEffect?
    var defaultStackedLayoutAppearance: Any?
    var defaultInlineLayoutAppearance: Any?
    var defaultCompactInlineLayoutAppearance: Any?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
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

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        setup()
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && hasMovedToSuperview && superview != nil {
            let subviewsReady = areChildrenReady(subviews)
            if subviewsReady {
                isReady = true
                setupParent(superview!)
            }
        }
    }

    func updateSubview(_ subview: UIView) {
        if isReady && superview != nil {
            updateInParent(superview!, subview: self)
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        if isReady && superview != nil {
            updateInParent(superview!, subview: self)
        }
    }

    @available(iOS 13.0, *)
    func getTabBarAppearance() -> UITabBarAppearance {
        let tabBarAppearance = UITabBarAppearance()

        if configure == "defaultBackground" {
            tabBarAppearance.configureWithDefaultBackground()
        } else if configure == "opaqueBackground" {
            tabBarAppearance.configureWithOpaqueBackground()
        } else if configure == "transparentBackground" {
            tabBarAppearance.configureWithTransparentBackground()
        }

        if !hasSetDefaults {
            hasSetDefaults = true
            defaultShadowColor = tabBarAppearance.shadowColor
            defaultBackgroundColor = tabBarAppearance.backgroundColor
            defaultBackgroundEffect = tabBarAppearance.backgroundEffect
            defaultStackedLayoutAppearance = tabBarAppearance.stackedLayoutAppearance
            defaultInlineLayoutAppearance = tabBarAppearance.inlineLayoutAppearance
            defaultCompactInlineLayoutAppearance = tabBarAppearance.compactInlineLayoutAppearance
        }

        if !subviews.isEmpty {
            if subviews.indices.contains(0) { // 0 = stackedLayoutAppearance
                let subview = getChild(subviews[0])
                if subview is RNRTabBarItemAppearance {
                    tabBarAppearance.stackedLayoutAppearance = (subview as! RNRTabBarItemAppearance).getTabBarItemAppearance()
                } else if tabBarAppearance.stackedLayoutAppearance != defaultStackedLayoutAppearance as! UITabBarItemAppearance {
                    tabBarAppearance.stackedLayoutAppearance = defaultStackedLayoutAppearance as! UITabBarItemAppearance
                }
            }
            if subviews.indices.contains(1) { // 1 = inlineLayoutAppearance
                let subview = getChild(subviews[1])
                if subview is RNRTabBarItemAppearance {
                    tabBarAppearance.inlineLayoutAppearance = (subview as! RNRTabBarItemAppearance).getTabBarItemAppearance()
                } else if tabBarAppearance.inlineLayoutAppearance != defaultInlineLayoutAppearance as! UITabBarItemAppearance {
                    tabBarAppearance.inlineLayoutAppearance = defaultInlineLayoutAppearance as! UITabBarItemAppearance
                }
            }
            if subviews.indices.contains(2) { // 2 = compactInlineLayoutAppearance
                let subview = getChild(subviews[2])
                if subview is RNRTabBarItemAppearance {
                    tabBarAppearance.compactInlineLayoutAppearance = (subview as! RNRTabBarItemAppearance).getTabBarItemAppearance()
                } else if tabBarAppearance.compactInlineLayoutAppearance != defaultCompactInlineLayoutAppearance as! UITabBarItemAppearance {
                    tabBarAppearance.compactInlineLayoutAppearance = defaultCompactInlineLayoutAppearance as! UITabBarItemAppearance
                }
            }
            if subviews.indices.contains(3) { // 3 = selectionIndicatorImage
                let subview = getChild(subviews[3])
                if subview is RNRImageProtocol {
                    tabBarAppearance.selectionIndicatorImage = (subview as! RNRImageProtocol).getImage()
                } else if tabBarAppearance.selectionIndicatorImage != nil {
                    tabBarAppearance.selectionIndicatorImage = nil
                }
            }
            if subviews.indices.contains(4) { // 4 = backgroundImage
                let subview = getChild(subviews[4])
                if subview is RNRImageProtocol {
                    tabBarAppearance.backgroundImage = (subview as! RNRImageProtocol).getImage()
                } else if tabBarAppearance.backgroundImage != nil {
                    tabBarAppearance.backgroundImage = nil
                }
            }
            if subviews.indices.contains(5) { // 5 = shadowImage
                let subview = getChild(subviews[5])
                if subview is RNRImageProtocol {
                    tabBarAppearance.shadowImage = (subview as! RNRImageProtocol).getImage()
                } else if tabBarAppearance.shadowImage != nil {
                    tabBarAppearance.shadowImage = nil
                }
            }
        }

        if backgroundEffect != nil {
            tabBarAppearance.backgroundEffect = RNRBlurEffect.getBlurEffect(backgroundEffect!)
        } else if tabBarAppearance.backgroundEffect != defaultBackgroundEffect {
            tabBarAppearance.backgroundEffect = defaultBackgroundEffect
        }

        if _backgroundColor != nil {
            tabBarAppearance.backgroundColor = RCTConvert.uiColor(_backgroundColor)
        } else if tabBarAppearance.backgroundColor != defaultBackgroundColor {
            tabBarAppearance.backgroundColor = defaultBackgroundColor
        }

        if backgroundImageContentMode != nil {
            let contentMode = RNRContentMode.getContentMode(backgroundImageContentMode!)
            if contentMode != nil {
                tabBarAppearance.backgroundImageContentMode = contentMode!
            } else if tabBarAppearance.backgroundImageContentMode != UIView.ContentMode.scaleToFill {
                tabBarAppearance.backgroundImageContentMode = UIView.ContentMode.scaleToFill
            }
        } else if tabBarAppearance.backgroundImageContentMode != UIView.ContentMode.scaleToFill {
            tabBarAppearance.backgroundImageContentMode = UIView.ContentMode.scaleToFill
        }

        if shadowColor != nil {
            tabBarAppearance.shadowColor = RCTConvert.uiColor(shadowColor)
        } else if tabBarAppearance.shadowColor != defaultShadowColor {
            tabBarAppearance.shadowColor = defaultShadowColor
        }

        if selectionIndicatorTintColor != nil {
            tabBarAppearance.selectionIndicatorTintColor = RCTConvert.uiColor(selectionIndicatorTintColor)
        } else {
            tabBarAppearance.selectionIndicatorTintColor = nil
        }

        if stackedItemPositioning == "fill" {
            tabBarAppearance.stackedItemPositioning = UITabBar.ItemPositioning.fill
        } else if stackedItemPositioning == "centered" {
            tabBarAppearance.stackedItemPositioning = UITabBar.ItemPositioning.centered
        } else {
            tabBarAppearance.stackedItemPositioning = UITabBar.ItemPositioning.automatic
        }

        tabBarAppearance.stackedItemWidth = stackedItemWidth
        tabBarAppearance.stackedItemSpacing = stackedItemSpacing

        return tabBarAppearance
    }
}
