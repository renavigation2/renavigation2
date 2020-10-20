import React from 'react'
import { Routes } from './Routes'
import { ModalsRouter, ModalsRoutes, ModalRoute } from '@renavigation2/modals'
import { Modal } from './components/Modal'
import {
  NavigationBar,
  NavigationRouter,
  Image
} from '@renavigation2/navigation'

interface Props {}

export const App: React.FC<Props> = ({}) => {
  return (
    <ModalsRouter>
      <NavigationRouter
        initialEntries={[{ pathname: '/' }, { pathname: '/screen2' }]}
        initialIndex={1}
        navigationBar={
          <NavigationBar
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
      </NavigationRouter>
      <ModalsRoutes>
        <ModalRoute path="*" element={<Modal />} />
      </ModalsRoutes>
    </ModalsRouter>
  )
}

export default App
