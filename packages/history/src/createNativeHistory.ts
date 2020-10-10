import { NativeHistory } from './typings/NativeHistory'
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
import { PartialLocation } from './typings/PartialLocation'

export type NativeHistoryOptions = {
  initialEntries?: InitialEntry[]
  initialIndex?: number
}

/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#creatememoryhistory
 */
export function createNativeHistory<
  S extends State = Record<string, unknown> | null
>(options: NativeHistoryOptions = {}): NativeHistory {
  const { initialEntries = [], initialIndex } = options
  const entries: Location<S>[] = initialEntries.map((entry) => {
    const location = readOnly<Location<S>>({
      pathname: '/',
      search: '',
      hash: '',
      state: null as S,
      key: createKey(),
      ...(typeof entry === 'string' ? parsePath(entry) : entry)
    })

    warning(
      location.pathname.charAt(0) === '/',
      `Relative pathnames are not supported in createNativeHistory({ initialEntries }) (invalid entry: ${JSON.stringify(
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
  const listeners = createEvents<Listener<S>>()
  const blockers = createEvents<Blocker<S>>()

  function createHref(to: To) {
    return typeof to === 'string' ? to : createPath(to)
  }

  function getNextLocation<S extends State = Record<string, unknown> | null>(
    to: To,
    state: S | null = null
  ): Location<S> {
    return readOnly<Location<S>>({
      ...location,
      ...(typeof to === 'string' ? parsePath(to) : to),
      state: state as S,
      key: createKey()
    })
  }

  function allowTx(action: Action, location: Location, retry: () => void) {
    return (
      !blockers.length || (blockers.call({ action, location, retry }), false)
    )
  }

  function applyTx(nextAction: Action, nextLocation: Location<S>) {
    action = nextAction
    location = nextLocation
    listeners.call({ action, location })
  }

  function push(to: To, state?: S) {
    const nextAction = Action.Push
    const nextLocation = getNextLocation<S>(to, state)
    function retry() {
      push(to, state)
    }

    warning(
      nextLocation.pathname.charAt(0) === '/',
      `Relative pathnames are not supported in native history.push(${JSON.stringify(
        to
      )})`
    )

    if (allowTx(nextAction, nextLocation, retry)) {
      index += 1
      entries.splice(index, entries.length, nextLocation)
      applyTx(nextAction, nextLocation)
    }
  }

  function replace(to: To, state?: S) {
    const nextAction = Action.Replace
    const nextLocation = getNextLocation<S>(to, state)
    function retry() {
      replace(to, state)
    }

    warning(
      nextLocation.pathname.charAt(0) === '/',
      `Relative pathnames are not supported in native history.replace(${JSON.stringify(
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

  function reset(next: PartialLocation<S>[], nextIndex: number) {
    const nextAction = Action.Reset

    function retry() {
      reset(next, index)
    }

    const nextEntries = next.map((entry) => {
      const location = readOnly<Location<S>>({
        pathname: '/',
        search: '',
        hash: '',
        state: null as S,
        key: createKey(),
        ...(typeof entry === 'string' ? parsePath(entry) : entry)
      })
      warning(
        location.pathname.charAt(0) === '/',
        `Relative pathnames are not supported in native history.reset(entries) (invalid entry: ${JSON.stringify(
          entry
        )})`
      )

      return location
    })

    if (allowTx(nextAction, nextEntries[nextIndex], retry)) {
      entries.splice(0, entries.length, ...nextEntries)
      index = nextIndex
      applyTx(nextAction, entries[nextIndex])
    }
  }

  const history: NativeHistory<S> = {
    get index() {
      return index
    },
    get action() {
      return action
    },
    get location() {
      return location
    },
    get entries() {
      return entries
    },
    createHref,
    push: push as NativeHistory<S>['push'],
    replace: replace as NativeHistory<S>['replace'],
    go,
    reset: reset as NativeHistory<S>['reset'],
    back() {
      go(-1)
    },
    forward() {
      go(1)
    },
    listen(listener) {
      return listeners.push((listener as any) as Listener<S>)
    },
    block(blocker) {
      return blockers.push((blocker as any) as Blocker<S>)
    }
  }

  return history
}
