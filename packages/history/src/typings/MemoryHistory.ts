import { State } from './State'
import { History } from './History'

/**
 * A memory history stores locations in memory. This is useful in stateful
 * environments where there is no web browser, such as node tests or React
 * Native.
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#memoryhistory
 */
export interface MemoryHistory<S extends State = State> extends History<S> {
  index: number
}
