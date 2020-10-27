import { NativeHistory, State } from '@renavigation2/history'
import { useContext } from 'react'
import invariant from 'tiny-invariant'
import { ModalsNavigatorContext } from '../context/ModalsNavigatorContext'

export function useModalsHistory<
  S extends State = Record<string, unknown> | null
>(): NativeHistory<S> {
  const context = useContext(ModalsNavigatorContext)!
  invariant(
    context,
    'You should not use useModalsHistory outside a <ModalsRouter>'
  )
  return context.navigator! as NativeHistory<S>
}
