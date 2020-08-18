/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import { useContext, useEffect } from 'react'
import { NavigationContext } from 'navigation-react'

const useUnloading = (
  handler: (
    state: any,
    data: any,
    url: any,
    history: any,
    crumbs: any
  ) => boolean
) => {
  const navigationEvent = useContext(NavigationContext)
  useEffect(() => {
    const { stateNavigator } = navigationEvent
    const beforeNavigateHandler = (
      state: any,
      data: any,
      url: any,
      history: any,
      currentContext: any
    ) => {
      const crumb = url.split('crumb=').length - 1
      const {
        crumbs: sceneCrumbs,
        state: sceneState
      } = stateNavigator.stateContext
      if (
        !(sceneCrumbs.length === crumb && sceneState === state) &&
        stateNavigator.stateContext === currentContext
      ) {
        const { crumbs } = stateNavigator.parseLink(url)
        return handler(state, data, url, history, crumbs)
      }
      return true
    }
    stateNavigator.onBeforeNavigate(beforeNavigateHandler)
    return () => {
      stateNavigator.offBeforeNavigate(beforeNavigateHandler)
    }
  }, [navigationEvent, handler])
}

export default useUnloading
