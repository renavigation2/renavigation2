import React, {
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  NativeHistory,
  To,
  State,
  Action,
  Location
} from '@renavigation2/history'
import {
  ModalsActionsContextValue,
  ModalsActionsContext
} from '../context/ModalsActionsContext'
import { ModalsNavigatorContext } from '../context/ModalsNavigatorContext'
import {
  ModalsActionsResolversContext,
  ModalsActionsResolversContextValue
} from '../context/ModalsActionsResolversContext'
import { ModalsRouterRef } from '../typings/ModalsRouterRef'

export interface ModalsRouterBaseProps {
  children?: React.ReactNode
  action?: Action
  location: Location
  navigator: NativeHistory
  static?: boolean
}

interface Listeners {
  present: { [key: string]: () => void }
  dismiss: { [key: string]: () => void }
  dismissAll: { [key: string]: () => void }
}

export function RefForwardingModalsRouterBase(
  {
    children = null,
    navigator,
    action,
    location,
    static: staticProp = false
  }: ModalsRouterBaseProps,
  ref:
    | ((instance: ModalsRouterRef | null | undefined) => void)
    | React.MutableRefObject<ModalsRouterRef | null | undefined>
    | null
    | undefined
) {
  const listeners = useRef<Listeners>({
    present: {},
    dismiss: {},
    dismissAll: {}
  })

  const resolvers = useMemo(
    (): ModalsActionsResolversContextValue => ({
      onDidPresent: (location: Location) => {
        if (listeners.current.present[location.key]) {
          listeners.current.present[location.key]()
          delete listeners.current.present[location.key]
        }
      },
      onDidDismiss: (location: Location) => {
        if (listeners.current.dismiss[location.key]) {
          listeners.current.dismiss[location.key]()
          delete listeners.current.dismiss[location.key]
        }
        if (listeners.current.dismissAll[location.key]) {
          listeners.current.dismissAll[location.key]()
          delete listeners.current.dismissAll[location.key]
        }
      }
    }),
    []
  )

  const presentModal = useCallback(
    (to: To, state?: State | boolean): Promise<void> => {
      return new Promise((resolve) => {
        if (typeof state === 'boolean') {
          state = undefined
        }
        navigator.push(to, state)
        const key = navigator.location.key
        listeners.current.present = {
          ...listeners.current.present,
          [key]: resolve
        }
      })
    },
    [navigator]
  )

  const dismissModal = useCallback(
    (key: string): Promise<void> => {
      return new Promise((resolve) => {
        const index = navigator.entries.findIndex((entry) => entry.key === key)
        if (index !== -1) {
          const nextIndex =
            navigator.index >= index ? index - 1 : navigator.index
          const entries = navigator.entries.filter((entry) => entry.key !== key)
          listeners.current.dismiss = {
            ...listeners.current.dismiss,
            [key]: resolve
          }
          navigator.reset(entries, nextIndex)
        }
      })
    },
    [navigator]
  )

  const dismissAllModals = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      let key: string | undefined
      if (navigator.entries[0]) {
        key = navigator.entries[0].key
        listeners.current.dismissAll = {
          ...listeners.current.dismissAll,
          [key]: resolve
        }
      }
      navigator.reset([], -1)
      if (!key) resolve()
    })
  }, [navigator])

  const modalsActionsContext = useMemo(
    (): ModalsActionsContextValue => ({
      presentModal,
      dismissModal,
      dismissAllModals
    }),
    [presentModal, dismissModal, dismissAllModals]
  )

  useImperativeHandle(ref, () => ({
    history: navigator,
    presentModal,
    dismissModal,
    dismissAllModals
  }))

  return (
    <ModalsActionsResolversContext.Provider value={resolvers}>
      <ModalsActionsContext.Provider value={modalsActionsContext}>
        <ModalsNavigatorContext.Provider
          value={{
            action,
            location,
            navigator,
            static: staticProp
          }}
        >
          {children}
        </ModalsNavigatorContext.Provider>
      </ModalsActionsContext.Provider>
    </ModalsActionsResolversContext.Provider>
  )
}

export const ModalsRouterBase = forwardRef(RefForwardingModalsRouterBase)
