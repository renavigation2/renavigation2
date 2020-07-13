import { PartialPath } from '../typings/PartialPath'

/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#parsepath
 */
export function parsePath(path: string) {
  const partialPath: PartialPath = {}

  if (path) {
    const hashIndex = path.indexOf('#')
    if (hashIndex >= 0) {
      partialPath.hash = path.substr(hashIndex)
      path = path.substr(0, hashIndex)
    }

    const searchIndex = path.indexOf('?')
    if (searchIndex >= 0) {
      partialPath.search = path.substr(searchIndex)
      path = path.substr(0, searchIndex)
    }

    if (path) {
      partialPath.pathname = path
    }
  }

  return partialPath
}
