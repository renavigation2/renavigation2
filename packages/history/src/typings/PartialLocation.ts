import { State } from './State'
import { PartialPath } from './PartialPath'
import { Key } from './Key'

/**
 * A partial Location object that may be missing some properties.
 */
export interface PartialLocation<
  S extends State = Record<string, unknown> | null
> extends PartialPath {
  /**
   * An object of arbitrary data associated with this location.
   *
   * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#location.state
   */
  state?: S

  /**
   * A unique string associated with this location. May be used to safely store
   * and retrieve data in some other storage API, like `localStorage`.
   *
   * Note: This value is always "default" on the initial location.
   *
   * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#location.key
   */
  key?: Key
}
