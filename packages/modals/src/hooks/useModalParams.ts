import { useContext } from 'react'
import { Params } from '@renavigation2/router'
import { ModalsRouteContext } from '../context/ModalsRouteContext'

export function useModalParams<P = Params>(): P {
  return useContext(ModalsRouteContext)!.params as any
}
