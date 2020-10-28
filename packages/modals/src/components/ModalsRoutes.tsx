import React, {
  useMemo,
  useContext,
  useRef,
  MutableRefObject,
  createRef,
  useCallback,
  useState,
  memo,
  useReducer,
  useLayoutEffect
} from 'react'
import {
  readOnly,
  NativeHistory,
  Location,
  Update,
  Action
} from '@renavigation2/history'
import {
  createRoutesFromChildren,
  RoutesProps,
  joinPaths,
  matchRoutes,
  Params,
  RouteMatch
} from '@renavigation2/router'
import { ModalsRouteContext } from '../context/ModalsRouteContext'
import { ModalRouteRenderer } from './ModalRouteRenderer'
import { ModalsNavigatorContext } from '../context/ModalsNavigatorContext'
import { Modals, ModalsRef } from '../native/Modals'

export const MemoizedConnectedModalsRoutes: React.FC<
  RoutesProps & { history: NativeHistory }
> = ({ history, basename = '', children }) => {
  const [{ action, location }, dispatch] = useReducer(
    (_: Update, action: Update) => action,
    {
      action: history.action,
      location: history.location
    }
  )

  const locationRef = useRef(location)
  useLayoutEffect(() => {
    if (history.location?.key !== locationRef.current?.key) {
      dispatch({ location: history.location, action: history.action })
    }
    return history.listen(dispatch)
  }, [history])

  const modals = useRef<ModalsRef>()
  const routes = createRoutesFromChildren(children)

  const matches: { match: RouteMatch; location: Location }[][] = useMemo(() => {
    const matches: { match: RouteMatch; location: Location }[][] = []
    history.entries.slice(0, history.index + 1).forEach((entry) => {
      const m = matchRoutes(routes, entry, basename)
      if (m) {
        matches.push(m.map((match) => ({ match, location: entry })))
      }
    })
    return matches
  }, [history, routes, basename])

  const nativeRefs = useRef<{ [key: string]: MutableRefObject<any> }>({})
  const [, forceUpdate] = useState(0)

  const prevElements = useRef<Array<React.ReactElement | null>>([])

  const matchesRef = useRef(matches)
  matchesRef.current = matches

  const onDidDismiss = useCallback(
    (location: Location) => {
      prevElements.current = prevElements.current.filter(
        (item) => item?.props.children.props.location.key !== location.key
      )
      const entries = history.entries.filter(
        (entry) => entry.key !== location.key
      )
      if (entries.length !== history.entries.length) {
        history.reset(
          entries,
          history.index >= entries.length - 1
            ? history.index - 1
            : history.index
        )
      } else {
        // Wait for all modals to dismiss before re-rendering
        if (prevElements.current.length === entries.length) {
          forceUpdate((i) => i + 1)
        }
      }
    },
    [history]
  )

  let elements: Array<React.ReactElement | null> = matches.map(
    (matches, index) => {
      const match = matches[0]
      const {
        match: { params, pathname, route },
        location
      } = match
      const p = joinPaths([basename, pathname])
      if (!nativeRefs.current[location.key]) {
        nativeRefs.current[location.key] = createRef()
      }
      return (
        <ModalsRouteContext.Provider
          value={{
            outlet: null,
            params: readOnly<Params>({ ...params }),
            pathname: p,
            route
          }}
          key={index}
        >
          <ModalRouteRenderer
            location={location}
            route={{
              ...route,
              // weird that react-router returns the Route component and not the element here?
              element: (route.element as any).props.element
            }}
            nativeRef={nativeRefs.current[location.key]}
            onDidDismiss={onDidDismiss}
            animated={action !== Action.Reset}
          />
        </ModalsRouteContext.Provider>
      )
    }
  )

  const prevIndex = useRef(history.index)

  if (history.index < prevIndex.current) {
    elements = [...elements, ...prevElements.current.slice(elements.length)]
  }

  const index = history.index
  useLayoutEffect(() => {
    if (index < prevIndex.current) {
      for (let i = prevIndex.current; i > index; i--) {
        const key = elements[i]?.props.children.props.location.key
        if (nativeRefs.current[key] && nativeRefs.current[key].current) {
          modals.current!.dismiss(nativeRefs.current[key])
        }
      }
    }
    prevIndex.current = index
  }, [index, elements, history])

  prevElements.current = elements

  return <Modals ref={modals}>{elements}</Modals>
}

const ConnectedModalsRoutes = memo(MemoizedConnectedModalsRoutes, () => true)

export const ModalsRoutes: React.FC<RoutesProps> = (props) => {
  const { navigator } = useContext(ModalsNavigatorContext)

  const history = useRef<NativeHistory>(navigator as NativeHistory)
  history.current = navigator as NativeHistory

  return (
    <ConnectedModalsRoutes
      {...props}
      history={history.current as NativeHistory}
    />
  )
}
