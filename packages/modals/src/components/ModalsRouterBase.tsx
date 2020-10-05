import React, { useMemo, useCallback } from 'react'
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

export interface ModalsRouterBaseProps {
  action?: Action
  children?: React.ReactNode
  location: Location
  navigator: NativeHistory
  static?: boolean
}

export const ModalsRouterBase: React.FC<ModalsRouterBaseProps> = ({
  children = null,
  navigator,
  action,
  location,
  static: staticProp = false
}) => {
  const presentModal = useCallback(
    (to: To, state?: State | boolean) => {
      if (typeof state === 'boolean') {
        state = undefined
      }
      navigator.push(to, state)
    },
    [navigator]
  )

  const dismissModal = useCallback(
    (key: string) => {
      const index = navigator.entries.findIndex((entry) => entry.key === key)
      if (index !== -1) {
        const nextIndex = navigator.index >= index ? index - 1 : navigator.index
        const entries = navigator.entries.filter((entry) => entry.key !== key)
        navigator.reset(entries, nextIndex)
      }
    },
    [navigator]
  )

  const dismissAllModals = useCallback(() => {
    navigator.reset([], 0)
  }, [navigator])

  const modalsActionsContext = useMemo(
    (): ModalsActionsContextValue => ({
      presentModal,
      dismissModal,
      dismissAllModals
    }),
    [presentModal, dismissModal, dismissAllModals]
  )

  return (
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
  )
}
