import React from 'react'
import { requireNativeComponent } from 'react-native'
import { processTextStyle } from '../../utils/processTextStyle'
import { StyleSheet } from '../../utils/StyleSheet'
import { Offset } from '../typings/Offset'
import { TextStyle } from '../typings/TextStyle'
import { EmptyComponent } from './EmptyComponent'

const RNRBarButtonItemStateAppearance = requireNativeComponent<any>(
  'RNRBarButtonItemStateAppearance'
)

export interface BarButtonItemStateAppearanceProps {
  titleStyle?: TextStyle
  titlePositionAdjustment?: Offset
  backgroundImagePositionAdjustment?: Offset
  backgroundImage?: React.ReactElement<any> | null
}

export const BarButtonItemStateAppearance: React.FC<BarButtonItemStateAppearanceProps> = ({
  titleStyle,
  titlePositionAdjustment,
  backgroundImagePositionAdjustment,
  backgroundImage,
  ...props
}) => {
  return (
    <RNRBarButtonItemStateAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      titleStyle={titleStyle ? processTextStyle(titleStyle) : undefined}
      titlePositionAdjustment={titlePositionAdjustment}
      backgroundImagePositionAdjustment={backgroundImagePositionAdjustment}
      {...props}
    >
      {backgroundImage ? backgroundImage : <EmptyComponent />}
    </RNRBarButtonItemStateAppearance>
  )
}
