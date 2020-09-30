export function stableSort(
  array: any[],
  compareItems: (a: any, b: any) => number
) {
  // This copy lets us get the original index of an item so we can preserve the
  // original ordering in the case that they sort equally.
  const copy = array.slice(0)
  array.sort((a, b) => compareItems(a, b) || copy.indexOf(a) - copy.indexOf(b))
}
