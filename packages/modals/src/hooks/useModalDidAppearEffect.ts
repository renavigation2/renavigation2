import { useEffect, EffectCallback, DependencyList, useContext } from 'react'
import { ModalLifecycleContext } from '../context/ModalLifecycleContext'

export function useModalDidAppearEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const lifecycle = useContext(ModalLifecycleContext)!
  return useEffect(() => {
    return lifecycle.subscribe('didAppear', effect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
