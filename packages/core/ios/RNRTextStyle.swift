public struct RNRTextStyle {
    public static func getStyles(_ styles: NSDictionary, defaultFontSize: CGFloat) -> [NSAttributedString.Key : Any] {
        getStyles(styles, defaultFontSize: defaultFontSize, defaultFontWeight: "normal")
    }

    public static func getStyles(_ styles: NSDictionary, defaultFontSize: CGFloat, defaultFontWeight: String) -> [NSAttributedString.Key : Any] {
        var finalStyle: [NSAttributedString.Key : Any] = [:]
        let paragraphStyle: NSMutableParagraphStyle = NSMutableParagraphStyle()
        var hasParagraphStyle = false
        var fontFamily: String = "system"
        var fontSize: CGFloat = defaultFontSize
        var fontWeight: String = defaultFontWeight
        var fontStyle: String = "normal"
        var fontVariant: [String]? = nil
        var hasFontStyle = false
        var textDecorationLine: String? = nil
        var textDecorationStyle: String? = nil
        var textDecorationColor: UIColor? = nil
        var shadow: NSShadow?

        for (k, value) in styles {
            let key = k as! String
            if key == "fontFamily" {
                fontFamily = RCTConvert.nsString(value)
                hasFontStyle = true
            } else if key == "fontSize" {
                fontSize = RCTConvert.cgFloat(value)
                hasFontStyle = true
            } else if key == "fontWeight" {
                fontWeight = RCTConvert.nsString(value)
                hasFontStyle = true
            } else if key == "fontStyle" {
                fontStyle = RCTConvert.nsString(value)
                hasFontStyle = true
            } else if key == "fontVariant" {
                let array = RCTConvert.nsArray(value)
                fontVariant = []
                if array != nil {
                    array!.forEach({ value in
                        fontVariant?.append(RCTConvert.nsString(value))
                    })
                }
                hasFontStyle = true
            } else if key == "color" {
                finalStyle[NSAttributedString.Key.foregroundColor] = RCTConvert.uiColor(value)
            } else if key == "backgroundColor" {
                finalStyle[NSAttributedString.Key.backgroundColor] = RCTConvert.uiColor(value)
            } else if key == "letterSpacing" {
                finalStyle[NSAttributedString.Key.kern] = RCTConvert.nsNumber(value)
            } else if key == "baselineOffset" {
                finalStyle[NSAttributedString.Key.baselineOffset] = RCTConvert.nsNumber(value)
            } else if key == "ligature" {
                finalStyle[NSAttributedString.Key.ligature] = RCTConvert.nsNumber(value)
            } else if key == "tracking" {
                if #available(iOS 14.0, *) {
                    finalStyle[NSAttributedString.Key.tracking] = RCTConvert.nsNumber(value)
                }
            } else if key == "textDecorationLine" {
                textDecorationLine = RCTConvert.nsString(value)
            } else if key == "textDecorationStyle" {
                textDecorationStyle = RCTConvert.nsString(value)
            } else if key == "textDecorationColor" {
                textDecorationColor = RCTConvert.uiColor(value)
            } else if key == "strokeColor" {
                finalStyle[NSAttributedString.Key.strokeColor] = RCTConvert.uiColor(value)
            } else if key == "strokeWidth" {
                finalStyle[NSAttributedString.Key.strokeWidth] = RCTConvert.nsNumber(value)
            } else if key == "writingDirection" {
                finalStyle[NSAttributedString.Key.writingDirection] = [RCTConvert.nsWritingDirection(value).rawValue]
                paragraphStyle.baseWritingDirection = RCTConvert.nsWritingDirection(value)
                hasParagraphStyle = true
            } else if key == "lineHeight" {
                paragraphStyle.lineSpacing = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "textAlign" {
                paragraphStyle.alignment = RCTConvert.nsTextAlignment(value)
                hasParagraphStyle = true
            } else if key == "paragraphSpacing" {
                paragraphStyle.paragraphSpacing = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "firstLineHeadIndent" {
                paragraphStyle.firstLineHeadIndent = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "headIndent" {
                paragraphStyle.headIndent = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "tailIndent" {
                paragraphStyle.tailIndent = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "lineBreakMode" {
                paragraphStyle.lineBreakMode = RCTConvert.nsLineBreakMode(value)
                hasParagraphStyle = true
            } else if key == "minimumLineHeight" {
                paragraphStyle.minimumLineHeight = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "maximumLineHeight" {
                paragraphStyle.maximumLineHeight = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "lineHeightMultiple" {
                paragraphStyle.lineHeightMultiple = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "paragraphSpacingBefore" {
                paragraphStyle.paragraphSpacingBefore = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "hyphenationFactor" {
                paragraphStyle.hyphenationFactor = RCTConvert.float(value)
                hasParagraphStyle = true
            } else if key == "defaultTabInterval" {
                paragraphStyle.defaultTabInterval = RCTConvert.cgFloat(value)
                hasParagraphStyle = true
            } else if key == "allowsDefaultTighteningForTruncation" {
                hasParagraphStyle = true
                if value as! Int == 1 {
                    paragraphStyle.allowsDefaultTighteningForTruncation = true
                } else if value as! Int == -1 {
                    paragraphStyle.allowsDefaultTighteningForTruncation = false
                }
            } else if key == "lineBreakStrategy" {
                hasParagraphStyle = true
                if value as! String == "push-out" {
                    paragraphStyle.lineBreakStrategy = NSParagraphStyle.LineBreakStrategy.pushOut
                } else if value as! String == "hangul-word-priority" {
                    if #available(iOS 14.0, *) {
                        paragraphStyle.lineBreakStrategy = NSParagraphStyle.LineBreakStrategy.hangulWordPriority
                    }
                } else if value as! String == "standard" {
                    if #available(iOS 14.0, *) {
                        paragraphStyle.lineBreakStrategy = NSParagraphStyle.LineBreakStrategy.standard
                    }
                }
            } else if key == "textShadowColor" {
                if shadow == nil {
                    shadow = NSShadow()
                }
                shadow?.shadowColor = RCTConvert.uiColor(value)
            } else if key == "textShadowOffset" {
                if shadow == nil {
                    shadow = NSShadow()
                }
                let width = (value as! NSDictionary)["width"] as! CGFloat
                let height = (value as! NSDictionary)["height"] as! CGFloat
                shadow?.shadowOffset = CGSize(width: width, height: height)
            } else if key == "textShadowRadius" {
                if shadow == nil {
                    shadow = NSShadow()
                }
                shadow?.shadowBlurRadius = RCTConvert.cgFloat(value)
            }
        }

        if hasFontStyle {
            var font: UIFont
            if fontFamily == "system" {
                if fontWeight == "bold" && fontStyle == "normal" {
                    font = UIFont.boldSystemFont(ofSize: fontSize)
                } else if fontWeight == "normal" && fontStyle == "italic" {
                    font = UIFont.italicSystemFont(ofSize: fontSize)
                } else {
                    font = UIFont.systemFont(ofSize: fontSize)
                }
                font = RCTFont.update(font, withFamily: font.familyName, size: fontSize as NSNumber, weight: fontWeight, style: fontStyle, variant: fontVariant, scaleMultiplier: 1)
            } else {
                font = UIFont(name: fontFamily, size: fontSize) ?? UIFont.systemFont(ofSize: fontSize)
                font = RCTFont.update(font, withFamily: fontFamily, size: fontSize as NSNumber, weight: fontWeight, style: fontStyle, variant: fontVariant, scaleMultiplier: 1)
            }

            finalStyle[NSAttributedString.Key.font] = font
        }

        if textDecorationColor != nil || textDecorationStyle != nil || textDecorationLine != nil {
            if textDecorationLine == "line-through" || textDecorationLine == "underline line-through" {
                if textDecorationStyle == "solid" {
                    finalStyle[NSAttributedString.Key.strikethroughStyle] = NSUnderlineStyle.single.rawValue
                } else if textDecorationStyle == "double" {
                    finalStyle[NSAttributedString.Key.strikethroughStyle] = NSUnderlineStyle.double.rawValue
                } else if textDecorationStyle == "dotted" {
                    finalStyle[NSAttributedString.Key.strikethroughStyle] = NSUnderlineStyle.patternDot.rawValue
                } else if textDecorationStyle == "dashed" {
                    finalStyle[NSAttributedString.Key.strikethroughStyle] = NSUnderlineStyle.patternDash.rawValue
                }
                finalStyle[NSAttributedString.Key.strikethroughColor] = textDecorationColor
            }
            if textDecorationLine == "underline" || textDecorationLine == "underline line-through" {
                if textDecorationStyle == "solid" {
                    finalStyle[NSAttributedString.Key.underlineStyle] = NSUnderlineStyle.single.rawValue
                } else if textDecorationStyle == "double" {
                    finalStyle[NSAttributedString.Key.underlineStyle] = NSUnderlineStyle.double.rawValue
                } else if textDecorationStyle == "dotted" {
                    finalStyle[NSAttributedString.Key.underlineStyle] = NSUnderlineStyle.patternDot.rawValue
                } else if textDecorationStyle == "dashed" {
                    finalStyle[NSAttributedString.Key.underlineStyle] = NSUnderlineStyle.patternDash.rawValue
                }
                finalStyle[NSAttributedString.Key.underlineColor] = textDecorationColor
            }
        }

        if hasParagraphStyle {
            finalStyle[NSAttributedString.Key.paragraphStyle] = paragraphStyle
        }

        if shadow != nil {
            finalStyle[NSAttributedString.Key.shadow] = shadow
        }

        return finalStyle
    }
}
