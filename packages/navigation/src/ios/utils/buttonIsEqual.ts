import { ProcessedButtonValue } from '../native/Button'

function arrayIsEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (typeof a[i] !== typeof b[i]) return false
    if (Array.isArray(a[i])) {
      const isEqual = arrayIsEqual(a[i], b[i])
      if (!isEqual) return false
    } else if (typeof a[i] === 'object') {
      const isEqual = objectIsEqual(a[i], b[i])
      if (!isEqual) return false
    } else if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

function objectIsEqual(
  a: { [key: string]: any },
  b: { [key: string]: any }
): boolean {
  for (const prop in a) {
    if (a.hasOwnProperty(prop)) {
      if (!b.hasOwnProperty(prop)) return false
      if (typeof a[prop] !== typeof b[prop]) return false
      if (Array.isArray(a[prop])) {
        const isEqual = arrayIsEqual(a[prop], b[prop])
        if (!isEqual) return false
      } else if (typeof a[prop] === 'object') {
        const isEqual = objectIsEqual(a[prop], b[prop])
        if (!isEqual) return false
      } else if (a[prop] !== b[prop]) {
        return false
      }
    }
  }
  return true
}

export function buttonIsEqual(
  a: ProcessedButtonValue | ProcessedButtonValue[],
  b: ProcessedButtonValue | ProcessedButtonValue[]
): boolean {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      const isEqual = buttonIsEqual(a[i], b[i])
      if (!isEqual) return false
    }
  } else {
    if (typeof a !== typeof b) return false
    if (a === b) return true
    for (const prop in a) {
      if (a.hasOwnProperty(prop)) {
        if (!b.hasOwnProperty(prop)) return false
        if (typeof (a as any)[prop] !== typeof (b as any)[prop]) return false
        if (Array.isArray((a as any)[prop])) {
          const isEqual = arrayIsEqual((a as any)[prop], (b as any)[prop])
          if (isEqual === false) return false
        } else if (typeof (a as any)[prop] === 'object') {
          const isEqual = objectIsEqual((a as any)[prop], (b as any)[prop])
          if (isEqual === false) return false
        } else if ((a as any)[prop] !== (b as any)[prop]) {
          return false
        }
      }
    }
  }
  return true
}
