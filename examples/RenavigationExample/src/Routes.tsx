import React from 'react'
import { NavigationRoute } from '@renavigation2/navigation'
import { Screen1 } from './Screen1'
import { Screen2 } from './Screen2'
import { Screen3 } from './Screen3'

export const Routes = [
  <NavigationRoute key="/" path="/" element={<Screen1 />} />,
  <NavigationRoute key="/screen2" path="/screen2" element={<Screen2 />} />,
  <NavigationRoute key="/screen3" path="/screen3" element={<Screen3 />} />
]
