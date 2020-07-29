import { useContext } from 'react'
import invariant from 'tiny-invariant'
import {
  ModalsActionsContext,
  ModalsActionsContextValue
} from '../context/ModalsActionsContext'

export function useModals(): ModalsActionsContextValue {
  const context = useContext(ModalsActionsContext)!
  invariant(context, 'You should not use useModals outside a <ModalsContainer>')
  return context!
}
