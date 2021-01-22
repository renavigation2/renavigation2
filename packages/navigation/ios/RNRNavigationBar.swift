import RenavigationCore

class RNRNavigationBar: UIView, RNRChild, RNRParent {
    var parent: RNRNavigation?

    var isReady = false
    var hasUpdatedReactSubviews = false

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
        self.isHidden = true
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
        if !isReady && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady(reactSubviews())
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

        reactSubviews().enumerated().forEach { (index, subview) in
            if index == 0 { // backIndicatorImage
                if subview is RNRImageProtocol {
                    navigationBar.backIndicatorImage = (subview as! RNRImageProtocol).getImage()
                } else {
                    navigationBar.backIndicatorImage = defaultBackIndicatorImage
                }
            } else if index == 1 { // backIndicatorTransitionMaskImage
                if subview is RNRImageProtocol {
                    navigationBar.backIndicatorTransitionMaskImage = (subview as! RNRImageProtocol).getImage()
                } else {
                    navigationBar.backIndicatorTransitionMaskImage = defaultBackIndicatorTransitionMaskImage
                }
            } else if index == 2 { // shadowImage
                if subview is RNRImageProtocol {
                    navigationBar.shadowImage = (subview as! RNRImageProtocol).getImage()
                } else {
                    navigationBar.shadowImage = defaultShadowImage
                }
            } else if index == 3 { // defaultBackgroundImage
                if subview is RNRImageProtocol {
                    navigationBar.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .default)
                } else {
                    navigationBar.setBackgroundImage(defaultDefaultBackgroundImage, for: .default)
                }
            } else if index == 4 { // defaultPromptBackgroundImage
                if subview is RNRImageProtocol {
                    navigationBar.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .defaultPrompt)
                } else {
                    navigationBar.setBackgroundImage(defaultDefaultPromptBackgroundImage, for: .defaultPrompt)
                }
            } else if index == 5 { // compactBackgroundImage
                if subview is RNRImageProtocol {
                    navigationBar.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .compact)
                } else {
                    navigationBar.setBackgroundImage(defaultCompactBackgroundImage, for: .compact)
                }
            } else if index == 6 { // compactPromptBackgroundImage
                if subview is RNRImageProtocol {
                    navigationBar.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .compactPrompt)
                } else {
                    navigationBar.setBackgroundImage(defaultCompactPromptBackgroundImage, for: .compactPrompt)
                }
            } else if index == 7 { // standardAppearance
                if #available(iOS 13.0, *) {
                    if subview is RNRNavigationBarAppearance {
                        changedStandardAppearance = true
                        navigationBar.standardAppearance = (subview as! RNRNavigationBarAppearance).getNavigationBarAppearance()
                    } else if changedStandardAppearance {
                        changedStandardAppearance = false
                        navigationBar.standardAppearance = defaultStandardAppearance! as! UINavigationBarAppearance
                    }
                }
            } else if index == 8 { // compactAppearance
                if #available(iOS 13.0, *) {
                    if subview is RNRNavigationBarAppearance {
                        changedCompactAppearance = true
                        navigationBar.compactAppearance = (subview as! RNRNavigationBarAppearance).getNavigationBarAppearance()
                    } else if changedCompactAppearance {
                        changedCompactAppearance = false
                        navigationBar.compactAppearance = defaultCompactAppearance as? UINavigationBarAppearance
                    }
                }
            } else if index == 8 { // scrollEdgeAppearance
                if #available(iOS 13.0, *) {
                    if subview is RNRNavigationBarAppearance {
                        changedScrollEdgeAppearance = true
                        navigationBar.scrollEdgeAppearance = (subview as! RNRNavigationBarAppearance).getNavigationBarAppearance()
                    } else if changedScrollEdgeAppearance {
                        changedScrollEdgeAppearance = false
                        navigationBar.scrollEdgeAppearance = defaultScrollEdgeAppearance as? UINavigationBarAppearance
                    }
                }
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
