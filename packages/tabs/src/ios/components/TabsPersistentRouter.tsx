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
import { TabsRouterBase } from './TabsRouterBase'
import { TabsRouterRef } from '../typings/TabsRouterRef'

export interface TabsPersistentRouterProps {
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

function RefForwardingTabsPersistentRouter(
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
  }: TabsPersistentRouterProps,
  ref:
    | ((instance: TabsRouterRef | null | undefined) => void)
    | React.MutableRefObject<TabsRouterRef | null | undefined>
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
    <TabsRouterBase
      ref={ref}
      action={state === undefined ? history.action : state.action}
      location={state === undefined ? history.location : state.location}
      navigator={history}
    >
      {children}
    </TabsRouterBase>
  ) : null
}

export const TabsPersistentRouter = forwardRef(
  RefForwardingTabsPersistentRouter
)
