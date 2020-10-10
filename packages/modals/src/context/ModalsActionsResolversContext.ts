import { Location } from '@renavigation2/history'
import { createContext } from 'react'

export interface ModalsActionsResolversContextValue {
  onDidPresent: (location: Location) => void
  onDidDismiss: (location: Location) => void
}

export const ModalsActionsResolversContext = createContext<
  ModalsActionsResolversContextValue | undefined
>(undefined)
