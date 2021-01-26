@available(iOS 13.0, *)
class RNRMenu: UIView, RNRChild, RNRParent, RNRMenuProtocol {
    var parent: RNRParent?
    var menu: UIMenu = UIMenu()

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
    @objc var identifier: String?
    @objc var title: String?
    @objc var destructive: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var displayInline: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var loading: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    var wasLoading = false
    var shouldUpdate = true

    var completion: (([UIMenuElement]) -> Void)?

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
            if wasLoading {
                loadingComplete()
            } else {
                shouldUpdate = true
                updateInParent(parent!, subview: self)
            }
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
        if !isReady && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady(subviews)
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
        if parent != nil {
            if wasLoading {
                loadingComplete()
            } else {
                shouldUpdate = true
                updateInParent(parent!, subview: self)
            }
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if parent != nil {
            if wasLoading {
                loadingComplete()
            } else {
                shouldUpdate = true
                updateInParent(parent!, subview: self)
            }
        }
    }

    func loadingComplete() {
        if loading != 1 {
            var children: [UIMenuElement] = []
            reactSubviews().enumerated().forEach { (index, subview) in
                if index != 0 {
                    if subview is RNRMenu {
                        children.append((subview as! RNRMenu).getMenu())
                    } else if subview is RNRAction {
                        children.append((subview as! RNRAction).getAction())
                    }
                }
            }
            completion!(children)
        }
    }

    @available(iOS 13.0, *)
    func getMenu() -> UIMenu {
        if shouldUpdate {
            shouldUpdate = false

            var image: UIImage? = nil
            if elementsIndices?["image"] != nil && elementsIndices?["image"] != -1 {
                if let subview = reactSubviews()?[elementsIndices!["image"]!] as? RNRImageProtocol {
                    image = subview.getImage()
                }
            }

            var children: [UIMenuElement] = []
            reactSubviews().enumerated().forEach { (index, subview) in
                if elementsIndices?["children"] != nil && index >= elementsIndices!["children"]! {
                    if subview is RNRMenu {
                        children.append((subview as! RNRMenu).getMenu())
                    } else if subview is RNRAction {
                        children.append((subview as! RNRAction).getAction())
                    }
                }
            }

            var finalIdentifier: UIMenu.Identifier?
            if identifier != nil {
                if identifier == "application" {
                    finalIdentifier = UIMenu.Identifier.application
                } else if identifier == "file" {
                    finalIdentifier = UIMenu.Identifier.file
                } else if identifier == "edit" {
                    finalIdentifier = UIMenu.Identifier.edit
                } else if identifier == "view" {
                    finalIdentifier = UIMenu.Identifier.view
                } else if identifier == "window" {
                    finalIdentifier = UIMenu.Identifier.window
                } else if identifier == "help" {
                    finalIdentifier = UIMenu.Identifier.help
                } else if identifier == "about" {
                    finalIdentifier = UIMenu.Identifier.about
                } else if identifier == "preferences" {
                    finalIdentifier = UIMenu.Identifier.preferences
                } else if identifier == "services" {
                    finalIdentifier = UIMenu.Identifier.services
                } else if identifier == "hide" {
                    finalIdentifier = UIMenu.Identifier.hide
                } else if identifier == "quit" {
                    finalIdentifier = UIMenu.Identifier.quit
                } else if identifier == "new-scene" {
                    finalIdentifier = UIMenu.Identifier.newScene
                } else if identifier == "open-recent" {
                    if #available(iOS 14.0, *) {
                        finalIdentifier = UIMenu.Identifier.openRecent
                    }
                } else if identifier == "close" {
                    finalIdentifier = UIMenu.Identifier.close
                } else if identifier == "print" {
                    finalIdentifier = UIMenu.Identifier.print
                } else if identifier == "undo-redo" {
                    finalIdentifier = UIMenu.Identifier.undoRedo
                } else if identifier == "standard-edit" {
                    finalIdentifier = UIMenu.Identifier.standardEdit
                } else if identifier == "find" {
                    finalIdentifier = UIMenu.Identifier.find
                } else if identifier == "replace" {
                    finalIdentifier = UIMenu.Identifier.replace
                } else if identifier == "share" {
                    finalIdentifier = UIMenu.Identifier.share
                } else if identifier == "text-style" {
                    finalIdentifier = UIMenu.Identifier.textStyle
                } else if identifier == "spelling" {
                    finalIdentifier = UIMenu.Identifier.spelling
                } else if identifier == "spelling-panel" {
                    finalIdentifier = UIMenu.Identifier.spellingPanel
                } else if identifier == "spelling-options" {
                    finalIdentifier = UIMenu.Identifier.spellingOptions
                } else if identifier == "substitutions" {
                    finalIdentifier = UIMenu.Identifier.substitutions
                } else if identifier == "substitutions-panel" {
                    finalIdentifier = UIMenu.Identifier.substitutionsPanel
                } else if identifier == "substitution-options" {
                    finalIdentifier = UIMenu.Identifier.substitutionOptions
                } else if identifier == "transformations" {
                    finalIdentifier = UIMenu.Identifier.transformations
                } else if identifier == "speech" {
                    finalIdentifier = UIMenu.Identifier.speech
                } else if identifier == "lookup" {
                    finalIdentifier = UIMenu.Identifier.lookup
                } else if identifier == "learn" {
                    finalIdentifier = UIMenu.Identifier.learn
                } else if identifier == "format" {
                    finalIdentifier = UIMenu.Identifier.format
                } else if identifier == "font" {
                    finalIdentifier = UIMenu.Identifier.font
                } else if identifier == "text-size" {
                    finalIdentifier = UIMenu.Identifier.textSize
                } else if identifier == "text-color" {
                    finalIdentifier = UIMenu.Identifier.textColor
                } else if identifier == "text-style-pasteboard" {
                    finalIdentifier = UIMenu.Identifier.textStylePasteboard
                } else if identifier == "text" {
                    finalIdentifier = UIMenu.Identifier.text
                } else if identifier == "writing-direction" {
                    finalIdentifier = UIMenu.Identifier.writingDirection
                } else if identifier == "alignment" {
                    finalIdentifier = UIMenu.Identifier.alignment
                } else if identifier == "toolbar" {
                    finalIdentifier = UIMenu.Identifier.toolbar
                } else if identifier == "fullscreen" {
                    finalIdentifier = UIMenu.Identifier.fullscreen
                } else if identifier == "minimize-and-zoom" {
                    finalIdentifier = UIMenu.Identifier.minimizeAndZoom
                } else if identifier == "bring-all-to-front" {
                    finalIdentifier = UIMenu.Identifier.bringAllToFront
                } else if identifier == "root" {
                    finalIdentifier = UIMenu.Identifier.root
                } else if identifier != nil {
                    finalIdentifier = UIMenu.Identifier.init(rawValue: identifier!)
                }
            }

            var options: UIMenu.Options = []
            if destructive == 1 {
                options.insert(UIMenu.Options.destructive)
            }
            if displayInline == 1 {
                options.insert(UIMenu.Options.displayInline)
            }

            if #available(iOS 14.0, *) {
                if loading == 1 {
                    wasLoading = true
                    children = [
                        UIDeferredMenuElement({ [self] completion in
                            self.completion = completion
                        })
                    ]
                }
            }

            menu = UIMenu(
                    title: title ?? "",
                    image: image,
                    identifier: finalIdentifier,
                    options: options,
                    children: children
            )
        }
        return menu
    }
}
