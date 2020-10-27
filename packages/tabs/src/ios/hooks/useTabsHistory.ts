import { NativeHistory, State } from '@renavigation2/history'
import { useContext } from 'react'
import invariant from 'tiny-invariant'
import { TabsNavigatorContext } from '../context/TabsNavigatorContext'

export function useTabsHistory<
  S extends State = Record<string, unknown> | null
>(): NativeHistory<S> {
  const context = useContext(TabsNavigatorContext)!
  invariant(context, 'You should not use useTabs outside a <TabsRouter>')
  return context.navigator as NativeHistory<S>
}
