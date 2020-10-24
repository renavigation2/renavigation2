import { useEffect, EffectCallback, DependencyList, useContext } from 'react'
import { TabLifecycleContext } from '../context/TabLifecycleContext'

export function useTabWillDisappearEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const lifecycle = useContext(TabLifecycleContext)!
  return useEffect(() => {
    return lifecycle.subscribe('willDisappear', effect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
