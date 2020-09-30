import { RouteObject } from './RouteObject'
import { Params } from './Params'

export interface RouteMatch {
  route: RouteObject
  pathname: string
  params: Params
}
