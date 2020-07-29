import { Dispatch, SetStateAction, useContext } from 'react'
import { ModalSetDismissibleContext } from '../context/ModalSetDismissibleContext'

export function useSetModalDismissible(): Dispatch<SetStateAction<boolean>> {
  return useContext(ModalSetDismissibleContext)!
}
