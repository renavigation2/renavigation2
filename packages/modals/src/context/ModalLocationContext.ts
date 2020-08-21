import { createContext } from 'react'
import { LocationContextObject } from '@renavigation2/router'

export const ModalLocationContext = createContext<LocationContextObject>({
  static: false
})
