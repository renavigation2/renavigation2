import { createContext } from 'react'
import { LocationContextObject } from '@renavigation2/router'

export const ModalsNavigatorContext = createContext<LocationContextObject>({
  static: false
})
