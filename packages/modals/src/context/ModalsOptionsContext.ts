import { createContext } from 'react'
import { ModalPresentation } from '../native/ModalPresentation'

export interface ModalsOptionsContextValue {
  getPresentOptions():
    | {
        animated: boolean
        modalPresentation: ModalPresentation
      }
    | undefined
  setPresentOptions(
    options:
      | {
          animated: boolean
          modalPresentation: ModalPresentation
        }
      | undefined
  ): void
  getDismissOptions():
    | {
        animated: boolean
      }
    | undefined
  setDismissOptions(
    options:
      | {
          animated: boolean
        }
      | undefined
  ): void
}

export const ModalsOptionsContext = createContext<
  ModalsOptionsContextValue | undefined
>(undefined)
