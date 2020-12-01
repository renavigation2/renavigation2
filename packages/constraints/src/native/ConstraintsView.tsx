import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'
import { ProcessedConstraint } from '../typings/ProcessedConstraint'

const RNRConstraintsView = requireNativeComponent<any>('RNRConstraintsView')

export interface AnimationOptions {
  duration: number
  delay?: number
  curve?: 'easeInOut' | 'easeIn' | 'easeOut' | 'linear'
  damping?: number
  velocity?: number
}

export interface ConstraintsViewProps extends ViewProps {
  preservesSuperviewLayoutMargins?: boolean
  constraints?: ProcessedConstraint[]
  animateChangesOptions?: AnimationOptions
}

export const ConstraintsView: React.FC<ConstraintsViewProps> = ({
  preservesSuperviewLayoutMargins = false,
  constraints,
  animateChangesOptions,
  ...props
}) => {
  return (
    <RNRConstraintsView
      _preservesSuperviewLayoutMargins={preservesSuperviewLayoutMargins}
      _constraints={constraints}
      _animateChangesOptions={animateChangesOptions}
      {...props}
    />
  )
}
