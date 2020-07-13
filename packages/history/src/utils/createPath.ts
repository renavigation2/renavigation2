import { PartialPath } from '../typings/PartialPath'

/**
 * Creates a string URL path from the given pathname, search, and hash components.
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#createpath
 */
export function createPath({
  pathname = '/',
  search = '',
  hash = ''
}: PartialPath) {
  return pathname + search + hash
}
