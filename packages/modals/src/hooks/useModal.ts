import { Location, Action } from '@renavigation2/history'
import { useContext, useCallback, useMemo } from 'react'
import { ModalLocationContext } from '../context/ModalLocationContext'
import { Navigator } from '../typings/Navigator'
import { useModals } from './useModals'

export interface ModalContextObject {
  action: Action
  location: Location
  navigator: Navigator
  static: boolean
  dismiss: () => void
}

export function useModal(): ModalContextObject {
  const context = useContext(ModalLocationContext)
  const { dismissModal } = useModals()

  const dismiss = useCallback(() => {
    dismissModal(context.location!.key)
  }, [dismissModal, context])

  const final = useMemo(() => ({ ...context, dismiss }), [context, dismiss])

  return final as ModalContextObject
}
