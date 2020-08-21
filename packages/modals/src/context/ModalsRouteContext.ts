import { Params, readOnly, RouteContextObject } from '@renavigation2/router'
import { createContext } from 'react'

export const ModalsRouteContext = createContext<RouteContextObject>({
  outlet: null,
  params: readOnly<Params>({}),
  pathname: '',
  route: null
})
