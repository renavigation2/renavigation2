import { Location } from './Location'
import { State } from './State'

export interface SerializedHistory<
  S extends State = Record<string, unknown> | null
> {
  index: number
  entries: Location<S>[]
}
