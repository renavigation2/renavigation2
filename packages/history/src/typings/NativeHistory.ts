import { State } from './State'
import { History } from './History'
import { Location } from './Location'
import { PartialLocation } from './PartialLocation'

/**
 * A native history stores locations in memory. This is useful in stateful
 * environments where there is no web browser, such as node tests or React
 * Native.
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#memoryhistory
 */
export interface NativeHistory<S extends State = Record<string, unknown> | null>
  extends History<S> {
  index: number

  entries: Location<S>[]

  reset<RS extends State = S>(
    entries: PartialLocation<RS>[],
    index: number
  ): void
}
