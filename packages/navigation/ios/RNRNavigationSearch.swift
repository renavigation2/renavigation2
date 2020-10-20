class RNRNavigationSearch: UIView, UISearchControllerDelegate, UISearchBarDelegate {
    var _subviews: [UIView] = []
    var controller: UIViewController?
    var searchController = UISearchController(searchResultsController: nil)

    var initialized = false

    @objc var isActive: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var dimsBackgroundDuringPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var obscuresBackgroundDuringPresentation: NSNumber = 0  // 0 = nil, 1 = true, -1 = false
    @objc var hidesNavigationBarDuringPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var automaticallyShowsCancelButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var barStyle: Int = UIBarStyle.default.rawValue
    @objc var text: NSString? = nil
    @objc var prompt: NSString? = nil
    @objc var placeholder: NSString? = nil
    @objc var showsBookmarkButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var showsCancelButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var showsSearchResultsButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var isSearchResultsButtonSelected: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var searchTintColor: NSNumber? = nil
    @objc var barTintColor: NSNumber? = nil
    @objc var searchBarStyle: Int = Int(UISearchBar.Style.default.rawValue)
    @objc var isTranslucent: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var scopeButtonTitles: NSArray? = nil
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

    override init(frame: CGRect) {
        super.init(frame: frame)
        searchController.delegate = self
        searchController.searchBar.delegate = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        super.insertReactSubview(subview, at: atIndex)
        _subviews.insert(subview, at: atIndex)
        if controller != nil {
            _insertReactSubview(subview, at: atIndex)
        }
    }

    override func removeReactSubview(_ subview: UIView!) {
        super.removeReactSubview(subview)
        _subviews.removeAll(where: { $0 == subview })
    }

    func _insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        if #available(iOS 11.0, *) {
            controller!.navigationItem.searchController!.view = subview
        }
    }

    func _removeReactSubview(_ subview: UIView!, at atIndex: Int) {
        if #available(iOS 11.0, *) {
            controller!.navigationItem.searchController!.view = nil
        }
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        if controller != nil {
            for (index, subview) in _subviews.enumerated() {
                _insertReactSubview(subview, at: index)
            }
        }
    }

    func setup() {
        if !initialized && controller != nil {
            initialized = true

            if #available(iOS 11.0, *) {
                controller?.navigationItem.searchController = searchController
            }

            if isActive == -1 {
                searchController.isActive = false
            } else if isActive == 1 {
                searchController.isActive = true
            }
            if dimsBackgroundDuringPresentation == -1 {
                searchController.dimsBackgroundDuringPresentation = false
            } else if dimsBackgroundDuringPresentation == 1 {
                searchController.dimsBackgroundDuringPresentation = true
            }
            if #available(iOS 9.1, *) {
                if obscuresBackgroundDuringPresentation == -1 {
                    searchController.obscuresBackgroundDuringPresentation = false
                } else if obscuresBackgroundDuringPresentation == 1 {
                    searchController.obscuresBackgroundDuringPresentation = true
                }
            }
            if hidesNavigationBarDuringPresentation == -1 {
                searchController.hidesNavigationBarDuringPresentation = false
            } else if hidesNavigationBarDuringPresentation == 1 {
                searchController.hidesNavigationBarDuringPresentation = true
            }
            if #available(iOS 13.0, *) {
                if automaticallyShowsCancelButton == -1 {
                    searchController.automaticallyShowsCancelButton = false
                } else if isActive == 1 {
                    searchController.automaticallyShowsCancelButton = true
                }
            }
            searchController.searchBar.barStyle = UIBarStyle(rawValue: barStyle)!
            if text != nil {
                searchController.searchBar.text = text as String?
            }
            if prompt != nil {
                searchController.searchBar.prompt = prompt as String?
            }
            if placeholder != nil {
                searchController.searchBar.placeholder = placeholder as String?
            }
            if showsBookmarkButton == -1 {
                searchController.searchBar.showsBookmarkButton = false
            } else if showsBookmarkButton == 1 {
                searchController.searchBar.showsBookmarkButton = true
            }
            if showsCancelButton == -1 {
                searchController.searchBar.showsCancelButton = false
            } else if showsCancelButton == 1 {
                searchController.searchBar.showsCancelButton = true
            }
            if showsSearchResultsButton == -1 {
                searchController.searchBar.showsSearchResultsButton = false
            } else if showsSearchResultsButton == 1 {
                searchController.searchBar.showsSearchResultsButton = true
            }
            if isSearchResultsButtonSelected == -1 {
                searchController.searchBar.isSearchResultsButtonSelected = false
            } else if isSearchResultsButtonSelected == 1 {
                searchController.searchBar.isSearchResultsButtonSelected = true
            }
            if searchTintColor != nil {
                searchController.searchBar.tintColor = RCTConvert.uiColor(searchTintColor)
            }
            if barTintColor != nil {
                searchController.searchBar.barTintColor = RCTConvert.uiColor(barTintColor)
            }
            searchController.searchBar.searchBarStyle = UISearchBar.Style(rawValue: UInt(searchBarStyle))!
            if isTranslucent == -1 {
                searchController.searchBar.isTranslucent = false
            } else if isTranslucent == 1 {
                searchController.searchBar.isTranslucent = true
            }
            if scopeButtonTitles != nil {
                searchController.searchBar.scopeButtonTitles = (scopeButtonTitles as! [String])
            }
            searchController.searchBar.selectedScopeButtonIndex = selectedScopeButtonIndex
            if showsScopeBar == -1 {
                searchController.searchBar.showsScopeBar = false
            } else if showsScopeBar == 1 {
                searchController.searchBar.showsScopeBar = true
            }

            for (index, subview) in _subviews.enumerated() {
                _insertReactSubview(subview, at: index)
            }
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        if initialized {
            changedProps.forEach({ key in
                if key == "isActive" {
                    if isActive == -1 {
                        searchController.isActive = false
                    } else if isActive == 1 {
                        searchController.isActive = true
                    } else {
                        searchController.isActive = false
                    }
                } else if key == "dimsBackgroundDuringPresentation" {
                    if dimsBackgroundDuringPresentation == -1 {
                        searchController.dimsBackgroundDuringPresentation = false
                    } else if dimsBackgroundDuringPresentation == 1 {
                        searchController.dimsBackgroundDuringPresentation = true
                    } else {
                        searchController.dimsBackgroundDuringPresentation = true
                    }
                } else if key == "obscuresBackgroundDuringPresentation" {
                    if #available(iOS 9.1, *) {
                        if obscuresBackgroundDuringPresentation == -1 {
                            searchController.obscuresBackgroundDuringPresentation = false
                        } else if obscuresBackgroundDuringPresentation == 1 {
                            searchController.obscuresBackgroundDuringPresentation = true
                        } else {
                            searchController.obscuresBackgroundDuringPresentation = true
                        }
                    }
                } else if key == "hidesNavigationBarDuringPresentation" {
                    if hidesNavigationBarDuringPresentation == -1 {
                        searchController.hidesNavigationBarDuringPresentation = false
                    } else if hidesNavigationBarDuringPresentation == 1 {
                        searchController.hidesNavigationBarDuringPresentation = true
                    } else {
                        searchController.hidesNavigationBarDuringPresentation = true
                    }
                } else if key == "automaticallyShowsCancelButton" {
                    if #available(iOS 13.0, *) {
                        if automaticallyShowsCancelButton == -1 {
                            searchController.automaticallyShowsCancelButton = false
                        } else if automaticallyShowsCancelButton == 1 {
                            searchController.automaticallyShowsCancelButton = true
                        } else {
                            searchController.automaticallyShowsCancelButton = true
                        }
                    }
                } else if key == "barStyle" {
                    searchController.searchBar.barStyle = UIBarStyle(rawValue: barStyle)!
                } else if key == "text" {
                    searchController.searchBar.text = text as String?
                } else if key == "prompt" {
                    searchController.searchBar.prompt = prompt as String?
                } else if key == "placeholder" {
                    searchController.searchBar.placeholder = placeholder as String?
                } else if key == "showsBookmarkButton" {
                    if showsBookmarkButton == -1 {
                        searchController.searchBar.showsBookmarkButton = false
                    } else if showsBookmarkButton == 1 {
                        searchController.searchBar.showsBookmarkButton = true
                    } else {
                        searchController.searchBar.showsBookmarkButton = false
                    }
                } else if key == "showsCancelButton" {
                    if showsCancelButton == -1 {
                        searchController.searchBar.showsCancelButton = false
                    } else if showsCancelButton == 1 {
                        searchController.searchBar.showsCancelButton = true
                    } else {
                        searchController.searchBar.showsCancelButton = false
                    }
                } else if key == "showsSearchResultsButton" {
                    if showsSearchResultsButton == -1 {
                        searchController.searchBar.showsSearchResultsButton = false
                    } else if showsSearchResultsButton == 1 {
                        searchController.searchBar.showsSearchResultsButton = true
                    } else {
                        searchController.searchBar.showsSearchResultsButton = false
                    }
                } else if key == "isSearchResultsButtonSelected" {
                    if isSearchResultsButtonSelected == -1 {
                        searchController.searchBar.isSearchResultsButtonSelected = false
                    } else if isSearchResultsButtonSelected == 1 {
                        searchController.searchBar.isSearchResultsButtonSelected = true
                    } else {
                        searchController.searchBar.isSearchResultsButtonSelected = false
                    }
                } else if key == "tintColor" {
                    searchController.searchBar.tintColor = RCTConvert.uiColor(searchTintColor)
                } else if key == "barTintColor" {
                    searchController.searchBar.barTintColor = RCTConvert.uiColor(barTintColor)
                } else if key == "searchBarStyle" {
                    searchController.searchBar.searchBarStyle = UISearchBar.Style(rawValue: UInt(searchBarStyle))!
                } else if key == "isTranslucent" {
                    if isTranslucent == -1 {
                        searchController.searchBar.isTranslucent = false
                    } else if isTranslucent == 1 {
                        searchController.searchBar.isTranslucent = true
                    } else {
                        searchController.searchBar.isTranslucent = false
                    }
                } else if key == "scopeButtonTitles" {
                    searchController.searchBar.scopeButtonTitles = (scopeButtonTitles as! [String])
                } else if key == "selectedScopeButtonIndex" {
                    searchController.searchBar.selectedScopeButtonIndex = selectedScopeButtonIndex
                } else if key == "showsScopeBar" {
                    if showsScopeBar == -1 {
                        searchController.searchBar.showsScopeBar = false
                    } else if showsScopeBar == 1 {
                        searchController.searchBar.showsScopeBar = true
                    } else {
                        searchController.searchBar.showsScopeBar = false
                    }
                }
            })
        }
    }

    func presentSearchController(_ searchController: UISearchController) {
        controller?.present(searchController, animated: true)
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
