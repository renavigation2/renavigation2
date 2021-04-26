import RenavigationCore

class RNRNavigationItem: UIView, RNRChild, RNRParent {
    var parent: RNRNavigationScene?

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
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
        isHidden = true
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
        if elementsIndices?["refreshControl"] != nil && elementsIndices?["refreshControl"] != -1 {
            if let view = reactSubviews()?[elementsIndices!["refreshControl"]!] as? RNRRefreshControlProtocol {
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

        if elementsIndices?["leftBarButtonItem"] != nil && elementsIndices?["leftBarButtonItem"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["leftBarButtonItem"]!] as? RNRBarButtonItemProtocol {
                hasLeftContent = true
                navigationItem.leftBarButtonItem = nil
                navigationItem.leftBarButtonItem = subview.getBarButtonItem()
            }
        } else {
            navigationItem.leftBarButtonItem = nil
        }

        if elementsIndices?["leftBarButtonItems"] != nil && elementsIndices?["leftBarButtonItems"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["leftBarButtonItems"]!] as? RNRBarButtonItemsProtocol {
                hasLeftContent = true
                navigationItem.leftBarButtonItems = nil
                navigationItem.leftBarButtonItems = subview.getBarButtonItems()
            }
        } else {
            navigationItem.leftBarButtonItems = nil
        }

        if !hasLeftContent {
            if elementsIndices?["leftContent"] != nil && elementsIndices?["leftContent"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["leftContent"]!] as? RNRNavigationBarContent {
                    navigationItem.leftBarButtonItem = nil
                    if !subview.reactSubviews().isEmpty && subview.isReady {
                        let leftBarButtonItem = UIBarButtonItem()
                        leftBarButtonItem.customView = subview.reactSubviews()[0]
                        navigationItem.leftBarButtonItem = leftBarButtonItem
                    }
                }
            } else {
                navigationItem.leftBarButtonItem = nil
            }
        }

        if elementsIndices?["backBarButtonItem"] != nil && elementsIndices?["backBarButtonItem"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backBarButtonItem"]!] as? RNRBarButtonItemProtocol {
                navigationItem.backBarButtonItem = nil
                navigationItem.backBarButtonItem = subview.getBarButtonItem()
            }
        } else {
            navigationItem.backBarButtonItem = nil
        }

        if elementsIndices?["rightBarButtonItem"] != nil && elementsIndices?["rightBarButtonItem"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["rightBarButtonItem"]!] as? RNRBarButtonItemProtocol {
                hasRightContent = true
                navigationItem.rightBarButtonItem = nil
                navigationItem.rightBarButtonItem = subview.getBarButtonItem()
            }
        } else {
            navigationItem.rightBarButtonItem = nil
        }

        if elementsIndices?["rightBarButtonItems"] != nil && elementsIndices?["rightBarButtonItems"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["rightBarButtonItems"]!] as? RNRBarButtonItemsProtocol {
                hasRightContent = true
                navigationItem.rightBarButtonItems = nil
                navigationItem.rightBarButtonItems = subview.getBarButtonItems()
            }
        } else {
            navigationItem.rightBarButtonItems = nil
        }

        if !hasRightContent {
            if elementsIndices?["rightContent"] != nil && elementsIndices?["rightContent"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["rightContent"]!] as? RNRNavigationBarContent {
                    navigationItem.rightBarButtonItem = nil
                    if !subview.reactSubviews().isEmpty && subview.isReady {
                        let rightBarButtonItem = UIBarButtonItem()
                        rightBarButtonItem.customView = subview.reactSubviews()[0]
                        navigationItem.rightBarButtonItem = rightBarButtonItem
                    }
                }
            } else {
                navigationItem.rightBarButtonItem = nil
            }
        }

        if #available(iOS 13.0, *) {
            if elementsIndices?["standardAppearance"] != nil && elementsIndices?["standardAppearance"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["standardAppearance"]!] as? RNRNavigationBarAppearance {
                    navigationItem.standardAppearance = nil
                    navigationItem.standardAppearance = subview.getNavigationBarAppearance()
                }
            } else {
                navigationItem.standardAppearance = nil
            }

            if elementsIndices?["compactAppearance"] != nil && elementsIndices?["compactAppearance"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["compactAppearance"]!] as? RNRNavigationBarAppearance {
                    navigationItem.compactAppearance = nil
                    navigationItem.compactAppearance = subview.getNavigationBarAppearance()
                }
            } else {
                navigationItem.compactAppearance = nil
            }

            if elementsIndices?["scrollEdgeAppearance"] != nil && elementsIndices?["scrollEdgeAppearance"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["scrollEdgeAppearance"]!] as? RNRNavigationBarAppearance {
                    navigationItem.scrollEdgeAppearance = nil
                    navigationItem.scrollEdgeAppearance = subview.getNavigationBarAppearance()
                }
            } else {
                navigationItem.scrollEdgeAppearance = nil
            }

            if elementsIndices?["searchBar"] != nil && elementsIndices?["searchBar"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["searchBar"]!] as? RNRSearchBarProtocol {
                    subview.setSearchBar()
                    navigationItem.searchController = subview.searchController
                }
            } else {
                navigationItem.searchController = nil
            }
        }

        // Do title last, not sure if this had an impact but it can't hurt
        if elementsIndices?["titleView"] != nil && elementsIndices?["titleView"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["titleView"]!] as? RNRNavigationBarContent {
                navigationItem.titleView = subview.reactSubviews()[0]
            }
        } else {
            navigationItem.titleView = nil
        }
    }
}
