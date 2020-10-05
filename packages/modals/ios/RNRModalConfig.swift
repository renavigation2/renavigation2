class RNRModalConfig: UIView {
    var controller: RNRModalController?

    var initialized = false

    @objc var animated: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var isModalInPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var modalPresentationCapturesStatusBarAppearance: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var modalPresentationStyle: Int = UIModalPresentationStyle.pageSheet.rawValue
    @objc var modalTransitionStyle: Int = UIModalTransitionStyle.coverVertical.rawValue
    @objc var preferredStatusBarUpdateAnimation: Int = UIStatusBarAnimation.fade.rawValue
    @objc var preferredStatusBarStyle: Int = UIBarStyle.default.rawValue
    @objc var prefersStatusBarHidden: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    func setup() {
        if initialized == false {
            initialized = true
            controller!.config = self

            if #available(iOS 13.0, *) {
                if isModalInPresentation == 1 {
                    controller!.isModalInPresentation = true
                } else if isModalInPresentation == -1 {
                    controller!.isModalInPresentation = false
                }
            }

            if modalPresentationCapturesStatusBarAppearance == 1 {
                controller!.modalPresentationCapturesStatusBarAppearance = true
            } else if modalPresentationCapturesStatusBarAppearance == -1 {
                controller!.modalPresentationCapturesStatusBarAppearance = false
            }

            controller!.modalPresentationStyle = UIModalPresentationStyle.init(rawValue: modalPresentationStyle)!
            controller!.modalTransitionStyle = UIModalTransitionStyle.init(rawValue: modalTransitionStyle)!
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        changedProps.forEach({ key in
            if key == "isModalInPresentation" {
                if #available(iOS 13.0, *) {
                    if isModalInPresentation == 1 {
                        controller?.isModalInPresentation = true
                    } else if isModalInPresentation == -1 {
                        controller?.isModalInPresentation = false
                    } else {
                        controller?.isModalInPresentation = false
                    }
                }
            } else if key == "modalPresentationCapturesStatusBarAppearance" {
                if modalPresentationCapturesStatusBarAppearance == 1 {
                    controller?.modalPresentationCapturesStatusBarAppearance = true
                } else if modalPresentationCapturesStatusBarAppearance == -1 {
                    controller?.modalPresentationCapturesStatusBarAppearance = false
                } else {
                    controller?.modalPresentationCapturesStatusBarAppearance = false
                }
            } else if key == "modalPresentationStyle" {
                controller?.modalPresentationStyle = UIModalPresentationStyle.init(rawValue: modalPresentationStyle)!
            } else if key == "modalTransitionStyle" {
                controller?.modalTransitionStyle = UIModalTransitionStyle.init(rawValue: modalTransitionStyle)!
            }
        })
    }
}
