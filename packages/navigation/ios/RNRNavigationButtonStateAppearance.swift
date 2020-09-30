struct RNRNavigationButtonStateAppearance {
    @available(iOS 13.0, *)
    static func applyButtonStateAppearance(_ attributes: NSDictionary, to: UIBarButtonItemStateAppearance) {
        for (k, value) in attributes {
            let key = k as! String
            if key == "titleStyle" {
                to.titleTextAttributes = RNRNavigationTextStyle.getStyles(RCTConvert.nsDictionary(value)! as NSDictionary, defaultFontSize: 17)
            } else if key == "titlePositionAdjustment" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                to.titlePositionAdjustment = UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat)
            } else if key == "backgroundImage" {
                to.backgroundImage = RCTConvert.uiImage(value)
            } else if key == "backgroundImageContentMode" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                to.backgroundImagePositionAdjustment = UIOffset(horizontal: v["horizontal"] as! CGFloat, vertical: v["vertical"] as! CGFloat)
            }
        }
    }
}