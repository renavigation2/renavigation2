import { createContext } from 'react'
import { LifecycleContextObject } from '@renavigation2/router'

export const TabLifecycleContext = createContext<
  LifecycleContextObject | undefined
>(undefined)
