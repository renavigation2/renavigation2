import { PathPattern } from '../typings/PathPattern'
import { PathMatch } from '../typings/PathMatch'
import { compilePath } from './compilePath'
import { safelyDecodeURIComponent } from './safelyDecodeURIComponent'

/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/api/matchPath
 */
export function matchPath(
  pattern: PathPattern,
  pathname: string
): PathMatch | null {
  if (typeof pattern === 'string') {
    pattern = { path: pattern }
  }

  const { path, caseSensitive = false, end = true } = pattern
  const [matcher, paramNames] = compilePath(path, caseSensitive, end)
  const match = pathname.match(matcher)

  if (!match) return null

  const matchedPathname = match[1]
  const values = match.slice(2)
  const params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = safelyDecodeURIComponent(values[index], paramName)
    return memo
  }, {} as any)

  return { path, pathname: matchedPathname, params }
}
