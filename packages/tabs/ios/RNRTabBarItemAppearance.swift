import RenavigationCore

class RNRTabBarItemAppearance: UIView, RNRChild, RNRParent {
    var isReady: Bool = false
    var hasUpdatedReactSubviews = false
    var hasMovedToSuperview = false

    @objc var configure: String?

    var hasSetDefaults = false
    var defaultNormal: Any?
    var defaultSelected: Any?
    var defaultDisabled: Any?
    var defaultFocused: Any?

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
    func getTabBarItemAppearance() -> UITabBarItemAppearance {
        let tabBarItemAppearance = UITabBarItemAppearance()

        if configure == "stacked" {
            tabBarItemAppearance.configureWithDefault(for: UITabBarItemAppearance.Style.stacked)
        } else if configure == "inline" {
            tabBarItemAppearance.configureWithDefault(for: UITabBarItemAppearance.Style.inline)
        } else if configure == "compactInline" {
            tabBarItemAppearance.configureWithDefault(for: UITabBarItemAppearance.Style.compactInline)
        }

        if !hasSetDefaults {
            hasSetDefaults = true
            defaultNormal = tabBarItemAppearance.normal
            defaultSelected = tabBarItemAppearance.selected
            defaultDisabled = tabBarItemAppearance.disabled
            defaultFocused = tabBarItemAppearance.focused
        }

        if !subviews.isEmpty {
            if subviews.indices.contains(0) { // 0 = normal
                let subview = getChild(subviews[0])
                if subview is RNRTabBarItemStateAppearance {
                    (subview as! RNRTabBarItemStateAppearance).setTabBarItemStateAppearance(tabBarItemAppearance.normal, defaultAppearance: (defaultNormal as! UITabBarItemStateAppearance))
                } else {
                    tabBarItemAppearance.normal.titleTextAttributes = (defaultNormal as! UITabBarItemStateAppearance).titleTextAttributes
                    tabBarItemAppearance.normal.titlePositionAdjustment = (defaultNormal as! UITabBarItemStateAppearance).titlePositionAdjustment
                    tabBarItemAppearance.normal.iconColor = (defaultNormal as! UITabBarItemStateAppearance).iconColor
                    tabBarItemAppearance.normal.badgePositionAdjustment = (defaultNormal as! UITabBarItemStateAppearance).badgePositionAdjustment
                    tabBarItemAppearance.normal.badgeBackgroundColor = (defaultNormal as! UITabBarItemStateAppearance).badgeBackgroundColor
                    tabBarItemAppearance.normal.badgeTextAttributes = (defaultNormal as! UITabBarItemStateAppearance).badgeTextAttributes
                    tabBarItemAppearance.normal.badgeTitlePositionAdjustment = (defaultNormal as! UITabBarItemStateAppearance).badgeTitlePositionAdjustment
                }
            }
            if subviews.indices.contains(1) { // 1 = selected
                let subview = getChild(subviews[1])
                if subview is RNRTabBarItemStateAppearance {
                    (subview as! RNRTabBarItemStateAppearance).setTabBarItemStateAppearance(tabBarItemAppearance.selected, defaultAppearance: (defaultSelected as! UITabBarItemStateAppearance))
                } else {
                    tabBarItemAppearance.selected.titleTextAttributes = (defaultSelected as! UITabBarItemStateAppearance).titleTextAttributes
                    tabBarItemAppearance.selected.titlePositionAdjustment = (defaultSelected as! UITabBarItemStateAppearance).titlePositionAdjustment
                    tabBarItemAppearance.selected.iconColor = (defaultSelected as! UITabBarItemStateAppearance).iconColor
                    tabBarItemAppearance.selected.badgePositionAdjustment = (defaultSelected as! UITabBarItemStateAppearance).badgePositionAdjustment
                    tabBarItemAppearance.selected.badgeBackgroundColor = (defaultSelected as! UITabBarItemStateAppearance).badgeBackgroundColor
                    tabBarItemAppearance.selected.badgeTextAttributes = (defaultSelected as! UITabBarItemStateAppearance).badgeTextAttributes
                    tabBarItemAppearance.selected.badgeTitlePositionAdjustment = (defaultSelected as! UITabBarItemStateAppearance).badgeTitlePositionAdjustment
                }
            }
            if subviews.indices.contains(2) { // 2 = disabled
                let subview = getChild(subviews[2])
                if subview is RNRTabBarItemStateAppearance {
                    (subview as! RNRTabBarItemStateAppearance).setTabBarItemStateAppearance(tabBarItemAppearance.disabled, defaultAppearance: (defaultDisabled as! UITabBarItemStateAppearance))
                } else {
                    tabBarItemAppearance.disabled.titleTextAttributes = (defaultDisabled as! UITabBarItemStateAppearance).titleTextAttributes
                    tabBarItemAppearance.disabled.titlePositionAdjustment = (defaultDisabled as! UITabBarItemStateAppearance).titlePositionAdjustment
                    tabBarItemAppearance.disabled.iconColor = (defaultDisabled as! UITabBarItemStateAppearance).iconColor
                    tabBarItemAppearance.disabled.badgePositionAdjustment = (defaultDisabled as! UITabBarItemStateAppearance).badgePositionAdjustment
                    tabBarItemAppearance.disabled.badgeBackgroundColor = (defaultDisabled as! UITabBarItemStateAppearance).badgeBackgroundColor
                    tabBarItemAppearance.disabled.badgeTextAttributes = (defaultDisabled as! UITabBarItemStateAppearance).badgeTextAttributes
                    tabBarItemAppearance.disabled.badgeTitlePositionAdjustment = (defaultDisabled as! UITabBarItemStateAppearance).badgeTitlePositionAdjustment
                }
            }
            if subviews.indices.contains(3) { // 3 = focused
                let subview = getChild(subviews[3])
                if subview is RNRTabBarItemStateAppearance {
                    (subview as! RNRTabBarItemStateAppearance).setTabBarItemStateAppearance(tabBarItemAppearance.focused, defaultAppearance: (defaultFocused as! UITabBarItemStateAppearance))
                } else {
                    tabBarItemAppearance.focused.titleTextAttributes = (defaultFocused as! UITabBarItemStateAppearance).titleTextAttributes
                    tabBarItemAppearance.focused.titlePositionAdjustment = (defaultFocused as! UITabBarItemStateAppearance).titlePositionAdjustment
                    tabBarItemAppearance.focused.iconColor = (defaultFocused as! UITabBarItemStateAppearance).iconColor
                    tabBarItemAppearance.focused.badgePositionAdjustment = (defaultFocused as! UITabBarItemStateAppearance).badgePositionAdjustment
                    tabBarItemAppearance.focused.badgeBackgroundColor = (defaultFocused as! UITabBarItemStateAppearance).badgeBackgroundColor
                    tabBarItemAppearance.focused.badgeTextAttributes = (defaultFocused as! UITabBarItemStateAppearance).badgeTextAttributes
                    tabBarItemAppearance.focused.badgeTitlePositionAdjustment = (defaultFocused as! UITabBarItemStateAppearance).badgeTitlePositionAdjustment
                }
            }
        }

        return tabBarItemAppearance
    }
}
