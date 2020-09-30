@objc(RNRNavigationBlurEffect)
class RNRNavigationBlurEffect: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        if #available(iOS 13.0, *) {
            return [
                "extraLight": UIBlurEffect.Style.extraLight.rawValue,
                "light": UIBlurEffect.Style.light.rawValue,
                "dark": UIBlurEffect.Style.dark.rawValue,
                "regular": UIBlurEffect.Style.regular.rawValue,
                "prominent": UIBlurEffect.Style.prominent.rawValue,
                "systemUltraThinMaterial": UIBlurEffect.Style.systemUltraThinMaterial.rawValue,
                "systemThinMaterial": UIBlurEffect.Style.systemThinMaterial.rawValue,
                "systemMaterial": UIBlurEffect.Style.systemMaterial.rawValue,
                "systemThickMaterial": UIBlurEffect.Style.systemThickMaterial.rawValue,
                "systemChromeMaterial": UIBlurEffect.Style.systemChromeMaterial.rawValue,
                "systemUltraThinMaterialLight": UIBlurEffect.Style.systemUltraThinMaterialLight.rawValue,
                "systemThinMaterialLight": UIBlurEffect.Style.systemThinMaterialLight.rawValue,
                "systemMaterialLight": UIBlurEffect.Style.systemMaterialLight.rawValue,
                "systemThickMaterialLight": UIBlurEffect.Style.systemThickMaterialLight.rawValue,
                "systemChromeMaterialLight": UIBlurEffect.Style.systemChromeMaterialLight.rawValue,
                "systemUltraThinMaterialDark": UIBlurEffect.Style.systemUltraThinMaterialDark.rawValue,
                "systemThinMaterialDark": UIBlurEffect.Style.systemThinMaterialDark.rawValue,
                "systemMaterialDark": UIBlurEffect.Style.systemMaterialDark.rawValue,
                "systemThickMaterialDark": UIBlurEffect.Style.systemThickMaterialDark.rawValue,
                "systemChromeMaterialDark": UIBlurEffect.Style.systemChromeMaterialDark.rawValue
            ]
        } else if #available(iOS 10.0, *) {
            return [
                "extraLight": UIBlurEffect.Style.extraLight.rawValue,
                "light": UIBlurEffect.Style.light.rawValue,
                "dark": UIBlurEffect.Style.dark.rawValue,
                "regular": UIBlurEffect.Style.regular.rawValue,
                "prominent": UIBlurEffect.Style.prominent.rawValue
            ]
        } else {
            return [
                "extraLight": UIBlurEffect.Style.extraLight.rawValue,
                "light": UIBlurEffect.Style.light.rawValue,
                "dark": UIBlurEffect.Style.dark.rawValue
            ]
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}

