import RenavigationCore

class RNRNavigationScene: UIView, RNRChild, RNRParent{
    var viewController: RNRNavigationSceneController = RNRNavigationSceneController()
    var navigationContainer: RNRNavigationContainer?

    var isReady = false
    var hasUpdatedReactSubviews = false
    var isPresented = false

    @objc var animated: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var onWillAppear: RCTDirectEventBlock?
    @objc var onDidAppear: RCTDirectEventBlock?
    @objc var onWillDisappear: RCTDirectEventBlock?
    @objc var onDidDisappear: RCTDirectEventBlock?
    @objc var onDidDismiss: RCTDirectEventBlock?

    override func reactViewController() -> UIViewController! {
        viewController
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        viewController.view = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview is RNRNavigationContainer {
            navigationContainer = (newSuperview as! RNRNavigationContainer)
        }
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        subview.willMove(toSuperview: self)
        super.insertReactSubview(subview, at: atIndex)
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        if !isReady {
            setup()
        } else {
            updateNavigationBarItem()
        }
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && navigationContainer != nil {
            var ready = true
            reactSubviews().forEach { subview in
                if subview is RNRNavigationItem {
                    ready = (subview as! RNRNavigationItem).isReady
                }
            }

            if ready {
                isReady = true
                if navigationContainer!.isReady {
                    navigationContainer!.presentScenes()
                } else {
                    setupParent(navigationContainer!)
                }
            }
        }
    }

    func updateSubview(_ subview: UIView) {
        if subview is RNRNavigationItem {
            updateNavigationBarItem()
        }
    }

    func updateNavigationBarItem() {
        reactSubviews().forEach { subview in
            if subview is RNRNavigationItem {
                (subview as! RNRNavigationItem).setNavigationItem(viewController.navigationItem)
                updateRefreshControl((subview as! RNRNavigationItem).getRefreshControl())
            }
        }
    }

    func updateRefreshControl(_ refreshControl: RNRRefreshControlProtocol?) {
        if #available(iOS 10.0, *) {
            if refreshControl != nil {
                if findScrollView()?.refreshControl == nil || findScrollView()?.refreshControl != refreshControl?.getRefreshControl() {
                    findScrollView()?.refreshControl = refreshControl?.createRefreshControl()
                }
            } else {
                findScrollView()?.refreshControl = nil
            }
        }
    }

    func findScrollView() -> UIScrollView? {
        findScrollView(self)
    }

    func findScrollView(_ subview: UIView) -> UIScrollView? {
        if subview is UIScrollView {
            return subview as? UIScrollView
        }
        var match: UIScrollView? = nil
        if !subview.subviews.isEmpty {
            for view in subview.subviews {
                let result = findScrollView(view)
                if result != nil {
                    match = result
                    break
                }
            }
        }
        return match
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

    func didDismiss() {
        if onDidDismiss != nil {
            onDidDismiss!([:])
        }
    }
}
