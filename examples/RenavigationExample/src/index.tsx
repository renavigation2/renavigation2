import React, { useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import {
  ModalsRouter,
  ModalsRoutes,
  Route,
  useModals,
  useSetModalDismissible,
  useModal
} from '@renavigation2/modals'

const App = () => {
  return (
    <ModalsRouter>
      <Hello />

      <ModalsRoutes>
        <Route path="*" element={<Modal />} />
      </ModalsRoutes>
    </ModalsRouter>
  )
}

const Modal = () => {
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

const Hello: React.FC = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Actions />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const Actions: React.FC = () => {
  const { presentModal } = useModals()
  const onPress = useCallback(() => {
    presentModal('/hello')
  }, [presentModal])

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>Open modal</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  scrollView: {},
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {},
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
})

export default App
