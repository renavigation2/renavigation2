import RenavigationCore

class RNRTabScene: UIView, RNRChild, RNRParent {
    var parent: RNRTabsContainer?
    var viewController = RNRTabSceneController()

    var isReady = false
    var hasMovedToSuperview = false
    var hasUpdatedReactSubviews = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        viewController.view = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func reactSetFrame(_ frame: CGRect) {
    }

    override func reactViewController() -> UIViewController! {
        viewController
    }

    func updateSubview(_ subview: UIView) {
        if isReady {
            setItem()
        } else if parent != nil {
            hasMovedToSuperview = true
            setup()
        }
    }

    func setup() {
        if !isReady && hasMovedToSuperview && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady([subviews[0]])
            if childrenReady {
                isReady = true
                setItem()
                setupParent(parent!)
            }
        }
    }

    func setItem() {
        let item = getChild(subviews[0])
        if item is RNRTabBarItem {
            // forces the update of the tabBarItem
            viewController.tabBarItem = nil
            viewController.tabBarItem = (item as! RNRTabBarItem).getTabBarItem()
        }
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        if isReady {
            setItem()
        }
        setup()
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview is RNRTabsContainer {
            parent = (newSuperview as! RNRTabsContainer)
            hasMovedToSuperview = true
            setup()
        }
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if superview == nil {
            hasMovedToSuperview = false
            isReady = false
        }
    }
}
