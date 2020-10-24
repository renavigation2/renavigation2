import { useContext } from 'react'
import { Params } from '@renavigation2/router'
import { TabsRouteContext } from '../context/TabsRouteContext'

export function useTabParams<P = Params>(): P | undefined {
  const context = useContext(TabsRouteContext)
  return context ? (context.params as P) : undefined
}
