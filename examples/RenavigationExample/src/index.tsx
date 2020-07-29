import React, { useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import {
  ModalsRouter,
  ModalsRoutes,
  Route,
  useModals,
  useSetModalDismissible,
  useModalWillAppearEffect,
  useModalDidAppearEffect,
  useModalWillDisappearEffect,
  useModalDidDisappearEffect,
  useModal
} from '@renavigation2/modals'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen'

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
    //setDismissible(false)
  }, [setDismissible])
  useModalWillAppearEffect(() => {
    console.log('will appear')
  })
  useModalDidAppearEffect(() => {
    console.log('did appear')
  })
  useModalWillDisappearEffect(() => {
    console.log('will disappear')
  })
  useModalDidDisappearEffect(() => {
    console.log('did disappear')
  })
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <TouchableOpacity onPress={dismiss}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const Hello: React.FC = () => {
  console.log('render hello')
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <Actions />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
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
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
})

export default App
