import { Params } from '../typings/Params'
import { readOnly } from '../utils/readOnly'
import { createContext } from 'react'
import { RouteContextObject } from '../typings/RouteContextObject'

export const ModalsRouteContext = createContext<RouteContextObject>({
  outlet: null,
  params: readOnly<Params>({}),
  pathname: '',
  route: null
})
