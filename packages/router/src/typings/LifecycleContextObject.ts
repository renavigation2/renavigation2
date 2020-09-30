import { LifecycleEventType } from './LifecycleEventType'
import { LifecycleEventHandler } from './LifecycleEventHandler'
import { UnsubscribeCallback } from './UnsubscribeCallback'

export interface LifecycleContextObject {
  subscribe: (
    event: LifecycleEventType,
    callback: LifecycleEventHandler
  ) => UnsubscribeCallback
}
