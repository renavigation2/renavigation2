import { Location, Action, State } from '@renavigation2/history'
import { useContext, useCallback, useMemo } from 'react'
import { ModalLocationContext } from '../context/ModalLocationContext'
import { Navigator } from '@renavigation2/router'
import { useModals } from './useModals'

export interface ModalContextObject<S extends State = State> {
  action: Action
  location: Location<S>
  navigator: Navigator
  static: boolean
  dismiss: () => void
}

export function useModal<S extends State = State>(): ModalContextObject<S> {
  const context = useContext(ModalLocationContext)
  const { dismissModal } = useModals()

  const dismiss = useCallback(() => {
    dismissModal(context.location!.key)
  }, [dismissModal, context])

  const final = useMemo(() => ({ ...context, dismiss }), [context, dismiss])

  return final as ModalContextObject<S>
}
