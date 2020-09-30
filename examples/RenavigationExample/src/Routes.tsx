import React from 'react'
import {
  NavigationRoute,
  NavigationRouter,
  NavigationBar
} from '@renavigation2/navigation'
import { Screen1 } from './Screen1'
import { Screen2 } from './Screen2'
import { Screen3 } from './Screen3'

export const Routes: React.FC = ({}) => {
  return (
    <NavigationRouter
      initialEntries={[{ pathname: '/' }]}
      initialIndex={0}
      navigationBar={<NavigationBar prefersLargeTitles />}
    >
      <NavigationRoute path="/" element={<Screen1 />} />
      <NavigationRoute path="/screen2" element={<Screen2 />} />
      <NavigationRoute path="/screen3" element={<Screen3 />} />
    </NavigationRouter>
  )
}
