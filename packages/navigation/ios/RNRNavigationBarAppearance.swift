struct RNRNavigationBarAppearance {
    @available(iOS 13.0, *)
    static func getBarAppearance(_ attributes: NSDictionary) -> UINavigationBarAppearance {
        NSLog("heyooo")
        print(attributes)
        let barAppearance: UINavigationBarAppearance = UINavigationBarAppearance()
        if attributes["configure"] != nil {
            if attributes["configure"] as! String == "defaultBackground" {
                barAppearance.configureWithDefaultBackground()
            } else if attributes["configure"] as! String == "opaqueBackground" {
                barAppearance.configureWithOpaqueBackground()
            } else if attributes["configure"] as! String == "transparentBackground" {
                NSLog("configure with transparent background")
                barAppearance.configureWithTransparentBackground()
            }
        }

        for (k, value) in attributes {
            let key = k as! String
            if key == "backgroundEffect" {
                barAppearance.backgroundEffect = UIBlurEffect(style: UIBlurEffect.Style.init(rawValue: value as! Int)!)
            } else if key == "backgroundColor" {
                barAppearance.backgroundColor = RCTConvert.uiColor(value)
            } else if key == "backgroundImage" {
                barAppearance.backgroundImage = RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary)
            } else if key == "backgroundImageContentMode" {
                barAppearance.backgroundImageContentMode = UIView.ContentMode.init(rawValue: value as! Int)!
            } else if key == "shadowColor" {
                barAppearance.shadowColor = RCTConvert.uiColor(value)
            } else if key == "shadowImage" {
                barAppearance.shadowImage = RNRNavigationImage.getImage(RCTConvert.nsDictionary(value)! as NSDictionary)
            } else if key == "titleStyle" {
                barAppearance.titleTextAttributes = RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 17, defaultFontWeight: "bold")
            } else if key == "largeTitleStyle" {
                barAppearance.largeTitleTextAttributes = RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 34, defaultFontWeight: "bold")
            } else if key == "titlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                barAppearance.titlePositionAdjustment = UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat)
            } else if key == "buttonAppearance" {
                barAppearance.buttonAppearance = RNRNavigationButtonAppearance.getButtonAppearance(RCTConvert.nsDictionary(value)! as NSDictionary)
            } else if key == "doneButtonAppearance" {
                barAppearance.doneButtonAppearance = RNRNavigationButtonAppearance.getButtonAppearance(RCTConvert.nsDictionary(value)! as NSDictionary)
            } else if key == "backButtonAppearance" {
                barAppearance.backButtonAppearance = RNRNavigationButtonAppearance.getButtonAppearance(RCTConvert.nsDictionary(value)! as NSDictionary)
            }
        }

        if attributes["backIndicatorImage"] != nil && attributes["backIndicatorTransitionMaskImage"] != nil {
            barAppearance.setBackIndicatorImage(
                    RNRNavigationImage.getImage(RCTConvert.nsDictionary(attributes["backIndicatorImage"])! as NSDictionary),
                    transitionMaskImage: RNRNavigationImage.getImage(RCTConvert.nsDictionary(attributes["backIndicatorTransitionMaskImage"])! as NSDictionary)
            )
        }

        return barAppearance
    }
}