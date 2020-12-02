import { NativeModules, NativeEventEmitter } from 'react-native'
import { EdgeInsets } from '../typings/EdgeInsets'

const RNREdgeInsetsHelper = NativeModules.RNREdgeInsetsHelper

const EdgeInsetsEventsBase = new NativeEventEmitter(RNREdgeInsetsHelper)

const context = {
  layoutMargins: RNREdgeInsetsHelper.layoutMargins,
  safeAreaInsets: RNREdgeInsetsHelper.safeAreaInsets
}

export interface Event {
  layoutMargins: EdgeInsets
  safeAreaInsets: EdgeInsets
}

type Handler = (event: Event) => void

export class EdgeInsetsEvents {
  public static handlers: { [key: number]: Handler } = {}
  public static key = 0

  public static subscribe(handler: Handler): () => void {
    const key = EdgeInsetsEvents.key
    EdgeInsetsEvents.key++
    EdgeInsetsEvents.handlers[key] = handler
    return () => {
      delete EdgeInsetsEvents.handlers[key]
    }
  }

  public static trigger(event: Event) {
    context.layoutMargins = event.layoutMargins
    context.safeAreaInsets = event.safeAreaInsets
    for (const prop in EdgeInsetsEvents.handlers) {
      if (EdgeInsetsEvents.handlers.hasOwnProperty(prop)) {
        EdgeInsetsEvents.handlers[prop](event)
      }
    }
  }

  public static getCurrent(): Event {
    return context
  }
}

EdgeInsetsEventsBase.addListener(
  'onSafeAreaInsetsForRootViewDidChange',
  (event) => {
    EdgeInsetsEvents.trigger(event)
  }
)
