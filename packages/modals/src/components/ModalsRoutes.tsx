import React, {
  useMemo,
  useContext,
  useRef,
  MutableRefObject,
  createRef,
  useCallback,
  useState
} from 'react'
import { readOnly, NativeHistory, Location } from '@renavigation2/history'
import { createRoutesFromChildren } from '../utils/createRoutesFromChildren'
import { ModalsRouteContext } from '../context/ModalsRouteContext'
import { RoutesProps } from '../typings/RoutesProps'
import { joinPaths } from '../utils/joinsPaths'
import { matchRoutes } from '../utils/matchRoutes'
import { Params } from '../typings/Params'
import { ModalRenderer } from './ModalRenderer'
import { RouteMatch } from '../typings/RouteMatch'
import { NativeModalsContainer } from '../native/NativeModalsContainer'
import { ModalsNavigatorContext } from '../context/ModalsNavigatorContext'

export const ModalsRoutes: React.FC<RoutesProps> = ({
  basename = '',
  children
}) => {
  const container = useRef<any>()
  const routes = createRoutesFromChildren(children)

  const { navigator } = useContext(ModalsNavigatorContext)
  const matches: { match: RouteMatch; location: Location }[][] = useMemo(() => {
    const matches: { match: RouteMatch; location: Location }[][] = []
    ;(navigator as NativeHistory).entries.forEach((entry) => {
      const m = matchRoutes(routes, entry, basename)
      if (m) {
        matches.push(m.map((match) => ({ match, location: entry })))
      }
    })
    return matches
  }, [navigator, routes, basename])

  const keyMap: { [key: string]: number } = {}
  const prevElements = useRef<Array<React.ReactElement | null>>([])
  const dismissing = useRef<string[]>([])
  const nativeRefs = useRef<{ [key: string]: MutableRefObject<any> }>({})
  const [, forceUpdate] = useState(0)

  const history = useRef<NativeHistory>(navigator as NativeHistory)
  history.current = navigator as NativeHistory
  const handleDidDisappear = useCallback((location: Location) => {
    prevElements.current = prevElements.current.filter(
      (e: any) => e.props.children.props.location.key !== location.key
    )
    dismissing.current = dismissing.current.filter((k) => k !== location.key)
    delete nativeRefs.current[location.key]
    let match = false
    history.current.entries.forEach((entry, index) => {
      if (entry.key === location.key) {
        match = true

        const nextIndex =
          history.current.index >= index ? index - 1 : history.current.index
        const entries = history.current.entries.filter(
          (entry) => entry.key !== location.key
        )
        history.current.reset(entries, nextIndex)
      }
    })
    if (!match) forceUpdate((i) => i + 1)
  }, [])

  let elements: Array<React.ReactElement | null> = matches.map((matches) => {
    const element = matches.reduceRight(
      (outlet, { match: { params, pathname, route }, location }) => {
        const p = joinPaths([basename, pathname])
        if (keyMap[p] === undefined) keyMap[p] = 0
        else keyMap[p] = keyMap[p] + 1
        if (!nativeRefs.current[location.key]) {
          nativeRefs.current[location.key] = createRef()
        }
        return (
          <ModalsRouteContext.Provider
            value={{
              outlet,
              params: readOnly<Params>({ ...params }),
              pathname: p,
              route
            }}
            key={`${p}.${keyMap[p]}`}
          >
            <ModalRenderer
              location={location}
              route={{
                ...route,
                // weird that react-router returns the Route component and not the element here?
                element: (route.element as any).props.element
              }}
              nativeRef={nativeRefs.current[location.key]}
              onDidDisappear={handleDidDisappear}
            />
          </ModalsRouteContext.Provider>
        )
      },
      null as React.ReactElement | null
    )
    return element
  })

  prevElements.current.forEach((prevElement: any, index) => {
    const location = prevElement.props.children.props.location
    const element = elements.find(
      (element: any) =>
        element?.props.children.props.location.key === location.key
    )
    if (!element && dismissing.current.indexOf(location.key) === -1) {
      dismissing.current.push(location.key)
      elements = [
        ...elements.slice(0, index),
        prevElement,
        ...elements.slice(index)
      ]
      if (container.current) {
        container.current.dismiss(nativeRefs.current[location.key])
      }
    }
  })

  prevElements.current = elements

  return (
    <NativeModalsContainer ref={container}>{elements}</NativeModalsContainer>
  )
}
