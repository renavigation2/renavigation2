class RNRImage: UIView, RNRChild, RNRImageProtocol {
    var parent: RNRParent?

    var isReady: Bool = false

    @objc var source: UIImage?
    @objc var systemName: String?
    @objc var _alignmentRectInsets: NSDictionary?
    @objc var renderingMode: String?
    @objc var _tintColor: NSNumber?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview is RNRParent {
            parent = (newSuperview as! RNRParent)
        } else {
            parent = nil
        }
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
        if parent != nil {
            updateInParent(parent!, subview: self)
        } else if superview != nil {
            updateInParent(superview!, subview: self)
        }
    }

    func getImage() -> UIImage {
        var image: UIImage = UIImage()

        if source != nil {
            image = source!
        } else if systemName != nil {
            if #available(iOS 13.0, *) {
                image = UIImage(systemName: systemName!) ?? UIImage()
            }
        }

        if _alignmentRectInsets != nil {
            let edgeInsets = RNREdgeInsets.getEdgeInsets(_alignmentRectInsets)
            if edgeInsets != nil {
                image = image.withAlignmentRectInsets(edgeInsets!)
            }
        }

        if renderingMode != nil {
            if renderingMode == "automatic" {
                image = image.withRenderingMode(.automatic)
            } else if renderingMode == "always-original" {
                image = image.withRenderingMode(.alwaysOriginal)
            } else if renderingMode == "always-template" {
                image = image.withRenderingMode(.alwaysTemplate)
            }
        }

        if _tintColor != nil {
            if #available(iOS 13.0, *) {
                image = image.withTintColor(RCTConvert.uiColor(_tintColor))
            }
        }

        return image
    }
}
