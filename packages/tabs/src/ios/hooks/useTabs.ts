import { State } from '@renavigation2/history'
import { useContext } from 'react'
import invariant from 'tiny-invariant'
import {
  TabsActionsContext,
  TabsActionsContextValue
} from '../context/TabsActionsContext'

export function useTabs<
  S extends State = Record<string, unknown> | null
>(): TabsActionsContextValue<S> {
  const context = useContext(TabsActionsContext)!
  invariant(context, 'You should not use useTabs outside a <TabsContainer>')
  return context! as TabsActionsContextValue<S>
}
