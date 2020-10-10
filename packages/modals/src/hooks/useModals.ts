import { State } from '@renavigation2/history'
import { useContext } from 'react'
import invariant from 'tiny-invariant'
import {
  ModalsActionsContext,
  ModalsActionsContextValue
} from '../context/ModalsActionsContext'

export function useModals<
  S extends State = Record<string, unknown> | null
>(): ModalsActionsContextValue<S> {
  const context = useContext(ModalsActionsContext)!
  invariant(context, 'You should not use useModals outside a <ModalsContainer>')
  return context! as ModalsActionsContextValue<S>
}
