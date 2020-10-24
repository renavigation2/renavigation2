import React from 'react'
import { TabScene, TabSceneProps } from '../native/TabScene'

export interface TabScreenProps extends TabSceneProps {}

export const TabScreen: React.FC<TabScreenProps> = (props) => {
  return <TabScene {...props} />
}
