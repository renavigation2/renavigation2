class RNRNavigationScenes: UIView, UINavigationControllerDelegate {
    var navigationController: UINavigationController?
    var scenes: [RNRNavigationScene] = []
    var shouldPresent: [RNRNavigationScene] = []

    @objc var onWillShowView: RCTDirectEventBlock?

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        (subview as! RNRNavigationScene)._reactSuperview = self
        scenes.insert(subview as! RNRNavigationScene, at: atIndex)
        if !(subview as! RNRNavigationScene).presented && (subview as! RNRNavigationScene).initialized && navigationController != nil {
            present(subview as! RNRNavigationScene)
        }
    }

    override func removeReactSubview(_ subview: UIView!) {
        scenes.removeAll(where: { $0 == subview})
        shouldPresent.removeAll(where: { $0 == subview})
    }

    override func reactSubviews() -> [UIView]! {
        scenes
    }

    override func didUpdateReactSubviews() {
    }

    override func reactViewController() -> UIViewController! {
        navigationController
    }

    override func reactAddController(toClosestParent controller: UIViewController!) {
    }

    func pop(animated: Bool) {
        navigationController?.popViewController(animated: animated)
    }

    func popTo(_ view: RNRNavigationScene, animated: Bool) {
        navigationController?.popToViewController(view.controller, animated: animated)
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
        if navigationController != nil {
            addSubview(navigationController!.view)
            navigationController!.delegate = self
            scenes.forEach { subview in
                if !subview.presented && subview.initialized {
                    present(subview)
                }
            }
        }
    }

    func present(_ scene: RNRNavigationScene) {
        let next = scenes.firstIndex(where: { scene in
            !scene.presented
        })
        if navigationController != nil {
            let index = scenes.firstIndex(of: scene)
            if next == index {
                shouldPresent.removeAll(where: { $0 == scene })
                scene.presented = true
                var animated = true
                if scene.animated == -1 {
                    animated = false
                }
                navigationController!.pushViewController(scene.controller, animated: animated)
                if shouldPresent.count > 0 {
                    shouldPresent.forEach({ scene in
                        present(scene)
                    })
                }
            } else {
                if !shouldPresent.contains(scene) {
                    shouldPresent.append(scene)
                }
            }
        }
    }

    func navigationController(_ navigationController: UINavigationController, willShow viewController: UIViewController, animated: Bool) {
        let scene = (viewController as! RNRNavigationSceneController).view as? RNRNavigationScene
        if scene != nil {
            let navigationBarItem = scene!.findNavigationBarItem()
            if navigationBarItem != nil {
                navigationBarItem!.scene = scene
                navigationBarItem!.refreshControl?.scene = scene
                navigationBarItem!.refreshControl?.setup()
                navigationBarItem!.setup()
            }
        }
        if onWillShowView != nil {
            if scene != nil && scene!.reactTag != nil {
                onWillShowView!(["view": scene!.reactTag!])
            }
        }
    }
}
