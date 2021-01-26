class RNRModalController: UIViewController {
    var config: RNRModalConfig?

    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override var preferredStatusBarUpdateAnimation: UIStatusBarAnimation {
        if config?.preferredStatusBarUpdateAnimation != nil {
            return UIStatusBarAnimation.init(rawValue: config!.preferredStatusBarUpdateAnimation)!
        }
        return .fade
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        if config?.preferredStatusBarStyle != nil {
            return UIStatusBarStyle.init(rawValue: config!.preferredStatusBarStyle)!
        }
        return .default
    }

    override var prefersStatusBarHidden: Bool {
        if config?.prefersStatusBarHidden == 1 {
            return true
        }
        return false
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if let v = view as? RNRModal {
            v.willAppear()
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if let v = view as? RNRModal {
            v.didAppear()
        }
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        if let v = view as? RNRModal {
            v.willDisappear()
        }
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        if let v = view as? RNRModal {
            v.didDisappear()
            if parent == nil && presentingViewController == nil {
                v.didDismiss()
            }
        }
    }
}
