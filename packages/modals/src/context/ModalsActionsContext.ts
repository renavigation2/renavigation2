import { To, State, Key } from '@renavigation2/history'
import { createContext } from 'react'
import { ModalPresentation } from '../native/ModalPresentation'

export interface ModalsActionsContextValue<S = State> {
  presentModal(
    to: To,
    animated?: boolean,
    modalPresentation?: ModalPresentation
  ): void
  presentModal(
    to: To,
    state: S,
    animated?: boolean,
    modalPresentation?: ModalPresentation
  ): void

  dismissModal(key: Key, animated?: boolean): void

  dismissAllModals(animated?: boolean): void
}

export const ModalsActionsContext = createContext<
  undefined | ModalsActionsContextValue
>(undefined)
