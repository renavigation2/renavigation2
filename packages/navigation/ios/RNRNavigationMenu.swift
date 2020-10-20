struct RNRNavigationMenu {
    @available(iOS 13.0, *)
    static func getMenu(_ attributes: NSDictionary, onSelect: @escaping (UIAction, String) -> Void, onLoadingComplete: @escaping (_ completion: @escaping ([UIMenuElement]) -> Void) -> Void) -> UIMenu {
        var identifier: UIMenu.Identifier?
        if attributes["identifier"] != nil {
            if attributes["identifier"] as! String == "application" {
                identifier = UIMenu.Identifier.application
            } else if attributes["identifier"] as! String == "file" {
                identifier = UIMenu.Identifier.file
            } else if attributes["identifier"] as! String == "edit" {
                identifier = UIMenu.Identifier.edit
            } else if attributes["identifier"] as! String == "view" {
                identifier = UIMenu.Identifier.view
            } else if attributes["identifier"] as! String == "window" {
                identifier = UIMenu.Identifier.window
            } else if attributes["identifier"] as! String == "help" {
                identifier = UIMenu.Identifier.help
            } else if attributes["identifier"] as! String == "about" {
                identifier = UIMenu.Identifier.about
            } else if attributes["identifier"] as! String == "preferences" {
                identifier = UIMenu.Identifier.preferences
            } else if attributes["identifier"] as! String == "services" {
                identifier = UIMenu.Identifier.services
            } else if attributes["identifier"] as! String == "hide" {
                identifier = UIMenu.Identifier.hide
            } else if attributes["identifier"] as! String == "quit" {
                identifier = UIMenu.Identifier.quit
            } else if attributes["identifier"] as! String == "newScene" {
                identifier = UIMenu.Identifier.newScene
            } else if attributes["identifier"] as! String == "openRecent" {
                if #available(iOS 14.0, *) {
                    identifier = UIMenu.Identifier.openRecent
                }
            } else if attributes["identifier"] as! String == "close" {
                identifier = UIMenu.Identifier.close
            } else if attributes["identifier"] as! String == "print" {
                identifier = UIMenu.Identifier.print
            } else if attributes["identifier"] as! String == "undoRedo" {
                identifier = UIMenu.Identifier.undoRedo
            } else if attributes["identifier"] as! String == "standardEdit" {
                identifier = UIMenu.Identifier.standardEdit
            } else if attributes["identifier"] as! String == "find" {
                identifier = UIMenu.Identifier.find
            } else if attributes["identifier"] as! String == "replace" {
                identifier = UIMenu.Identifier.replace
            } else if attributes["identifier"] as! String == "share" {
                identifier = UIMenu.Identifier.share
            } else if attributes["identifier"] as! String == "textStyle" {
                identifier = UIMenu.Identifier.textStyle
            } else if attributes["identifier"] as! String == "spelling" {
                identifier = UIMenu.Identifier.spelling
            } else if attributes["identifier"] as! String == "spellingPanel" {
                identifier = UIMenu.Identifier.spellingPanel
            } else if attributes["identifier"] as! String == "spellingOptions" {
                identifier = UIMenu.Identifier.spellingOptions
            } else if attributes["identifier"] as! String == "substitutions" {
                identifier = UIMenu.Identifier.substitutions
            } else if attributes["identifier"] as! String == "substitutionsPanel" {
                identifier = UIMenu.Identifier.substitutionsPanel
            } else if attributes["identifier"] as! String == "substitutionOptions" {
                identifier = UIMenu.Identifier.substitutionOptions
            } else if attributes["identifier"] as! String == "transformations" {
                identifier = UIMenu.Identifier.transformations
            } else if attributes["identifier"] as! String == "speech" {
                identifier = UIMenu.Identifier.speech
            } else if attributes["identifier"] as! String == "lookup" {
                identifier = UIMenu.Identifier.lookup
            } else if attributes["identifier"] as! String == "learn" {
                identifier = UIMenu.Identifier.learn
            } else if attributes["identifier"] as! String == "format" {
                identifier = UIMenu.Identifier.format
            } else if attributes["identifier"] as! String == "font" {
                identifier = UIMenu.Identifier.font
            } else if attributes["identifier"] as! String == "textSize" {
                identifier = UIMenu.Identifier.textSize
            } else if attributes["identifier"] as! String == "textColor" {
                identifier = UIMenu.Identifier.textColor
            } else if attributes["identifier"] as! String == "textStylePasteboard" {
                identifier = UIMenu.Identifier.textStylePasteboard
            } else if attributes["identifier"] as! String == "text" {
                identifier = UIMenu.Identifier.text
            } else if attributes["identifier"] as! String == "writingDirection" {
                identifier = UIMenu.Identifier.writingDirection
            } else if attributes["identifier"] as! String == "alignment" {
                identifier = UIMenu.Identifier.alignment
            } else if attributes["identifier"] as! String == "toolbar" {
                identifier = UIMenu.Identifier.toolbar
            } else if attributes["identifier"] as! String == "fullscreen" {
                identifier = UIMenu.Identifier.fullscreen
            } else if attributes["identifier"] as! String == "minimizeAndZoom" {
                identifier = UIMenu.Identifier.minimizeAndZoom
            } else if attributes["identifier"] as! String == "bringAllToFront" {
                identifier = UIMenu.Identifier.bringAllToFront
            } else if attributes["identifier"] as! String == "root" {
                identifier = UIMenu.Identifier.root
            } else if attributes["identifier"] != nil {
                identifier = UIMenu.Identifier.init(rawValue: attributes["identifier"] as! String)
            }
        }

        var options: UIMenu.Options = []
        if RCTConvert.nsNumber(attributes["destructive"]) == 1 {
            options.insert(UIMenu.Options.destructive)
        }
        if RCTConvert.nsNumber(attributes["displayInline"]) == 1 {
            options.insert(UIMenu.Options.displayInline)
        }

        var children: [UIMenuElement] = []
        if attributes["items"] != nil {
            children = (RCTConvert.nsArray(attributes["items"]) as! [NSDictionary]).map { dictionary in
                if dictionary["_type"] as! String == "menu" {
                    return RNRNavigationMenu.getMenu(dictionary, onSelect: onSelect, onLoadingComplete: onLoadingComplete)
                }
                return RNRNavigationAction.getAction(dictionary, onSelect: onSelect)
            }
        }

        if #available(iOS 14.0, *) {
            if RCTConvert.nsNumber(attributes["loading"]) == 1 {
                children = [
                    UIDeferredMenuElement({ completion in
                        onLoadingComplete(completion)
                    })
                ]
            }
        }

        return UIMenu(
                title: attributes["title"] != nil ? attributes["title"] as! String : "",
                image: attributes["image"] != nil ? RNRNavigationImage.getImage(RCTConvert.nsDictionary(attributes["image"]) as NSDictionary) : nil,
                identifier: identifier,
                options: options,
                children: children
        )
    }
}
