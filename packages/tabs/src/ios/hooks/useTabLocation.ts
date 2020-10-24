import { Location, State } from '@renavigation2/history'
import { useContext } from 'react'
import invariant from 'tiny-invariant'
import { TabLocationContext } from '../context/TabLocationContext'

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
export function useTabLocation<
  S extends State = Record<string, unknown> | null
>(): Location<S> | undefined {
  const context = useContext(TabLocationContext)
  invariant(
    !!context,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useTabLocation() may be used only in the context of a <TabsRouter> component.`
  )
  return context ? (context.location as Location<S>) || undefined : undefined
}
