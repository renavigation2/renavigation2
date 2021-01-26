class RNRBarButtonItem: UIView, RNRChild, RNRParent, RNRBarButtonItemProtocol {
    var parent: RNRParent?
    var barButtonItem: UIBarButtonItem = UIBarButtonItem()

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
    @objc var hasPrompt: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var fixedSpace: NSNumber?
    @objc var flexibleSpace: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var isEnabled: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var title: String?
    @objc var imageInsets: NSDictionary?
    @objc var landscapeImagePhoneInsets: NSDictionary?
    @objc var largeContentSizeImageInsets: NSDictionary?
    @objc var titleStyle: NSDictionary?
    @objc var titleStyleFocused: NSDictionary?
    @objc var titleStyleDisabled: NSDictionary?
    @objc var titleStyleHighlighted: NSDictionary?
    @objc var _style: String?
    @objc var width: NSNumber?
    @objc var possibleTitles: NSArray?
    @objc var _tintColor: NSNumber?
    @objc var backgroundVerticalPositionAdjustment: NSNumber?
    @objc var backgroundVerticalPositionAdjustmentCompact: NSNumber?
    @objc var backgroundVerticalPositionAdjustmentDefaultPrompt: NSNumber?
    @objc var backgroundVerticalPositionAdjustmentCompactPrompt: NSNumber?
    @objc var titlePositionAdjustment: NSDictionary?
    @objc var titlePositionAdjustmentCompact: NSDictionary?
    @objc var titlePositionAdjustmentDefaultPrompt: NSDictionary?
    @objc var titlePositionAdjustmentCompactPrompt: NSDictionary?
    @objc var backButtonTitlePositionAdjustment: NSDictionary?
    @objc var backButtonTitlePositionAdjustmentCompact: NSDictionary?
    @objc var backButtonTitlePositionAdjustmentDefaultPrompt: NSDictionary?
    @objc var backButtonTitlePositionAdjustmentCompactPrompt: NSDictionary?
    @objc var backButtonBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var backButtonBackgroundVerticalPositionAdjustmentCompact: NSNumber?
    @objc var backButtonBackgroundVerticalPositionAdjustmentDefaultPrompt: NSNumber?
    @objc var backButtonBackgroundVerticalPositionAdjustmentCompactPrompt: NSNumber?

    var hasSetDefaults = false
    var hasSetPromptDefaults = false
    var defaultIsEnabled: Bool?
    var defaultTitle: String?
    var defaultImageInsets: UIEdgeInsets?
    var defaultLandscapeImagePhoneInsets: UIEdgeInsets?
    var defaultLargeContentSizeImageInsets: UIEdgeInsets?
    var defaultTitleStyle: [NSAttributedString.Key : Any]?
    var defaultTitleStyleFocused: [NSAttributedString.Key : Any]?
    var defaultTitleStyleDisabled: [NSAttributedString.Key : Any]?
    var defaultTitleStyleHighlighted: [NSAttributedString.Key : Any]?
    var defaultStyle: UIBarButtonItem.Style?
    var defaultWidth: CGFloat?
    var defaultPossibleTitles: Set<String>?
    var defaultTintColor: UIColor?
    var defaultBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultBackgroundVerticalPositionAdjustmentCompact: CGFloat?
    var defaultBackgroundVerticalPositionAdjustmentDefaultPrompt: CGFloat?
    var defaultBackgroundVerticalPositionAdjustmentCompactPrompt: CGFloat?
    var defaultTitlePositionAdjustment: UIOffset?
    var defaultTitlePositionAdjustmentCompact: UIOffset?
    var defaultTitlePositionAdjustmentDefaultPrompt: UIOffset?
    var defaultTitlePositionAdjustmentCompactPrompt: UIOffset?
    var defaultBackButtonTitlePositionAdjustment: UIOffset?
    var defaultBackButtonTitlePositionAdjustmentCompact: UIOffset?
    var defaultBackButtonTitlePositionAdjustmentDefaultPrompt: UIOffset?
    var defaultBackButtonTitlePositionAdjustmentCompactPrompt: UIOffset?
    var defaultBackButtonBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultBackButtonBackgroundVerticalPositionAdjustmentCompact: CGFloat?
    var defaultBackButtonBackgroundVerticalPositionAdjustmentDefaultPrompt: CGFloat?
    var defaultBackButtonBackgroundVerticalPositionAdjustmentCompactPrompt: CGFloat?

    var currentFixedSpace: NSNumber? = nil
    var currentFlexibleSpace: Bool? = nil

    @objc var configure: String?

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
            parent = (newSuperview as! RNRParent)
            setup()
        }
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady(subviews)
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
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    func getBarButtonItem() -> UIBarButtonItem {
        if !hasSetDefaults {
            hasSetDefaults = true
            defaultIsEnabled = barButtonItem.isEnabled
            defaultTitle = barButtonItem.title
            defaultImageInsets = barButtonItem.imageInsets
            defaultLandscapeImagePhoneInsets = barButtonItem.landscapeImagePhoneInsets
            if #available(iOS 11.0, *) {
                defaultLargeContentSizeImageInsets = barButtonItem.largeContentSizeImageInsets
            }
            defaultTitleStyle = barButtonItem.titleTextAttributes(for: .normal)
            defaultTitleStyleFocused = barButtonItem.titleTextAttributes(for: .focused)
            defaultTitleStyleDisabled = barButtonItem.titleTextAttributes(for: .disabled)
            defaultTitleStyleHighlighted = barButtonItem.titleTextAttributes(for: .highlighted)
            defaultStyle = barButtonItem.style
            defaultWidth = barButtonItem.width
            defaultPossibleTitles = barButtonItem.possibleTitles
            defaultTintColor = barButtonItem.tintColor

            defaultBackgroundVerticalPositionAdjustment = barButtonItem.backgroundVerticalPositionAdjustment(for: .default)
            defaultBackgroundVerticalPositionAdjustmentCompact = barButtonItem.backgroundVerticalPositionAdjustment(for: .compact)
            defaultTitlePositionAdjustment = barButtonItem.titlePositionAdjustment(for: .default)
            defaultTitlePositionAdjustmentCompact = barButtonItem.titlePositionAdjustment(for: .compact)
            defaultBackButtonTitlePositionAdjustment = barButtonItem.backButtonTitlePositionAdjustment(for: .default)
            defaultBackButtonTitlePositionAdjustmentCompact = barButtonItem.backButtonTitlePositionAdjustment(for: .compact)
            defaultBackButtonBackgroundVerticalPositionAdjustment = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .default)
            defaultBackButtonBackgroundVerticalPositionAdjustmentCompact = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .compact)
        }

        if hasPrompt == 1 && !hasSetPromptDefaults {
            hasSetPromptDefaults = true
            defaultBackgroundVerticalPositionAdjustmentDefaultPrompt = barButtonItem.backgroundVerticalPositionAdjustment(for: .defaultPrompt)
            defaultBackgroundVerticalPositionAdjustmentCompactPrompt = barButtonItem.backgroundVerticalPositionAdjustment(for: .compactPrompt)
            defaultTitlePositionAdjustmentDefaultPrompt = barButtonItem.titlePositionAdjustment(for: .defaultPrompt)
            defaultTitlePositionAdjustmentCompactPrompt = barButtonItem.titlePositionAdjustment(for: .compactPrompt)
            defaultBackButtonTitlePositionAdjustmentDefaultPrompt = barButtonItem.backButtonTitlePositionAdjustment(for: .defaultPrompt)
            defaultBackButtonTitlePositionAdjustmentCompactPrompt = barButtonItem.backButtonTitlePositionAdjustment(for: .compactPrompt)
            defaultBackButtonBackgroundVerticalPositionAdjustmentDefaultPrompt = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .defaultPrompt)
            defaultBackButtonBackgroundVerticalPositionAdjustmentCompactPrompt = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .compactPrompt)
        }

        if #available(iOS 14.0, *) {
            if fixedSpace != nil {
                if fixedSpace != currentFixedSpace {
                    currentFixedSpace = fixedSpace
                    barButtonItem = UIBarButtonItem.fixedSpace(fixedSpace as! CGFloat)
                }
            } else if currentFixedSpace != nil {
                currentFixedSpace = nil
                barButtonItem = UIBarButtonItem()
            }
        }

        if #available(iOS 14.0, *) {
            if flexibleSpace == 1 {
                if currentFlexibleSpace == nil || currentFlexibleSpace == false {
                    currentFlexibleSpace = true
                    barButtonItem = UIBarButtonItem.flexibleSpace()
                }
            } else {
                if currentFlexibleSpace == true && fixedSpace == nil {
                    currentFlexibleSpace = false
                    barButtonItem = UIBarButtonItem()
                }
            }
        }

        if isEnabled == 1 {
            barButtonItem.isEnabled = true
        } else if isEnabled == -1 {
            barButtonItem.isEnabled = false
        } else {
            barButtonItem.isEnabled = defaultIsEnabled!
        }

        if title != nil {
            barButtonItem.title = title
        } else {
            barButtonItem.title = defaultTitle
        }

        if imageInsets != nil {
            barButtonItem.imageInsets = RNREdgeInsets.getEdgeInsets(imageInsets!) ?? defaultImageInsets!
        } else {
            barButtonItem.imageInsets = defaultImageInsets!
        }

        if landscapeImagePhoneInsets != nil {
            barButtonItem.landscapeImagePhoneInsets = RNREdgeInsets.getEdgeInsets(landscapeImagePhoneInsets!) ?? defaultLandscapeImagePhoneInsets!
        } else {
            barButtonItem.landscapeImagePhoneInsets = defaultLandscapeImagePhoneInsets!
        }

        if #available(iOS 11.0, *) {
            if largeContentSizeImageInsets != nil {
                barButtonItem.largeContentSizeImageInsets = RNREdgeInsets.getEdgeInsets(largeContentSizeImageInsets!) ?? defaultLargeContentSizeImageInsets!
            } else {
                barButtonItem.largeContentSizeImageInsets = defaultLargeContentSizeImageInsets!
            }
        }

        if titleStyle != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(titleStyle!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .normal)
        } else {
            barButtonItem.setTitleTextAttributes(defaultTitleStyle, for: .normal)
        }

        if titleStyleFocused != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(titleStyleFocused!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .focused)
        } else {
            barButtonItem.setTitleTextAttributes(defaultTitleStyleFocused, for: .focused)
        }

        if titleStyleDisabled != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(titleStyleDisabled!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .disabled)
        } else {
            barButtonItem.setTitleTextAttributes(defaultTitleStyleDisabled, for: .disabled)
        }

        if titleStyleHighlighted != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(titleStyleHighlighted!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .highlighted)
        } else {
            barButtonItem.setTitleTextAttributes(defaultTitleStyleHighlighted, for: .highlighted)
        }

        if _style == "plain" {
            barButtonItem.style = .plain
        } else if _style == "done" {
            barButtonItem.style = .done
        } else {
            barButtonItem.style = defaultStyle!
        }

        if width != nil {
            barButtonItem.width = width as! CGFloat
        } else {
            barButtonItem.width = defaultWidth!
        }

        if possibleTitles != nil {
            barButtonItem.possibleTitles = Set(possibleTitles as! [String])
        } else {
            barButtonItem.possibleTitles = defaultPossibleTitles
        }

        if _tintColor != nil {
            barButtonItem.tintColor = RCTConvert.uiColor(_tintColor)
        } else {
            barButtonItem.tintColor = defaultTintColor
        }

        if backgroundVerticalPositionAdjustment != nil {
            barButtonItem.setBackgroundVerticalPositionAdjustment(backgroundVerticalPositionAdjustment as! CGFloat, for: .default)
        } else {
            barButtonItem.setBackgroundVerticalPositionAdjustment(defaultBackgroundVerticalPositionAdjustment!, for: .default)
        }

        if backgroundVerticalPositionAdjustmentCompact != nil {
            barButtonItem.setBackgroundVerticalPositionAdjustment(backgroundVerticalPositionAdjustmentCompact as! CGFloat, for: .compact)
        } else {
            barButtonItem.setBackgroundVerticalPositionAdjustment(defaultBackgroundVerticalPositionAdjustmentCompact!, for: .compact)
        }

        if hasPrompt == 1 {
            if backgroundVerticalPositionAdjustmentDefaultPrompt != nil {
                barButtonItem.setBackgroundVerticalPositionAdjustment(backgroundVerticalPositionAdjustmentDefaultPrompt as! CGFloat, for: .defaultPrompt)
            } else {
                barButtonItem.setBackgroundVerticalPositionAdjustment(defaultBackgroundVerticalPositionAdjustmentDefaultPrompt!, for: .defaultPrompt)
            }

            if backgroundVerticalPositionAdjustmentCompactPrompt != nil {
                barButtonItem.setBackgroundVerticalPositionAdjustment(backgroundVerticalPositionAdjustmentCompactPrompt as! CGFloat, for: .compactPrompt)
            } else {
                barButtonItem.setBackgroundVerticalPositionAdjustment(defaultBackgroundVerticalPositionAdjustmentCompactPrompt!, for: .compactPrompt)
            }
        }

        if titlePositionAdjustment != nil {
            barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(titlePositionAdjustment!) ?? defaultTitlePositionAdjustment!, for: .default)
        } else {
            barButtonItem.setTitlePositionAdjustment(defaultTitlePositionAdjustment!, for: .default)
        }

        if titlePositionAdjustmentCompact != nil {
            barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(titlePositionAdjustmentCompact!) ?? defaultTitlePositionAdjustmentCompact!, for: .compact)
        } else {
            barButtonItem.setTitlePositionAdjustment(defaultTitlePositionAdjustmentCompact!, for: .compact)
        }

        if hasPrompt == 1 {
            if titlePositionAdjustmentDefaultPrompt != nil {
                barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(titlePositionAdjustmentDefaultPrompt!) ?? defaultTitlePositionAdjustmentDefaultPrompt!, for: .defaultPrompt)
            } else {
                barButtonItem.setTitlePositionAdjustment(defaultTitlePositionAdjustmentDefaultPrompt!, for: .defaultPrompt)
            }

            if titlePositionAdjustmentCompactPrompt != nil {
                barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(titlePositionAdjustmentCompactPrompt!) ?? defaultTitlePositionAdjustmentCompactPrompt!, for: .compactPrompt)
            } else {
                barButtonItem.setTitlePositionAdjustment(defaultTitlePositionAdjustmentCompactPrompt!, for: .compactPrompt)
            }
        }

        if backButtonTitlePositionAdjustment != nil {
            barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(backButtonTitlePositionAdjustment!) ?? defaultBackButtonTitlePositionAdjustment!, for: .default)
        } else {
            barButtonItem.setBackButtonTitlePositionAdjustment(defaultBackButtonTitlePositionAdjustment!, for: .default)
        }

        if backButtonTitlePositionAdjustmentCompact != nil {
            barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(backButtonTitlePositionAdjustmentCompact!) ?? defaultBackButtonTitlePositionAdjustment!, for: .compact)
        } else {
            barButtonItem.setBackButtonTitlePositionAdjustment(defaultBackButtonTitlePositionAdjustment!, for: .compact)
        }

        if hasPrompt == 1 {
            if backButtonTitlePositionAdjustmentDefaultPrompt != nil {
                barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(backButtonTitlePositionAdjustmentDefaultPrompt!) ?? defaultBackButtonTitlePositionAdjustmentDefaultPrompt!, for: .defaultPrompt)
            } else {
                barButtonItem.setBackButtonTitlePositionAdjustment(defaultBackButtonTitlePositionAdjustmentDefaultPrompt!, for: .defaultPrompt)
            }

            if backButtonTitlePositionAdjustmentCompactPrompt != nil {
                barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(backButtonTitlePositionAdjustmentCompactPrompt!) ?? defaultBackButtonTitlePositionAdjustmentCompactPrompt!, for: .compactPrompt)
            } else {
                barButtonItem.setBackButtonTitlePositionAdjustment(defaultBackButtonTitlePositionAdjustmentCompactPrompt!, for: .compactPrompt)
            }
        }

        if backButtonBackgroundVerticalPositionAdjustment != nil {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(backButtonBackgroundVerticalPositionAdjustment as! CGFloat, for: .default)
        } else {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultBackButtonBackgroundVerticalPositionAdjustment!, for: .default)
        }

        if backButtonBackgroundVerticalPositionAdjustmentCompact != nil {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(backButtonBackgroundVerticalPositionAdjustmentCompact as! CGFloat, for: .compact)
        } else {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultBackButtonBackgroundVerticalPositionAdjustmentCompact!, for: .compact)
        }

        if hasPrompt == 1 {
            if backButtonBackgroundVerticalPositionAdjustmentDefaultPrompt != nil {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(backButtonBackgroundVerticalPositionAdjustmentDefaultPrompt as! CGFloat, for: .defaultPrompt)
            } else {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultBackButtonBackgroundVerticalPositionAdjustmentDefaultPrompt!, for: .defaultPrompt)
            }

            if backButtonBackgroundVerticalPositionAdjustmentCompactPrompt != nil {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(backButtonBackgroundVerticalPositionAdjustmentCompactPrompt as! CGFloat, for: .compactPrompt)
            } else {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultBackButtonBackgroundVerticalPositionAdjustmentCompactPrompt!, for: .compactPrompt)
            }
        }

        if #available(iOS 14.0, *) {
            if elementsIndices?["primaryAction"] != nil && elementsIndices?["primaryAction"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["primaryAction"]!] as? RNRActionProtocol {
                    barButtonItem.primaryAction = subview.getAction()
                }
            } else {
                barButtonItem.primaryAction = nil
            }

            if elementsIndices?["menu"] != nil && elementsIndices?["menu"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["menu"]!] as? RNRMenuProtocol {
                    barButtonItem.menu = subview.getMenu()
                }
            } else {
                barButtonItem.menu = nil
            }
        }

        if elementsIndices?["image"] != nil && elementsIndices?["image"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["image"]!] as? RNRImageProtocol {
                barButtonItem.image = subview.getImage()
            }
        } else {
            barButtonItem.image = nil
        }

        if elementsIndices?["landscapeImagePhone"] != nil && elementsIndices?["landscapeImagePhone"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["landscapeImagePhone"]!] as? RNRImageProtocol {
                barButtonItem.landscapeImagePhone = subview.getImage()
            }
        } else {
            barButtonItem.landscapeImagePhone = nil
        }

        if #available(iOS 11.0, *) {
            if elementsIndices?["largeContentSizeImage"] != nil && elementsIndices?["largeContentSizeImage"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["largeContentSizeImage"]!] as? RNRImageProtocol {
                    barButtonItem.largeContentSizeImage = subview.getImage()
                }
            } else {
                barButtonItem.largeContentSizeImage = nil
            }
        }

        setBackButtonBackgroundImage("backButtonBackgroundImage", for: .normal, barMetrics: .default)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompact", for: .normal, barMetrics: .compact)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompactDisabled", for: .disabled, barMetrics: .compact)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompactFocused", for: .focused, barMetrics: .compact)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompactHighlighted", for: .highlighted, barMetrics: .compact)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompactPrompt", for: .normal, barMetrics: .compactPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompactPromptDisabled", for: .disabled, barMetrics: .compactPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompactPromptFocused", for: .focused, barMetrics: .compactPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageCompactPromptHighlighted", for: .highlighted, barMetrics: .compactPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageDefaultPrompt", for: .normal, barMetrics: .defaultPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageDefaultPromptDisabled", for: .disabled, barMetrics: .defaultPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageDefaultPromptFocused", for: .focused, barMetrics: .defaultPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageDefaultPromptHighlighted", for: .highlighted, barMetrics: .defaultPrompt)
        setBackButtonBackgroundImage("backButtonBackgroundImageDisabled", for: .disabled, barMetrics: .default)
        setBackButtonBackgroundImage("backButtonBackgroundImageFocused", for: .focused, barMetrics: .default)
        setBackButtonBackgroundImage("backButtonBackgroundImageHighlighted", for: .highlighted, barMetrics: .default)

        setBackgroundImage("backgroundImage", for: .normal, barMetrics: .default)
        setBackgroundImage("backgroundImageCompact", for: .normal, barMetrics: .compact)
        setBackgroundImage("backgroundImageCompactDisabled", for: .disabled, barMetrics: .compact)
        setBackgroundImage("backgroundImageCompactFocused", for: .focused, barMetrics: .compact)
        setBackgroundImage("backgroundImageCompactHighlighted", for: .highlighted, barMetrics: .compact)
        setBackgroundImage("backgroundImageCompactPrompt", for: .normal, barMetrics: .compactPrompt)
        setBackgroundImage("backgroundImageCompactPromptDisabled", for: .disabled, barMetrics: .compactPrompt)
        setBackgroundImage("backgroundImageCompactPromptFocused", for: .focused, barMetrics: .compactPrompt)
        setBackgroundImage("backgroundImageCompactPromptHighlighted", for: .highlighted, barMetrics: .compactPrompt)
        setBackgroundImage("backgroundImageDefaultPrompt", for: .normal, barMetrics: .defaultPrompt)
        setBackgroundImage("backgroundImageDefaultPromptDisabled", for: .disabled, barMetrics: .defaultPrompt)
        setBackgroundImage("backgroundImageDefaultPromptFocused", for: .focused, barMetrics: .defaultPrompt)
        setBackgroundImage("backgroundImageDefaultPromptHighlighted", for: .highlighted, barMetrics: .defaultPrompt)
        setBackgroundImage("backgroundImageDisabled", for: .disabled, barMetrics: .default)
        setBackgroundImage("backgroundImageFocused", for: .focused, barMetrics: .default)
        setBackgroundImage("backgroundImageHighlighted", for: .highlighted, barMetrics: .default)

        return barButtonItem
    }

    func setBackgroundImage(_ type: String, for state: UIControl.State, barMetrics: UIBarMetrics) {
        if elementsIndices?[type] != -1 {
            if let subview = reactSubviews()?[elementsIndices![type]!] as? RNRImage {
                barButtonItem.setBackgroundImage(subview.getImage(), for: state, barMetrics: barMetrics)
            }
        } else {
            barButtonItem.setBackgroundImage(nil, for: state, barMetrics: barMetrics)
        }
    }

    func setBackButtonBackgroundImage(_ type: String, for state: UIControl.State, barMetrics: UIBarMetrics) {
        if elementsIndices?[type] != -1 {
            if let subview = reactSubviews()?[elementsIndices![type]!] as? RNRImage {
                barButtonItem.setBackButtonBackgroundImage(subview.getImage(), for: state, barMetrics: barMetrics)
            }
        } else {
            barButtonItem.setBackButtonBackgroundImage(nil, for: state, barMetrics: barMetrics)
        }
    }
}
