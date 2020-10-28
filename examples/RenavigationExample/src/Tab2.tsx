import React from 'react'
import { Image, TabBarItem, TabScreen } from '@renavigation2/tabs'

interface Props {}

export const Tab2: React.FC<Props> = ({}) => {
  return (
    <TabScreen
      tabBarItem={
        <TabBarItem title="Settings" image={<Image systemName="gear" />} />
      }
    />
  )
}
