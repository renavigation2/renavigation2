import { createContext, Dispatch, SetStateAction } from 'react'

export const ModalSetDismissibleContext = createContext<
  Dispatch<SetStateAction<boolean>> | undefined
>(undefined)
