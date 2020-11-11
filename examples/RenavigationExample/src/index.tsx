import React from 'react'
import {
  TabsRouter,
  TabRoute,
  Tabs,
  TabBar,
  TabBarAppearance,
  TabBarItemAppearance,
  TabBarItemStateAppearance,
  Image
} from '@renavigation2/tabs'
import { Tab1 } from './Tab1'
import { ModalRoute, ModalsRouter, ModalsRoutes } from '@renavigation2/modals'
import { Modal } from './components/Modal'
import { Tab2 } from './Tab2'
import {
  NavigationBar,
  NavigationRouter,
  NavigationRoutes
} from '@renavigation2/navigation'
import { Routes } from './Routes'

interface Props {}

export const App: React.FC<Props> = ({}) => {
  return (
    <ModalsRouter>
      <NavigationRouter initialEntries={[{ pathname: '/' }]} initialIndex={0}>
        <NavigationRoutes
          navigationBar={
            <NavigationBar
              prefersLargeTitles
              backIndicatorImage={
                <Image
                  tintColor="red"
                  source={require('./components/BackButton/assets/back.png')}
                  alignmentRectInsets={{
                    left: 0,
                    right: 0,
                    bottom: 4,
                    top: 0
                  }}
                />
              }
              backIndicatorTransitionMaskImage={
                <Image
                  tintColor="red"
                  source={require('./components/BackButton/assets/back.png')}
                />
              }
            />
          }
        >
          {Routes}
        </NavigationRoutes>
      </NavigationRouter>

      <ModalsRoutes>
        <ModalRoute path="*" element={<Modal />} />
      </ModalsRoutes>
    </ModalsRouter>
  )
}

export default App
