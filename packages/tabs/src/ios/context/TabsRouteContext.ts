import { Params, readOnly, RouteContextObject } from '@renavigation2/router'
import { createContext } from 'react'

export const TabsRouteContext = createContext<RouteContextObject | undefined>({
  outlet: null,
  params: readOnly<Params>({}),
  pathname: '',
  route: null
})
