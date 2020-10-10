import { To, State, Key } from '@renavigation2/history'
import { createContext } from 'react'

export interface ModalsActionsContextValue<
  S extends State = Record<string, unknown> | null
> {
  presentModal(to: To): Promise<void>
  presentModal<PS extends State = S>(to: To, state: PS): Promise<void>

  dismissModal(key: Key): Promise<void>

  dismissAllModals(): Promise<void>
}

export const ModalsActionsContext = createContext<
  undefined | ModalsActionsContextValue
>(undefined)
