@objc(RNRModalController)
class RNRModalController: UIViewController {
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewWillAppear(_ animated: Bool) {
        if let v = view as? RNRModal {
            v.willAppear()
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        if let v = view as? RNRModal {
            v.didAppear()
        }
    }

    override func viewWillDisappear(_ animated: Bool) {
        if let v = view as? RNRModal {
            v.willDisappear()
        }
    }

    override func viewDidDisappear(_ animated: Bool) {
        if let v = view as? RNRModal {
            v.didDisappear()
        }
    }
}
