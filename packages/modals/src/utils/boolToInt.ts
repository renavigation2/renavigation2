export function boolToInt(p: boolean | undefined): number
export function boolToInt<T>(p: T, key?: string): T
export function boolToInt(p: any, key?: string) {
  if (key) {
    const props: any = { ...p }
    if (props[key] !== undefined) {
      props[key] = props[key] === false ? -1 : props[key] === true ? 1 : 0
    } else {
      delete props[key]
    }
    return props
  }
  return p === false ? -1 : p === true ? 1 : 0
}
