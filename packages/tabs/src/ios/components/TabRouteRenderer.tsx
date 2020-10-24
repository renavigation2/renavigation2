import React, {
  useContext,
  useMemo,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  RouteObject,
  LifecycleEventType,
  LifecycleEventHandler
} from '@renavigation2/router'
import { TabLocationContext } from '../context/TabLocationContext'
import { TabsNavigatorContext } from '../context/TabsNavigatorContext'
import { Action, Location, NativeHistory } from '@renavigation2/history'
import { TabLifecycleContext } from '../context/TabLifecycleContext'

interface Props {
  index: number
  route: RouteObject
  location?: Location
}

export interface TabRouteRendererRef {
  onDidSelect: (index: number) => void
  onWillSelect: (index: number) => void
}

function RefForwardingTabRouteRenderer(
  { route, location, index }: Props,
  ref:
    | ((instance: TabRouteRendererRef | null | undefined) => void)
    | React.MutableRefObject<TabRouteRendererRef | null | undefined>
    | null
    | undefined
) {
  const { navigator, static: staticProp } = useContext(TabsNavigatorContext)

  const action = useRef<Action>()
  if (
    location &&
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

  const lifecycleContext = useMemo(() => ({ subscribe }), [subscribe])

  const onDidSelectRef = useRef<number>()
  const onWillSelectRef = useRef<number>()

  useImperativeHandle(ref, () => ({
    onDidSelect: (i: number) => {
      if (i === index) {
        if (onDidSelectRef.current !== index) {
          trigger('didAppear')
        }
      } else {
        if (onDidSelectRef.current === index) {
          trigger('didDisappear')
        }
      }
      onDidSelectRef.current = i
      if (onWillSelectRef.current === undefined) {
        onWillSelectRef.current = i
      }
    },
    onWillSelect: (i: number) => {
      if (i === index) {
        if (onWillSelectRef.current !== index) {
          trigger('willAppear')
        }
      } else {
        if (onWillSelectRef.current === index) {
          trigger('willDisappear')
        }
      }
      onWillSelectRef.current = i
    }
  }))

  return (
    <TabLifecycleContext.Provider value={lifecycleContext}>
      <TabLocationContext.Provider
        value={{
          action: action.current,
          location,
          navigator,
          static: staticProp
        }}
      >
        {route.element}
      </TabLocationContext.Provider>
    </TabLifecycleContext.Provider>
  )
}

export const TabRouteRenderer = forwardRef(RefForwardingTabRouteRenderer)
