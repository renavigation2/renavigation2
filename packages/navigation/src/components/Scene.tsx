import React from 'react'
import { requireNativeComponent, StyleSheet, View } from 'react-native'

const NVScene = requireNativeComponent<any>('NVScene')

interface Props {
  sceneKey: string
}

export const Scene: React.FC<Props> = ({ sceneKey }) => {
  return (
    <NVScene style={styles.container} sceneKey={sceneKey} title={sceneKey}>
      <View style={{ flex: 1, backgroundColor: 'red' }} />
    </NVScene>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
