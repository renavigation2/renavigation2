class RNRSearchBar: UIView, RNRChild, RNRSearchBarProtocol, UISearchControllerDelegate, UISearchBarDelegate {
    var parent: RNRParent?
    var searchController: UISearchController = UISearchController(searchResultsController: nil)

    var isReady = false

    @objc var isActive: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var dimsBackgroundDuringPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var obscuresBackgroundDuringPresentation: NSNumber = 0  // 0 = nil, 1 = true, -1 = false
    @objc var hidesNavigationBarDuringPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var automaticallyShowsCancelButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var barStyle: String?
    @objc var text: String?
    @objc var prompt: String?
    @objc var placeholder: String?
    @objc var showsBookmarkButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var showsCancelButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var showsSearchResultsButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var isSearchResultsButtonSelected: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var _tintColor: NSNumber?
    @objc var barTintColor: NSNumber?
    @objc var searchBarStyle: String?
    @objc var isTranslucent: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var scopeButtonTitles: NSArray?
    @objc var selectedScopeButtonIndex: Int = 0
    @objc var showsScopeBar: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var onWillPresentSearch: RCTDirectEventBlock?
    @objc var onDidPresentSearch: RCTDirectEventBlock?
    @objc var onWillDismissSearch: RCTDirectEventBlock?
    @objc var onDidDismissSearch: RCTDirectEventBlock?
    @objc var onSearchBarSearchButtonPress: RCTDirectEventBlock?
    @objc var onSearchBarBookmarkButtonPress: RCTDirectEventBlock?
    @objc var onSearchBarCancelButtonPress: RCTDirectEventBlock?
    @objc var onSearchBarResultsListButtonPress: RCTDirectEventBlock?
    @objc var onSearchBarChange: RCTDirectEventBlock?

    var hasSetDefaults = false
    var defaultIsActive: Bool?
    var defaultDimsBackgroundDuringPresentation: Bool?
    var defaultObscuresBackgroundDuringPresentation: Bool?
    var defaultHidesNavigationBarDuringPresentation: Bool?
    var defaultAutomaticallyShowsCancelButton: Bool?
    var defaultBarStyle: UIBarStyle?
    var defaultText: String?
    var defaultPrompt: String?
    var defaultPlaceholder: String?
    var defaultShowsBookmarkButton: Bool?
    var defaultShowsCancelButton: Bool?
    var defaultShowsSearchResultsButton: Bool?
    var defaultIsSearchResultsButtonSelected: Bool?
    var defaultTintColor: UIColor?
    var defaultBarTintColor: UIColor?
    var defaultSearchBarStyle: UISearchBar.Style?
    var defaultIsTranslucent: Bool?
    var defaultScopeButtonTitles: [String]?
    var defaultShowsScopeBar: Bool?

    // Track change for this prop, because setting it to default NO will still change the behavior
    var hasShowsCancelButtonChanged = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
        searchController.delegate = self
        searchController.searchBar.delegate = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func didUpdateReactSubviews() {
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview != nil {
            parent = (newSuperview as! RNRParent)
            setup()
        }
    }

    func setup() {
        if !isReady && parent != nil {
            isReady = true
            if !parent!.isReady {
                setupParent(parent!)
            } else {
                updateInParent(parent!, subview: self)
            }
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    func setSearchBar() {
        if !hasSetDefaults {
            hasSetDefaults = true
            defaultIsActive = searchController.isActive
            defaultDimsBackgroundDuringPresentation = searchController.dimsBackgroundDuringPresentation
            if #available(iOS 9.1, *) {
                defaultObscuresBackgroundDuringPresentation = searchController.obscuresBackgroundDuringPresentation
            }
            defaultHidesNavigationBarDuringPresentation = searchController.hidesNavigationBarDuringPresentation
            if #available(iOS 13.0, *) {
                defaultAutomaticallyShowsCancelButton = searchController.automaticallyShowsCancelButton
            }
            defaultBarStyle = searchController.searchBar.barStyle
            defaultText = searchController.searchBar.text
            defaultPrompt = searchController.searchBar.prompt
            defaultPlaceholder = searchController.searchBar.placeholder
            defaultShowsBookmarkButton = searchController.searchBar.showsBookmarkButton
            defaultShowsCancelButton = searchController.searchBar.showsCancelButton
            defaultShowsSearchResultsButton = searchController.searchBar.showsSearchResultsButton
            defaultIsSearchResultsButtonSelected = searchController.searchBar.isSearchResultsButtonSelected
            defaultTintColor = searchController.searchBar.tintColor
            defaultBarTintColor = searchController.searchBar.barTintColor
            defaultSearchBarStyle = searchController.searchBar.searchBarStyle
            defaultIsTranslucent = searchController.searchBar.isTranslucent
            defaultScopeButtonTitles = searchController.searchBar.scopeButtonTitles
            defaultShowsScopeBar = searchController.searchBar.showsScopeBar
        }

        if isActive == -1 {
            searchController.isActive = false
        } else if isActive == 1 {
            searchController.isActive = true
        } else {
            searchController.isActive = defaultIsActive!
        }

        if dimsBackgroundDuringPresentation == -1 {
            searchController.dimsBackgroundDuringPresentation = false
        } else if dimsBackgroundDuringPresentation == 1 {
            searchController.dimsBackgroundDuringPresentation = true
        } else {
            searchController.dimsBackgroundDuringPresentation = defaultDimsBackgroundDuringPresentation!
        }

        if #available(iOS 9.1, *) {
            if obscuresBackgroundDuringPresentation == -1 {
                searchController.obscuresBackgroundDuringPresentation = false
            } else if obscuresBackgroundDuringPresentation == 1 {
                searchController.obscuresBackgroundDuringPresentation = true
            } else {
                searchController.obscuresBackgroundDuringPresentation = defaultObscuresBackgroundDuringPresentation!
            }
        }

        if hidesNavigationBarDuringPresentation == -1 {
            searchController.hidesNavigationBarDuringPresentation = false
        } else if hidesNavigationBarDuringPresentation == 1 {
            searchController.hidesNavigationBarDuringPresentation = true
        } else {
            searchController.hidesNavigationBarDuringPresentation = defaultHidesNavigationBarDuringPresentation!
        }

        if #available(iOS 13.0, *) {
            if automaticallyShowsCancelButton == -1 {
                searchController.automaticallyShowsCancelButton = false
            } else if isActive == 1 {
                searchController.automaticallyShowsCancelButton = true
            } else {
                searchController.automaticallyShowsCancelButton = defaultAutomaticallyShowsCancelButton!
            }
        }

        if barStyle == "default" {
            searchController.searchBar.barStyle = .default
        } else if barStyle == "black" {
            searchController.searchBar.barStyle = .black
        } else if barStyle == "black-translucent" {
            searchController.searchBar.barStyle = .blackTranslucent
        } else {
            searchController.searchBar.barStyle = defaultBarStyle!
        }

        if text != nil {
            searchController.searchBar.text = text as String?
        } else {
            searchController.searchBar.text = defaultText
        }

        if prompt != nil {
            searchController.searchBar.prompt = prompt as String?
        } else {
            searchController.searchBar.prompt = defaultPrompt
        }

        if placeholder != nil {
            searchController.searchBar.placeholder = placeholder as String?
        } else {
            searchController.searchBar.placeholder = defaultPlaceholder
        }

        if showsBookmarkButton == -1 {
            searchController.searchBar.showsBookmarkButton = false
        } else if showsBookmarkButton == 1 {
            searchController.searchBar.showsBookmarkButton = true
        } else {
            searchController.searchBar.showsBookmarkButton = defaultShowsBookmarkButton!
        }

        if showsCancelButton == -1 {
            hasShowsCancelButtonChanged = true
            searchController.searchBar.showsCancelButton = false
        } else if showsCancelButton == 1 {
            hasShowsCancelButtonChanged = true
            searchController.searchBar.showsCancelButton = true
        } else if hasShowsCancelButtonChanged {
            searchController.searchBar.showsCancelButton = defaultShowsCancelButton!
        }

        if showsSearchResultsButton == -1 {
            searchController.searchBar.showsSearchResultsButton = false
        } else if showsSearchResultsButton == 1 {
            searchController.searchBar.showsSearchResultsButton = true
        } else {
            searchController.searchBar.showsSearchResultsButton = defaultShowsSearchResultsButton!
        }

        if isSearchResultsButtonSelected == -1 {
            searchController.searchBar.isSearchResultsButtonSelected = false
        } else if isSearchResultsButtonSelected == 1 {
            searchController.searchBar.isSearchResultsButtonSelected = true
        } else {
            searchController.searchBar.isSearchResultsButtonSelected = defaultIsSearchResultsButtonSelected!
        }

        if _tintColor != nil {
            searchController.searchBar.tintColor = RCTConvert.uiColor(_tintColor)
        } else {
            searchController.searchBar.tintColor = defaultTintColor
        }

        if barTintColor != nil {
            searchController.searchBar.barTintColor = RCTConvert.uiColor(barTintColor)
        } else {
            searchController.searchBar.barTintColor = defaultBarTintColor
        }

        if searchBarStyle == "default" {
            searchController.searchBar.searchBarStyle = .default
        } else if searchBarStyle == "prominent" {
            searchController.searchBar.searchBarStyle = .prominent
        } else if searchBarStyle == "minimal" {
            searchController.searchBar.searchBarStyle = .minimal
        } else {
            searchController.searchBar.searchBarStyle = defaultSearchBarStyle!
        }

        if isTranslucent == -1 {
            searchController.searchBar.isTranslucent = false
        } else if isTranslucent == 1 {
            searchController.searchBar.isTranslucent = true
        } else {
            searchController.searchBar.isTranslucent = defaultIsTranslucent!
        }

        if scopeButtonTitles != nil {
            searchController.searchBar.scopeButtonTitles = (scopeButtonTitles as! [String])
        } else {
            searchController.searchBar.scopeButtonTitles = defaultScopeButtonTitles
        }

        searchController.searchBar.selectedScopeButtonIndex = selectedScopeButtonIndex

        if showsScopeBar == -1 {
            searchController.searchBar.showsScopeBar = false
        } else if showsScopeBar == 1 {
            searchController.searchBar.showsScopeBar = true
        } else {
            searchController.searchBar.showsScopeBar = defaultShowsScopeBar!
        }

        if reactSubviews() != nil && !reactSubviews()!.isEmpty {
            searchController.view = reactSubviews()[0]
        } else {
            searchController.view = nil
        }
    }

    func willPresentSearchController(_ searchController: UISearchController) {
        if onWillPresentSearch != nil {
            onWillPresentSearch!([:])
        }
    }

    func didPresentSearchController(_ searchController: UISearchController) {
        if onDidPresentSearch != nil {
            onDidPresentSearch!([:])
        }
    }

    func willDismissSearchController(_ searchController: UISearchController) {
        if onWillDismissSearch != nil {
            onWillDismissSearch!([:])
        }
    }

    func didDismissSearchController(_ searchController: UISearchController) {
        if onDidDismissSearch != nil {
            onDidDismissSearch!([:])
        }
    }

    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        if onSearchBarSearchButtonPress != nil {
            onSearchBarSearchButtonPress!([:])
        }
    }

    func searchBarBookmarkButtonClicked(_ searchBar: UISearchBar) {
        if onSearchBarBookmarkButtonPress != nil {
            onSearchBarBookmarkButtonPress!([:])
        }
    }

    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        if onSearchBarCancelButtonPress != nil {
            onSearchBarCancelButtonPress!([:])
        }
    }

    func searchBarResultsListButtonClicked(_ searchBar: UISearchBar) {
        if onSearchBarResultsListButtonPress != nil {
            onSearchBarResultsListButtonPress!([:])
        }
    }

    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        if onSearchBarChange != nil {
            onSearchBarChange!(["value": searchText])
        }
    }
}
