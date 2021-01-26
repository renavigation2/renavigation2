import React, { useLayoutEffect, useRef } from 'react'
import { findNodeHandle, requireNativeComponent } from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { StyleSheet } from '../../utils/StyleSheet'
import { CoreEventManager } from './CoreEventManager'

const RNRAction = requireNativeComponent<any>('RNRAction')

export interface ActionProps {
  disabled?: boolean
  destructive?: boolean
  hidden?: boolean
  state?: 'on' | 'off' | 'mixed'
  title?: string
  identifier?: string
  discoverabilityTitle?: string
  onPress?: () => void
  image?: React.ReactElement<any>
}

export const Action: React.FC<ActionProps> = ({
  disabled,
  destructive,
  hidden,
  state,
  title,
  identifier,
  discoverabilityTitle,
  onPress,
  image,
  ...props
}) => {
  const ref = useRef()
  useLayoutEffect(() => {
    const subscription = CoreEventManager.addListener(
      'RNRViewPress',
      (handle) => {
        if (handle === findNodeHandle(ref.current as any)) {
          if (onPress) onPress()
        }
      }
    )
    return () => {
      subscription.remove()
    }
  }, [onPress])
  let index = 0
  return (
    <RNRAction
      ref={ref as any}
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      disabled={processBoolean(disabled)}
      destructive={processBoolean(destructive)}
      _hidden={processBoolean(hidden)}
      state={state}
      title={title}
      identifier={identifier}
      discoverabilityTitle={discoverabilityTitle}
      {...props}
      elementsIndices={{
        image: image ? index++ : -1
      }}
    >
      {image}
    </RNRAction>
  )
}
