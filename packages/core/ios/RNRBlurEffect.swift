public struct RNRBlurEffect {
    public static func getBlurEffect(_ value: String) -> UIBlurEffect? {
        let style = getBlurEffectStyle(value)
        if style != nil {
            return UIBlurEffect(style: style!)
        }
        return nil
    }

    public static func getBlurEffectStyle(_ value: String) -> UIBlurEffect.Style? {
        if value == "dark" {
            return UIBlurEffect.Style.dark
        } else if value == "extraLight" {
            return UIBlurEffect.Style.extraLight
        } else if value == "light" {
            return UIBlurEffect.Style.light
        }

        if #available(iOS 10.0, *) {
            if value == "prominent" {
                return UIBlurEffect.Style.prominent
            } else if value == "regular" {
                return UIBlurEffect.Style.regular
            }
        }

        if #available(iOS 13.0, *) {
            if value == "systemChromeMaterial" {
                return UIBlurEffect.Style.systemChromeMaterial
            } else if value == "systemChromeMaterialDark" {
                return UIBlurEffect.Style.systemChromeMaterialDark
            } else if value == "systemChromeMaterialLight" {
                return UIBlurEffect.Style.systemChromeMaterialLight
            } else if value == "systemMaterial" {
                return UIBlurEffect.Style.systemMaterial
            } else if value == "systemMaterialDark" {
                return UIBlurEffect.Style.systemMaterialDark
            } else if value == "systemMaterialLight" {
                return UIBlurEffect.Style.systemMaterialLight
            } else if value == "systemThickMaterial" {
                return UIBlurEffect.Style.systemThickMaterial
            } else if value == "systemThickMaterialDark" {
                return UIBlurEffect.Style.systemThickMaterialDark
            } else if value == "systemThickMaterialLight" {
                return UIBlurEffect.Style.systemThickMaterialLight
            } else if value == "systemThinMaterial" {
                return UIBlurEffect.Style.systemThinMaterial
            } else if value == "systemThinMaterialDark" {
                return UIBlurEffect.Style.systemThinMaterialDark
            } else if value == "systemThinMaterialLight" {
                return UIBlurEffect.Style.systemThinMaterialLight
            } else if value == "systemUltraThinMaterial" {
                return UIBlurEffect.Style.systemUltraThinMaterial
            } else if value == "systemUltraThinMaterialDark" {
                return UIBlurEffect.Style.systemUltraThinMaterialDark
            } else if value == "systemUltraThinMaterialLight" {
                return UIBlurEffect.Style.systemUltraThinMaterialLight
            }
        }

        return nil
    }
}
