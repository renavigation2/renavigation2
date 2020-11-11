import RenavigationCore

class RNRNavigationContainer: UIView, UINavigationControllerDelegate, RNRChild, RNRParent {
    var navigationController: UINavigationController?
    var viewController: UIViewController?
    var scenes: [RNRNavigationScene] = []
    var shouldPresent: [RNRNavigationScene] = []

    var isReady = false
    var hasMovedToSuperview = false

    @objc var onWillShowView: RCTDirectEventBlock?

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        (subview as! RNRNavigationScene).willMove(toSuperview: self)
        scenes.insert(subview as! RNRNavigationScene, at: atIndex)
        if !(subview as! RNRNavigationScene).isPresented && (subview as! RNRNavigationScene).isReady && navigationController != nil {
            present(subview as! RNRNavigationScene)
        }
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
        if !isReady && hasMovedToSuperview && controller != nil {
            let childrenReady = areChildrenReady(scenes)
            if childrenReady {
                isReady = true
                controller!.addChild(navigationController!)
                addSubview(navigationController!.view)
                navigationController!.setViewControllers(scenes.map { scene in
                    scene.isPresented = true
                    return scene.reactViewController()
                }, animated: false)
            }
        }
    }

    func pop(animated: Bool) {
        navigationController?.popViewController(animated: animated)
    }

    func popTo(_ view: RNRNavigationScene, animated: Bool) {
        navigationController?.popToViewController(view.viewController, animated: animated)
    }

    func present(_ scene: RNRNavigationScene) {
        if !scene.isPresented && scene.isReady {
            scene.isPresented = true
            let animated = scene.animated == -1 ? false : true
            navigationController!.pushViewController(scene.reactViewController(), animated: animated)
        }
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
