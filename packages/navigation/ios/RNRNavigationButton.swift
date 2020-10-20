struct RNRNavigationButton {
    @available(iOS 14.0, *)
    static func getButton(_ attributes: NSDictionary, onActionSelect: @escaping (UIAction, String) -> Void, onLoadingComplete: @escaping (_ completion: ([UIMenuElement]) -> Void) -> Void) -> UIBarButtonItem {
        let barButtonItem = getButton(attributes, onAction: nil)
        for (k, value) in attributes {
            let key = k as! String
            if key == "primaryAction" {
                barButtonItem.primaryAction = RNRNavigationAction.getAction(RCTConvert.nsDictionary(value)! as NSDictionary, onSelect: onActionSelect)
            } else if key == "menu" {
                barButtonItem.menu = RNRNavigationMenu.getMenu(RCTConvert.nsDictionary(value)! as NSDictionary, onSelect: onActionSelect, onLoadingComplete: onLoadingComplete)
            }
        }

        return barButtonItem
    }

    static func getButton(_ attributes: NSDictionary, onAction: ((String) -> Void)?) -> UIBarButtonItem {
        var barButtonItem: UIBarButtonItem
        if #available(iOS 14.0, *) {
            if attributes["fixedSpace"] != nil {
                barButtonItem = UIBarButtonItem.fixedSpace(RCTConvert.cgFloat(attributes["fixedSpace"]))
            } else if RCTConvert.nsNumber(attributes["flexibleSpace"]) == 1 {
                barButtonItem = UIBarButtonItem.flexibleSpace()
            } else {
                barButtonItem = UIBarButtonItem()
            }
        } else {
            barButtonItem = UIBarButtonItem()
        }

        for (k, value) in attributes {
            let key = k as! String
            if key == "isEnabled" {
                let v = RCTConvert.nsNumber(value)
                if v == -1 {
                    barButtonItem.isEnabled = false
                } else if v == 1 {
                    barButtonItem.isEnabled = true
                }
            } else if key == "title" {
                barButtonItem.title = RCTConvert.nsString(value)
            } else if key == "image" {
                barButtonItem.image = RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary)
            } else if key == "landscapeImagePhone" {
                barButtonItem.landscapeImagePhone = RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary)
            } else if key == "largeContentSizeImage" {
                if #available(iOS 11.0, *) {
                    barButtonItem.largeContentSizeImage = RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary)
                }
            } else if key == "imageInsets" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["top"] != nil && v["left"] != nil && v["right"] != nil && v["bottom"] != nil {
                    barButtonItem.imageInsets = UIEdgeInsets(top: v["top"] as! CGFloat, left: v["left"] as! CGFloat, bottom: v["bottom"] as! CGFloat, right: v["right"] as! CGFloat)
                }
            } else if key == "landscapeImagePhoneInsets" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["top"] != nil && v["left"] != nil && v["right"] != nil && v["bottom"] != nil {
                    barButtonItem.landscapeImagePhoneInsets = UIEdgeInsets(top: v["top"] as! CGFloat, left: v["left"] as! CGFloat, bottom: v["bottom"] as! CGFloat, right: v["right"] as! CGFloat)
                }
            } else if key == "largeContentSizeImageInsets" {
                if #available(iOS 11.0, *) {
                    let v = RCTConvert.nsDictionary(value)! as NSDictionary
                    if v["top"] != nil && v["left"] != nil && v["right"] != nil && v["bottom"] != nil {
                        barButtonItem.largeContentSizeImageInsets = UIEdgeInsets(top: v["top"] as! CGFloat, left: v["left"] as! CGFloat, bottom: v["bottom"] as! CGFloat, right: v["right"] as! CGFloat)
                    }
                }
            } else if key == "normalTitleStyle" {
                barButtonItem.setTitleTextAttributes(
                        RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 34, defaultFontWeight: "bold"),
                        for: .normal
                )
            } else if key == "selectedTitleStyle" {
                barButtonItem.setTitleTextAttributes(
                        RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 34, defaultFontWeight: "bold"),
                        for: .selected
                )
            } else if key == "focusedTitleStyle" {
                barButtonItem.setTitleTextAttributes(
                        RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 34, defaultFontWeight: "bold"),
                        for: .focused
                )
            } else if key == "disabledTitleStyle" {
                barButtonItem.setTitleTextAttributes(
                        RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 34, defaultFontWeight: "bold"),
                        for: .disabled
                )
            } else if key == "highlightedTitleStyle" {
                barButtonItem.setTitleTextAttributes(
                        RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 34, defaultFontWeight: "bold"),
                        for: .highlighted
                )
            } else if key == "applicationTitleStyle" {
                barButtonItem.setTitleTextAttributes(
                        RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 34, defaultFontWeight: "bold"),
                        for: .application
                )
            } else if key == "style" {
                if value as! String == "plain" {
                    barButtonItem.style = UIBarButtonItem.Style.plain
                } else if value as! String == "done" {
                    barButtonItem.style = UIBarButtonItem.Style.done
                }
            } else if key == "width" {
                barButtonItem.width = RCTConvert.cgFloat(value)
            } else if key == "possibleTitles" {
                barButtonItem.possibleTitles = Set(RCTConvert.nsArray(value) as! [String])
            } else if key == "normalDefaultBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .default)
            } else if key == "normalCompactBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .compact)
            } else if key == "normalDefaultPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .defaultPrompt)
            } else if key == "normalCompactPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .compactPrompt)
            } else if key == "focusedDefaultBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .default)
            } else if key == "focusedCompactBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .compact)
            } else if key == "focusedDefaultPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .defaultPrompt)
            } else if key == "focusedCompactPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .compactPrompt)
            } else if key == "disabledDefaultBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .default)
            } else if key == "disabledCompactBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .compact)
            } else if key == "disabledDefaultPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .defaultPrompt)
            } else if key == "disabledCompactPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .compactPrompt)
            } else if key == "highlightedDefaultBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .default)
            } else if key == "highlightedCompactBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .compact)
            } else if key == "highlightedDefaultPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .defaultPrompt)
            } else if key == "highlightedCompactPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .compactPrompt)
            } else if key == "applicationDefaultBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .default)
            } else if key == "applicationCompactBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .compact)
            } else if key == "applicationDefaultPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .defaultPrompt)
            } else if key == "applicationCompactPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .compactPrompt)
            } else if key == "selectedDefaultBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .default)
            } else if key == "selectedCompactBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .compact)
            } else if key == "selectedDefaultPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .defaultPrompt)
            } else if key == "selectedCompactPromptBackgroundImage" {
                barButtonItem.setBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .compactPrompt)
            } else if key == "tintColor" {
                barButtonItem.tintColor = RCTConvert.uiColor(value)
            } else if key == "defaultBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .default)
            } else if key == "compactBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .compact)
            } else if key == "defaultPromptBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .defaultPrompt)
            } else if key == "compactPromptBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .compactPrompt)
            } else if key == "defaultTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .default)
                }
            } else if key == "compactTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .compact)
                }
            } else if key == "defaultPromptTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .defaultPrompt)
                }
            } else if key == "compactPromptTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .compactPrompt)
                }
            } else if key == "normalDefaultBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .default)
            } else if key == "normalCompactBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .compact)
            } else if key == "normalDefaultPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .defaultPrompt)
            } else if key == "normalCompactPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .normal, barMetrics: .compactPrompt)
            } else if key == "focusedDefaultBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .default)
            } else if key == "focusedCompactBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .compact)
            } else if key == "focusedDefaultPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .defaultPrompt)
            } else if key == "focusedCompactPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .focused, barMetrics: .compactPrompt)
            } else if key == "disabledDefaultBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .default)
            } else if key == "disabledCompactBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .compact)
            } else if key == "disabledDefaultPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .defaultPrompt)
            } else if key == "disabledCompactPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .disabled, barMetrics: .compactPrompt)
            } else if key == "highlightedDefaultBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .default)
            } else if key == "highlightedCompactBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .compact)
            } else if key == "highlightedDefaultPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .defaultPrompt)
            } else if key == "highlightedCompactPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .highlighted, barMetrics: .compactPrompt)
            } else if key == "applicationDefaultBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .default)
            } else if key == "applicationCompactBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .compact)
            } else if key == "applicationDefaultPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .defaultPrompt)
            } else if key == "applicationCompactPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .application, barMetrics: .compactPrompt)
            } else if key == "selectedDefaultBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .default)
            } else if key == "selectedCompactBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .compact)
            } else if key == "selectedDefaultPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .defaultPrompt)
            } else if key == "selectedCompactPromptBackButtonBackgroundImage" {
                barButtonItem.setBackButtonBackgroundImage(RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary), for: .selected, barMetrics: .compactPrompt)
            } else if key == "defaultBackButtonBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .default)
            } else if key == "compactBackButtonBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .compact)
            } else if key == "defaultPromptBackButtonBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .defaultPrompt)
            } else if key == "compactPromptBackButtonBackgroundVerticalPositionAdjustment" {
                barButtonItem.setBackButtonBackgroundVerticalPositionAdjustment(RCTConvert.cgFloat(value), for: .compactPrompt)
            } else if key == "defaultBackButtonTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setBackButtonTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .default)
                }
            } else if key == "compactBackButtonTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setBackButtonTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .compact)
                }
            } else if key == "defaultPromptBackButtonTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setBackButtonTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .defaultPrompt)
                }
            } else if key == "compactPromptBackButtonTitlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["horizontal"] != nil && v["vertical"] != nil {
                    barButtonItem.setBackButtonTitlePositionAdjustment(UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat), for: .compactPrompt)
                }
            }
        }

        if RCTConvert.nsNumber(attributes["_hasOnPress"]) == 1 {
            let p = Action {
                if onAction != nil {
                    onAction!(attributes["_id"] as! String)
                }
            }
            barButtonItem.action = #selector(p.action)
        }

        return barButtonItem
    }
}

final class Action: NSObject {
    private let _action: () -> ()

    init(action: @escaping () -> ()) {
        _action = action
        super.init()
    }

    @objc func action() {
        _action()
    }
}
