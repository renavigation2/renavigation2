import { State, History, Location } from '@renavigation2/history'
import { match } from './match'

export interface RouteChildrenProps<
  Params extends { [K in keyof Params]?: string } = {},
  S extends State = Record<string, unknown> | null
> {
  history: History
  location: Location<S>
  match: match<Params> | null
}
