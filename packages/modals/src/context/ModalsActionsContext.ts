import { To, State, Key } from '@renavigation2/history'
import { createContext } from 'react'

export interface ModalsActionsContextValue<S = State> {
  presentModal(to: To): void
  presentModal(to: To, state: S): void

  dismissModal(key: Key): void

  dismissAllModals(): void
}

export const ModalsActionsContext = createContext<
  undefined | ModalsActionsContextValue
>(undefined)
