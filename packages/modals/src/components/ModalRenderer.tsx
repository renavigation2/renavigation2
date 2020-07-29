import React, {
  useContext,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react'
import { ModalsOptionsContext } from '../context/ModalsOptionsContext'
import { NativeModal } from '../native/NativeModal'
import { RouteObject } from '../typings/RouteObject'
import { ModalPresentation } from '../native/ModalPresentation'
import { ModalLocationContext } from '../context/ModalLocationContext'
import { ModalsNavigatorContext } from '../context/ModalsNavigatorContext'
import { NativeHistory, Location, Action } from '@renavigation2/history'
import { ModalSetDismissibleContext } from '../context/ModalSetDismissibleContext'
import { LifecycleEventType } from '../typings/LifecycleEventType'
import { LifecycleEventHandler } from '../typings/LifecycleEventHandler'
import { ModalLifecycleContext } from '../context/ModalLifecycleContext'

interface Props {
  route: RouteObject
  location: Location
  nativeRef: React.MutableRefObject<any>
  onDidDisappear: (location: Location) => void
}

export const ModalRenderer: React.FC<Props> = ({
  route,
  location,
  nativeRef,
  onDidDisappear: onDidDisappearCallback
}) => {
  const { navigator, static: staticProp } = useContext(ModalsNavigatorContext)

  const action = useRef<Action>()
  if (
    (navigator as NativeHistory).location &&
    (navigator as NativeHistory).location.key === location.key
  ) {
    action.current = (navigator as NativeHistory).action
  }

  const { setPresentOptions, getPresentOptions } = useContext(
    ModalsOptionsContext
  )!

  const options = useMemo(() => {
    const options = getPresentOptions()
    setPresentOptions(undefined)
    return options
  }, [setPresentOptions, getPresentOptions])

  const [dismissible, setDismissible] = useState(true)

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
  const onDidAppear = useCallback(() => trigger('didAppear'), [trigger])
  const onWillDisappear = useCallback(() => trigger('willDisappear'), [trigger])
  const onDidDisappear = useCallback(() => {
    trigger('didDisappear')
    onDidDisappearCallback(location)
  }, [trigger, onDidDisappearCallback, location])

  const lifecycleContext = useMemo(() => ({ subscribe }), [subscribe])

  return (
    <ModalSetDismissibleContext.Provider value={setDismissible}>
      <ModalLifecycleContext.Provider value={lifecycleContext}>
        <ModalLocationContext.Provider
          value={{
            action: action.current,
            location,
            navigator,
            static: staticProp
          }}
        >
          <NativeModal
            ref={nativeRef}
            animated={options ? options.animated : true}
            modalPresentation={
              options
                ? options.modalPresentation
                : ModalPresentation.PresentationNone
            }
            dismissible={dismissible}
            onWillAppear={onWillAppear}
            onDidAppear={onDidAppear}
            onWillDisappear={onWillDisappear}
            onDidDisappear={onDidDisappear}
          >
            {route.element}
          </NativeModal>
        </ModalLocationContext.Provider>
      </ModalLifecycleContext.Provider>
    </ModalSetDismissibleContext.Provider>
  )
}
