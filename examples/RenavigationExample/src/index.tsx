import React from 'react'
import { StyleSheet } from 'react-native'
import {
  TabsRouter,
  TabScreen,
  TabRoute,
  TabBarItem,
  Image,
  Tabs
} from '@renavigation2/tabs'
import { Tab1 } from './Tab1'

interface Props {}

export const App: React.FC<Props> = ({}) => {
  return (
    <TabsRouter initialEntries={[{ pathname: '/home' }]} initialIndex={0}>
      <Tabs
        hidden={false}
        animationOptions={{
          duration: 0.3,
          damping: 1,
          velocity: 1
        }}
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
  )
}

const styles = StyleSheet.create({
  badge: {
    fontSize: 12
  }
})

export default App
