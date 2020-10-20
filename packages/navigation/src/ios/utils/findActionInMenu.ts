import { ProcessedActionValue } from '../native/Action'
import { ProcessedMenuValue } from '../native/Menu'

export function findActionInMenu(
  elements:
    | ProcessedActionValue
    | ProcessedMenuValue
    | (ProcessedMenuValue | ProcessedActionValue)[],
  id: string
): ProcessedActionValue | undefined {
  if (Array.isArray(elements)) {
    for (let i = 0; i < elements.length; i++) {
      const match = findActionInMenu(elements[i], id)
      if (match) {
        return match
      }
    }
  } else if (elements && elements._type === 'action' && elements._id === id) {
    return elements
  } else if (elements && elements._type === 'menu') {
    if (elements.items && elements.items.length) {
      const match = findActionInMenu(elements.items, id)
      if (match) {
        return match
      }
    }
  }
  return undefined
}
