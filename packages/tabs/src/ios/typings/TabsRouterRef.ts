import { NativeHistory, State, To } from '@renavigation2/history'

export interface TabsRouterRef<
  S extends State = Record<string, unknown> | null
> {
  history: NativeHistory<S>
  switch(to: To): Promise<void>
  switch<PS extends State = S>(to: To, state: PS): Promise<void>
}
