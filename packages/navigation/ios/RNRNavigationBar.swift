class RNRNavigationBar: UIView {
    var _subviews: [UIView] = []
    var navigationController: UINavigationController?

    @objc var isTranslucent: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var prefersLargeTitles: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var customHidden: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var customTintColor: UIColor? = nil
    @objc var barTintColor: UIColor? = nil
    @objc var titleStyle: NSDictionary? = nil
    @objc var largeTitleStyle: NSDictionary? = nil
    @objc var defaultTitleVerticalPositionAdjustment: CGFloat = 0
    @objc var defaultPromptTitleVerticalPositionAdjustment: CGFloat = 0
    @objc var compactTitleVerticalPositionAdjustment: CGFloat = 0
    @objc var compactPromptTitleVerticalPositionAdjustment: CGFloat = 0
    @objc var backIndicatorImage: UIImage? = nil
    @objc var backIndicatorTransitionMaskImage: UIImage? = nil
    @objc var shadowImage: UIImage? = nil
    @objc var defaultBackgroundImage: UIImage? = nil
    @objc var defaultPromptBackgroundImage: UIImage? = nil
    @objc var compactBackgroundImage: UIImage? = nil
    @objc var compactPromptBackgroundImage: UIImage? = nil
    @objc var standardAppearance: NSDictionary? = nil
    @objc var compactAppearance: NSDictionary? = nil
    @objc var scrollEdgeAppearance: NSDictionary? = nil

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        super.insertReactSubview(subview, at: atIndex)
        _subviews.insert(subview, at: atIndex)
    }

    func _insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        navigationController!.navigationBar.insertSubview(subview, at: atIndex)
    }

    override func removeReactSubview(_ subview: UIView!) {
        super.removeReactSubview(subview)
        subview.removeFromSuperview()
        _subviews.removeAll(where: { $0 == subview })
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        if navigationController != nil {
            for (index, subview) in _subviews.enumerated() {
                _insertReactSubview(subview, at: index)
            }
        }
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if superview is RNRNavigation {
            navigationController = (superview as! RNRNavigation).navigationController
            let navigationBar = navigationController!.navigationBar

            if isTranslucent == -1 {
                navigationBar.isTranslucent = false
            } else if isTranslucent == 1 {
                navigationBar.isTranslucent = true
            }
            if #available(iOS 11.0, *) {
                if prefersLargeTitles == -1 {
                    navigationBar.prefersLargeTitles = false
                } else if prefersLargeTitles == 1 {
                    navigationBar.prefersLargeTitles = true
                }
            }
            if customHidden == -1 {
                navigationBar.isHidden = false
            } else if customHidden == 1 {
                navigationBar.isHidden = true
            }
            if customTintColor != nil {
                navigationBar.tintColor = customTintColor
            }
            if barTintColor != nil {
                navigationBar.barTintColor = barTintColor
            }
            if titleStyle != nil {
                navigationBar.titleTextAttributes = RNRNavigationTextStyle.getStyles(titleStyle!, defaultFontSize: 17, defaultFontWeight: "bold")
            }
            if largeTitleStyle != nil {
                if #available(iOS 11.0, *) {
                    navigationBar.largeTitleTextAttributes = RNRNavigationTextStyle.getStyles(largeTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold")
                }
            }
            if defaultTitleVerticalPositionAdjustment != 0 {
                navigationBar.setTitleVerticalPositionAdjustment(defaultTitleVerticalPositionAdjustment, for: UIBarMetrics.default)
            }
            if defaultPromptTitleVerticalPositionAdjustment != 0 {
                navigationBar.setTitleVerticalPositionAdjustment(defaultPromptTitleVerticalPositionAdjustment, for: UIBarMetrics.defaultPrompt)
            }
            if compactTitleVerticalPositionAdjustment != 0 {
                navigationBar.setTitleVerticalPositionAdjustment(compactTitleVerticalPositionAdjustment, for: UIBarMetrics.compact)
            }
            if compactPromptTitleVerticalPositionAdjustment != 0 {
                navigationBar.setTitleVerticalPositionAdjustment(compactPromptTitleVerticalPositionAdjustment, for: UIBarMetrics.compactPrompt)
            }
            if backIndicatorImage != nil {
                navigationBar.backIndicatorImage = backIndicatorImage
            }
            if backIndicatorTransitionMaskImage != nil {
                navigationBar.backIndicatorTransitionMaskImage = backIndicatorTransitionMaskImage
            }
            if shadowImage != nil {
                navigationBar.shadowImage = shadowImage
            }
            if defaultBackgroundImage != nil {
                navigationBar.setBackgroundImage(defaultBackgroundImage, for: UIBarMetrics.default)
            }
            if defaultPromptBackgroundImage != nil {
                navigationBar.setBackgroundImage(defaultPromptBackgroundImage, for: UIBarMetrics.defaultPrompt)
            }
            if compactBackgroundImage != nil {
                navigationBar.setBackgroundImage(compactBackgroundImage, for: UIBarMetrics.compact)
            }
            if compactPromptBackgroundImage != nil {
                navigationBar.setBackgroundImage(compactPromptBackgroundImage, for: UIBarMetrics.compactPrompt)
            }
            if standardAppearance != nil {
                if #available(iOS 13.0, *) {
                    navigationBar.standardAppearance = RNRNavigationBarAppearance.getBarAppearance(standardAppearance!)
                }
            }
            if compactAppearance != nil {
                if #available(iOS 13.0, *) {
                    navigationBar.compactAppearance = RNRNavigationBarAppearance.getBarAppearance(compactAppearance!)
                }
            }
            if scrollEdgeAppearance != nil {
                if #available(iOS 13.0, *) {
                    navigationBar.scrollEdgeAppearance = RNRNavigationBarAppearance.getBarAppearance(scrollEdgeAppearance!)
                }
            }

            for (index, subview) in _subviews.enumerated() {
                _insertReactSubview(subview, at: index)
            }
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        if navigationController != nil {
            let navigationBar = navigationController!.navigationBar
            changedProps.forEach({ key in
                if key == "isTranslucent" {
                    if isTranslucent == -1 {
                        navigationBar.isTranslucent = false
                    } else if isTranslucent == 1 {
                        navigationBar.isTranslucent = true
                    } else {
                        navigationBar.isTranslucent = false
                    }
                } else if key == "prefersLargeTitles" {
                    if #available(iOS 11.0, *) {
                        if prefersLargeTitles == -1 {
                            navigationBar.prefersLargeTitles = false
                        } else if prefersLargeTitles == 1 {
                            navigationBar.prefersLargeTitles = true
                        } else {
                            navigationBar.prefersLargeTitles = false
                        }
                    }
                } else if key == "customHidden" {
                    if #available(iOS 11.0, *) {
                        if customHidden == -1 {
                            navigationBar.isHidden = false
                        } else if customHidden == 1 {
                            navigationBar.isHidden = true
                        } else {
                            navigationBar.isHidden = false
                        }
                    }
                } else if key == "customTintColor" {
                    navigationBar.tintColor = customTintColor
                } else if key == "barTintColor" {
                    navigationBar.barTintColor = barTintColor
                } else if key == "titleStyle" {
                    if titleStyle != nil {
                        navigationBar.titleTextAttributes = RNRNavigationTextStyle.getStyles(titleStyle!, defaultFontSize: 17)
                    } else {
                        navigationBar.titleTextAttributes = nil
                    }
                } else if key == "largeTitleStyle" {
                    if #available(iOS 11.0, *) {
                        if largeTitleStyle != nil {
                            navigationBar.largeTitleTextAttributes = RNRNavigationTextStyle.getStyles(largeTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold")
                        } else {
                        navigationBar.largeTitleTextAttributes = nil
                        }
                    }
                } else if key == "defaultTitleVerticalPositionAdjustment" {
                    navigationBar.setTitleVerticalPositionAdjustment(defaultTitleVerticalPositionAdjustment, for: UIBarMetrics.default)
                } else if key == "defaultPromptTitleVerticalPositionAdjustment" {
                    navigationBar.setTitleVerticalPositionAdjustment(defaultPromptTitleVerticalPositionAdjustment, for: UIBarMetrics.defaultPrompt)
                } else if key == "compactTitleVerticalPositionAdjustment" {
                    navigationBar.setTitleVerticalPositionAdjustment(compactTitleVerticalPositionAdjustment, for: UIBarMetrics.compact)
                } else if key == "compactPromptTitleVerticalPositionAdjustment" {
                    navigationBar.setTitleVerticalPositionAdjustment(compactPromptTitleVerticalPositionAdjustment, for: UIBarMetrics.compactPrompt)
                } else if key == "backIndicatorImage" {
                    navigationBar.backIndicatorImage = backIndicatorImage
                } else if key == "backIndicatorTransitionMaskImage" {
                    navigationBar.backIndicatorTransitionMaskImage = backIndicatorTransitionMaskImage
                } else if key == "shadowImage" {
                    navigationBar.shadowImage = shadowImage
                } else if key == "defaultBackgroundImage" {
                    navigationBar.setBackgroundImage(defaultBackgroundImage, for: UIBarMetrics.default)
                } else if key == "defaultPromptBackgroundImage" {
                    navigationBar.setBackgroundImage(defaultPromptBackgroundImage, for: UIBarMetrics.defaultPrompt)
                } else if key == "compactBackgroundImage" {
                    navigationBar.setBackgroundImage(compactBackgroundImage, for: UIBarMetrics.compact)
                } else if key == "compactPromptBackgroundImage" {
                    navigationBar.setBackgroundImage(compactPromptBackgroundImage, for: UIBarMetrics.compactPrompt)
                } else if key == "standardAppearance" {
                    if #available(iOS 13.0, *) {
                        if standardAppearance != nil {
                            navigationBar.standardAppearance = RNRNavigationBarAppearance.getBarAppearance(standardAppearance!)
                        } else {
                            navigationBar.standardAppearance = UINavigationBarAppearance()
                        }
                    }
                } else if key == "compactAppearance" {
                    if #available(iOS 13.0, *) {
                        if compactAppearance != nil {
                            navigationBar.compactAppearance = RNRNavigationBarAppearance.getBarAppearance(compactAppearance!)
                        } else {
                            navigationBar.compactAppearance = UINavigationBarAppearance()
                        }
                    }
                } else if key == "scrollEdgeAppearance" {
                    if #available(iOS 13.0, *) {
                        if scrollEdgeAppearance != nil {
                            navigationBar.scrollEdgeAppearance = RNRNavigationBarAppearance.getBarAppearance(scrollEdgeAppearance!)
                        } else {
                            navigationBar.scrollEdgeAppearance = UINavigationBarAppearance()
                        }
                    }
                }
            })
        }
    }
}
