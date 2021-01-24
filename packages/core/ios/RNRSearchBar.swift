class RNRSearchBar: UIView, RNRParent, RNRChild, RNRSearchBarProtocol, UISearchControllerDelegate, UISearchBarDelegate {
    var parent: RNRParent?
    var searchController: UISearchController = UISearchController(searchResultsController: nil)

    var isReady = false

    @objc var elementsIndices: [String : Int]?
    @objc var isActive: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var dimsBackgroundDuringPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var obscuresBackgroundDuringPresentation: NSNumber = 0  // 0 = nil, 1 = true, -1 = false
    @objc var hidesNavigationBarDuringPresentation: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var automaticallyShowsCancelButton: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var barStyle: String?
    @objc var text: String?
    @objc var prompt: String?
    @objc var placeholder: String?
    @objc var placeholderColor: NSNumber?
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
    @objc var cancelButtonText: String?
    @objc var cancelButtonStyle: NSDictionary?
    @objc var textFieldStyle: NSDictionary?
    @objc var textFieldClearButtonMode: String?
    @objc var textFieldBorderStyle: String?
    @objc var textFieldClearsOnBeginEditing: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var textFieldAdjustsFontSizeToFitWidth: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var textFieldMinimumFontSize: NSNumber?
    @objc var textFieldLeftViewMode: NSString?
    @objc var textFieldRightViewMode: NSString?
    @objc var textFieldClearsOnInsertion: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
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
    var defaultTextFieldClearButtonMode: UITextField.ViewMode?
    var defaultTextFieldBorderStyle: UITextField.BorderStyle?
    var defaultTextFieldClearsOnBeginEditing: Bool?
    var defaultTextFieldAdjustsFontSizeToFitWidth: Bool?
    var defaultTextFieldMinimumFontSize: CGFloat?
    var defaultTextFieldLeftViewMode: UITextField.ViewMode?
    var defaultTextFieldRightViewMode: UITextField.ViewMode?
    var defaultTextFieldClearsOnInsertion: Bool?

    var prevTextFieldAttributes: [NSAttributedString.Key : Any]?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
        searchController.delegate = self
        searchController.searchBar.delegate = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        subview.willMove(toSuperview: self)
        super.insertReactSubview(subview, at: atIndex)
    }

    override func didUpdateReactSubviews() {
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    func updateSubview(_ subview: UIView) {
        if subview is RNRImage && parent != nil {
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
            let otherProps = changedProps.filter { $0 != "text" }
            if !otherProps.isEmpty {
                updateInParent(parent!, subview: self)
            } else {
                if text != nil {
                    if text != searchController.searchBar.text {
                        searchController.searchBar.text = text as String?
                    }
                } else if searchController.searchBar.text != defaultText {
                    searchController.searchBar.text = defaultText
                }
            }
        }
    }

    func setSearchBar() {
        let textField = findTextField(searchController.searchBar)

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
            defaultTextFieldClearButtonMode = textField?.clearButtonMode
            defaultTextFieldBorderStyle = textField?.borderStyle
            defaultTextFieldClearsOnBeginEditing = textField?.clearsOnBeginEditing
            defaultTextFieldAdjustsFontSizeToFitWidth = textField?.adjustsFontSizeToFitWidth
            defaultTextFieldMinimumFontSize = textField?.minimumFontSize
            defaultTextFieldLeftViewMode = textField?.leftViewMode
            defaultTextFieldRightViewMode = textField?.rightViewMode

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
        } else if searchController.dimsBackgroundDuringPresentation != defaultDimsBackgroundDuringPresentation {
            searchController.dimsBackgroundDuringPresentation = defaultDimsBackgroundDuringPresentation!
        }

        if #available(iOS 9.1, *) {
            if obscuresBackgroundDuringPresentation == -1 {
                searchController.obscuresBackgroundDuringPresentation = false
            } else if obscuresBackgroundDuringPresentation == 1 {
                searchController.obscuresBackgroundDuringPresentation = true
            } else if searchController.obscuresBackgroundDuringPresentation != defaultObscuresBackgroundDuringPresentation {
                searchController.obscuresBackgroundDuringPresentation = defaultObscuresBackgroundDuringPresentation!
            }
        }

        if hidesNavigationBarDuringPresentation == -1 {
            searchController.hidesNavigationBarDuringPresentation = false
        } else if hidesNavigationBarDuringPresentation == 1 {
            searchController.hidesNavigationBarDuringPresentation = true
        } else if searchController.hidesNavigationBarDuringPresentation != defaultHidesNavigationBarDuringPresentation {
            searchController.hidesNavigationBarDuringPresentation = defaultHidesNavigationBarDuringPresentation!
        }

        if #available(iOS 13.0, *) {
            if automaticallyShowsCancelButton == -1 {
                searchController.automaticallyShowsCancelButton = false
            } else if isActive == 1 {
                searchController.automaticallyShowsCancelButton = true
            } else if searchController.automaticallyShowsCancelButton != defaultAutomaticallyShowsCancelButton {
                searchController.automaticallyShowsCancelButton = defaultAutomaticallyShowsCancelButton!
            }
        }

        if barStyle == "default" {
            searchController.searchBar.barStyle = .default
        } else if barStyle == "black" {
            searchController.searchBar.barStyle = .black
        } else if barStyle == "black-translucent" {
            searchController.searchBar.barStyle = .blackTranslucent
        } else if searchController.searchBar.barStyle != defaultBarStyle {
            searchController.searchBar.barStyle = defaultBarStyle!
        }

        if text != nil {
            searchController.searchBar.text = text as String?
        } else if searchController.searchBar.text != defaultText {
            searchController.searchBar.text = defaultText
        }

        if prompt != nil {
            searchController.searchBar.prompt = prompt as String?
        } else if searchController.searchBar.prompt != defaultPrompt {
            searchController.searchBar.prompt = defaultPrompt
        }

        if placeholder != nil {
            searchController.searchBar.placeholder = placeholder as String?
        } else if searchController.searchBar.placeholder != defaultPlaceholder {
            searchController.searchBar.placeholder = defaultPlaceholder
        }

        if showsBookmarkButton == -1 {
            searchController.searchBar.showsBookmarkButton = false
        } else if showsBookmarkButton == 1 {
            searchController.searchBar.showsBookmarkButton = true
        } else if searchController.searchBar.showsBookmarkButton != defaultShowsBookmarkButton {
            searchController.searchBar.showsBookmarkButton = defaultShowsBookmarkButton!
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
        } else if searchController.searchBar.isSearchResultsButtonSelected != defaultIsSearchResultsButtonSelected {
            searchController.searchBar.isSearchResultsButtonSelected = defaultIsSearchResultsButtonSelected!
        }

        if _tintColor != nil {
            searchController.searchBar.tintColor = RCTConvert.uiColor(_tintColor)
        } else if searchController.searchBar.tintColor != defaultTintColor {
            searchController.searchBar.tintColor = defaultTintColor
        }

        if barTintColor != nil {
            searchController.searchBar.barTintColor = RCTConvert.uiColor(barTintColor)
        } else if searchController.searchBar.barTintColor != defaultBarTintColor {
            searchController.searchBar.barTintColor = defaultBarTintColor
        }

        if searchBarStyle == "default" {
            searchController.searchBar.searchBarStyle = .default
        } else if searchBarStyle == "prominent" {
            searchController.searchBar.searchBarStyle = .prominent
        } else if searchBarStyle == "minimal" {
            searchController.searchBar.searchBarStyle = .minimal
        } else if searchController.searchBar.searchBarStyle != defaultSearchBarStyle {
            searchController.searchBar.searchBarStyle = defaultSearchBarStyle!
        }

        if isTranslucent == -1 {
            searchController.searchBar.isTranslucent = false
        } else if isTranslucent == 1 {
            searchController.searchBar.isTranslucent = true
        } else if searchController.searchBar.isTranslucent != defaultIsTranslucent {
            searchController.searchBar.isTranslucent = defaultIsTranslucent!
        }

        if scopeButtonTitles != nil {
            searchController.searchBar.scopeButtonTitles = (scopeButtonTitles as! [String])
        } else if searchController.searchBar.scopeButtonTitles != defaultScopeButtonTitles {
            searchController.searchBar.scopeButtonTitles = defaultScopeButtonTitles
        }

        searchController.searchBar.selectedScopeButtonIndex = selectedScopeButtonIndex

        if showsScopeBar == -1 {
            searchController.searchBar.showsScopeBar = false
        } else if showsScopeBar == 1 {
            searchController.searchBar.showsScopeBar = true
        } else if searchController.searchBar.showsScopeBar != defaultShowsScopeBar {
            searchController.searchBar.showsScopeBar = defaultShowsScopeBar!
        }

        if cancelButtonText != nil {
            searchController.searchBar.setValue(cancelButtonText, forKey: "cancelButtonText")
        }

        if cancelButtonStyle != nil {
            let attributes = RNRTextStyle.getStyles(cancelButtonStyle!, defaultFontSize: 17)
            UIBarButtonItem.appearance(whenContainedInInstancesOf: [UISearchBar.self]).setTitleTextAttributes(attributes, for: .normal)
        }

        if cancelButtonStyle != nil {
            let attributes = RNRTextStyle.getStyles(cancelButtonStyle!, defaultFontSize: 17)
            UIBarButtonItem.appearance(whenContainedInInstancesOf: [UISearchBar.self]).setTitleTextAttributes(attributes, for: .normal)
        }

        if textFieldStyle != nil {
            let attributes = RNRTextStyle.getStyles(textFieldStyle!, defaultFontSize: 17)
            prevTextFieldAttributes?.forEach { (key, _) in
                if attributes[key] == nil {
                    textField?.defaultTextAttributes.removeValue(forKey: key)
                }
            }
            attributes.forEach { (key, value) in
                textField?.defaultTextAttributes.updateValue(value, forKey: key)
            }

            if textFieldStyle!["borderRadius"] != nil || textFieldStyle!["borderWidth"] != nil || textFieldStyle!["borderColor"] != nil {
                if textFieldStyle!["borderRadius"] != nil {
                    textField?.layer.cornerRadius = RCTConvert.cgFloat(textFieldStyle!["borderRadius"])
                }
                if textFieldStyle!["borderWidth"] != nil {
                    textField?.layer.borderWidth = RCTConvert.cgFloat(textFieldStyle!["borderWidth"])
                }
                if textFieldStyle!["borderColor"] != nil {
                    textField?.layer.borderColor = RCTConvert.cgColor(textFieldStyle!["borderColor"])
                }
                if textFieldStyle!["backgroundColor"] != nil {
                    textField?.layer.borderColor = RCTConvert.cgColor(textFieldStyle!["backgroundColor"])
                }
            } else {
                if textFieldStyle!["backgroundColor"] != nil {
                    textField?.backgroundColor = RCTConvert.uiColor(textFieldStyle!["backgroundColor"])
                }
            }
        }

        if textFieldClearButtonMode == "never" {
            textField?.clearButtonMode = .never
        } else if textFieldClearButtonMode == "while-editing" {
            textField?.clearButtonMode = .whileEditing
        } else if textFieldClearButtonMode == "unless-editing" {
            textField?.clearButtonMode = .unlessEditing
        } else if textFieldClearButtonMode == "always" {
            textField?.clearButtonMode = .always
        } else if textField?.clearButtonMode != defaultTextFieldClearButtonMode {
            textField?.clearButtonMode = defaultTextFieldClearButtonMode!
        }

        if textFieldBorderStyle == "none" {
            textField?.borderStyle = .none
        } else if textFieldBorderStyle == "bezel" {
            textField?.borderStyle = .bezel
        } else if textFieldClearButtonMode == "line" {
            textField?.borderStyle = .line
        } else if textFieldClearButtonMode == "rounded-rect" {
            textField?.borderStyle = .roundedRect
        } else if textField?.borderStyle != defaultTextFieldBorderStyle {
            textField?.borderStyle = defaultTextFieldBorderStyle!
        }

        if textFieldClearsOnBeginEditing == -1 {
            textField?.clearsOnBeginEditing = false
        } else if textFieldClearsOnBeginEditing == 1 {
            textField?.clearsOnBeginEditing = true
        } else if textField?.clearsOnBeginEditing != defaultTextFieldClearsOnBeginEditing {
            textField?.clearsOnBeginEditing = defaultTextFieldClearsOnBeginEditing!
        }

        if textFieldAdjustsFontSizeToFitWidth == -1 {
            textField?.adjustsFontSizeToFitWidth = false
        } else if textFieldAdjustsFontSizeToFitWidth == 1 {
            textField?.adjustsFontSizeToFitWidth = true
        } else if textField?.adjustsFontSizeToFitWidth != defaultTextFieldAdjustsFontSizeToFitWidth {
            textField?.adjustsFontSizeToFitWidth = defaultTextFieldAdjustsFontSizeToFitWidth!
        }

        if textFieldMinimumFontSize != nil {
            textField?.minimumFontSize = RCTConvert.cgFloat(textFieldMinimumFontSize)
        } else if textField?.minimumFontSize != defaultTextFieldMinimumFontSize {
            textField?.minimumFontSize = defaultTextFieldMinimumFontSize!
        }

        if textFieldLeftViewMode == "unless-editing" {
            textField?.leftViewMode = .unlessEditing
        } else if textFieldLeftViewMode == "while-editing" {
            textField?.leftViewMode = .whileEditing
        } else if textFieldLeftViewMode == "never" {
            textField?.leftViewMode = .never
        } else if textFieldLeftViewMode == "always" {
            textField?.leftViewMode = .always
        } else if textField?.leftViewMode != defaultTextFieldLeftViewMode {
            textField?.leftViewMode = defaultTextFieldLeftViewMode!
        }

        if textFieldRightViewMode == "unless-editing" {
            textField?.rightViewMode = .unlessEditing
        } else if textFieldRightViewMode == "while-editing" {
            textField?.rightViewMode = .whileEditing
        } else if textFieldRightViewMode == "never" {
            textField?.rightViewMode = .never
        } else if textFieldRightViewMode == "always" {
            textField?.rightViewMode = .always
        } else if textField?.rightViewMode != defaultTextFieldRightViewMode {
            textField?.rightViewMode = defaultTextFieldRightViewMode!
        }


        if textFieldClearsOnInsertion == -1 {
            textField?.clearsOnInsertion = false
        } else if textFieldClearsOnInsertion == 1 {
            textField?.clearsOnInsertion = true
        } else if textField?.clearsOnInsertion != defaultTextFieldClearsOnInsertion {
            textField?.clearsOnInsertion = defaultTextFieldClearsOnInsertion!
        }

        if placeholderColor != nil {
            let color = RCTConvert.uiColor(placeholderColor)
            if color != nil {
                textField?.attributedPlaceholder = NSAttributedString(string: placeholder ?? "",
                        attributes: [NSAttributedString.Key.foregroundColor: color!])
            }
        }

        setImage("normalSearchImage", for: UISearchBar.Icon.search, state: UIControl.State.normal)
        setImage("applicationSearchImage", for: UISearchBar.Icon.search, state: UIControl.State.application)
        setImage("disabledSearchImage", for: UISearchBar.Icon.search, state: UIControl.State.disabled)
        setImage("focusedSearchImage", for: UISearchBar.Icon.search, state: UIControl.State.focused)
        setImage("highlightedSearchImage", for: UISearchBar.Icon.search, state: UIControl.State.highlighted)
        setImage("reservedSearchImage", for: UISearchBar.Icon.search, state: UIControl.State.reserved)
        setImage("selectedSearchImage", for: UISearchBar.Icon.search, state: UIControl.State.selected)
        setImage("normalBookmarkImage", for: UISearchBar.Icon.bookmark, state: UIControl.State.normal)
        setImage("applicationBookmarkImage", for: UISearchBar.Icon.bookmark, state: UIControl.State.application)
        setImage("disabledBookmarkImage", for: UISearchBar.Icon.bookmark, state: UIControl.State.disabled)
        setImage("focusedBookmarkImage", for: UISearchBar.Icon.bookmark, state: UIControl.State.focused)
        setImage("highlightedBookmarkImage", for: UISearchBar.Icon.bookmark, state: UIControl.State.highlighted)
        setImage("reservedBookmarkImage", for: UISearchBar.Icon.bookmark, state: UIControl.State.reserved)
        setImage("selectedBookmarkImage", for: UISearchBar.Icon.bookmark, state: UIControl.State.selected)
        setImage("normalClearImage", for: UISearchBar.Icon.clear, state: UIControl.State.normal)
        setImage("applicationClearImage", for: UISearchBar.Icon.clear, state: UIControl.State.application)
        setImage("disabledClearImage", for: UISearchBar.Icon.clear, state: UIControl.State.disabled)
        setImage("focusedClearImage", for: UISearchBar.Icon.clear, state: UIControl.State.focused)
        setImage("highlightedClearImage", for: UISearchBar.Icon.clear, state: UIControl.State.highlighted)
        setImage("reservedClearImage", for: UISearchBar.Icon.clear, state: UIControl.State.reserved)
        setImage("selectedClearImage", for: UISearchBar.Icon.clear, state: UIControl.State.selected)
        setImage("normalResultsListImage", for: UISearchBar.Icon.resultsList, state: UIControl.State.normal)
        setImage("applicationResultsListImage", for: UISearchBar.Icon.resultsList, state: UIControl.State.application)
        setImage("disabledResultsListImage", for: UISearchBar.Icon.resultsList, state: UIControl.State.disabled)
        setImage("focusedResultsListImage", for: UISearchBar.Icon.resultsList, state: UIControl.State.focused)
        setImage("highlightedResultsListImage", for: UISearchBar.Icon.resultsList, state: UIControl.State.highlighted)
        setImage("reservedResultsListImage", for: UISearchBar.Icon.resultsList, state: UIControl.State.reserved)
        setImage("selectedResultsListImage", for: UISearchBar.Icon.resultsList, state: UIControl.State.selected)

        if elementsIndices?["textFieldLeftView"] != -1 {
            textField?.leftView = reactSubviews()[elementsIndices!["textFieldLeftView"]!]
        } else if textField?.leftView != nil {
            textField?.leftView = nil
        }

        if elementsIndices?["textFieldRightView"] != -1 {
            textField?.rightView = reactSubviews()[elementsIndices!["textFieldRightView"]!]
        } else if textField?.leftView != nil {
            textField?.rightView = nil
        }

        if elementsIndices?["textFieldInputAccessoryView"] != -1 {
            textField?.inputAccessoryView = reactSubviews()[elementsIndices!["textFieldInputAccessoryView"]!]
        } else if textField?.inputAccessoryView != nil {
            textField?.inputAccessoryView = nil
        }

        if elementsIndices?["textFieldBackgroundImage"] != -1 {
            let subview = reactSubviews()[elementsIndices!["textFieldBackgroundImage"]!]
            if subview is RNRImage {
                textField?.background = (subview as! RNRImageProtocol).getImage()
            }
        } else if textField?.background != nil {
            textField?.background = nil
        }

        if elementsIndices?["textFieldDisabledBackgroundImage"] != -1 {
            let subview = reactSubviews()[elementsIndices!["textFieldDisabledBackgroundImage"]!]
            if subview is RNRImage {
                textField?.disabledBackground = (subview as! RNRImageProtocol).getImage()
            }
        } else if textField?.disabledBackground != nil {
            textField?.disabledBackground = nil
        }

        if elementsIndices?["children"] != -1 {
            searchController.view = reactSubviews()[elementsIndices!["children"]!]
        } else if searchController.view != nil {
            searchController.view = nil
        }
    }

    func setImage(_ type: String, for icon: UISearchBar.Icon, state: UIControl.State) {
        if elementsIndices?[type] != -1 {
            let subview = reactSubviews()[elementsIndices![type]!]
            if subview is RNRImage {
                searchController.searchBar.setImage((subview as! RNRImageProtocol).getImage(), for: icon, state: state)
            }
        } else if searchController.view != nil {
            searchController.searchBar.setImage(nil, for: icon, state: state)
        }
    }

    func findTextField(_ subview: UIView) -> UITextField? {
        if subview is UITextField {
            return subview as? UITextField
        }
        var match: UITextField? = nil
        if !subview.subviews.isEmpty {
            for view in subview.subviews {
                let result = findTextField(view)
                if result != nil {
                    match = result
                    break
                }
            }
        }
        return match
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
            if onSearchBarChange != nil {
                onSearchBarChange!(["value": searchText])
            }
        }
    }
}
