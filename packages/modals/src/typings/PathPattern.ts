export type PathPattern =
  | string
  | { path: string; caseSensitive?: boolean; end?: boolean }
