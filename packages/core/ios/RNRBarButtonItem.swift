class RNRBarButtonItem: UIView, RNRChild, RNRParent, RNRBarButtonItemProtocol {
    var parent: RNRParent?
    var barButtonItem: UIBarButtonItem = UIBarButtonItem()

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var hasPrompt: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var fixedSpace: NSNumber?
    @objc var flexibleSpace: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var isEnabled: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var title: String?
    @objc var imageInsets: NSDictionary?
    @objc var landscapeImagePhoneInsets: NSDictionary?
    @objc var largeContentSizeImageInsets: NSDictionary?
    @objc var normalTitleStyle: NSDictionary?
    @objc var focusedTitleStyle: NSDictionary?
    @objc var disabledTitleStyle: NSDictionary?
    @objc var highlightedTitleStyle: NSDictionary?
    @objc var _style: String?
    @objc var width: NSNumber?
    @objc var possibleTitles: NSArray?
    @objc var _tintColor: NSNumber?
    @objc var defaultBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var compactBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var defaultPromptBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var compactPromptBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var defaultTitlePositionAdjustment: NSDictionary?
    @objc var compactTitlePositionAdjustment: NSDictionary?
    @objc var defaultPromptTitlePositionAdjustment: NSDictionary?
    @objc var compactPromptTitlePositionAdjustment: NSDictionary?
    @objc var defaultBackButtonTitlePositionAdjustment: NSDictionary?
    @objc var compactBackButtonTitlePositionAdjustment: NSDictionary?
    @objc var defaultPromptBackButtonTitlePositionAdjustment: NSDictionary?
    @objc var compactPromptBackButtonTitlePositionAdjustment: NSDictionary?
    @objc var defaultBackButtonBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var compactBackButtonBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var defaultPromptBackButtonBackgroundVerticalPositionAdjustment: NSNumber?
    @objc var compactPromptBackButtonBackgroundVerticalPositionAdjustment: NSNumber?

    var hasSetDefaults = false
    var hasSetPromptDefaults = false
    var defaultIsEnabled: Bool?
    var defaultTitle: String?
    var defaultImageInsets: UIEdgeInsets?
    var defaultLandscapeImagePhoneInsets: UIEdgeInsets?
    var defaultLargeContentSizeImageInsets: UIEdgeInsets?
    var defaultNormalTitleStyle: [NSAttributedString.Key : Any]?
    var defaultFocusedTitleStyle: [NSAttributedString.Key : Any]?
    var defaultDisabledTitleStyle: [NSAttributedString.Key : Any]?
    var defaultHighlightedTitleStyle: [NSAttributedString.Key : Any]?
    var defaultStyle: UIBarButtonItem.Style?
    var defaultWidth: CGFloat?
    var defaultPossibleTitles: Set<String>?
    var defaultTintColor: UIColor?
    var defaultDefaultBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultCompactBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultDefaultPromptBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultCompactPromptBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultDefaultTitlePositionAdjustment: UIOffset?
    var defaultCompactTitlePositionAdjustment: UIOffset?
    var defaultDefaultPromptTitlePositionAdjustment: UIOffset?
    var defaultCompactPromptTitlePositionAdjustment: UIOffset?
    var defaultDefaultBackButtonTitlePositionAdjustment: UIOffset?
    var defaultCompactBackButtonTitlePositionAdjustment: UIOffset?
    var defaultDefaultPromptBackButtonTitlePositionAdjustment: UIOffset?
    var defaultCompactPromptBackButtonTitlePositionAdjustment: UIOffset?
    var defaultDefaultBackButtonBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultCompactBackButtonBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultDefaultPromptBackButtonBackgroundVerticalPositionAdjustment: CGFloat?
    var defaultCompactPromptBackButtonBackgroundVerticalPositionAdjustment: CGFloat?

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
            defaultNormalTitleStyle = barButtonItem.titleTextAttributes(for: .normal)
            defaultFocusedTitleStyle = barButtonItem.titleTextAttributes(for: .focused)
            defaultDisabledTitleStyle = barButtonItem.titleTextAttributes(for: .disabled)
            defaultHighlightedTitleStyle = barButtonItem.titleTextAttributes(for: .highlighted)
            defaultStyle = barButtonItem.style
            defaultWidth = barButtonItem.width
            defaultPossibleTitles = barButtonItem.possibleTitles
            defaultTintColor = barButtonItem.tintColor
            defaultDefaultBackgroundVerticalPositionAdjustment = barButtonItem.backgroundVerticalPositionAdjustment(for: .default)
            defaultCompactBackgroundVerticalPositionAdjustment = barButtonItem.backgroundVerticalPositionAdjustment(for: .compact)
            defaultDefaultTitlePositionAdjustment = barButtonItem.titlePositionAdjustment(for: .default)
            defaultCompactTitlePositionAdjustment = barButtonItem.titlePositionAdjustment(for: .compact)
            defaultDefaultBackButtonTitlePositionAdjustment = barButtonItem.backButtonTitlePositionAdjustment(for: .default)
            defaultCompactBackButtonTitlePositionAdjustment = barButtonItem.backButtonTitlePositionAdjustment(for: .compact)
            defaultDefaultBackButtonBackgroundVerticalPositionAdjustment = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .default)
            defaultCompactBackButtonBackgroundVerticalPositionAdjustment = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .compact)
        }

        if hasPrompt == 1 && !hasSetPromptDefaults {
            hasSetPromptDefaults = true
            defaultDefaultPromptBackgroundVerticalPositionAdjustment = barButtonItem.backgroundVerticalPositionAdjustment(for: .defaultPrompt)
            defaultCompactPromptBackgroundVerticalPositionAdjustment = barButtonItem.backgroundVerticalPositionAdjustment(for: .compactPrompt)
            defaultDefaultPromptTitlePositionAdjustment = barButtonItem.titlePositionAdjustment(for: .defaultPrompt)
            defaultCompactPromptTitlePositionAdjustment = barButtonItem.titlePositionAdjustment(for: .compactPrompt)
            defaultDefaultPromptBackButtonTitlePositionAdjustment = barButtonItem.backButtonTitlePositionAdjustment(for: .defaultPrompt)
            defaultCompactPromptBackButtonTitlePositionAdjustment = barButtonItem.backButtonTitlePositionAdjustment(for: .compactPrompt)
            defaultDefaultPromptBackButtonBackgroundVerticalPositionAdjustment = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .defaultPrompt)
            defaultCompactPromptBackButtonBackgroundVerticalPositionAdjustment = barButtonItem.backButtonBackgroundVerticalPositionAdjustment(for: .compactPrompt)
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

        if normalTitleStyle != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(normalTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .normal)
        } else {
            barButtonItem.setTitleTextAttributes(defaultNormalTitleStyle, for: .normal)
        }

        if focusedTitleStyle != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(focusedTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .focused)
        } else {
            barButtonItem.setTitleTextAttributes(defaultFocusedTitleStyle, for: .focused)
        }

        if disabledTitleStyle != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(disabledTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .disabled)
        } else {
            barButtonItem.setTitleTextAttributes(defaultDisabledTitleStyle, for: .disabled)
        }

        if highlightedTitleStyle != nil {
            barButtonItem.setTitleTextAttributes(RNRTextStyle.getStyles(highlightedTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold"), for: .highlighted)
        } else {
            barButtonItem.setTitleTextAttributes(defaultHighlightedTitleStyle, for: .highlighted)
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

        if defaultBackgroundVerticalPositionAdjustment != nil {
            barButtonItem.setBackgroundVerticalPositionAdjustment(defaultBackgroundVerticalPositionAdjustment as! CGFloat, for: .default)
        } else {
            barButtonItem.setBackgroundVerticalPositionAdjustment(defaultDefaultBackgroundVerticalPositionAdjustment!, for: .default)
        }

        if compactBackgroundVerticalPositionAdjustment != nil {
            barButtonItem.setBackgroundVerticalPositionAdjustment(compactBackgroundVerticalPositionAdjustment as! CGFloat, for: .compact)
        } else {
            barButtonItem.setBackgroundVerticalPositionAdjustment(defaultCompactBackgroundVerticalPositionAdjustment!, for: .compact)
        }

        if hasPrompt == 1 {
            if defaultPromptBackgroundVerticalPositionAdjustment != nil {
                barButtonItem.setBackgroundVerticalPositionAdjustment(defaultPromptBackgroundVerticalPositionAdjustment as! CGFloat, for: .defaultPrompt)
            } else {
                barButtonItem.setBackgroundVerticalPositionAdjustment(defaultDefaultPromptBackgroundVerticalPositionAdjustment!, for: .defaultPrompt)
            }

            if compactPromptBackgroundVerticalPositionAdjustment != nil {
                barButtonItem.setBackgroundVerticalPositionAdjustment(compactPromptBackgroundVerticalPositionAdjustment as! CGFloat, for: .compactPrompt)
            } else {
                barButtonItem.setBackgroundVerticalPositionAdjustment(defaultCompactPromptBackgroundVerticalPositionAdjustment!, for: .compactPrompt)
            }
        }

        if defaultTitlePositionAdjustment != nil {
            barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(defaultTitlePositionAdjustment!) ?? defaultDefaultTitlePositionAdjustment!, for: .default)
        } else {
            barButtonItem.setTitlePositionAdjustment(defaultDefaultTitlePositionAdjustment!, for: .default)
        }

        if compactTitlePositionAdjustment != nil {
            barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(compactTitlePositionAdjustment!) ?? defaultCompactTitlePositionAdjustment!, for: .compact)
        } else {
            barButtonItem.setTitlePositionAdjustment(defaultCompactTitlePositionAdjustment!, for: .compact)
        }

        if hasPrompt == 1 {
            if defaultPromptTitlePositionAdjustment != nil {
                barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(defaultPromptTitlePositionAdjustment!) ?? defaultDefaultPromptTitlePositionAdjustment!, for: .defaultPrompt)
            } else {
                barButtonItem.setTitlePositionAdjustment(defaultDefaultPromptTitlePositionAdjustment!, for: .defaultPrompt)
            }

            if compactPromptTitlePositionAdjustment != nil {
                barButtonItem.setTitlePositionAdjustment(RNROffset.getOffset(compactPromptTitlePositionAdjustment!) ?? defaultCompactPromptTitlePositionAdjustment!, for: .compactPrompt)
            } else {
                barButtonItem.setTitlePositionAdjustment(defaultCompactPromptTitlePositionAdjustment!, for: .compactPrompt)
            }
        }

        if defaultBackButtonTitlePositionAdjustment != nil {
            barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(defaultBackButtonTitlePositionAdjustment!) ?? defaultDefaultBackButtonTitlePositionAdjustment!, for: .default)
        } else {
            barButtonItem.setBackButtonTitlePositionAdjustment(defaultDefaultBackButtonTitlePositionAdjustment!, for: .default)
        }

        if compactBackButtonTitlePositionAdjustment != nil {
            barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(compactBackButtonTitlePositionAdjustment!) ?? defaultCompactBackButtonTitlePositionAdjustment!, for: .compact)
        } else {
            barButtonItem.setBackButtonTitlePositionAdjustment(defaultCompactBackButtonTitlePositionAdjustment!, for: .compact)
        }

        if hasPrompt == 1 {
            if defaultPromptBackButtonTitlePositionAdjustment != nil {
                barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(defaultPromptBackButtonTitlePositionAdjustment!) ?? defaultDefaultPromptBackButtonTitlePositionAdjustment!, for: .defaultPrompt)
            } else {
                barButtonItem.setBackButtonTitlePositionAdjustment(defaultDefaultPromptBackButtonTitlePositionAdjustment!, for: .defaultPrompt)
            }

            if compactPromptBackButtonTitlePositionAdjustment != nil {
                barButtonItem.setBackButtonTitlePositionAdjustment(RNROffset.getOffset(compactPromptBackButtonTitlePositionAdjustment!) ?? defaultCompactPromptBackButtonTitlePositionAdjustment!, for: .compactPrompt)
            } else {
                barButtonItem.setBackButtonTitlePositionAdjustment(defaultCompactPromptBackButtonTitlePositionAdjustment!, for: .compactPrompt)
            }
        }

        if defaultBackButtonBackgroundVerticalPositionAdjustment != nil {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultBackButtonBackgroundVerticalPositionAdjustment as! CGFloat, for: .default)
        } else {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultDefaultBackButtonBackgroundVerticalPositionAdjustment!, for: .default)
        }

        if compactBackButtonBackgroundVerticalPositionAdjustment != nil {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(compactBackButtonBackgroundVerticalPositionAdjustment as! CGFloat, for: .compact)
        } else {
            barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultCompactBackButtonBackgroundVerticalPositionAdjustment!, for: .compact)
        }

        if hasPrompt == 1 {
            if defaultPromptBackButtonBackgroundVerticalPositionAdjustment != nil {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultPromptBackButtonBackgroundVerticalPositionAdjustment as! CGFloat, for: .defaultPrompt)
            } else {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultDefaultPromptBackButtonBackgroundVerticalPositionAdjustment!, for: .defaultPrompt)
            }

            if compactPromptBackButtonBackgroundVerticalPositionAdjustment != nil {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(compactPromptBackButtonBackgroundVerticalPositionAdjustment as! CGFloat, for: .compactPrompt)
            } else {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(defaultCompactPromptBackButtonBackgroundVerticalPositionAdjustment!, for: .compactPrompt)
            }
        }

        reactSubviews().enumerated().forEach { (index, subview) in
            if index == 0 { // primaryAction
                if #available(iOS 14.0, *) {
                    if subview is RNRActionProtocol {
                        barButtonItem.primaryAction = (subview as! RNRActionProtocol).getAction()
                    } else {
                        barButtonItem.primaryAction = nil
                    }
                }
            } else if index == 1 { // menu
                if #available(iOS 14.0, *) {
                    if subview is RNRMenuProtocol {
                        barButtonItem.menu = (subview as! RNRMenuProtocol).getMenu()
                    } else {
                        barButtonItem.menu = nil
                    }
                }
            } else if index == 2 { // image
                if subview is RNRImageProtocol {
                    barButtonItem.image = (subview as! RNRImageProtocol).getImage()
                } else {
                    barButtonItem.image = nil
                }
            } else if index == 3 { // landscapeImagePhone
                if subview is RNRImageProtocol {
                    barButtonItem.landscapeImagePhone = (subview as! RNRImageProtocol).getImage()
                } else {
                    barButtonItem.landscapeImagePhone = nil
                }
            } else if index == 4 { // largeContentSizeImage
                if #available(iOS 11.0, *) {
                    if subview is RNRImageProtocol {
                        barButtonItem.largeContentSizeImage = (subview as! RNRImageProtocol).getImage()
                    } else {
                        barButtonItem.largeContentSizeImage = nil
                    }
                }
            } else if index == 5 { // normalDefaultBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .default)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .normal, barMetrics: .default)
                }
            } else if index == 6 { // normalCompactBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .compact)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .normal, barMetrics: .compact)
                }
            } else if index == 7 { // focusedDefaultBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .default)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .focused, barMetrics: .default)
                }
            } else if index == 8 { // focusedCompactBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .compact)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .focused, barMetrics: .compact)
                }
            } else if index == 9 { // disabledDefaultBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .default)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .disabled, barMetrics: .default)
                }
            } else if index == 10 { // disabledCompactBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .compact)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .disabled, barMetrics: .compact)
                }
            } else if index == 11 { // highlightedDefaultBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .default)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .highlighted, barMetrics: .default)
                }
            } else if index == 12 { // highlightedCompactBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .compact)
                } else {
                    barButtonItem.setBackgroundImage(nil, for: .highlighted, barMetrics: .compact)
                }
            } else if index == 13 { // normalDefaultBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .default)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .normal, barMetrics: .default)
                }
            } else if index == 14 { // normalCompactBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .compact)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .normal, barMetrics: .compact)
                }
            } else if index == 15 { // focusedDefaultBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .default)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .focused, barMetrics: .default)
                }
            } else if index == 16 { // focusedCompactBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .compact)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .focused, barMetrics: .compact)
                }
            } else if index == 17 { // disabledDefaultBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .default)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .disabled, barMetrics: .default)
                }
            } else if index == 18 { // disabledCompactBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .compact)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .disabled, barMetrics: .compact)
                }
            } else if index == 19 { // highlightedDefaultBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .default)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .highlighted, barMetrics: .default)
                }
            } else if index == 20 { // highlightedCompactBackButtonBackgroundImage
                if subview is RNRImageProtocol {
                    barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .compact)
                } else {
                    barButtonItem.setBackButtonBackgroundImage(nil, for: .highlighted, barMetrics: .compact)
                }
            } else if index == 21 { // normalDefaultPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .normal, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 22 { // normalCompactPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .normal, barMetrics: .compactPrompt)
                    }
                }
            } else if index == 23 { // focusedDefaultPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .focused, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 24 { // focusedCompactPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .focused, barMetrics: .compactPrompt)
                    }
                }
            } else if index == 25 { // disabledDefaultPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .disabled, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 26 { // disabledCompactPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .disabled, barMetrics: .compactPrompt)
                    }
                }
            } else if index == 27 { // highlightedDefaultPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .highlighted, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 28 { // highlightedCompactPromptBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackgroundImage(nil, for: .highlighted, barMetrics: .compactPrompt)
                    }
                }
            } else if index == 29 { // normalDefaultPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .normal, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 30 { // normalCompactPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .normal, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .normal, barMetrics: .compactPrompt)
                    }
                }
            } else if index == 31 { // focusedDefaultPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .focused, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 32 { // focusedCompactPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .focused, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .focused, barMetrics: .compactPrompt)
                    }
                }
            } else if index == 33 { // disabledDefaultPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .disabled, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 34 { // disabledCompactPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .disabled, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .disabled, barMetrics: .compactPrompt)
                    }
                }
            } else if index == 35 { // highlightedDefaultPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .defaultPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .highlighted, barMetrics: .defaultPrompt)
                    }
                }
            } else if index == 36 { // highlightedCompactPromptBackButtonBackgroundImage
                if hasPrompt == 1 {
                    if subview is RNRImageProtocol {
                        barButtonItem.setBackButtonBackgroundImage((subview as! RNRImageProtocol).getImage(), for: .highlighted, barMetrics: .compactPrompt)
                    } else {
                        barButtonItem.setBackButtonBackgroundImage(nil, for: .highlighted, barMetrics: .compactPrompt)
                    }
                }
            }
        }

        return barButtonItem
    }
}
