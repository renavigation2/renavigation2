import { NativeModules } from 'react-native'

const RNRNavigationBlurEffect = NativeModules.RNRNavigationBlurEffect

export enum BlurEffect {
  'extra-light' = RNRNavigationBlurEffect.extraLight,
  'light' = RNRNavigationBlurEffect.light,
  'dark' = RNRNavigationBlurEffect.dark,
  'regular' = RNRNavigationBlurEffect.regular,
  'prominent' = RNRNavigationBlurEffect.prominent,
  'system-ultra-thin-material' = RNRNavigationBlurEffect.systemUltraThinMaterial,
  'system-thin-material' = RNRNavigationBlurEffect.systemThinMaterial,
  'system-material' = RNRNavigationBlurEffect.systemMaterial,
  'system-thick-material' = RNRNavigationBlurEffect.systemThickMaterial,
  'system-chrome-material' = RNRNavigationBlurEffect.systemChromeMaterial,
  'system-ultra-thin-material-light' = RNRNavigationBlurEffect.systemUltraThinMaterialLight,
  'system-thin-material-light' = RNRNavigationBlurEffect.systemThinMaterialLight,
  'system-material-light' = RNRNavigationBlurEffect.systemMaterialLight,
  'system-thick-material-light' = RNRNavigationBlurEffect.systemThickMaterialLight,
  'system-chrome-material-light' = RNRNavigationBlurEffect.systemChromeMaterialLight,
  'system-ultra-thin-material-dark' = RNRNavigationBlurEffect.systemUltraThinMaterialDark,
  'system-thin-material-dark' = RNRNavigationBlurEffect.systemThinMaterialDark,
  'system-material-dark' = RNRNavigationBlurEffect.systemMaterialDark,
  'system-thick-material-dark' = RNRNavigationBlurEffect.systemThickMaterialDark,
  'system-chrome-material-dark' = RNRNavigationBlurEffect.systemChromeMaterialDark
}

export type BlurEffectValue = keyof typeof BlurEffect

export function processBlurEffect(value: BlurEffectValue): BlurEffect {
  return BlurEffect[value]
}
