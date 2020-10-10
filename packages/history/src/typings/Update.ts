import { State } from './State'
import { Action } from './Action'
import { Location } from './Location'

/**
 * A change to the current location.
 */
export interface Update<S extends State = Record<string, unknown> | null> {
  /**
   * The action that triggered the change.
   */
  action: Action

  /**
   * The new location.
   */
  location: Location<S>
}
