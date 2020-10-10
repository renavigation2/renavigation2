import { State } from './State'
import { Transition } from './Transition'

/**
 * A function that receives transitions when navigation is blocked.
 */
export interface Blocker<S extends State = Record<string, unknown> | null> {
  (tx: Transition<S>): void
}
