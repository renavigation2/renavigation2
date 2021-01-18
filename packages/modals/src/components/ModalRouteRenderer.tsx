import React, { useContext, useMemo, useRef, useCallback } from 'react'
import { Modal } from '../native/Modal'
import {
  RouteObject,
  LifecycleEventType,
  LifecycleEventHandler
} from '@renavigation2/router'
import { ModalLocationContext } from '../context/ModalLocationContext'
import { ModalsNavigatorContext } from '../context/ModalsNavigatorContext'
import { NativeHistory, Location, Action } from '@renavigation2/history'
import { ModalLifecycleContext } from '../context/ModalLifecycleContext'
import { ModalsActionsResolversContext } from '../context/ModalsActionsResolversContext'

interface Props {
  route: RouteObject
  location: Location
  nativeRef: React.MutableRefObject<any>
  onDidDismiss: (location: Location) => void
  animated: boolean
}

export const ModalRouteRenderer: React.FC<Props> = ({
  route,
  location,
  nativeRef,
  onDidDismiss: onDidDismissCallback
}) => {
  const {
    onDidDismiss: onDidDismissResolversCallback,
    onDidPresent
  } = useContext(ModalsActionsResolversContext)!
  const { navigator, static: staticProp } = useContext(ModalsNavigatorContext)

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
    onDidPresent(location)
    trigger('didAppear')
  }, [location, onDidPresent, trigger])
  const onWillDisappear = useCallback(() => {
    trigger('willDisappear')
  }, [trigger])
  const onDidDisappear = useCallback(() => trigger('didDisappear'), [trigger])
  const onDidDismiss = useCallback(() => {
    onDidDismissCallback(location)
    onDidDismissResolversCallback(location)
  }, [onDidDismissCallback, onDidDismissResolversCallback, location])

  const lifecycleContext = useMemo(() => ({ subscribe }), [subscribe])

  return (
    <ModalLifecycleContext.Provider value={lifecycleContext}>
      <ModalLocationContext.Provider
        value={{
          action: action.current,
          location,
          navigator,
          static: staticProp
        }}
      >
        <Modal
          onWillAppear={onWillAppear}
          onDidAppear={onDidAppear}
          onWillDisappear={onWillDisappear}
          onDidDisappear={onDidDisappear}
          onDidDismiss={onDidDismiss}
          ref={nativeRef}
        >
          {route.element}
        </Modal>
      </ModalLocationContext.Provider>
    </ModalLifecycleContext.Provider>
  )
}
