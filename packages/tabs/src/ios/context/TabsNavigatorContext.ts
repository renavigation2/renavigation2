import { createContext } from 'react'
import { LocationContextObject } from '@renavigation2/router'

export const TabsNavigatorContext = createContext<LocationContextObject>({
  static: false
})
