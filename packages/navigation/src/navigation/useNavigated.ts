/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import { useContext, useEffect } from 'react'
import { NavigationContext } from 'navigation-react'

const useNavigated = (handler: () => void) => {
  const navigationEvent = useContext(NavigationContext)
  useEffect(() => {
    const { stateContext } = navigationEvent.stateNavigator
    if (!(stateContext as any)['peek']) handler()
  }, [handler, navigationEvent])
}

export default useNavigated
