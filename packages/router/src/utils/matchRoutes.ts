import { RouteObject } from '../typings/RouteObject'
import { PartialLocation, parsePath } from '@renavigation2/history'
import { RouteMatch } from '../typings/RouteMatch'
import { flattenRoutes } from './flattenRoutes'
import { rankRouteBranches } from './rankRouteBranches'
import { matchRouteBranch } from './matchRouteBranch'

/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/api/matchRoutes
 */
export function matchRoutes(
  routes: RouteObject[],
  location: string | PartialLocation,
  basename = ''
): RouteMatch[] | null {
  if (typeof location === 'string') {
    location = parsePath(location)
  }

  let pathname = location.pathname || '/'
  if (basename) {
    const base = basename.replace(/^\/*/, '/').replace(/\/+$/, '')
    if (pathname.startsWith(base)) {
      pathname = pathname === base ? '/' : pathname.slice(base.length)
    } else {
      // Pathname does not start with the basename, no match.
      return null
    }
  }

  const branches = flattenRoutes(routes)
  rankRouteBranches(branches)

  let matches = null
  for (let i = 0; matches == null && i < branches.length; ++i) {
    // TODO: Match on search, state too?
    matches = matchRouteBranch(branches[i], pathname)
  }

  return matches
}
