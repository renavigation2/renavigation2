@objc(RNRNavigationSceneController)
class RNRNavigationSceneController: UIViewController {
    override func viewWillAppear(_ animated: Bool) {
        if let v = view as? RNRNavigationScene {
            v.willAppear()
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        if let v = view as? RNRNavigationScene {
            v.didAppear()
        }
    }

    override func viewWillDisappear(_ animated: Bool) {
        if let v = view as? RNRNavigationScene {
            v.willDisappear()
        }
    }

    override func viewDidDisappear(_ animated: Bool) {
        if let v = view as? RNRNavigationScene {
            v.didDisappear()
        }
    }

    override func didMove(toParent parent: UIViewController?) {
        super.didMove(toParent: parent)
        if parent == nil {
            if let v = view as? RNRNavigationScene {
                v.didDismiss()
            }
        }
    }
}
