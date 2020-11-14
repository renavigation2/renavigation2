import React, { useCallback, useLayoutEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from './components/Button'
import {
  NavigationScreen,
  useNavigation,
  NavigationItem
} from '@renavigation2/navigation'
import { RefreshControl, SearchBar } from '@renavigation2/core'
import { useModals } from '@renavigation2/modals'

interface Props {}

export const Screen1: React.FC<Props> = ({}) => {
  const { push, reset } = useNavigation()
  const { presentModal } = useModals()

  useLayoutEffect(() => {
    //presentModal('/screen3')
  }, [presentModal])

  const goToNextScreen = useCallback(() => {
    push('/screen2')
  }, [push])

  const resetWithMany = useCallback(() => {
    reset(
      [{ pathname: '/' }, { pathname: '/screen2' }, { pathname: '/screen3' }],
      2
    )
  }, [reset])

  const _presentModal = useCallback(() => {
    presentModal('/screen3')
  }, [presentModal])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <NavigationScreen
      navigationItem={
        <NavigationItem
          title="Hello World"
          largeTitleDisplayMode="always"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          hidesSearchBarWhenScrolling={false}
          searchBar={<SearchBar></SearchBar>}
        />
      }
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 32,
            marginBottom: 8
          }}
        >
          <Button onPress={goToNextScreen}>Go to next screen</Button>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 8
          }}
        >
          <Button onPress={resetWithMany}>Reset with many</Button>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 32
          }}
        >
          <Button onPress={_presentModal}>Show modal</Button>
        </View>
        <Text style={{ marginBottom: 32 }}>
          1. cwreoihv oeritvh porh vpio rhe iopvh repoiw hvpoirs hvpoier hwpiov
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier
          hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire
          hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv
        </Text>
        <Text style={{ marginBottom: 32 }}>
          1. cwreoihv oeritvh porh vpio rhe iopvh repoiw hvpoirs hvpoier hwpiov
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier
          hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire
          hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv
        </Text>
        <Text style={{ marginBottom: 32 }}>
          1. cwreoihv oeritvh porh vpio rhe iopvh repoiw hvpoirs hvpoier hwpiov
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier
          hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire
          hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv
        </Text>
        <Text style={{ marginBottom: 32 }}>
          1. cwreoihv oeritvh porh vpio rhe iopvh repoiw hvpoirs hvpoier hwpiov
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier
          hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei
          hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire
          hvpoier hopvi heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi
          heroipv ihoiv heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv
          heroipv ihoiv hrpoei hvpoire hvpoier hopvi heroipv ihoiv heroipv ihoiv
          hrpoei hvpoire hvpoier hopvi heroipv ihoiv
        </Text>
      </ScrollView>
    </NavigationScreen>
  )
}
