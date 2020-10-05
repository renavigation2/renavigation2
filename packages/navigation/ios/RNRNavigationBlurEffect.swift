@objc(RNRNavigationBlurEffect)
class RNRNavigationBlurEffect: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        if #available(iOS 13.0, *) {
            return [
                "prominent": UIBlurEffect.Style.prominent.rawValue,
                "dark": UIBlurEffect.Style.dark.rawValue,
                "extraLight": UIBlurEffect.Style.extraLight.rawValue,
                "light": UIBlurEffect.Style.light.rawValue,
                "regular": UIBlurEffect.Style.regular.rawValue,
                "systemChromeMaterial": UIBlurEffect.Style.systemChromeMaterial.rawValue,
                "systemChromeMaterialDark": UIBlurEffect.Style.systemChromeMaterialDark.rawValue,
                "systemChromeMaterialLight": UIBlurEffect.Style.systemChromeMaterialLight.rawValue,
                "systemMaterial": UIBlurEffect.Style.systemMaterial.rawValue,
                "systemMaterialDark": UIBlurEffect.Style.systemMaterialDark.rawValue,
                "systemMaterialLight": UIBlurEffect.Style.systemMaterialLight.rawValue,
                "systemThickMaterial": UIBlurEffect.Style.systemThickMaterial.rawValue,
                "systemThickMaterialDark": UIBlurEffect.Style.systemThickMaterialDark.rawValue,
                "systemThickMaterialLight": UIBlurEffect.Style.systemThickMaterialLight.rawValue,
                "systemThinMaterial": UIBlurEffect.Style.systemThinMaterial.rawValue,
                "systemThinMaterialDark": UIBlurEffect.Style.systemThinMaterialDark.rawValue,
                "systemThinMaterialLight": UIBlurEffect.Style.systemThinMaterialLight.rawValue,
                "systemUltraThinMaterial": UIBlurEffect.Style.systemUltraThinMaterial.rawValue,
                "systemUltraThinMaterialDark": UIBlurEffect.Style.systemUltraThinMaterialDark.rawValue,
                "systemUltraThinMaterialLight": UIBlurEffect.Style.systemUltraThinMaterialLight.rawValue,
            ]
        } else if #available(iOS 10.0, *) {
            return [
                "prominent": UIBlurEffect.Style.prominent.rawValue,
                "dark": UIBlurEffect.Style.dark.rawValue,
                "extraLight": UIBlurEffect.Style.extraLight.rawValue,
                "light": UIBlurEffect.Style.light.rawValue,
                "regular": UIBlurEffect.Style.regular.rawValue,
            ]
        } else {
            return [
                "dark": UIBlurEffect.Style.dark.rawValue,
                "extraLight": UIBlurEffect.Style.extraLight.rawValue,
                "light": UIBlurEffect.Style.light.rawValue,
            ]
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
