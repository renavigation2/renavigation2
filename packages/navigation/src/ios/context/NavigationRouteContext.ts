import { Params, readOnly, RouteContextObject } from '@renavigation2/router'
import { createContext } from 'react'

export const NavigationRouteContext = createContext<RouteContextObject>({
  outlet: null,
  params: readOnly<Params>({}),
  pathname: '',
  route: null
})
