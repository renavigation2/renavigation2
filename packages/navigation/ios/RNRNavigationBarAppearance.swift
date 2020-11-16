import RenavigationCore

class RNRNavigationBarAppearance: UIView, RNRChild, RNRParent {
    var parent: RNRParent?

    var isReady = false
    var hasUpdatedReactSubviews = false

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
        reactSubviews().enumerated().forEach { (index, subview) in
            if index == 0 { // backgroundImage
                if subview is RNRImageProtocol {
                    navigationBarAppearance.backgroundImage = (subview as! RNRImageProtocol).getImage()
                }
            } else if index == 1 { // shadowImage
                if subview is RNRImageProtocol {
                    navigationBarAppearance.shadowImage = (subview as! RNRImageProtocol).getImage()
                }
            } else if index == 2 { // backIndicatorImage
                if subview is RNRImageProtocol {
                    backIndicatorImage = (subview as! RNRImageProtocol).getImage()
                }
            } else if index == 3 { // backIndicatorTransitionMaskImage
                if subview is RNRImageProtocol {
                    backIndicatorTransitionMaskImage = (subview as! RNRImageProtocol).getImage()
                }
            } else if index == 4 { // buttonAppearance
                if subview is RNRBarButtonItemAppearanceProtocol {
                    navigationBarAppearance.buttonAppearance = (subview as! RNRBarButtonItemAppearanceProtocol).getBarButtonItemAppearance()
                }
            } else if index == 5 { // doneButtonAppearance
                if subview is RNRBarButtonItemAppearanceProtocol {
                    navigationBarAppearance.doneButtonAppearance = (subview as! RNRBarButtonItemAppearanceProtocol).getBarButtonItemAppearance()
                }
            } else if index == 6 { // backButtonAppearance
                if subview is RNRBarButtonItemAppearanceProtocol {
                    navigationBarAppearance.backButtonAppearance = (subview as! RNRBarButtonItemAppearanceProtocol).getBarButtonItemAppearance()
                }
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
