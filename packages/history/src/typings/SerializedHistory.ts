import { Location } from './Location'
import { State } from './State'

export interface SerializedHistory<S extends State = State> {
  index: number
  entries: Location<S>[]
}
