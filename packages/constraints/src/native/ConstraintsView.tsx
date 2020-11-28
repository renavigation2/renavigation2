import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'
import { ProcessedConstraint } from '../typings/ProcessedConstraint'

const RNRConstraintsView = requireNativeComponent<any>('RNRConstraintsView')

export interface ConstraintsViewProps extends ViewProps {
  preservesSuperviewLayoutMargins?: boolean
  constraints?: ProcessedConstraint[]
}

export const ConstraintsView: React.FC<ConstraintsViewProps> = ({
  preservesSuperviewLayoutMargins = false,
  constraints,
  ...props
}) => {
  return (
    <RNRConstraintsView
      _preservesSuperviewLayoutMargins={preservesSuperviewLayoutMargins}
      _constraints={constraints}
      {...props}
    />
  )
}
