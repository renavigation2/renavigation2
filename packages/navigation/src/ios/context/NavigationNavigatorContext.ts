import { createContext } from 'react'
import { LocationContextObject } from '@renavigation2/router'

export const NavigationNavigatorContext = createContext<LocationContextObject>({
  static: false
})
