import { To, State } from '@renavigation2/history'
import { createContext } from 'react'

export interface TabsActionsContextValue<
  S extends State = Record<string, unknown> | null
> {
  switch(to: To): Promise<void>
  switch<PS extends State = S>(to: To, state: PS): Promise<void>
}

export const TabsActionsContext = createContext<
  undefined | TabsActionsContextValue
>(undefined)
