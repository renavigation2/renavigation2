import { NativeModules } from 'react-native'

const RNRNavigationBlurEffect = NativeModules.RNRNavigationBlurEffect

export enum BlurEffect {
  extraLight = RNRNavigationBlurEffect.extraLight,
  light = RNRNavigationBlurEffect.light,
  dark = RNRNavigationBlurEffect.dark,
  regular = RNRNavigationBlurEffect.regular,
  prominent = RNRNavigationBlurEffect.prominent,
  systemUltraThinMaterial = RNRNavigationBlurEffect.systemUltraThinMaterial,
  systemThinMaterial = RNRNavigationBlurEffect.systemThinMaterial,
  systemMaterial = RNRNavigationBlurEffect.systemMaterial,
  systemThickMaterial = RNRNavigationBlurEffect.systemThickMaterial,
  systemChromeMaterial = RNRNavigationBlurEffect.systemChromeMaterial,
  systemUltraThinMaterialLight = RNRNavigationBlurEffect.systemUltraThinMaterialLight,
  systemThinMaterialLight = RNRNavigationBlurEffect.systemThinMaterialLight,
  systemMaterialLight = RNRNavigationBlurEffect.systemMaterialLight,
  systemThickMaterialLight = RNRNavigationBlurEffect.systemThickMaterialLight,
  systemChromeMaterialLight = RNRNavigationBlurEffect.systemChromeMaterialLight,
  systemUltraThinMaterialDark = RNRNavigationBlurEffect.systemUltraThinMaterialDark,
  systemThinMaterialDark = RNRNavigationBlurEffect.systemThinMaterialDark,
  systemMaterialDark = RNRNavigationBlurEffect.systemMaterialDark,
  systemThickMaterialDark = RNRNavigationBlurEffect.systemThickMaterialDark,
  systemChromeMaterialDark = RNRNavigationBlurEffect.systemChromeMaterialDark
}

export type BlurEffectValue = keyof typeof BlurEffect

export function getBlurEffect(value: BlurEffectValue): BlurEffect {
  return BlurEffect[value]
}
