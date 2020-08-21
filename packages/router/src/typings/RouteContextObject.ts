import { Params } from './Params'
import { RouteObject } from './RouteObject'

export interface RouteContextObject {
  outlet: React.ReactElement | null
  params: Params
  pathname: string
  route: RouteObject | null
}
