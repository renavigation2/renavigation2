import { warning } from './warning'

const alreadyWarned: Record<string, boolean> = {}
export function warningOnce(key: string, cond: boolean, message: string) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true
    warning(false, message)
  }
}
