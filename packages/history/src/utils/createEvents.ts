import { Events } from '../typings/Events'

export function createEvents<F extends (...args: any) => void>(): Events<F> {
  let handlers: F[] = []

  return {
    get length() {
      return handlers.length
    },
    push(fn: F) {
      handlers.push(fn)
      return function () {
        handlers = handlers.filter((handler) => handler !== fn)
      }
    },
    call(arg) {
      handlers.forEach((fn) => fn && fn(arg))
    }
  }
}
