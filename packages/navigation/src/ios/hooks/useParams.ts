import { useContext } from 'react'
import { Params } from '@renavigation2/router'
import { NavigationRouteContext } from '../context/NavigationRouteContext'

export function useParams<P = Params>(): P {
  return useContext(NavigationRouteContext)!.params as any
}
