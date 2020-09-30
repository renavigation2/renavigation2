export function compareIndexes(a: number[], b: number[]): number {
  const siblings =
    a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i])

  return siblings
    ? // If two routes are siblings, we should try to match the earlier sibling
      // first. This allows people to have fine-grained control over the matching
      // behavior by simply putting routes with identical paths in the order they
      // want them tried.
      a[a.length - 1] - b[b.length - 1]
    : // Otherwise, it doesn't really make sense to rank non-siblings by index,
      // so they sort equally.
      0
}
