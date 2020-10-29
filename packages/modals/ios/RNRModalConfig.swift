import RenavigationCore

class RNRModalConfig: UIView, RNRChild {
    var viewController: RNRModalController?

    var isReady: Bool = false
    var hasMovedToSuperview = false

    @objc var animated: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var isModalInPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var modalPresentationCapturesStatusBarAppearance: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var modalPresentationStyle: Int = UIModalPresentationStyle.pageSheet.rawValue
    @objc var modalTransitionStyle: Int = UIModalTransitionStyle.coverVertical.rawValue
    @objc var preferredStatusBarUpdateAnimation: Int = UIStatusBarAnimation.fade.rawValue
    @objc var preferredStatusBarStyle: Int = UIBarStyle.default.rawValue
    @objc var prefersStatusBarHidden: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    var hasSetDefaults = false
    var defaultIsModalInPresentation: Bool?
    var defaultModalPresentationCapturesStatusBarAppearance: Bool?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if superview is RNRModalContainer {
            self.viewController = (superview as! RNRModalContainer).viewController
            hasMovedToSuperview = true
            setup()
        }
    }

    func setup() {
        if !isReady && hasMovedToSuperview && superview != nil {
            isReady = true
            setConfig()
            setupParent(superview!)
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        if isReady && superview != nil {
            setConfig()
            updateInParent(superview!, subview: self)
        }
    }

    func setConfig() {
        if viewController != nil {
            if !hasSetDefaults {
                hasSetDefaults = true
                if #available(iOS 13.0, *) {
                    defaultIsModalInPresentation = viewController!.isModalInPresentation
                    defaultModalPresentationCapturesStatusBarAppearance = viewController!.modalPresentationCapturesStatusBarAppearance
                }
            }

            if #available(iOS 13.0, *) {
                if isModalInPresentation == 1 {
                    viewController!.isModalInPresentation = true
                } else if isModalInPresentation == -1 {
                    viewController!.isModalInPresentation = false
                } else {
                    viewController!.isModalInPresentation = defaultIsModalInPresentation!
                }
            }

            if modalPresentationCapturesStatusBarAppearance == 1 {
                viewController!.modalPresentationCapturesStatusBarAppearance = true
            } else if modalPresentationCapturesStatusBarAppearance == -1 {
                viewController!.modalPresentationCapturesStatusBarAppearance = false
            } else {
                viewController!.modalPresentationCapturesStatusBarAppearance = defaultModalPresentationCapturesStatusBarAppearance!
            }

            viewController!.modalPresentationStyle = UIModalPresentationStyle.init(rawValue: modalPresentationStyle)!
            viewController!.modalTransitionStyle = UIModalTransitionStyle.init(rawValue: modalTransitionStyle)!
        }
    }
}
