import React, { useMemo, useState, useLayoutEffect, forwardRef } from 'react'
import {
  WebStorage,
  AsyncStorage,
  LocalForageStorage,
  Storage,
  Migrate,
  DataReconciler,
  Transform,
  createPersistentMemoryHistory,
  InitialEntry,
  NativeHistory,
  Action,
  Location
} from '@renavigation2/history'
import { NavigationRouterBase } from './NavigationRouterBase'
import { NavigationRouterRef } from '../typings/NavigationRouterRef'

export interface NavigationPersistentRouterProps {
  children?: React.ReactNode
  defaultEntries?: InitialEntry[]
  defaultIndex?: number
  version?: number
  storage: WebStorage | AsyncStorage | LocalForageStorage | Storage
  storageKey: string
  migrate?: Migrate
  dataReconciler?: false | DataReconciler
  transforms?: Transform[]
}

function RefForwardingNavigationPersistentRouter(
  {
    defaultEntries,
    defaultIndex,
    version,
    storage,
    storageKey,
    migrate,
    dataReconciler,
    transforms,
    children
  }: NavigationPersistentRouterProps,
  ref:
    | ((instance: NavigationRouterRef | null | undefined) => void)
    | React.MutableRefObject<NavigationRouterRef | null | undefined>
    | null
    | undefined
) {
  const [history, setHistory] = useState<NativeHistory>()

  useMemo(() => {
    createPersistentMemoryHistory({
      defaultEntries: defaultEntries || [],
      defaultIndex,
      version,
      storage,
      storageKey,
      migrate,
      dataReconciler,
      transforms
    }).then((history) => {
      setHistory(history)
    })
  }, [
    dataReconciler,
    defaultEntries,
    defaultIndex,
    storageKey,
    migrate,
    storage,
    transforms,
    version
  ])

  const [state, setState] = useState<
    undefined | { action: Action; location: Location }
  >()

  useLayoutEffect(() => {
    if (history) {
      history.listen(setState)
    }
  }, [history])

  return history ? (
    <NavigationRouterBase
      action={state === undefined ? history.action : state.action}
      location={state === undefined ? history.location : state.location}
      navigator={history}
      ref={ref}
    >
      {children}
    </NavigationRouterBase>
  ) : null
}

export const NavigationPersistentRouter = forwardRef(
  RefForwardingNavigationPersistentRouter
)
