import { NativeHistory, State, To, Key } from '@renavigation2/history'

export interface ModalsRouterRef<
  S extends State = Record<string, unknown> | null
> {
  history: NativeHistory<S>
  presentModal(to: To): Promise<void>
  presentModal<PS extends State = S>(to: To, state: PS): Promise<void>
  dismissModal(key: Key): Promise<void>
  dismissAllModals(): Promise<void>
}
