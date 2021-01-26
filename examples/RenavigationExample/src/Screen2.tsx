import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button as ButtonComponent } from './components/Button'
import {
  NavigationItem,
  NavigationScreen,
  useDidAppearEffect,
  useDidDisappearEffect,
  useNavigation,
  useWillAppearEffect,
  useWillDisappearEffect
} from '@renavigation2/navigation'
import { Action, BarButtonItem, Image, Menu } from '@renavigation2/core'

interface Props {}

export const Screen2: React.FC<Props> = ({}) => {
  const { back, reset, push } = useNavigation()

  const goBack = useCallback(() => {
    back()
  }, [back])

  const resetToStart = useCallback(() => {
    reset([{ pathname: '/' }], 0)
  }, [reset])

  const goToScreen3 = useCallback(() => {
    push('/screen3')
  }, [push])

  useEffect(() => {
    console.log('did mount')
    return () => {
      console.log('did unmount')
    }
  }, [])
  useWillAppearEffect(() => {
    console.log('will appear')
  }, [])
  useDidAppearEffect(() => {
    console.log('did appear')
  }, [])
  useWillDisappearEffect(() => {
    console.log('will disappear')
  }, [])
  useDidDisappearEffect(() => {
    console.log('did disappear')
  }, [])
  /*              menu={
                <Menu
                  items={[
                    <Menu
                      key="1"
                      displayInline
                      items={[
                        <Action
                          key="1"
                          title="Hello World"
                          state="on"
                          image={
                            <Image systemName="eyedropper" tintColor="red" />
                          }
                          onPress={() => {
                            console.log('SO SIPMEE')
                          }}
                        />,
                        <Action
                          key="1"
                          title="hello world"
                          image={
                            <Image
                              source={require('./components/BackButton/assets/back.png')}
                            />
                          }
                        />
                      ]}
                    />,
                    <Action key="2" destructive title="Reset" />
                  ]}
                />
              }
*/
  return (
    <NavigationScreen
      navigationItem={
        <NavigationItem
          title="Screen 2"
          largeTitleDisplayMode="always"
          rightBarButtonItems={[
            <BarButtonItem
              key="1"
              title="Hello"
              image={<Image systemName="slider.horizontal.3" />}
              menu={
                <Menu>
                  <Action
                    key="hello"
                    title="Hello"
                    image={<Image systemName="slider.horizontal.3" />}
                    onPress={() => {
                      console.log('hello')
                    }}
                  />
                </Menu>
              }
            />,
            <BarButtonItem
              key="2"
              title="Hello"
              image={<Image systemName="slider.horizontal.3" />}
            />
          ]}
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
          <ButtonComponent onPress={goBack}>Go back</ButtonComponent>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 8
          }}
        >
          <ButtonComponent onPress={resetToStart}>
            Reset to start
          </ButtonComponent>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 8,
            marginBottom: 32
          }}
        >
          <ButtonComponent onPress={goToScreen3}>
            Go to screen 3
          </ButtonComponent>
        </View>
        <Text>
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
