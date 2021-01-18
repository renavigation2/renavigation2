import RenavigationCore

class RNRModalConfig: UIView, RNRChild {
    var parent: RNRModal?

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
        isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview is RNRModal {
            parent = (newSuperview as! RNRModal)
            hasMovedToSuperview = true
            setup()
        }
    }

    func setup() {
        if !isReady && hasMovedToSuperview && parent != nil {
            isReady = true
            setConfig()
            setupParent(parent!)
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        if isReady && parent != nil {
            setConfig()
            updateInParent(parent!, subview: self)
        }
    }

    func setConfig() {
        if parent?.controller != nil {
            let viewController = parent?.controller
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
