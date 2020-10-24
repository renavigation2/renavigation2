export type ProcessedBoolean = -1 | 0 | 1

export function processBoolean(p?: boolean | null): ProcessedBoolean {
  return p === false ? -1 : p === true ? 1 : 0
}
