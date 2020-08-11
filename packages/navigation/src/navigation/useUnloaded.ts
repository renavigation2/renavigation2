/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import { useContext, useEffect } from 'react'
import { NavigationContext } from 'navigation-react'

const useUnloaded = (
  handler: (state: any, data: any, stateContext: any) => void
) => {
  const navigationEvent = useContext(NavigationContext)
  useEffect(() => {
    let cancelled = false
    const { stateNavigator } = navigationEvent
    const navigateHandler = (
      _oldState: any,
      state: any,
      data: any,
      _asyncData: any,
      stateContext: any
    ) => {
      const crumb = stateContext.url.split('crumb=').length - 1
      const {
        crumbs: sceneCrumbs,
        state: sceneState
      } = stateNavigator.stateContext
      if (
        !(sceneCrumbs.length === crumb && sceneState === state) &&
        stateNavigator.stateContext.url === stateContext.oldUrl &&
        !cancelled
      )
        handler(state, data, stateContext)
    }
    stateNavigator.onNavigate(navigateHandler)
    return () => {
      cancelled = true
      stateNavigator.offNavigate(navigateHandler)
    }
  }, [navigationEvent, handler])
}

export default useUnloaded
