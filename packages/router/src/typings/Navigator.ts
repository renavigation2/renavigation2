import { History, State } from '@renavigation2/history'

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level <Router> API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */
export interface Navigator<S extends State = Record<string, unknown> | null>
  extends Omit<
    History<S>,
    'action' | 'location' | 'back' | 'forward' | 'listen'
  > {}
