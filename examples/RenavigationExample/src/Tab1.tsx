import React from 'react'
import { TabScreen, TabBarItem, Image } from '@renavigation2/tabs'
import {
  NavigationBar,
  NavigationRouter,
  NavigationRoutes
} from '@renavigation2/navigation'
import { Routes } from './Routes'

interface Props {}

export const Tab1: React.FC<Props> = ({}) => {
  return (
    <TabScreen
      tabBarItem={
        <TabBarItem title="Store" image={<Image systemName="bag" />} />
      }
    >
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
    </TabScreen>
  )
}
