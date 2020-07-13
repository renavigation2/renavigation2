import { Pathname } from './Pathname'
import { Search } from './Search'
import { Hash } from './Hash'

/**
 * A partial Path object that may be missing some properties.
 */
export interface PartialPath {
  /**
   * The URL pathname, beginning with a /.
   *
   * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#location.pathname
   */
  pathname?: Pathname

  /**
   * The URL search string, beginning with a ?.
   *
   * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#location.search
   */
  search?: Search

  /**
   * The URL fragment identifier, beginning with a #.
   *
   * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#location.hash
   */
  hash?: Hash
}
