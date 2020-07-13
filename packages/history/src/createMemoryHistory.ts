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

export type MemoryHistoryOptions = {
  initialEntries?: InitialEntry[]
  initialIndex?: number
}

/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#creatememoryhistory
 */
export function createMemoryHistory(
  options: MemoryHistoryOptions = {}
): MemoryHistory {
  const { initialEntries = ['/'], initialIndex } = options
  const entries: Location[] = initialEntries.map((entry) => {
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
      `Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: ${JSON.stringify(
        entry
      )})`
    )

    return location
  })
  let index = clamp(
    initialIndex == null ? entries.length - 1 : initialIndex,
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

  return history
}
