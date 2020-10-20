class RNRNavigationBarItem: UIView {
    var _subviews: [UIView] = []
    var scene: RNRNavigationScene?
    var leftBar: UIBarButtonItem?
    var rightBar: UIBarButtonItem?
    var backBar: UIBarButtonItem?
    var refreshControl: RNRNavigationRefreshControl?

    @objc var title: NSString? = nil
    @objc var leftItemsSupplementBackButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var largeTitleDisplayMode: Int = UINavigationItem.LargeTitleDisplayMode.automatic.rawValue
    @objc var prompt: NSString? = nil
    @objc var leftButton: NSDictionary? = nil
    @objc var leftButtons: NSArray? = nil
    @objc var backButton: NSDictionary? = nil
    @objc var rightButton: NSDictionary? = nil
    @objc var rightButtons: NSArray? = nil
    @objc var backButtonTitle: NSString? = nil
    @objc var hidesBackButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var backButtonDisplayMode: Int = UINavigationItem.BackButtonDisplayMode.default.rawValue
    @objc var hidesSearchBarWhenScrolling: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var standardAppearance: NSDictionary? = nil
    @objc var compactAppearance: NSDictionary? = nil
    @objc var scrollEdgeAppearance: NSDictionary? = nil
    @objc var onActionButtonPress: RCTDirectEventBlock? = nil

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
                if rightButton == nil {
                    scene!.controller.navigationItem.rightBarButtonItem = nil
                } else {
                    if #available(iOS 14.0, *) {
                        scene!.controller.navigationItem.rightBarButtonItem = RNRNavigationButton.getButton(rightButton!,
                                onActionSelect: self.onActionSelect,
                                onLoadingComplete: self.onLoadingComplete
                        )
                    } else {
                        scene!.controller.navigationItem.rightBarButtonItem = RNRNavigationButton.getButton(rightButton!, onAction: self.onPrimaryActionSelect)
                    }
                }
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
        } else if atIndex == 5 { // back bar
            if !(subview is RNRNavigationEmptyComponent) {
                if backBar == nil {
                    backBar = UIBarButtonItem()
                }
                backBar!.customView = subview
                scene!.controller.navigationItem.backBarButtonItem = backBar
            } else {
                backBar = nil
                scene!.controller.navigationItem.backBarButtonItem = nil
            }
        }
    }

    func onPrimaryActionSelect(id: String) -> Void {
        if onActionButtonPress != nil {
            onActionButtonPress!(["id": id])
        }
    }

    @available(iOS 13.0, *)
    func onActionSelect(_ action: UIAction, id: String) -> Void {
        if onActionButtonPress != nil {
            onActionButtonPress!(["id": id])
        }
    }

    @available(iOS 13.0, *)
    func onLoadingComplete(_ completion: ([UIMenuElement]) -> Void) -> Void {
        NSLog("onAction....")
    }

    override func removeReactSubview(_ subview: UIView!) {
    }

    override func didUpdateReactSubviews() {
    }

    func setup() {
        let navigationItem = scene!.controller.navigationItem

        if (title != nil) {
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
        if (prompt != nil) {
            navigationItem.prompt = prompt as String?
        }
        if (backButtonTitle != nil) {
            if #available(iOS 11.0, *) {
                navigationItem.backButtonTitle = backButtonTitle as String?
            }
        }

        if rightButton != nil {
            if #available(iOS 14.0, *) {
                navigationItem.rightBarButtonItem = RNRNavigationButton.getButton(rightButton!,
                        onActionSelect: self.onActionSelect,
                        onLoadingComplete: self.onLoadingComplete
                )
            } else {
                navigationItem.rightBarButtonItem = RNRNavigationButton.getButton(rightButton!, onAction: self.onPrimaryActionSelect)
            }
        }

        if rightButtons != nil {
            var finalRightButtons: [UIBarButtonItem] = []
            rightButtons?.forEach { element in
                if #available(iOS 14.0, *) {
                    finalRightButtons.append(RNRNavigationButton.getButton(element as! NSDictionary,
                            onActionSelect: self.onActionSelect,
                            onLoadingComplete: self.onLoadingComplete
                    ))
                } else {
                    finalRightButtons.append(
                            RNRNavigationButton.getButton(element as! NSDictionary, onAction: self.onPrimaryActionSelect)
                    )
                }
            }
            navigationItem.rightBarButtonItems = finalRightButtons
        }

        if leftButton != nil {
            if #available(iOS 14.0, *) {
                navigationItem.leftBarButtonItem = RNRNavigationButton.getButton(leftButton!,
                        onActionSelect: self.onActionSelect,
                        onLoadingComplete: self.onLoadingComplete
                )
            } else {
                navigationItem.leftBarButtonItem = RNRNavigationButton.getButton(leftButton!, onAction: self.onPrimaryActionSelect)
            }
        }

        if leftButtons != nil {
            var finalLeftButtons: [UIBarButtonItem] = []
            leftButtons?.forEach { element in
                if #available(iOS 14.0, *) {
                    finalLeftButtons.append(RNRNavigationButton.getButton(element as! NSDictionary,
                            onActionSelect: self.onActionSelect,
                            onLoadingComplete: self.onLoadingComplete
                    ))
                } else {
                    finalLeftButtons.append(
                            RNRNavigationButton.getButton(element as! NSDictionary, onAction: self.onPrimaryActionSelect)
                    )
                }
            }
            navigationItem.leftBarButtonItems = finalLeftButtons
        }

        if backButton != nil {
            if #available(iOS 14.0, *) {
                navigationItem.backBarButtonItem = RNRNavigationButton.getButton(backButton!,
                        onActionSelect: self.onActionSelect,
                        onLoadingComplete: self.onLoadingComplete
                )
            } else {
                navigationItem.backBarButtonItem = RNRNavigationButton.getButton(backButton!, onAction: self.onPrimaryActionSelect)
            }
        }

        if hidesBackButton == -1 {
            navigationItem.hidesBackButton = false
        } else if hidesBackButton == 1 {
            navigationItem.hidesBackButton = true
        }
        if #available(iOS 14.0, *) {
            navigationItem.backButtonDisplayMode = UINavigationItem.BackButtonDisplayMode.init(rawValue: backButtonDisplayMode)!
        }

        if #available(iOS 11.0, *) {
            if hidesSearchBarWhenScrolling == -1 {
                navigationItem.hidesSearchBarWhenScrolling = false
            } else if hidesSearchBarWhenScrolling == 1 {
                navigationItem.hidesSearchBarWhenScrolling = true
            }
        }
        if standardAppearance != nil {
            if #available(iOS 13.0, *) {
                navigationItem.standardAppearance = RNRNavigationBarAppearance.getBarAppearance(standardAppearance!)
            }
        }
        if compactAppearance != nil {
            if #available(iOS 13.0, *) {
                navigationItem.compactAppearance = RNRNavigationBarAppearance.getBarAppearance(compactAppearance!)
            }
        }
        if scrollEdgeAppearance != nil {
            if #available(iOS 13.0, *) {
                navigationItem.scrollEdgeAppearance = RNRNavigationBarAppearance.getBarAppearance(scrollEdgeAppearance!)
            }
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
                } else if key == "rightButton" {
                    if rightButton != nil {
                        if #available(iOS 14.0, *) {
                            navigationItem.rightBarButtonItem = RNRNavigationButton.getButton(rightButton!,
                                    onActionSelect: self.onActionSelect,
                                    onLoadingComplete: self.onLoadingComplete
                            )
                        } else {
                            navigationItem.rightBarButtonItem = RNRNavigationButton.getButton(rightButton!, onAction: self.onPrimaryActionSelect)
                        }
                    } else {
                        navigationItem.rightBarButtonItem = rightBar
                    }
                } else if key == "rightButtons" {
                    if rightButtons != nil {
                        var finalRightButtons: [UIBarButtonItem] = []
                        rightButtons?.forEach { element in
                            if #available(iOS 14.0, *) {
                                finalRightButtons.append(RNRNavigationButton.getButton(element as! NSDictionary,
                                        onActionSelect: self.onActionSelect,
                                        onLoadingComplete: self.onLoadingComplete
                                ))
                            } else {
                                finalRightButtons.append(
                                        RNRNavigationButton.getButton(element as! NSDictionary, onAction: self.onPrimaryActionSelect)
                                )
                            }
                        }
                        navigationItem.rightBarButtonItems = finalRightButtons
                    } else {
                        navigationItem.rightBarButtonItems = nil
                    }
                } else if key == "leftButton" {
                    if leftButton != nil {
                        if #available(iOS 14.0, *) {
                            navigationItem.leftBarButtonItem = RNRNavigationButton.getButton(leftButton!,
                                    onActionSelect: self.onActionSelect,
                                    onLoadingComplete: self.onLoadingComplete
                            )
                        } else {
                            navigationItem.leftBarButtonItem = RNRNavigationButton.getButton(leftButton!, onAction: self.onPrimaryActionSelect)
                        }
                    } else {
                        navigationItem.leftBarButtonItem = leftBar
                    }
                } else if key == "leftButtons" {
                    if leftButtons != nil {
                        var finalLeftButtons: [UIBarButtonItem] = []
                        leftButtons?.forEach { element in
                            if #available(iOS 14.0, *) {
                                finalLeftButtons.append(RNRNavigationButton.getButton(element as! NSDictionary,
                                        onActionSelect: self.onActionSelect,
                                        onLoadingComplete: self.onLoadingComplete
                                ))
                            } else {
                                finalLeftButtons.append(
                                        RNRNavigationButton.getButton(element as! NSDictionary, onAction: self.onPrimaryActionSelect)
                                )
                            }
                        }
                        navigationItem.leftBarButtonItems = finalLeftButtons
                    } else {
                        navigationItem.leftBarButtonItems = nil
                    }
                } else if key == "backButton" {
                    if backButton != nil {
                        if #available(iOS 14.0, *) {
                            navigationItem.backBarButtonItem = RNRNavigationButton.getButton(backButton!,
                                    onActionSelect: self.onActionSelect,
                                    onLoadingComplete: self.onLoadingComplete
                            )
                        } else {
                            navigationItem.backBarButtonItem = RNRNavigationButton.getButton(backButton!, onAction: self.onPrimaryActionSelect)
                        }
                    } else {
                        navigationItem.backBarButtonItem = nil
                    }
                } else if key == "prompt" {
                    navigationItem.prompt = prompt as String?
                } else if key == "backButtonTitle" {
                    if #available(iOS 11.0, *) {
                        navigationItem.backButtonTitle = backButtonTitle as String?
                    }
                } else if key == "hidesBackButton" {
                    if hidesBackButton == -1 {
                        navigationItem.hidesBackButton = false
                    } else if hidesBackButton == 1 {
                        navigationItem.hidesBackButton = true
                    } else {
                        navigationItem.hidesBackButton = false
                    }
                } else if key == "backButtonDisplayMode" {
                    if #available(iOS 14.0, *) {
                        navigationItem.backButtonDisplayMode = UINavigationItem.BackButtonDisplayMode.init(rawValue: backButtonDisplayMode)!
                    }
                } else if key == "hidesSearchBarWhenScrolling" {
                    if #available(iOS 11.0, *) {
                        if hidesSearchBarWhenScrolling == -1 {
                            navigationItem.hidesSearchBarWhenScrolling = false
                        } else if hidesSearchBarWhenScrolling == 1 {
                            navigationItem.hidesSearchBarWhenScrolling = true
                        } else {
                            navigationItem.hidesSearchBarWhenScrolling = true
                        }
                    }
                } else if key == "standardAppearance" {
                    if #available(iOS 13.0, *) {
                        navigationItem.standardAppearance = RNRNavigationBarAppearance.getBarAppearance(standardAppearance!)
                    }
                } else if key == "compactAppearance" {
                    if #available(iOS 13.0, *) {
                        navigationItem.compactAppearance = RNRNavigationBarAppearance.getBarAppearance(compactAppearance!)
                    }
                } else if key == "scrollEdgeAppearance" {
                    if #available(iOS 13.0, *) {
                        navigationItem.scrollEdgeAppearance = RNRNavigationBarAppearance.getBarAppearance(scrollEdgeAppearance!)
                    }
                }
            })
        }
    }
}
