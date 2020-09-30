import { createContext } from 'react'
import { LifecycleContextObject } from '@renavigation2/router'

export const NavigationLifecycleContext = createContext<
  LifecycleContextObject | undefined
>(undefined)
