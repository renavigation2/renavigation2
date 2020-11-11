import { NativeEventEmitter, NativeModules } from 'react-native'

const { RNRCoreEventManager } = NativeModules

export const CoreEventManager = new NativeEventEmitter(RNRCoreEventManager)
