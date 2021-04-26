import RenavigationCore

class RNRNavigationBarAppearance: UIView, RNRChild, RNRParent {
    var parent: RNRParent?

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
    @objc var backgroundEffect: String?
    @objc var _backgroundColor: NSNumber? = nil
    @objc var backgroundImageContentMode: String?
    @objc var shadowColor: NSNumber?
    @objc var titleStyle: NSDictionary?
    @objc var titlePositionAdjustment: NSDictionary?
    @objc var largeTitleStyle: NSDictionary?
    @objc var configure: String?

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
            parent = (newSuperview as! RNRParent)
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
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    @available(iOS 13.0, *)
    func getNavigationBarAppearance() -> UINavigationBarAppearance {
        let navigationBarAppearance = UINavigationBarAppearance()
        if configure == "defaultBackground" {
            navigationBarAppearance.configureWithDefaultBackground()
        } else if configure == "opaqueBackground" {
            navigationBarAppearance.configureWithOpaqueBackground()
        } else if configure == "transparentBackground" {
            navigationBarAppearance.configureWithTransparentBackground()
        }

        if backgroundEffect != nil {
            navigationBarAppearance.backgroundEffect = RNRBlurEffect.getBlurEffect(backgroundEffect!)
        }

        if _backgroundColor != nil {
            navigationBarAppearance.backgroundColor = RCTConvert.uiColor(_backgroundColor!)
        }

        if backgroundImageContentMode != nil {
            navigationBarAppearance.backgroundImageContentMode = RNRContentMode.getContentMode(backgroundImageContentMode!)!
        }

        if shadowColor != nil {
            navigationBarAppearance.shadowColor = RCTConvert.uiColor(shadowColor!)
        }

        if titleStyle != nil {
            navigationBarAppearance.titleTextAttributes = RNRTextStyle.getStyles(titleStyle!, defaultFontSize: 17, defaultFontWeight: "bold")
        }

        if titlePositionAdjustment != nil {
            navigationBarAppearance.titlePositionAdjustment = RNROffset.getOffset(titlePositionAdjustment!)!
        }

        if largeTitleStyle != nil {
            navigationBarAppearance.largeTitleTextAttributes = RNRTextStyle.getStyles(largeTitleStyle!, defaultFontSize: 34, defaultFontWeight: "bold")
        }

        var backIndicatorImage: UIImage?
        var backIndicatorTransitionMaskImage: UIImage?

        if elementsIndices?["backgroundImage"] != nil && elementsIndices?["backgroundImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backgroundImage"]!] as? RNRImageProtocol {
                navigationBarAppearance.backgroundImage = subview.getImage()
            }
        }

        if elementsIndices?["shadowImage"] != nil && elementsIndices?["shadowImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["shadowImage"]!] as? RNRImageProtocol {
                navigationBarAppearance.shadowImage = subview.getImage()
            }
        }

        if elementsIndices?["backIndicatorImage"] != nil && elementsIndices?["backIndicatorImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backIndicatorImage"]!] as? RNRImageProtocol {
                backIndicatorImage = subview.getImage()
            }
        }

        if elementsIndices?["backIndicatorTransitionMaskImage"] != nil && elementsIndices?["backIndicatorTransitionMaskImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backIndicatorTransitionMaskImage"]!] as? RNRImageProtocol {
                backIndicatorTransitionMaskImage = subview.getImage()
            }
        }

        if elementsIndices?["buttonAppearance"] != nil && elementsIndices?["buttonAppearance"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["buttonAppearance"]!] as? RNRBarButtonItemAppearanceProtocol {
                navigationBarAppearance.buttonAppearance = subview.getBarButtonItemAppearance()
            }
        }

        if elementsIndices?["doneButtonAppearance"] != nil && elementsIndices?["doneButtonAppearance"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["doneButtonAppearance"]!] as? RNRBarButtonItemAppearanceProtocol {
                navigationBarAppearance.doneButtonAppearance = subview.getBarButtonItemAppearance()
            }
        }

        if elementsIndices?["backButtonAppearance"] != nil && elementsIndices?["backButtonAppearance"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backButtonAppearance"]!] as? RNRBarButtonItemAppearanceProtocol {
                navigationBarAppearance.backButtonAppearance = subview.getBarButtonItemAppearance()
            }
        }

        if backIndicatorImage != nil && backIndicatorTransitionMaskImage != nil {
            navigationBarAppearance.setBackIndicatorImage(
                    backIndicatorImage,
                    transitionMaskImage: backIndicatorTransitionMaskImage
            )
        }

        return navigationBarAppearance
    }
}
