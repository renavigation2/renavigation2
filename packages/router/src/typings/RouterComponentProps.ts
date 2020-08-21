import { StaticContext } from './StaticContext'
import { History, Location, State } from '@renavigation2/history'
import { match } from './match'

export interface RouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S extends State = State
> {
  history: History<S>
  location: Location<S>
  match: match<Params>
  staticContext?: C
}
