import React from 'react'
import { requireNativeComponent } from 'react-native'
import { processTextStyle } from '../../utils/processTextStyle'
import { StyleSheet } from '../../utils/StyleSheet'
import { Offset } from '../typings/Offset'
import { TextStyle } from '../typings/TextStyle'

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
  let index = 0
  return (
    <RNRBarButtonItemStateAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      titleStyle={titleStyle ? processTextStyle(titleStyle) : undefined}
      titlePositionAdjustment={titlePositionAdjustment}
      backgroundImagePositionAdjustment={backgroundImagePositionAdjustment}
      {...props}
      elementsIndices={{
        backgroundImage: backgroundImage ? index++ : -1
      }}
    >
      {backgroundImage}
    </RNRBarButtonItemStateAppearance>
  )
}
