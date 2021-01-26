import RenavigationCore

class RNRNavigationContainer: UIView, UINavigationControllerDelegate, RNRChild, RNRParent {
    var navigationController: UINavigationController?
    var viewController: UIViewController?
    var scenes: [RNRNavigationScene] = []
    var shouldPresent: [RNRNavigationScene] = []

    var isReady = false
    var hasMovedToSuperview = false
    var hasUpdatedReactSubviews = false

    @objc var onWillShowView: RCTDirectEventBlock?

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        (subview as! RNRNavigationScene).willMove(toSuperview: self)
        scenes.insert(subview as! RNRNavigationScene, at: atIndex)
    }

    override func removeReactSubview(_ subview: UIView!) {
        scenes.removeAll(where: { $0 == subview})
        shouldPresent.removeAll(where: { $0 == subview})
    }

    override func reactSetFrame(_ frame: CGRect) {
        super.reactSetFrame(frame)
        navigationController?.view.frame = frame
        navigationController?.view.bounds = bounds
    }

    override func reactSubviews() -> [UIView]! {
        scenes
    }

    override func didUpdateReactSubviews() {
        hasUpdatedReactSubviews = true
        if !isReady {
            setup()
        } else {
            presentScenes()
        }
        setup()
    }

    override func reactAddController(toClosestParent controller: UIViewController!) {
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview is RNRNavigation {
            navigationController = (newSuperview as! RNRNavigation).navigationController
            navigationController?.delegate = self
        }
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        hasMovedToSuperview = true
        setup()
    }

    func setupViewController(_ viewController: UIViewController) {
        self.viewController = viewController
        setup()
    }

    func updateSubview(_ subview: UIView) {}

    func setup() {
        let controller = viewController ?? reactViewController()
        if !isReady && hasMovedToSuperview && hasUpdatedReactSubviews && controller != nil {
            let childrenReady = areChildrenReady(scenes)
            if childrenReady {
                controller!.addChild(navigationController!)

                isReady = true
                navigationController!.setViewControllers(scenes.map { scene in
                    scene.isPresented = true
                    scene.updateNavigationBarItem()
                    return scene.reactViewController()
                }, animated: false)

                // Fixes issue with navigation bar item appearances not working properly when only setting it up
                // before adding them with setViewControllers
                scenes.forEach { scene in
                    scene.updateNavigationBarItem()
                }

                // Add navigation view controller after setting up the view controllers (otherwise things break)
                addSubview(navigationController!.view)
            }
        }
    }

    func pop(animated: Bool) {
        navigationController?.popViewController(animated: animated)
    }

    func popTo(_ view: RNRNavigationScene, animated: Bool) {
        navigationController?.popToViewController(view.viewController, animated: animated)
    }

    func presentScenes() {
        let newScenes = scenes.filter { !$0.isPresented }
        var reset = true
        newScenes.forEach { scene in
            if scene.animated != -1 {
                reset = false
            }
            scene.updateNavigationBarItem()
            scene.isPresented = true
        }
        navigationController?.setViewControllers(scenes.map { $0.viewController }, animated: reset ? false : true)
    }

    func navigationController(_ navigationController: UINavigationController, willShow viewController: UIViewController, animated: Bool) {
        if onWillShowView != nil {
            let scene = (viewController as! RNRNavigationSceneController).view as? RNRNavigationScene
            if scene != nil && scene!.reactTag != nil {
                onWillShowView!(["view": scene!.reactTag!])
            }
        }
    }
}
