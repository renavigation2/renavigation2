import React, {
  createRef,
  MutableRefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useReducer,
  useRef
} from 'react'
import { NativeHistory, Update } from '@renavigation2/history'
import {
  createRoutesFromChildren,
  joinPaths,
  matchRoutes,
  Params,
  readOnly,
  RoutesProps
} from '@renavigation2/router'
import { TabsNavigatorContext } from '../context/TabsNavigatorContext'
import { Tabs as TabsBase, TabsProps as TabsPropsBase } from '../native/Tabs'
import { TabsRouteContext } from '../context/TabsRouteContext'
import { TabRouteRenderer, TabRouteRendererRef } from './TabRouteRenderer'

export interface TabsProps
  extends Omit<TabsPropsBase, 'selectedIndex'>,
    RoutesProps {}

export const Tabs: React.FC<TabsProps> = ({
  basename = '',
  children,
  onDidSelect,
  onWillSelect,
  ...props
}) => {
  const { navigator } = useContext(TabsNavigatorContext)

  const history = navigator as NativeHistory

  const [{ location }, dispatch] = useReducer(
    (_: Update, action: Update) => action,
    {
      action: history.action,
      location: history.location
    }
  )

  const routes = createRoutesFromChildren(children)
  const refs = useRef<{
    [key: number]: MutableRefObject<TabRouteRendererRef | null | undefined>
  }>([])

  for (const prop in refs.current) {
    if (refs.current.hasOwnProperty(prop)) {
      if (parseInt(prop, 10) >= routes.length) {
        delete refs.current[prop]
      }
    }
  }

  let selectedIndex = 0
  const elements: Array<React.ReactElement | null> = routes.map(
    (route, index) => {
      const m = location ? matchRoutes([route], location, basename) : undefined
      const match = m && m[0] ? m[0] : undefined
      if (match) selectedIndex = index
      const p = match ? joinPaths([basename, match?.pathname]) : undefined

      const ref: MutableRefObject<TabRouteRendererRef | null | undefined> = refs
        .current[index]
        ? refs.current[index]
        : createRef<TabRouteRendererRef | null | undefined>()

      refs.current[index] = ref

      return (
        <TabsRouteContext.Provider
          value={
            match
              ? {
                  outlet: null,
                  params: readOnly<Params>({ ...match.params }),
                  pathname: p!,
                  route
                }
              : undefined
          }
          key={index}
        >
          <TabRouteRenderer
            ref={ref}
            index={index}
            location={match ? location : undefined}
            route={{
              ...route,
              // weird that react-router returns the Route component and not the element here?
              element: (route.element as any).props.element
            }}
          />
        </TabsRouteContext.Provider>
      )
    }
  )

  const selectedIndexRef = useRef(selectedIndex)
  selectedIndexRef.current = selectedIndex

  const handleHistoryChange = useCallback(
    (update: Update<any>) => {
      const nextIndex = routes.findIndex((route) =>
        location ? matchRoutes([route], update.location, basename) : undefined
      )
      if (nextIndex !== -1) {
        for (const prop in refs.current) {
          if (refs.current.hasOwnProperty(prop)) {
            if (refs.current[prop].current) {
              refs.current[prop].current!.onWillSelect(nextIndex)
            }
          }
        }
      }
      dispatch(update)
    },
    [basename, location, routes]
  )

  useLayoutEffect(() => {
    for (const prop in refs.current) {
      if (refs.current.hasOwnProperty(prop)) {
        if (refs.current[prop].current) {
          refs.current[prop].current!.onDidSelect(selectedIndex)
        }
      }
    }
  }, [selectedIndex])

  useLayoutEffect(() => {
    history.listen(handleHistoryChange)
  }, [history, handleHistoryChange])

  const onDidSelectCallback = useCallback(
    (index: number) => {
      if (index !== selectedIndexRef.current) {
        history.replace(routes[index].path)
      }
      for (const prop in refs.current) {
        if (refs.current.hasOwnProperty(prop)) {
          if (refs.current[prop].current) {
            refs.current[prop].current!.onDidSelect(index)
          }
        }
      }
      if (onDidSelect) onDidSelect(index)
    },
    [onDidSelect, routes, history]
  )

  const onWillSelectCallback = useCallback(
    (index: number) => {
      for (const prop in refs.current) {
        if (refs.current.hasOwnProperty(prop)) {
          if (refs.current[prop].current) {
            refs.current[prop].current!.onWillSelect(index)
          }
        }
      }
      if (onWillSelect) onWillSelect(index)
    },
    [onWillSelect]
  )

  return (
    <TabsBase
      {...props}
      selectedIndex={selectedIndex}
      onWillSelect={onWillSelectCallback}
      onDidSelect={onDidSelectCallback}
    >
      {elements}
    </TabsBase>
  )
}
