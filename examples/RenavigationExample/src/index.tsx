import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react'
import {
  TabsRouter,
  TabRoute,
  Tabs,
  TabBar,
  TabBarAppearance,
  TabBarItemAppearance as TabBarItemAppearanceBase,
  TabBarItemStateAppearance
} from '@renavigation2/tabs'
import { Tab1 } from './Tab1'
import { ModalRoute, ModalsRouter, ModalsRoutes } from '@renavigation2/modals'
import { Modal } from './components/Modal'
import { Tab2 } from './Tab2'

interface Props {}

const TabBarItemAppearance: React.FC = () => (
  <TabBarItemAppearanceBase
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
        iconColor={'red'}
        titleStyle={{
          fontFamily: 'AvenirNext-Medium',
          color: 'red',
          fontSize: 12
        }}
      />
    }
  />
)

const SetTabBarHiddenContext = createContext<
  Dispatch<SetStateAction<boolean>> | undefined
>(undefined)

export function useSetTabBarHidden(): Dispatch<SetStateAction<boolean>> {
  return useContext(SetTabBarHiddenContext)!
}

export const App: React.FC<Props> = ({}) => {
  const [tabBarHidden, setTabBarHidden] = useState(false)
  return (
    <SetTabBarHiddenContext.Provider value={setTabBarHidden}>
      <ModalsRouter>
        <TabsRouter initialEntries={[{ pathname: '/home' }]} initialIndex={0}>
          <Tabs
            hidden={tabBarHidden}
            tabBar={
              <TabBar
                standardAppearance={
                  <TabBarAppearance
                    inlineLayoutAppearance={<TabBarItemAppearance />}
                    stackedLayoutAppearance={<TabBarItemAppearance />}
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
    </SetTabBarHiddenContext.Provider>
  )
}

export default App
