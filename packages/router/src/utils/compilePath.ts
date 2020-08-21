export function compilePath(
  path: string,
  caseSensitive: boolean,
  end: boolean
): [RegExp, string[]] {
  const keys: string[] = []
  let source =
    '^(' +
    path
      .replace(/^\/*/, '/') // Make sure it has a leading /
      .replace(/\/?\*?$/, '') // Ignore trailing / and /*, we'll handle it below
      .replace(/[\\.*+^$?{}|()[\]]/g, '\\$&') // Escape special regex chars
      .replace(/:(\w+)/g, (_: string, key: string) => {
        keys.push(key)
        return '([^\\/]+)'
      }) +
    ')'

  if (path.endsWith('*')) {
    if (path.endsWith('/*')) {
      source += '\\/?' // Don't include the / in params['*']
    }
    keys.push('*')
    source += '(.*)'
  } else if (end) {
    source += '\\/?'
  }

  if (end) source += '$'

  const flags = caseSensitive ? undefined : 'i'
  const matcher = new RegExp(source, flags)

  return [matcher, keys]
}
