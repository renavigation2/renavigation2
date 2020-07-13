import { SerializedHistory } from './SerializedHistory'

export type Migrate<D = SerializedHistory, R = D> = (
  data: D,
  version: number
) => R
