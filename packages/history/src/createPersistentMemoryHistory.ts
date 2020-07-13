import { MemoryHistory } from './typings/MemoryHistory'
import { InitialEntry } from './typings/InitialEntry'
import { Location } from './typings/Location'
import { readOnly } from './typings/readOnly'
import { createKey } from './utils/createKey'
import { parsePath } from './utils/parsePath'
import { warning } from './utils/warning'
import { clamp } from './utils/clamp'
import { Action } from './typings/Action'
import { createEvents } from './utils/createEvents'
import { Blocker } from './typings/Blocker'
import { Listener } from './typings/Listener'
import { To } from './typings/To'
import { createPath } from './utils/createPath'
import { State } from './typings/State'
import {
  WebStorage,
  AsyncStorage,
  LocalForageStorage,
  Storage
} from './typings/Storage'
import { Migrate } from './typings/Migrate'
import { DataReconciler } from './typings/DataReconciler'
import { Transform } from './typings/Transform'
import { SerializedHistory } from './typings/SerializedHistory'

export type PersistentMemoryHistoryOptions = {
  defaultEntries?: InitialEntry[]
  defaultIndex?: number
  version?: number
  storage: WebStorage | AsyncStorage | LocalForageStorage | Storage
  key: string
  migrate?: Migrate
  dataReconciler?: false | DataReconciler
  transforms?: Transform[]
}

/**
 * Persistent memory history stores the current location in storage.
 */
export async function createPersistentMemoryHistory(
  options: PersistentMemoryHistoryOptions
): Promise<MemoryHistory> {
  const {
    defaultEntries,
    defaultIndex,
    version,
    storage,
    key,
    migrate,
    dataReconciler,
    transforms
  } = options

  const initialEntries: Location[] = (defaultEntries || []).map((entry) => {
    const location = readOnly<Location>({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: createKey(),
      ...(typeof entry === 'string' ? parsePath(entry) : entry)
    })

    warning(
      location.pathname.charAt(0) === '/',
      `Relative pathnames are not supported in createPersistentMemoryHistory({ defaultEntries }) (invalid entry: ${JSON.stringify(
        entry
      )})`
    )

    return location
  })

  const initialIndex = clamp(
    defaultIndex == null ? initialEntries.length - 1 : defaultIndex,
    0,
    initialEntries.length - 1
  )

  let currentData: SerializedHistory = {
    entries: initialEntries,
    index: initialIndex
  }

  try {
    const result = await storage.getItem(key)
    if (result) {
      const data = JSON.parse(result)
      if (migrate && data.data) {
        currentData = migrate(data.data, data.version)
      } else if (data.data) {
        currentData = data.data
      }
    }
  } catch (err) {}

  if (dataReconciler) {
    currentData = dataReconciler(
      { entries: initialEntries, index: initialIndex },
      currentData
    )
  }

  if (transforms && transforms.length) {
    transforms.forEach(({ outbound }) => {
      if (outbound && typeof outbound === 'function') {
        currentData = outbound(currentData)
      }
    })
  }

  const entries: Location[] = (currentData.entries || []).map((entry) => {
    const location = readOnly<Location>({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: createKey(),
      ...(typeof entry === 'string' ? parsePath(entry) : entry)
    })

    warning(
      location.pathname.charAt(0) === '/',
      `Relative pathnames are not supported in createPersistentMemoryHistory({ defaultEntries }) (invalid entry: ${JSON.stringify(
        entry
      )})`
    )

    return location
  })

  let index = clamp(
    currentData.index == null ? entries.length - 1 : currentData.index,
    0,
    entries.length - 1
  )

  let action = Action.Pop
  let location = entries[index]
  const listeners = createEvents<Listener>()
  const blockers = createEvents<Blocker>()

  function createHref(to: To) {
    return typeof to === 'string' ? to : createPath(to)
  }

  function getNextLocation(to: To, state: State = null): Location {
    return readOnly<Location>({
      ...location,
      ...(typeof to === 'string' ? parsePath(to) : to),
      state,
      key: createKey()
    })
  }

  function allowTx(action: Action, location: Location, retry: () => void) {
    return (
      !blockers.length || (blockers.call({ action, location, retry }), false)
    )
  }

  function applyTx(nextAction: Action, nextLocation: Location) {
    action = nextAction
    location = nextLocation
    listeners.call({ action, location })
  }

  function push(to: To, state?: State) {
    const nextAction = Action.Push
    const nextLocation = getNextLocation(to, state)
    function retry() {
      push(to, state)
    }

    warning(
      location.pathname.charAt(0) === '/',
      `Relative pathnames are not supported in memory history.push(${JSON.stringify(
        to
      )})`
    )

    if (allowTx(nextAction, nextLocation, retry)) {
      index += 1
      entries.splice(index, entries.length, nextLocation)
      applyTx(nextAction, nextLocation)
    }
  }

  function replace(to: To, state?: State) {
    const nextAction = Action.Replace
    const nextLocation = getNextLocation(to, state)
    function retry() {
      replace(to, state)
    }

    warning(
      location.pathname.charAt(0) === '/',
      `Relative pathnames are not supported in memory history.replace(${JSON.stringify(
        to
      )})`
    )

    if (allowTx(nextAction, nextLocation, retry)) {
      entries[index] = nextLocation
      applyTx(nextAction, nextLocation)
    }
  }

  function go(delta: number) {
    const nextIndex = clamp(index + delta, 0, entries.length - 1)
    const nextAction = Action.Pop
    const nextLocation = entries[nextIndex]
    function retry() {
      go(delta)
    }

    if (allowTx(nextAction, nextLocation, retry)) {
      index = nextIndex
      applyTx(nextAction, nextLocation)
    }
  }

  const history: MemoryHistory = {
    get index() {
      return index
    },
    get action() {
      return action
    },
    get location() {
      return location
    },
    createHref,
    push,
    replace,
    go,
    back() {
      go(-1)
    },
    forward() {
      go(1)
    },
    listen(listener) {
      return listeners.push(listener)
    },
    block(blocker) {
      return blockers.push(blocker)
    }
  }

  async function flush() {
    try {
      let data = { entries, index }
      if (transforms && transforms.length) {
        transforms.forEach(({ inbound }) => {
          if (inbound && typeof inbound === 'function') {
            data = inbound(data)
          }
        })
      }
      await storage.setItem(key, JSON.stringify({ data, version }))
    } catch (err) {}
  }

  flush()

  listeners.push(() => {
    flush()
  })

  return history
}
