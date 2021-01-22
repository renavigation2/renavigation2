import RenavigationCore

class RNRNavigationItem: UIView, RNRChild, RNRParent {
    var parent: RNRNavigationScene?

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var title: String? = nil
    @objc var leftItemsSupplementBackButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var largeTitleDisplayMode: String?
    @objc var prompt: String?
    @objc var backButtonTitle: String?
    @objc var hidesBackButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var backButtonDisplayMode: String?
    @objc var hidesSearchBarWhenScrolling: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    var hasSetDefaults = false
    var defaultLeftItemsSupplementBackButton: Bool?
    var defaultLargeTitleDisplayMode: UINavigationItem.LargeTitleDisplayMode?
    var defaultHidesBackButton: Bool?
    var defaultBackButtonDisplayMode: Any?
    var defaultHidesSearchBarWhenScrolling: Bool?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        if !isReady {
            setup()
        } else if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview != nil {
            parent = (newSuperview as! RNRNavigationScene)
            setup()
        }
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady(reactSubviews())
            if childrenReady {
                isReady = true
                if !parent!.isReady {
                    setupParent(parent!)
                } else {
                    updateInParent(parent!, subview: self)
                }
            }
        }
    }

    func updateSubview(_ subview: UIView) {
        if isReady && parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if isReady && parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    func getRefreshControl() -> RNRRefreshControlProtocol? {
        let subviews = reactSubviews()
        if subviews != nil && subviews!.indices.contains(11) {
            if let view = subviews![11] as? RNRRefreshControlProtocol {
                return view
            }
        }
        return nil
    }

    func setNavigationItem(_ navigationItem: UINavigationItem) {
        if !hasSetDefaults {
            hasSetDefaults = true
            defaultLeftItemsSupplementBackButton = navigationItem.leftItemsSupplementBackButton
            if #available(iOS 11.0, *) {
                defaultLargeTitleDisplayMode = navigationItem.largeTitleDisplayMode
            }
            defaultHidesBackButton = navigationItem.hidesBackButton
            if #available(iOS 14.0, *) {
                defaultBackButtonDisplayMode = navigationItem.backButtonDisplayMode
            }
            if #available(iOS 11.0, *) {
                defaultHidesSearchBarWhenScrolling = navigationItem.hidesSearchBarWhenScrolling
            }
        }

        navigationItem.title = title

        if leftItemsSupplementBackButton == 1 {
            navigationItem.leftItemsSupplementBackButton = true
        } else if leftItemsSupplementBackButton == -1 {
            navigationItem.leftItemsSupplementBackButton = false
        } else {
            navigationItem.leftItemsSupplementBackButton = defaultLeftItemsSupplementBackButton!
        }

        if #available(iOS 11.0, *) {
            if largeTitleDisplayMode == "automatic" {
            navigationItem.largeTitleDisplayMode = .automatic
            } else if largeTitleDisplayMode == "always" {
                navigationItem.largeTitleDisplayMode = .always
            } else if largeTitleDisplayMode == "never" {
                navigationItem.largeTitleDisplayMode = .never
            } else {
                navigationItem.largeTitleDisplayMode = defaultLargeTitleDisplayMode!
            }
        }

        navigationItem.prompt = prompt
        if #available(iOS 11.0, *) {
            navigationItem.backButtonTitle = backButtonTitle
        }

        if hidesBackButton == 1 {
            navigationItem.hidesBackButton = true
        } else if hidesBackButton == -1 {
            navigationItem.hidesBackButton = false
        } else {
            navigationItem.hidesBackButton = defaultHidesBackButton!
        }

        if #available(iOS 14.0, *) {
            if backButtonDisplayMode == "default" {
                navigationItem.backButtonDisplayMode = .default
            } else if backButtonDisplayMode == "generic" {
                navigationItem.backButtonDisplayMode = .generic
            } else if backButtonDisplayMode == "minimal" {
                navigationItem.backButtonDisplayMode = .minimal
            } else if defaultBackButtonDisplayMode != nil {
                navigationItem.backButtonDisplayMode = defaultBackButtonDisplayMode as! UINavigationItem.BackButtonDisplayMode
            }
        }

        if #available(iOS 11.0, *) {
            if hidesSearchBarWhenScrolling == 1 {
                navigationItem.hidesSearchBarWhenScrolling = true
            } else if hidesSearchBarWhenScrolling == -1 {
                navigationItem.hidesSearchBarWhenScrolling = false
            } else {
                navigationItem.hidesSearchBarWhenScrolling = defaultHidesSearchBarWhenScrolling!
            }
        }

        var hasLeftContent = false
        var hasRightContent = false
        reactSubviews().enumerated().forEach { (index, subview) in
            if index == 1 { // leftButton
                if subview is RNRBarButtonItemProtocol {
                    hasLeftContent = true
                    navigationItem.leftBarButtonItem = nil
                    navigationItem.leftBarButtonItem = (subview as! RNRBarButtonItemProtocol).getBarButtonItem()
                } else {
                    navigationItem.leftBarButtonItem = nil
                }
            } else if index == 2 { // leftButtons
                if subview is RNRBarButtonItemsProtocol {
                    hasLeftContent = true
                    navigationItem.leftBarButtonItems = nil
                    navigationItem.leftBarButtonItems = (subview as! RNRBarButtonItemsProtocol).getBarButtonItems()
                } else if !hasLeftContent {
                    navigationItem.leftBarButtonItem = nil
                }
            } else if index == 3 { // leftContent
                if !hasLeftContent {
                    if subview is RNREmptyComponentProtocol {
                        navigationItem.leftBarButtonItem = nil
                    } else {
                        navigationItem.leftBarButtonItem = nil
                        if !subview.reactSubviews().isEmpty && (subview as! RNRNavigationBarContent).isReady {
                            let leftBarButtonItem = UIBarButtonItem()
                            leftBarButtonItem.customView = subview.reactSubviews()[0]
                            navigationItem.leftBarButtonItem = leftBarButtonItem
                        }
                    }
                }
            } else if index == 4 { // backButton
                if subview is RNRBarButtonItemProtocol {
                    navigationItem.backBarButtonItem = nil
                    navigationItem.backBarButtonItem = (subview as! RNRBarButtonItemProtocol).getBarButtonItem()
                } else {
                    navigationItem.backBarButtonItem = nil
                }
            } else if index == 5 { // rightButton
                if subview is RNRBarButtonItemProtocol {
                    hasRightContent = true
                    navigationItem.rightBarButtonItem = nil
                    navigationItem.rightBarButtonItem = (subview as! RNRBarButtonItemProtocol).getBarButtonItem()
                } else {
                    navigationItem.rightBarButtonItem = nil
                }
            } else if index == 6 { // rightButtons
                if subview is RNRBarButtonItemsProtocol {
                    hasRightContent = true
                    navigationItem.rightBarButtonItems = nil
                    navigationItem.rightBarButtonItems = (subview as! RNRBarButtonItemsProtocol).getBarButtonItems()
                } else if !hasRightContent {
                    navigationItem.rightBarButtonItems = nil
                }
            } else if index == 7 { // rightContent
                if !hasRightContent {
                    if subview is RNREmptyComponentProtocol {
                        navigationItem.rightBarButtonItem = nil
                    } else {
                        navigationItem.rightBarButtonItem = nil
                        if !subview.reactSubviews().isEmpty && (subview as! RNRNavigationBarContent).isReady {
                            let rightBarButtonItem = UIBarButtonItem()
                            rightBarButtonItem.customView = subview.reactSubviews()[0]
                            navigationItem.rightBarButtonItem = rightBarButtonItem
                        }
                    }
                }
            } else if index == 8 { // standardAppearance
                if #available(iOS 13.0, *) {
                    if subview is RNRNavigationBarAppearance {
                        navigationItem.standardAppearance = nil
                        navigationItem.standardAppearance = (subview as! RNRNavigationBarAppearance).getNavigationBarAppearance()
                    } else {
                        navigationItem.standardAppearance = nil
                    }
                }
            } else if index == 9 { // compactAppearance
                if #available(iOS 13.0, *) {
                    if subview is RNRNavigationBarAppearance {
                        navigationItem.compactAppearance = nil
                        navigationItem.compactAppearance = (subview as! RNRNavigationBarAppearance).getNavigationBarAppearance()
                    } else {
                        navigationItem.compactAppearance = nil
                    }
                }
            } else if index == 10 { // scrollEdgeAppearance
                if #available(iOS 13.0, *) {
                    if subview is RNRNavigationBarAppearance {
                        navigationItem.scrollEdgeAppearance = nil
                        navigationItem.scrollEdgeAppearance = (subview as! RNRNavigationBarAppearance).getNavigationBarAppearance()
                    } else {
                        navigationItem.scrollEdgeAppearance = nil
                    }
                }
            } else if index == 11 { // refreshControl
                // Refresh control is not handled here
            } else if index == 12 { // searchBar
                if #available(iOS 11, *) {
                    if subview is RNRSearchBarProtocol {
                        (subview as! RNRSearchBarProtocol).setSearchBar()
                        navigationItem.searchController = (subview as! RNRSearchBarProtocol).searchController
                    } else {
                        navigationItem.searchController = nil
                    }
                }
            }

            // Do title last, not sure if this had an impact but it can't hurt
            if index == 0 { // titleView
                if subview is RNREmptyComponentProtocol {
                    navigationItem.titleView = nil
                } else {
                    if !subview.reactSubviews().isEmpty && (subview as! RNRNavigationBarContent).isReady {
                        navigationItem.titleView = subview.reactSubviews()[0]
                    }
                }
            }
        }
    }
}
