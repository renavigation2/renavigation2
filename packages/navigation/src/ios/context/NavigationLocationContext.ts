import { createContext } from 'react'
import { LocationContextObject } from '@renavigation2/router'

export const NavigationLocationContext = createContext<LocationContextObject>({
  static: false
})
