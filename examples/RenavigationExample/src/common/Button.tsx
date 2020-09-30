import React, { useCallback, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent
} from 'react-native'

interface Props {
  onPress?: null | ((event: GestureResponderEvent) => void)
}

export const Button: React.FC<Props> = ({ children, onPress }) => {
  const [state, setState] = useState('rest')
  const onPressIn = useCallback(() => {
    setState('pressed')
  }, [])
  const onPressOut = useCallback(() => {
    setState('rest')
  }, [])
  return (
    <Pressable onPressIn={onPressIn} onPress={onPress} onPressOut={onPressOut}>
      <View
        style={[
          styles.container,
          state === 'rest'
            ? { backgroundColor: '#007AFF' }
            : { backgroundColor: '#005FC6' }
        ]}
      >
        <Text style={styles.label}>{children}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingRight: 16,
    borderRadius: 13
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.1,
    color: 'white'
  }
})
