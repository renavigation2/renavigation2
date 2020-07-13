import { State } from './State'
import { Update } from './Update'

/**
 * A function that receives notifications about location changes.
 */
export interface Listener<S extends State = State> {
  (update: Update<S>): void
}
