import { createContext } from 'react'
import { LocationContextObject } from '../typings/LocationContextObject'

export const ModalLocationContext = createContext<LocationContextObject>({
  static: false
})
