import { NativeHistory, State } from '@renavigation2/history'

export interface NavigationRouterRef<
  S extends State = Record<string, unknown> | null
> extends NativeHistory<S> {}
