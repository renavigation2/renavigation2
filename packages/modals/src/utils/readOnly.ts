export const readOnly: <T extends unknown>(obj: T) => T = __DEV__
  ? (obj) => Object.freeze(obj)
  : (obj) => obj
