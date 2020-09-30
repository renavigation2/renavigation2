import { useEffect, EffectCallback, DependencyList, useContext } from 'react'
import { NavigationLifecycleContext } from '../context/NavigationLifecycleContext'

export function useDidAppearEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const lifecycle = useContext(NavigationLifecycleContext)!
  return useEffect(() => {
    return lifecycle.subscribe('didAppear', effect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
