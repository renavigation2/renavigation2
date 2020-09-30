class RNRNavigationBarItem: UIView {
    var _subviews: [UIView] = []
    var scene: RNRNavigationScene?
    var leftBar: UIBarButtonItem?
    var rightBar: UIBarButtonItem?
    var refreshControl: RNRNavigationRefreshControl?

    @objc var title: NSString? = nil
    @objc var leftItemsSupplementBackButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var largeTitleDisplayMode: Int = UINavigationItem.LargeTitleDisplayMode.automatic.rawValue

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func reactSetFrame(_ frame: CGRect) {
    }

    override func reactSubviews() -> [UIView]! {
        _subviews
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        _subviews.insert(subview, at: atIndex)
        if scene?.controller != nil {
            _insertReactSubview(subview, at: atIndex)
        }
    }

    func _insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        if atIndex == 0 { // left bar
            if !(subview is RNRNavigationEmptyComponent) {
                if leftBar == nil {
                    leftBar = UIBarButtonItem()
                }
                leftBar!.customView = subview
                scene!.controller.navigationItem.leftBarButtonItem = leftBar
            } else {
                leftBar = nil
                scene!.controller.navigationItem.leftBarButtonItem = nil
            }
        } else if atIndex == 1 { // title
            if !(subview is RNRNavigationEmptyComponent) {
                scene!.controller.navigationItem.titleView = subview
            } else {
                scene!.controller.navigationItem.titleView = nil
            }
        } else if atIndex == 2 { // right bar
            if !(subview is RNRNavigationEmptyComponent) {
                if rightBar == nil {
                    rightBar = UIBarButtonItem()
                }
                rightBar!.customView = subview
                scene!.controller.navigationItem.rightBarButtonItem = rightBar
            } else {
                rightBar = nil
                scene!.controller.navigationItem.rightBarButtonItem = nil
            }
        } else if atIndex == 3 { // refresh control
            if subview is RNRNavigationRefreshControl {
                refreshControl = (subview as! RNRNavigationRefreshControl)
                refreshControl!.scene = scene
                refreshControl!.setup()
            } else {
                let scrollView = scene!.findScrollView()
                if scrollView != nil {
                    if #available(iOS 10.0, *) {
                        scrollView?.refreshControl = nil
                    }
                }
                refreshControl = nil
            }
        } else if atIndex == 4 { // search bar
            if subview is RNRNavigationSearch {
                (subview as! RNRNavigationSearch).controller = scene!.controller
                (subview as! RNRNavigationSearch).setup()
            } else {
                if #available(iOS 11.0, *) {
                    scene!.controller.navigationItem.searchController = nil
                }
            }
        }
    }

    override func removeReactSubview(_ subview: UIView!) {
    }

    override func didUpdateReactSubviews() {
    }

    func setup() {
        let navigationItem = scene!.controller.navigationItem

        if ((title) != nil) {
            navigationItem.title = title as String?
        }

        if leftItemsSupplementBackButton == -1 {
            navigationItem.leftItemsSupplementBackButton = false
        } else if leftItemsSupplementBackButton == 1 {
            navigationItem.leftItemsSupplementBackButton = true
        }

        if #available(iOS 11.0, *) {
            navigationItem.largeTitleDisplayMode = UINavigationItem.LargeTitleDisplayMode(rawValue: largeTitleDisplayMode)!
        }

        for (index, subview) in _subviews.enumerated() {
            _insertReactSubview(subview, at: index)
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        if scene?.controller != nil {
            let navigationItem = scene!.controller.navigationItem
            changedProps.forEach({ key in
                if key == "title" {
                    navigationItem.title = title as String?
                } else if key == "leftItemsSupplementBackButton" {
                    if leftItemsSupplementBackButton == -1 {
                        navigationItem.leftItemsSupplementBackButton = false
                    } else if leftItemsSupplementBackButton == 1 {
                        navigationItem.leftItemsSupplementBackButton = true
                    } else {
                        navigationItem.leftItemsSupplementBackButton = false
                    }
                } else if key == "largeTitleDisplayMode" {
                    if #available(iOS 11.0, *) {
                        navigationItem.largeTitleDisplayMode = UINavigationItem.LargeTitleDisplayMode(rawValue: largeTitleDisplayMode)!
                    }
                }
            })
        }
    }
}
