import React from 'react'
import {
  ImageURISource,
  Image as RNImage,
  processColor,
  ColorValue,
  requireNativeComponent
} from 'react-native'
import { StyleSheet } from '../../utils/StyleSheet'
import { EdgeInsets } from '../typings/EdgeInsets'

const RNRImage = requireNativeComponent<any>('RNRImage')

export interface ImageProps {
  source?: ImageURISource
  systemName?: string
  alignmentRectInsets?: EdgeInsets
  renderingMode?: 'automatic' | 'always-original' | 'always-template'
  tintColor?: ColorValue
}

export const Image: React.FC<ImageProps> = ({
  source,
  tintColor,
  alignmentRectInsets,
  ...props
}) => {
  return (
    <RNRImage
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      source={source ? RNImage.resolveAssetSource(source) : undefined}
      _tintColor={tintColor ? processColor(tintColor) : undefined}
      _alignmentRectInsets={alignmentRectInsets}
      {...props}
    />
  )
}
