import { normalizeSlashes } from './normalizeSlashes'

export const joinPaths = (paths: string[]) => normalizeSlashes(paths.join('/'))
