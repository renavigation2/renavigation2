import React, { useCallback } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from './components/Button'
import {
  NavigationScreen,
  useNavigation,
  useLocation,
  NavigationItem
} from '@renavigation2/navigation'
import { useModals, useModal, useIsInModal } from '@renavigation2/modals'

interface Props {}

export const Screen3: React.FC<Props> = ({}) => {
  const { go, reset, push, replace } = useNavigation()
  const { state } = useLocation()
  const { presentModal, dismissAllModals } = useModals()
  const modal = useModal()
  const isInModal = useIsInModal()

  const goBackToStart = useCallback(() => {
    go(-2)
  }, [go])

  const resetToStart = useCallback(() => {
    reset([{ pathname: '/' }], 0)
  }, [reset])

  const goToScreen3 = useCallback(() => {
    push('/screen3')
  }, [push])

  const replaceScreen3 = useCallback(() => {
    replace('/screen3', { value: 'hello world' })
  }, [replace])

  const _presentModal = useCallback(() => {
    presentModal('/screen3')
  }, [presentModal])

  const dismiss = useCallback(() => {
    modal.dismiss()
  }, [modal])

  const dismissAll = useCallback(() => {
    dismissAllModals()
  }, [dismissAllModals])
  /*            <TouchableOpacity onPress={dismiss}>
              <Text
                style={{ fontSize: 17, fontWeight: '500', color: '#007AFF' }}
              >
                Dismiss
              </Text>
            </TouchableOpacity>
*/
  return (
    <NavigationScreen
      navigationItem={
        <NavigationItem
          title={state ? (state.value as string) : 'Screen 3'}
          largeTitleDisplayMode={isInModal ? 'never' : 'always'}
          leftContent={
            isInModal ? (
              <View
                style={{
                  height: 32,
                  width: 100,
                  justifyContent: 'center'
                }}
              >
                <TouchableOpacity onPress={dismiss}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '500',
                      color: '#007AFF',
                      marginTop: 1
                    }}
                  >
                    Dismiss
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      }
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
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
          <Button onPress={goBackToStart}>Go back to start</Button>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 8
          }}
        >
          <Button onPress={resetToStart}>Reset to start</Button>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 8
          }}
        >
          <Button onPress={goToScreen3}>Go to screen 3 again</Button>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 8
          }}
        >
          <Button onPress={replaceScreen3}>Replace screen 3</Button>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 32
          }}
        >
          <Button onPress={_presentModal}>Present 2nd modal</Button>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 32
          }}
        >
          <Button onPress={dismissAll}>Dismiss all</Button>
        </View>

        <Text>
          3. cwreoihv oeritvh porh vpio rhe iopvh repoiw hvpoirs hvpoier hwpiov
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
