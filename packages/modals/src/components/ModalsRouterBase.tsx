import React, { useMemo, useCallback, useRef } from 'react'
import {
  NativeHistory,
  To,
  State,
  Action,
  Location
} from '@renavigation2/history'
import {
  ModalsOptionsContext,
  ModalsOptionsContextValue
} from '../context/ModalsOptionsContext'
import { ModalPresentation } from '../native/ModalPresentation'
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
  const presentOptions = useRef<
    | {
        animated: boolean
        modalPresentation: ModalPresentation
      }
    | undefined
  >(undefined)
  const getPresentOptions = useCallback(
    ():
      | {
          animated: boolean
          modalPresentation: ModalPresentation
        }
      | undefined => presentOptions.current,
    []
  )
  const setPresentOptions = useCallback(
    (
      options:
        | {
            animated: boolean
            modalPresentation: ModalPresentation
          }
        | undefined
    ) => {
      presentOptions.current = options
    },
    []
  )

  const dismissOptions = useRef<
    | {
        animated: boolean
      }
    | undefined
  >(undefined)
  const getDismissOptions = useCallback(
    ():
      | {
          animated: boolean
        }
      | undefined => dismissOptions.current,
    []
  )
  const setDismissOptions = useCallback(
    (
      options:
        | {
            animated: boolean
          }
        | undefined
    ) => {
      dismissOptions.current = options
    },
    []
  )

  const modalsOptionsContext = useMemo(
    (): ModalsOptionsContextValue => ({
      getPresentOptions,
      setPresentOptions,
      getDismissOptions,
      setDismissOptions
    }),
    [getPresentOptions, setPresentOptions, getDismissOptions, setDismissOptions]
  )

  const presentModal = useCallback(
    (
      to: To,
      state?: State | boolean,
      animated?: boolean | ModalPresentation,
      modalPresentation?: ModalPresentation
    ) => {
      if (typeof state === 'boolean') {
        modalPresentation = animated as ModalPresentation
        animated = state
        state = undefined
      }
      setPresentOptions({
        animated: animated === false ? false : true,
        modalPresentation: modalPresentation || ModalPresentation.PageSheet
      })

      navigator.push(to, state)
    },
    [navigator, setPresentOptions]
  )

  const dismissModal = useCallback(
    (key: string, animated?: boolean) => {
      const index = navigator.entries.findIndex((entry) => entry.key === key)
      if (index !== -1) {
        const nextIndex = navigator.index >= index ? index - 1 : navigator.index
        const entries = navigator.entries.filter((entry) => entry.key !== key)
        setDismissOptions({ animated: animated === false ? false : true })
        navigator.reset(entries, nextIndex)
      }
    },
    [navigator, setDismissOptions]
  )

  const dismissAllModals = useCallback(
    (animated?: boolean) => {
      setDismissOptions({ animated: animated === false ? false : true })
      navigator.reset([], 0)
    },
    [navigator, setDismissOptions]
  )

  const modalsActionsContext = useMemo(
    (): ModalsActionsContextValue => ({
      presentModal,
      dismissModal,
      dismissAllModals
    }),
    [presentModal, dismissModal, dismissAllModals]
  )

  return (
    <ModalsOptionsContext.Provider value={modalsOptionsContext}>
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
    </ModalsOptionsContext.Provider>
  )
}
