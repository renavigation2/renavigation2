import { SerializedHistory } from './SerializedHistory'

export type TransformInbound<S = SerializedHistory, E = S> = (state: S) => E

export type TransformOutbound<S = SerializedHistory, E = S> = (state: S) => E

export interface Transform<S = SerializedHistory, I = S, O = S> {
  inbound?: TransformInbound<S, I> | null
  outbound?: TransformOutbound<S, O> | null
}
