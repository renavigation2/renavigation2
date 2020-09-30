import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSetModalDismissible, useModal } from '@renavigation2/modals'

interface Props {}

export const Modal: React.FC<Props> = ({}) => {
  const { dismiss } = useModal()
  const setDismissible = useSetModalDismissible()
  useEffect(() => {
    setDismissible(false)
  }, [setDismissible])
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <TouchableOpacity onPress={dismiss}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )
}
