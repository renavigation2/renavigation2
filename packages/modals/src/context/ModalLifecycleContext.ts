import { createContext } from 'react'
import { LifecycleContextObject } from '../typings/LifecycleContextObject'

export const ModalLifecycleContext = createContext<
  LifecycleContextObject | undefined
>(undefined)
