import { ProcessedActionValue } from '../native/Action'
import { ProcessedButtonValue } from '../native/Button'
import { findActionInMenu } from './findActionInMenu'

export function findActionInButton(
  elements: ProcessedButtonValue | ProcessedButtonValue[],
  id: string
): undefined | ProcessedActionValue {
  if (Array.isArray(elements)) {
    for (let i = 0; i < elements.length; i++) {
      const match = findActionInButton(elements[i], id)
      if (match) {
        return match
      }
    }
  } else {
    if (elements.menu) {
      const match = findActionInMenu(elements.menu, id)
      if (match) {
        return match
      }
    }
    if (elements.primaryAction) {
      const match = findActionInMenu(elements.primaryAction, id)
      if (match) {
        return match
      }
    }
  }
  return undefined
}
