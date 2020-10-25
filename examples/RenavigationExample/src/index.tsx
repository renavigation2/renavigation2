import React from 'react'
import {
  TabsRouter,
  TabScreen,
  TabRoute,
  TabBarItem,
  Image,
  Tabs,
  TabBar,
  TabBarAppearance,
  TabBarItemAppearance,
  TabBarItemStateAppearance
} from '@renavigation2/tabs'
import { Tab1 } from './Tab1'
import { ModalsRouter } from '@renavigation2/modals'

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
                            color: 'red',
                            fontSize: 15
                          }}
                        />
                      }
                      selected={
                        <TabBarItemStateAppearance
                          iconColor={'blue'}
                          titleStyle={{
                            fontFamily: 'AvenirNext-Medium',
                            color: 'blue',
                            fontSize: 15
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
          <TabRoute
            path="/settings"
            element={
              <TabScreen
                tabBarItem={
                  <TabBarItem
                    title="Settings"
                    image={<Image systemName="gear" />}
                  />
                }
              />
            }
          />
        </Tabs>
      </TabsRouter>
    </ModalsRouter>
  )
}

export default App
