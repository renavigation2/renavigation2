class RNRModal: UIView, UIAdaptivePresentationControllerDelegate {
    var controller: UIViewController = RNRModalController()
    var presented = false
    var animated = true
    @objc var onWillAppear: RCTDirectEventBlock?
    @objc var onDidAppear: RCTDirectEventBlock?
    @objc var onWillDisappear: RCTDirectEventBlock?
    @objc var onDidDisappear: RCTDirectEventBlock?

    override init(frame: CGRect) {
        super.init(frame: frame)
        controller.view = self
        controller.presentationController?.delegate = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func reactViewController() -> UIViewController {
        controller
    }

    @objc func setDismissible(_ value: ObjCBool) {
        if (value.boolValue) {
            if #available(iOS 13.0, *) {
                controller.isModalInPresentation = false
            }
        } else {
            if #available(iOS 13.0, *) {
                controller.isModalInPresentation = true
            }
        }
    }

    @objc func setModalPresentation(_ value: UIModalPresentationStyle) {
        controller.modalPresentationStyle = value
    }

    @objc func setAnimated(_ value: Bool) {
        animated = value
    }

    func willAppear() {
        if onWillAppear != nil {
            onWillAppear!([:])
        }
    }

    func didAppear() {
        if onDidAppear != nil {
            onDidAppear!([:])
        }
    }

    func willDisappear() {
        if onWillDisappear != nil {
            onWillDisappear!([:])
        }
    }

    func didDisappear() {
        if onDidDisappear != nil {
            onDidDisappear!([:])
        }
    }
}
