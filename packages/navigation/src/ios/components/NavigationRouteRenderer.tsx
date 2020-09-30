import React, { useContext, useMemo, useRef, useCallback } from 'react'
import { NavigationScene } from '../native/NavigationScene'
import {
  RouteObject,
  LifecycleEventType,
  LifecycleEventHandler
} from '@renavigation2/router'
import { NavigationLocationContext } from '../context/NavigationLocationContext'
import { NavigationNavigatorContext } from '../context/NavigationNavigatorContext'
import { NativeHistory, Location, Action } from '@renavigation2/history'
import { NavigationLifecycleContext } from '../context/NavigationLifecycleContext'

interface Props {
  route: RouteObject
  location: Location
  nativeRef: React.MutableRefObject<any>
  onDidAppear: (location: Location) => void
  onDidDismiss: (location: Location) => void
  animated: boolean
}

export const NavigationRouteRenderer: React.FC<Props> = ({
  route,
  location,
  nativeRef,
  onDidAppear: onDidAppearCallback,
  onDidDismiss: onDidDismissCallback,
  animated
}) => {
  const { navigator, static: staticProp } = useContext(
    NavigationNavigatorContext
  )

  const action = useRef<Action>()
  if (
    (navigator as NativeHistory).location &&
    (navigator as NativeHistory).location.key === location.key
  ) {
    action.current = (navigator as NativeHistory).action
  }

  const listenerKey = useRef(0)
  const listeners = useRef<{
    willAppear: { [key: number]: LifecycleEventHandler }
    didAppear: { [key: number]: LifecycleEventHandler }
    willDisappear: { [key: number]: LifecycleEventHandler }
    didDisappear: { [key: number]: LifecycleEventHandler }
  }>({
    willAppear: {},
    didAppear: {},
    willDisappear: {},
    didDisappear: {}
  })

  const subscribe = useCallback(
    (event: LifecycleEventType, handler: LifecycleEventHandler) => {
      const key = listenerKey.current
      listenerKey.current = listenerKey.current + 1
      listeners.current[event][key] = handler
      return () => {
        delete listeners.current[event][key]
      }
    },
    []
  )

  const trigger = useCallback((event: LifecycleEventType) => {
    for (const prop in listeners.current[event]) {
      if (listeners.current[event].hasOwnProperty(prop)) {
        listeners.current[event][prop]()
      }
    }
  }, [])

  const onWillAppear = useCallback(() => trigger('willAppear'), [trigger])
  const onDidAppear = useCallback(() => {
    onDidAppearCallback(location)
    trigger('didAppear')
  }, [location, onDidAppearCallback, trigger])
  const onWillDisappear = useCallback(() => {
    trigger('willDisappear')
  }, [trigger])
  const onDidDisappear = useCallback(() => trigger('didDisappear'), [trigger])
  const onDidDismiss = useCallback(() => onDidDismissCallback(location), [
    onDidDismissCallback,
    location
  ])

  const lifecycleContext = useMemo(() => ({ subscribe }), [subscribe])

  return (
    <NavigationLifecycleContext.Provider value={lifecycleContext}>
      <NavigationLocationContext.Provider
        value={{
          action: action.current,
          location,
          navigator,
          static: staticProp
        }}
      >
        <NavigationScene
          onWillAppear={onWillAppear}
          onDidAppear={onDidAppear}
          onWillDisappear={onWillDisappear}
          onDidDisappear={onDidDisappear}
          onDidDismiss={onDidDismiss}
          animated={animated}
          ref={nativeRef}
        >
          {route.element}
        </NavigationScene>
      </NavigationLocationContext.Provider>
    </NavigationLifecycleContext.Provider>
  )
}
