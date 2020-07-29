import { useEffect, EffectCallback, DependencyList, useContext } from 'react'
import { ModalLifecycleContext } from '../context/ModalLifecycleContext'

export function useModalDidDisappearEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const lifecycle = useContext(ModalLifecycleContext)!
  return useEffect(() => {
    return lifecycle.subscribe('didDisappear', effect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
