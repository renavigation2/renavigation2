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
import { NavigationRouteContext } from '../context/NavigationRouteContext'
import { NavigationRouteRenderer } from './NavigationRouteRenderer'
import { NavigationNavigatorContext } from '../context/NavigationNavigatorContext'
import {
  NavigationContainer,
  NavigationScenesRef,
  WillShowViewEvent
} from '../native/NavigationContainer'
import { NativeSyntheticEvent, findNodeHandle } from 'react-native'
import { Navigation } from '../native/Navigation'

export interface NavigationRoutesProps extends RoutesProps {
  navigationBar?: React.ReactElement<any> | null
  interactivePopGestureEnabled?: boolean
}

export const MemoizedConnectedNavigationRoutes: React.FC<
  NavigationRoutesProps & { history: NativeHistory }
> = ({
  history,
  basename = '',
  children,
  navigationBar,
  interactivePopGestureEnabled
}) => {
  const [{ action, location }, dispatch] = useReducer(
    (_: Update, action: Update) => action,
    {
      action: history.action,
      location: history.location
    }
  )

  useLayoutEffect(() => history.listen(dispatch), [history])

  const scenes = useRef<NavigationScenesRef>()
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

  const willShow = useRef<string>()

  const onWillShowView = useCallback(
    (event: NativeSyntheticEvent<WillShowViewEvent>) => {
      for (const prop in nativeRefs.current) {
        if (nativeRefs.current.hasOwnProperty(prop)) {
          const nativeID = findNodeHandle(nativeRefs.current[prop].current)
          if (nativeID === event.nativeEvent.view) {
            willShow.current = prop
          }
        }
      }
    },
    []
  )

  const currentView = useRef<string>()
  const onDidAppear = useCallback((location: Location) => {
    currentView.current = location.key
  }, [])

  const onDidDismiss = useCallback(
    (location: Location) => {
      if (location.key === currentView.current) {
        const index = matchesRef.current.findIndex(
          (l) => l[0].location.key === location.key
        )
        const dismissedFromNative = index !== -1
        const length = prevElements.current.length
        prevElements.current = prevElements.current.filter(
          (item) => item?.props.children.props.location.key !== location.key
        )
        if (prevElements.current.length !== length) {
          if (dismissedFromNative) {
            const index = prevElements.current.findIndex(
              (item) =>
                item?.props.children.props.location.key === willShow.current
            )
            prevElements.current = prevElements.current.slice(index, index + 1)
            history.go(index - history.index)
          } else {
            forceUpdate((i) => i + 1)
          }
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
        <NavigationRouteContext.Provider
          value={{
            outlet: null,
            params: readOnly<Params>({ ...params }),
            pathname: p,
            route
          }}
          key={index}
        >
          <NavigationRouteRenderer
            location={location}
            route={{
              ...route,
              // weird that react-router returns the Route component and not the element here?
              element: (route.element as any).props.element
            }}
            nativeRef={nativeRefs.current[location.key]}
            onDidAppear={onDidAppear}
            onDidDismiss={onDidDismiss}
            animated={action !== Action.Reset}
          />
        </NavigationRouteContext.Provider>
      )
    }
  )

  const prevIndex = useRef(history.index)

  if (action !== Action.Reset && history.index < prevIndex.current) {
    elements = [...elements, ...prevElements.current.slice(elements.length)]
  }

  const index = history.index
  const key = location.key
  useLayoutEffect(() => {
    if (index < prevIndex.current) {
      if (nativeRefs.current[key].current) {
        scenes.current!.popTo(
          nativeRefs.current[key],
          history.action !== Action.Reset
        )
      }
    }
    prevIndex.current = index
  }, [index, key, history, elements])

  prevElements.current = elements

  return (
    <Navigation
      navigationBar={navigationBar}
      interactivePopGestureEnabled={interactivePopGestureEnabled}
    >
      <NavigationContainer ref={scenes} onWillShowView={onWillShowView}>
        {elements}
      </NavigationContainer>
    </Navigation>
  )
}

const ConnectedNavigationRoutes = memo(MemoizedConnectedNavigationRoutes)

export const NavigationRoutes: React.FC<NavigationRoutesProps> = (props) => {
  const { navigator } = useContext(NavigationNavigatorContext)

  const history = useRef<NativeHistory>(navigator as NativeHistory)
  history.current = navigator as NativeHistory

  return (
    <ConnectedNavigationRoutes
      {...props}
      history={history.current as NativeHistory}
    />
  )
}
