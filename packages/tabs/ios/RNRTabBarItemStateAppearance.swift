import RenavigationCore

class RNRTabBarItemStateAppearance: UIView, RNRChild {
    var isReady = false

    @objc var titleStyle: NSDictionary?
    @objc var titlePositionAdjustment: NSDictionary?
    @objc var iconColor: NSNumber?
    @objc var badgePositionAdjustment: NSDictionary?
    @objc var badgeBackgroundColor: NSNumber?
    @objc var badgeStyle: NSDictionary?
    @objc var badgeTitlePositionAdjustment: NSDictionary?

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
            isReady = true
            setupParent(superview!)
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        if isReady && superview != nil {
            updateInParent(superview!, subview: self)
        }
    }

    @available(iOS 13.0, *)
    func setTabBarItemStateAppearance(_ tabBarItemStateAppearance: UITabBarItemStateAppearance, defaultAppearance: UITabBarItemStateAppearance) {
        if titleStyle != nil {
            tabBarItemStateAppearance.titleTextAttributes = RNRTextStyle.getStyles(titleStyle!, defaultFontSize: 10, defaultFontWeight: "500")
        } else {
            tabBarItemStateAppearance.titleTextAttributes = defaultAppearance.titleTextAttributes
        }

        if titlePositionAdjustment != nil {
            if titlePositionAdjustment!["horizontal"] != nil && titlePositionAdjustment!["vertical"] != nil {
                tabBarItemStateAppearance.titlePositionAdjustment = UIOffset(
                        horizontal: titlePositionAdjustment!["horizontal"] as! CGFloat,
                        vertical: titlePositionAdjustment!["vertical"] as! CGFloat
                )
            } else {
                tabBarItemStateAppearance.titlePositionAdjustment = defaultAppearance.titlePositionAdjustment
            }
        } else {
            tabBarItemStateAppearance.titlePositionAdjustment = defaultAppearance.titlePositionAdjustment
        }

        if iconColor != nil {
            tabBarItemStateAppearance.iconColor = RCTConvert.uiColor(iconColor)
        } else {
            tabBarItemStateAppearance.iconColor = defaultAppearance.iconColor
        }

        if badgePositionAdjustment != nil {
            if badgePositionAdjustment!["horizontal"] != nil && badgePositionAdjustment!["vertical"] != nil {
                tabBarItemStateAppearance.badgePositionAdjustment = UIOffset(
                        horizontal: badgePositionAdjustment!["horizontal"] as! CGFloat,
                        vertical: badgePositionAdjustment!["vertical"] as! CGFloat
                )
            } else {
                tabBarItemStateAppearance.badgePositionAdjustment = defaultAppearance.badgePositionAdjustment
            }
        } else {
            tabBarItemStateAppearance.badgePositionAdjustment = defaultAppearance.badgePositionAdjustment
        }

        if badgeBackgroundColor != nil {
            tabBarItemStateAppearance.badgeBackgroundColor = RCTConvert.uiColor(badgeBackgroundColor)
        } else {
            tabBarItemStateAppearance.badgeBackgroundColor = defaultAppearance.badgeBackgroundColor
        }

        if badgeStyle != nil {
            tabBarItemStateAppearance.badgeTextAttributes = RNRTextStyle.getStyles(badgeStyle!, defaultFontSize: 13, defaultFontWeight: "400")
        } else {
            tabBarItemStateAppearance.badgeTextAttributes = defaultAppearance.badgeTextAttributes
        }

        if badgeTitlePositionAdjustment != nil {
            if badgeTitlePositionAdjustment!["horizontal"] != nil && badgeTitlePositionAdjustment!["vertical"] != nil {
                tabBarItemStateAppearance.badgeTitlePositionAdjustment = UIOffset(
                        horizontal: badgeTitlePositionAdjustment!["horizontal"] as! CGFloat,
                        vertical: badgeTitlePositionAdjustment!["vertical"] as! CGFloat
                )
            } else {
                tabBarItemStateAppearance.badgeTitlePositionAdjustment = defaultAppearance.badgeTitlePositionAdjustment
            }
        } else {
            tabBarItemStateAppearance.badgeTitlePositionAdjustment = defaultAppearance.badgeTitlePositionAdjustment
        }
    }
}
