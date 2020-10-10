import { Location, State } from '@renavigation2/history'
import { useContext } from 'react'
import { NavigationLocationContext } from '../context/NavigationLocationContext'
import invariant from 'tiny-invariant'

/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/api/useLocation
 */
export function useLocation<
  S extends State = Record<string, unknown> | null
>(): Location<S> {
  const inRouterContext = useContext(NavigationLocationContext).location != null
  invariant(
    inRouterContext,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <NavigationRouter> component.`
  )
  return useContext(NavigationLocationContext).location as Location<S>
}
