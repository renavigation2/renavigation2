import { State } from './State'
import { Update } from './Update'

/**
 * A change to the current location that was blocked. May be retried
 * after obtaining user confirmation.
 */
export interface Transition<S extends State = Record<string, unknown> | null>
  extends Update<S> {
  /**
   * Retries the update to the current location.
   */
  retry(): void
}
