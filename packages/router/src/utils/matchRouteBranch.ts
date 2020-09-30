import { RouteBranch } from '../typings/RouteBranch'
import { RouteMatch } from '../typings/RouteMatch'
import { Params } from '../typings/Params'
import { matchPath } from './matchPath'
import { joinPaths } from './joinsPaths'
import { readOnly } from '@renavigation2/history'

export function matchRouteBranch(
  branch: RouteBranch,
  pathname: string
): RouteMatch[] | null {
  const routes = branch[1]
  let matchedPathname = '/'
  let matchedParams: Params = {}

  const matches: RouteMatch[] = []
  for (let i = 0; i < routes.length; ++i) {
    const route = routes[i]
    const remainingPathname =
      matchedPathname === '/'
        ? pathname
        : pathname.slice(matchedPathname.length) || '/'
    const routeMatch = matchPath(
      {
        path: route.path,
        caseSensitive: route.caseSensitive,
        end: i === routes.length - 1
      },
      remainingPathname
    )

    if (!routeMatch) return null

    matchedPathname = joinPaths([matchedPathname, routeMatch.pathname])
    matchedParams = { ...matchedParams, ...routeMatch.params }

    matches.push({
      route,
      pathname: matchedPathname,
      params: readOnly<Params>(matchedParams)
    })
  }

  return matches
}
