import { useContext } from 'react'
import { ModalLocationContext } from '../context/ModalLocationContext'

export function useIsInModal(): boolean {
  const context = useContext(ModalLocationContext)
  return !!(context && context.location)
}
