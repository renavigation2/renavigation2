import RenavigationCore

class RNRNavigationBar: UIView, RNRChild, RNRParent {
    var parent: RNRNavigation?

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
    @objc var isTranslucent: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var prefersLargeTitles: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var _isHidden: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var _tintColor: NSNumber? = nil
    @objc var _backgroundColor: NSNumber? = nil
    @objc var barTintColor: NSNumber? = nil
    @objc var titleStyle: NSDictionary? = nil
    @objc var largeTitleStyle: NSDictionary? = nil
    @objc var defaultTitleVerticalPositionAdjustment: CGFloat = 0
    @objc var defaultPromptTitleVerticalPositionAdjustment: CGFloat = 0
    @objc var compactTitleVerticalPositionAdjustment: CGFloat = 0
    @objc var compactPromptTitleVerticalPositionAdjustment: CGFloat = 0

    var hasSetDefaults = false
    var defaultIsTranslucent: Bool?
    var defaultPrefersLargeTitles: Bool?
    var defaultIsHidden: Bool?
    var defaultTintColor: UIColor?
    var defaultBackgroundColor: UIColor?
    var defaultBarTintColor: UIColor?
    var defaultTitleTextAttributes: [NSAttributedString.Key : Any]?
    var defaultLargeTitleTextAttributes: [NSAttributedString.Key : Any]?
    var defaultDefaultTitleVerticalPositionAdjustment: CGFloat?
    var defaultDefaultPromptTitleVerticalPositionAdjustment: CGFloat?
    var defaultCompactTitleVerticalPositionAdjustment: CGFloat?
    var defaultCompactPromptTitleVerticalPositionAdjustment: CGFloat?
    var defaultBackIndicatorImage: UIImage?
    var defaultBackIndicatorTransitionMaskImage: UIImage?
    var defaultShadowImage: UIImage?
    var defaultDefaultBackgroundImage: UIImage?
    var defaultDefaultPromptBackgroundImage: UIImage?
    var defaultCompactBackgroundImage: UIImage?
    var defaultCompactPromptBackgroundImage: UIImage?
    var defaultStandardAppearance: Any?
    var defaultCompactAppearance: Any?
    var defaultScrollEdgeAppearance: Any?

    var changedStandardAppearance = false
    var changedCompactAppearance = false
    var changedScrollEdgeAppearance = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        if !isReady {
            setup()
        } else if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview != nil {
            parent = (newSuperview as! RNRNavigation)
            setup()
        }
    }

    func setup() {
        if reactSubviews() == nil && !hasUpdatedReactSubviews {
            hasUpdatedReactSubviews = true
        }
        if !isReady && hasUpdatedReactSubviews && parent != nil {
            var childrenReady: Bool
            if reactSubviews() == nil {
                childrenReady = true
            } else {
                childrenReady = areChildrenReady(reactSubviews())
            }
            if childrenReady {
                isReady = true
                if !parent!.isReady {
                    setupParent(parent!)
                } else {
                    updateInParent(parent!, subview: self)
                }
            }
        }
    }

    func updateSubview(_ subview: UIView) {
        if isReady && parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if isReady && parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    func setNavigationBar(_ navigationBar: UINavigationBar) {
        if !isReady {
            return
        }

        if !hasSetDefaults {
            hasSetDefaults = true
            defaultIsTranslucent = navigationBar.isTranslucent
            if #available(iOS 11.0, *) {
                defaultPrefersLargeTitles = navigationBar.prefersLargeTitles
            }
            defaultIsHidden = navigationBar.isHidden
            defaultTintColor = navigationBar.tintColor
            defaultBackgroundColor = navigationBar.backgroundColor
            defaultBarTintColor = navigationBar.barTintColor
            defaultTitleTextAttributes = navigationBar.titleTextAttributes
            if #available(iOS 11.0, *) {
                defaultLargeTitleTextAttributes = navigationBar.largeTitleTextAttributes
            }
            defaultDefaultTitleVerticalPositionAdjustment = navigationBar.titleVerticalPositionAdjustment(for: .default)
            defaultDefaultPromptTitleVerticalPositionAdjustment = navigationBar.titleVerticalPositionAdjustment(for: .defaultPrompt)
            defaultCompactTitleVerticalPositionAdjustment = navigationBar.titleVerticalPositionAdjustment(for: .compact)
            defaultCompactPromptTitleVerticalPositionAdjustment = navigationBar.titleVerticalPositionAdjustment(for: .compactPrompt)
            defaultBackIndicatorImage = navigationBar.backIndicatorImage
            defaultBackIndicatorTransitionMaskImage = navigationBar.backIndicatorTransitionMaskImage
            defaultShadowImage = navigationBar.shadowImage
            defaultDefaultBackgroundImage = navigationBar.backgroundImage(for: .default)
            defaultDefaultPromptBackgroundImage = navigationBar.backgroundImage(for: .defaultPrompt)
            defaultCompactBackgroundImage = navigationBar.backgroundImage(for: .compact)
            defaultCompactPromptBackgroundImage = navigationBar.backgroundImage(for: .compactPrompt)
            if #available(iOS 13.0, *) {
                defaultStandardAppearance = navigationBar.standardAppearance
                defaultCompactAppearance = navigationBar.compactAppearance
                defaultScrollEdgeAppearance = navigationBar.scrollEdgeAppearance
            }
        }

        if elementsIndices?["backIndicatorImage"] != nil && elementsIndices?["backIndicatorImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backIndicatorImage"]!] as? RNRImageProtocol {
                navigationBar.backIndicatorImage = subview.getImage()
            }
        } else {
            navigationBar.backIndicatorImage = defaultBackIndicatorImage
        }

        if elementsIndices?["backIndicatorTransitionMaskImage"] != nil && elementsIndices?["backIndicatorTransitionMaskImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backIndicatorTransitionMaskImage"]!] as? RNRImageProtocol {
                navigationBar.backIndicatorTransitionMaskImage = subview.getImage()
            }
        } else {
            navigationBar.backIndicatorTransitionMaskImage = defaultBackIndicatorTransitionMaskImage
        }

        if elementsIndices?["shadowImage"] != nil && elementsIndices?["shadowImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["shadowImage"]!] as? RNRImageProtocol {
                navigationBar.shadowImage = subview.getImage()
            }
        } else {
            navigationBar.shadowImage = defaultShadowImage
        }

        if elementsIndices?["defaultBackgroundImage"] != nil && elementsIndices?["defaultBackgroundImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["defaultBackgroundImage"]!] as? RNRImageProtocol {
                navigationBar.setBackgroundImage(subview.getImage(), for: .default)
            }
        } else {
            navigationBar.setBackgroundImage(defaultDefaultBackgroundImage, for: .default)
        }

        if elementsIndices?["defaultPromptBackgroundImage"] != nil && elementsIndices?["defaultPromptBackgroundImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["defaultPromptBackgroundImage"]!] as? RNRImageProtocol {
                navigationBar.setBackgroundImage(subview.getImage(), for: .defaultPrompt)
            }
        } else {
            navigationBar.setBackgroundImage(defaultDefaultPromptBackgroundImage, for: .defaultPrompt)
        }

        if elementsIndices?["compactBackgroundImage"] != nil && elementsIndices?["compactBackgroundImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["compactBackgroundImage"]!] as? RNRImageProtocol {
                navigationBar.setBackgroundImage(subview.getImage(), for: .compact)
            }
        } else {
            navigationBar.setBackgroundImage(defaultCompactBackgroundImage, for: .compact)
        }

        if elementsIndices?["compactPromptBackgroundImage"] != nil && elementsIndices?["compactPromptBackgroundImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["compactPromptBackgroundImage"]!] as? RNRImageProtocol {
                navigationBar.setBackgroundImage(subview.getImage(), for: .compactPrompt)
            }
        } else {
            navigationBar.setBackgroundImage(defaultCompactPromptBackgroundImage, for: .compactPrompt)
        }

        if #available(iOS 13.0, *) {
            if elementsIndices?["standardAppearance"] != nil && elementsIndices?["standardAppearance"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["standardAppearance"]!] as? RNRNavigationBarAppearance {
                    changedStandardAppearance = true
                    navigationBar.standardAppearance = subview.getNavigationBarAppearance()
                }
            } else {
                changedStandardAppearance = false
                navigationBar.standardAppearance = defaultStandardAppearance! as! UINavigationBarAppearance
            }

            if elementsIndices?["compactAppearance"] != nil && elementsIndices?["compactAppearance"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["compactAppearance"]!] as? RNRNavigationBarAppearance {
                    changedCompactAppearance = true
                    navigationBar.compactAppearance = subview.getNavigationBarAppearance()
                }
            } else {
                changedCompactAppearance = false
                navigationBar.compactAppearance = defaultCompactAppearance as? UINavigationBarAppearance
            }

            if elementsIndices?["scrollEdgeAppearance"] != nil && elementsIndices?["scrollEdgeAppearance"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["scrollEdgeAppearance"]!] as? RNRNavigationBarAppearance {
                    changedScrollEdgeAppearance = true
                    navigationBar.scrollEdgeAppearance = subview.getNavigationBarAppearance()
                }
            } else {
                changedScrollEdgeAppearance = false
                navigationBar.scrollEdgeAppearance = defaultScrollEdgeAppearance as? UINavigationBarAppearance
            }
        }

        if isTranslucent == -1 {
            navigationBar.isTranslucent = false
        } else if isTranslucent == 1 {
            navigationBar.isTranslucent = true
        } else {
            navigationBar.isTranslucent = defaultIsTranslucent != nil ? defaultIsTranslucent! : true
        }

        if #available(iOS 11.0, *) {
            if prefersLargeTitles == -1 {
                navigationBar.prefersLargeTitles = false
            } else if prefersLargeTitles == 1 {
                navigationBar.prefersLargeTitles = true
            } else {
                navigationBar.prefersLargeTitles = defaultPrefersLargeTitles != nil ? defaultPrefersLargeTitles! : false
            }
        }

        if _isHidden == -1 {
            navigationBar.isHidden = false
        } else if _isHidden == 1 {
            navigationBar.isHidden = true
        } else {
            navigationBar.isHidden = defaultIsHidden != nil ? defaultIsHidden! : false
        }

        if _tintColor != nil {
            navigationBar.tintColor = RCTConvert.uiColor(_tintColor)
        } else {
            navigationBar.tintColor = defaultTintColor
        }

        if _backgroundColor != nil {
            navigationBar.backgroundColor = RCTConvert.uiColor(_backgroundColor)
        } else {
            navigationBar.backgroundColor = defaultBackgroundColor
        }

        if barTintColor != nil {
            navigationBar.barTintColor = RCTConvert.uiColor(barTintColor)
        } else {
            navigationBar.barTintColor = defaultBarTintColor
        }

        if titleStyle != nil {
            navigationBar.titleTextAttributes = RNRTextStyle.getStyles(titleStyle!, defaultFontSize: 17, defaultFontWeight: "bold")
        } else {
            navigationBar.titleTextAttributes = defaultTitleTextAttributes
        }

        if #available(iOS 11.0, *) {
            if largeTitleStyle != nil {
                navigationBar.largeTitleTextAttributes = RNRTextStyle.getStyles(largeTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold")
            } else {
                navigationBar.largeTitleTextAttributes = defaultLargeTitleTextAttributes
            }
        }

        if defaultTitleVerticalPositionAdjustment != 0 {
            navigationBar.setTitleVerticalPositionAdjustment(defaultTitleVerticalPositionAdjustment, for: UIBarMetrics.default)
        } else {
            navigationBar.setTitleVerticalPositionAdjustment(defaultDefaultTitleVerticalPositionAdjustment ?? 0, for: UIBarMetrics.default)
        }

        if defaultPromptTitleVerticalPositionAdjustment != 0 {
            navigationBar.setTitleVerticalPositionAdjustment(defaultPromptTitleVerticalPositionAdjustment, for: UIBarMetrics.defaultPrompt)
        } else {
            navigationBar.setTitleVerticalPositionAdjustment(defaultDefaultPromptTitleVerticalPositionAdjustment ?? 0, for: UIBarMetrics.defaultPrompt)
        }

        if compactTitleVerticalPositionAdjustment != 0 {
            navigationBar.setTitleVerticalPositionAdjustment(compactTitleVerticalPositionAdjustment, for: UIBarMetrics.compact)
        } else {
            navigationBar.setTitleVerticalPositionAdjustment(defaultCompactTitleVerticalPositionAdjustment ?? 0, for: UIBarMetrics.compact)
        }

        if compactPromptTitleVerticalPositionAdjustment != 0 {
            navigationBar.setTitleVerticalPositionAdjustment(compactPromptTitleVerticalPositionAdjustment, for: UIBarMetrics.compactPrompt)
        } else {
            navigationBar.setTitleVerticalPositionAdjustment(defaultCompactPromptTitleVerticalPositionAdjustment ?? 0, for: UIBarMetrics.compactPrompt)
        }
    }
}
