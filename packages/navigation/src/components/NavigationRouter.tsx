import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { Scene } from './Scene'

const NVNavigationStack = requireNativeComponent<any>('NVNavigationStack')

export const NavigationRouter: React.FC = () => {
  const scenes = [<Scene key="hlo" sceneKey="hlo" />]

  return (
    <NVNavigationStack keys={['hlo']} style={styles.container}>
      {scenes}
    </NVNavigationStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
