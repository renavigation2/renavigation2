import { RouteObject } from '../typings/RouteObject'
import { joinPaths } from './joinsPaths'
import { RouteBranch } from '../typings/RouteBranch'

export function flattenRoutes(
  routes: RouteObject[],
  branches: RouteBranch[] = [],
  parentPath = '',
  parentRoutes: RouteObject[] = [],
  parentIndexes: number[] = []
): RouteBranch[] {
  routes.forEach((route, index) => {
    const path = joinPaths([parentPath, route.path])
    const routes = parentRoutes.concat(route)
    const indexes = parentIndexes.concat(index)

    // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.
    if (route.children) {
      flattenRoutes(route.children, branches, path, routes, indexes)
    }

    branches.push([path, routes, indexes])
  })

  return branches
}
