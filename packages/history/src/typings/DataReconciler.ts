import { SerializedHistory } from './SerializedHistory'

export type DataReconciler<D = SerializedHistory, N = D, P = D> = (
  prevData: P,
  nextData?: N | null
) => D
