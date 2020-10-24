import { createContext } from 'react'
import { LocationContextObject } from '@renavigation2/router'

export const TabLocationContext = createContext<LocationContextObject>({
  static: false
})
