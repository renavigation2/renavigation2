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
import { ModalsRouterBase } from './ModalsRouterBase'
import { ModalsRouterRef } from '../typings/ModalsRouterRef'

export interface ModalsPersistentRouterProps {
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

function RefForwardingModalsPersistentRouter(
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
  }: ModalsPersistentRouterProps,
  ref:
    | ((instance: ModalsRouterRef | null | undefined) => void)
    | React.MutableRefObject<ModalsRouterRef | null | undefined>
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
    <ModalsRouterBase
      ref={ref}
      action={state === undefined ? history.action : state.action}
      location={state === undefined ? history.location : state.location}
      navigator={history}
    >
      {children}
    </ModalsRouterBase>
  ) : null
}

export const ModalsPersistentRouter = forwardRef(
  RefForwardingModalsPersistentRouter
)
