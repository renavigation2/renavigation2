struct RNRNavigationButtonAppearance {
    @available(iOS 13.0, *)
    static func getButtonAppearance(_ attributes: NSDictionary) -> UIBarButtonItemAppearance {
        let buttonAppearance: UIBarButtonItemAppearance = UIBarButtonItemAppearance()
        if attributes["configure"] != nil {
            if attributes["configure"] as! String == "plain" {
                buttonAppearance.configureWithDefault(for: .plain)
            } else if attributes["configure"] as! String == "done" {
                buttonAppearance.configureWithDefault(for: .done)
            }
        }

        for (k, value) in attributes {
            let key = k as! String
            if key == "normal" {
                RNRNavigationButtonStateAppearance.applyButtonStateAppearance(value as! NSDictionary, to: buttonAppearance.normal)
            } else if key == "highlighted" {
                RNRNavigationButtonStateAppearance.applyButtonStateAppearance(value as! NSDictionary, to: buttonAppearance.highlighted)
            } else if key == "disabled" {
                RNRNavigationButtonStateAppearance.applyButtonStateAppearance(value as! NSDictionary, to: buttonAppearance.disabled)
            } else if key == "focused" {
                RNRNavigationButtonStateAppearance.applyButtonStateAppearance(value as! NSDictionary, to: buttonAppearance.focused)
            }
        }

        return buttonAppearance
    }
}