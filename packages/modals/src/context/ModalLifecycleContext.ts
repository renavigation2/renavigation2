import { createContext } from 'react'
import { LifecycleContextObject } from '@renavigation2/router'

export const ModalLifecycleContext = createContext<
  LifecycleContextObject | undefined
>(undefined)
