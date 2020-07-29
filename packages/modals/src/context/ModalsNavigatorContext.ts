import { createContext } from 'react'
import { LocationContextObject } from '../typings/LocationContextObject'

export const ModalsNavigatorContext = createContext<LocationContextObject>({
  static: false
})
