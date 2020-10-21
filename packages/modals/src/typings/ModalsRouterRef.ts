import { NativeHistory, State } from '@renavigation2/history'

export interface ModalsRouterRef<
  S extends State = Record<string, unknown> | null
> extends NativeHistory<S> {}
