import { SerializedHistory } from '../typings/SerializedHistory'
import { MemoryHistory } from '../typings/MemoryHistory'
import { Location } from '../typings/Location'
import { State } from '../typings/State'

export function serializeHistory<S extends State = State>(
  entries: Location<S>[],
  history: MemoryHistory
): SerializedHistory<S> {
  return {
    action: history.action,
    entries: entries,
    index: history.index,
    length: entries.length,
    location: history.location
  }
}
