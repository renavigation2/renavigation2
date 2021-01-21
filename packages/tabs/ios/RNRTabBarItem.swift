import RenavigationCore

class RNRTabBarItem: UIView, RNRChild, RNRParent {
    var _tabBarItem: UITabBarItem?

    var isReady = false
    var hasUpdatedReactSubviews = false
    var hasMovedToSuperview = false

    @objc var badgeValue: String?
    @objc var titlePositionAdjustment: NSDictionary?
    @objc var badgeColor: NSNumber?
    @objc var normalBadgeStyle: NSDictionary?
    @objc var disabledBadgeStyle: NSDictionary?
    @objc var selectedBadgeStyle: NSDictionary?
    @objc var focusedBadgeStyle: NSDictionary?
    @objc var isEnabled: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var title: String?
    @objc var imageInsets: NSDictionary?
    @objc var landscapeImagePhoneInsets: NSDictionary?
    @objc var largeContentSizeImageInsets: NSDictionary?
    @objc var normalTitleStyle: NSDictionary?
    @objc var disabledTitleStyle: NSDictionary?
    @objc var selectedTitleStyle: NSDictionary?
    @objc var focusedTitleStyle: NSDictionary?

    var hasSetDefaults = false
    var defaultSelectedImage: UIImage?
    var defaultTitlePositionAdjustment: UIOffset?
    var defaultBadgeColor: UIColor?
    var defaultNormalBadgeStyle: [NSAttributedString.Key : Any]?
    var defaultDisabledBadgeStyle: [NSAttributedString.Key : Any]?
    var defaultSelectedBadgeStyle: [NSAttributedString.Key : Any]?
    var defaultFocusedBadgeStyle: [NSAttributedString.Key : Any]?
    var defaultStandardAppearance: Any?
    var defaultIsEnabled: Bool?
    var defaultImage: UIImage?
    var defaultLandscapeImagePhone: UIImage?
    var defaultLargeContentSizeImage: UIImage?
    var defaultImageInsets: UIEdgeInsets?
    var defaultLandscapeImagePhoneInsets: UIEdgeInsets?
    var defaultLargeContentSizeImageInsets: UIEdgeInsets?
    var defaultNormalTitleStyle: [NSAttributedString.Key : Any]?
    var defaultDisabledTitleStyle: [NSAttributedString.Key : Any]?
    var defaultSelectedTitleStyle: [NSAttributedString.Key : Any]?
    var defaultFocusedTitleStyle: [NSAttributedString.Key : Any]?

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
        if !isReady && superview != nil && hasUpdatedReactSubviews && hasMovedToSuperview {
            let childrenReady = areChildrenReady(subviews)
            if childrenReady {
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

    func getTabBarItem() -> UITabBarItem {
        if _tabBarItem == nil  {
            _tabBarItem = UITabBarItem()
        }
        let tabBarItem = _tabBarItem!


        if !hasSetDefaults {
            defaultSelectedImage = tabBarItem.selectedImage
            defaultTitlePositionAdjustment = tabBarItem.titlePositionAdjustment
            if #available(iOS 10.0, *) {
                defaultBadgeColor = tabBarItem.badgeColor
            }
            if #available(iOS 10.0, *) {
                defaultNormalBadgeStyle = tabBarItem.badgeTextAttributes(for: .normal)
                defaultDisabledBadgeStyle = tabBarItem.badgeTextAttributes(for: .disabled)
                defaultSelectedBadgeStyle = tabBarItem.badgeTextAttributes(for: .selected)
                defaultFocusedBadgeStyle = tabBarItem.badgeTextAttributes(for: .focused)
            }
            if #available(iOS 13.0, *) {
                defaultStandardAppearance = tabBarItem.standardAppearance
            }
            defaultIsEnabled = tabBarItem.isEnabled
            defaultImage = tabBarItem.image
            defaultLandscapeImagePhone = tabBarItem.landscapeImagePhone
            if #available(iOS 11.0, *) {
                defaultLargeContentSizeImage = tabBarItem.largeContentSizeImage
            }
            defaultImageInsets = tabBarItem.imageInsets
            defaultLandscapeImagePhoneInsets = tabBarItem.landscapeImagePhoneInsets
            if #available(iOS 11.0, *) {
                defaultLargeContentSizeImageInsets = tabBarItem.largeContentSizeImageInsets
            }
            defaultNormalTitleStyle = tabBarItem.titleTextAttributes(for: .normal)
            defaultDisabledTitleStyle = tabBarItem.titleTextAttributes(for: .disabled)
            defaultSelectedTitleStyle = tabBarItem.titleTextAttributes(for: .selected)
            defaultFocusedTitleStyle = tabBarItem.titleTextAttributes(for: .focused)
        }

        if subviews.indices.contains(0) { // 0 = selectedImage
            let subview = getChild(subviews[0])
            if subview is RNRImageProtocol {
                tabBarItem.selectedImage = (subview as! RNRImageProtocol).getImage()
            } else if tabBarItem.selectedImage != defaultSelectedImage {
                tabBarItem.selectedImage = defaultSelectedImage
            }
        }
        if subviews.indices.contains(1) { // 1 = standardAppearance
            if #available(iOS 13.0, *) {
                let subview = getChild(subviews[1])
                if subview is RNRTabBarAppearance {
                    tabBarItem.standardAppearance = (subview as! RNRTabBarAppearance).getTabBarAppearance()
                } else if tabBarItem.standardAppearance != (defaultStandardAppearance as? UITabBarAppearance) {
                    tabBarItem.standardAppearance = (defaultStandardAppearance as! UITabBarAppearance)
                }
            }
        }
        if subviews.indices.contains(2) { // 2 = image
            let subview = getChild(subviews[2])
            if subview is RNRImageProtocol {
                tabBarItem.image = (subview as! RNRImageProtocol).getImage()
            } else if tabBarItem.image != defaultImage {
                tabBarItem.image = defaultImage
            }
        }
        if subviews.indices.contains(3) { // 3 = landscapeImagePhone
            let subview = getChild(subviews[3])
            if subview is RNRImageProtocol {
                tabBarItem.landscapeImagePhone = (subview as! RNRImageProtocol).getImage()
            } else if tabBarItem.landscapeImagePhone != defaultLandscapeImagePhone {
                tabBarItem.landscapeImagePhone = defaultLandscapeImagePhone
            }
        }
        if subviews.indices.contains(4) { // 4 = largeContentSizeImage
            if #available(iOS 11.0, *) {
                let subview = getChild(subviews[4])
                if subview is RNRImageProtocol {
                    tabBarItem.largeContentSizeImage = (subview as! RNRImageProtocol).getImage()
                } else if tabBarItem.largeContentSizeImage != defaultLargeContentSizeImage {
                    tabBarItem.largeContentSizeImage = defaultLargeContentSizeImage
                }
            }
        }

        tabBarItem.badgeValue = badgeValue

        if titlePositionAdjustment != nil {
            let offset = RNROffset.getOffset(titlePositionAdjustment)
            tabBarItem.titlePositionAdjustment = offset != nil ? offset! : defaultTitlePositionAdjustment!
        } else if tabBarItem.titlePositionAdjustment != defaultTitlePositionAdjustment! {
            tabBarItem.titlePositionAdjustment = defaultTitlePositionAdjustment!
        }

        if #available(iOS 10.0, *) {
            if badgeColor != nil {
                let color = RCTConvert.uiColor(badgeColor)
                tabBarItem.badgeColor = color != nil ? color! : defaultBadgeColor
            } else if tabBarItem.badgeColor != defaultBadgeColor {
                tabBarItem.badgeColor = defaultBadgeColor
            }
        }

        if #available(iOS 10.0, *) {
            if normalBadgeStyle != nil {
                let style = RNRTextStyle.getStyles(normalBadgeStyle!, defaultFontSize: 13, defaultFontWeight: "400")
                tabBarItem.setBadgeTextAttributes(style, for: .normal)
            } else {
                tabBarItem.setBadgeTextAttributes(defaultNormalBadgeStyle, for: .normal)
            }
            if disabledBadgeStyle != nil {
                let style = RNRTextStyle.getStyles(disabledBadgeStyle!, defaultFontSize: 13, defaultFontWeight: "400")
                tabBarItem.setBadgeTextAttributes(style, for: .disabled)
            } else {
                tabBarItem.setBadgeTextAttributes(defaultDisabledBadgeStyle, for: .disabled)
            }
            if selectedBadgeStyle != nil {
                let style = RNRTextStyle.getStyles(selectedBadgeStyle!, defaultFontSize: 13, defaultFontWeight: "400")
                tabBarItem.setBadgeTextAttributes(style, for: .selected)
            } else {
                tabBarItem.setBadgeTextAttributes(defaultSelectedBadgeStyle, for: .selected)
            }
            if focusedBadgeStyle != nil {
                let style = RNRTextStyle.getStyles(focusedBadgeStyle!, defaultFontSize: 13, defaultFontWeight: "400")
                tabBarItem.setBadgeTextAttributes(style, for: .focused)
            } else {
                tabBarItem.setBadgeTextAttributes(defaultFocusedBadgeStyle, for: .focused)
            }
        }

        let isEnabledValue: Bool? = isEnabled == 1 ? true : isEnabled == -1 ? false : nil
        if isEnabledValue == true {
            tabBarItem.isEnabled = true
        } else if isEnabledValue == false {
            tabBarItem.isEnabled = false
        } else if tabBarItem.isEnabled != defaultIsEnabled {
            tabBarItem.isEnabled = defaultIsEnabled!
        }

        tabBarItem.title = title

        if imageInsets != nil {
            let edgeInsets = RNREdgeInsets.getEdgeInsets(imageInsets!)
            if edgeInsets != nil {
                tabBarItem.imageInsets = edgeInsets!
            } else if tabBarItem.imageInsets != defaultImageInsets {
                tabBarItem.imageInsets = defaultImageInsets ?? UIEdgeInsets()
            }
        } else if tabBarItem.imageInsets != defaultImageInsets {
            tabBarItem.imageInsets = defaultImageInsets ?? UIEdgeInsets()
        }

        if landscapeImagePhoneInsets != nil {
            let edgeInsets = RNREdgeInsets.getEdgeInsets(landscapeImagePhoneInsets!)
            if edgeInsets != nil {
                tabBarItem.landscapeImagePhoneInsets = edgeInsets!
            } else if tabBarItem.landscapeImagePhoneInsets != defaultLandscapeImagePhoneInsets {
                tabBarItem.landscapeImagePhoneInsets = defaultLandscapeImagePhoneInsets ?? UIEdgeInsets()
            }
        } else if tabBarItem.landscapeImagePhoneInsets != defaultLandscapeImagePhoneInsets {
            tabBarItem.landscapeImagePhoneInsets = defaultLandscapeImagePhoneInsets ?? UIEdgeInsets()
        }

        if #available(iOS 11.0, *) {
            if largeContentSizeImageInsets != nil {
                let edgeInsets = RNREdgeInsets.getEdgeInsets(largeContentSizeImageInsets!)
                if edgeInsets != nil {
                    tabBarItem.largeContentSizeImageInsets = edgeInsets!
                } else if tabBarItem.largeContentSizeImageInsets != defaultLargeContentSizeImageInsets {
                    tabBarItem.largeContentSizeImageInsets = defaultLargeContentSizeImageInsets ?? UIEdgeInsets()
                }
            } else if tabBarItem.largeContentSizeImageInsets != defaultLargeContentSizeImageInsets {
                tabBarItem.largeContentSizeImageInsets = defaultLargeContentSizeImageInsets ?? UIEdgeInsets()
            }
        }

        if normalTitleStyle != nil {
            let style = RNRTextStyle.getStyles(normalTitleStyle!, defaultFontSize: 10, defaultFontWeight: "500")
            tabBarItem.setTitleTextAttributes(style, for: .normal)
        } else {
            tabBarItem.setTitleTextAttributes(defaultNormalTitleStyle, for: .normal)
        }
        if disabledTitleStyle != nil {
            let style = RNRTextStyle.getStyles(disabledTitleStyle!, defaultFontSize: 10, defaultFontWeight: "500")
            tabBarItem.setTitleTextAttributes(style, for: .disabled)
        } else {
            tabBarItem.setTitleTextAttributes(defaultDisabledTitleStyle, for: .disabled)
        }
        if selectedTitleStyle != nil {
            let style = RNRTextStyle.getStyles(selectedTitleStyle!, defaultFontSize: 10, defaultFontWeight: "500")
            tabBarItem.setTitleTextAttributes(style, for: .selected)
        } else {
            tabBarItem.setTitleTextAttributes(defaultSelectedTitleStyle, for: .selected)
        }
        if focusedTitleStyle != nil {
            let style = RNRTextStyle.getStyles(focusedTitleStyle!, defaultFontSize: 10, defaultFontWeight: "500")
            tabBarItem.setTitleTextAttributes(style, for: .focused)
        } else {
            tabBarItem.setTitleTextAttributes(defaultFocusedTitleStyle, for: .focused)
        }

        return tabBarItem
    }
}
