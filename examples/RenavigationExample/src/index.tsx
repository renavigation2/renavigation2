import React from 'react'
import {
  TabsRouter,
  TabRoute,
  Tabs,
  TabBar,
  TabBarAppearance,
  TabBarItemAppearance,
  TabBarItemStateAppearance
} from '@renavigation2/tabs'
import { Tab1 } from './Tab1'
import { ModalRoute, ModalsRouter, ModalsRoutes } from '@renavigation2/modals'
import { Modal } from './components/Modal'
import { Tab2 } from './Tab2'

interface Props {}

export const App: React.FC<Props> = ({}) => {
  return (
    <ModalsRouter>
      <TabsRouter initialEntries={[{ pathname: '/home' }]} initialIndex={0}>
        <Tabs
          tabBar={
            <TabBar
              standardAppearance={
                <TabBarAppearance
                  stackedLayoutAppearance={
                    <TabBarItemAppearance
                      normal={
                        <TabBarItemStateAppearance
                          iconColor="gray"
                          titleStyle={{
                            fontFamily: 'AvenirNext-Medium',
                            color: 'gray',
                            fontSize: 12
                          }}
                        />
                      }
                      selected={
                        <TabBarItemStateAppearance
                          iconColor={'blue'}
                          titleStyle={{
                            fontFamily: 'AvenirNext-Medium',
                            color: 'blue',
                            fontSize: 12
                          }}
                        />
                      }
                    />
                  }
                />
              }
            />
          }
        >
          <TabRoute path="/home" element={<Tab1 />} />
          <TabRoute path="/settings" element={<Tab2 />} />
        </Tabs>
      </TabsRouter>

      <ModalsRoutes>
        <ModalRoute path="*" element={<Modal />} />
      </ModalsRoutes>
    </ModalsRouter>
  )
}

export default App
