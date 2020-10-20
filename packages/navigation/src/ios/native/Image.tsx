import {
  ImageURISource,
  Image as RNImage,
  ImageResolvedAssetSource,
  processColor,
  ProcessedColorValue,
  ColorValue
} from 'react-native'
import { EdgeInsets } from '../typings/EdgeInsets'

export interface ImageProps {
  source?: ImageURISource
  systemName?: string
  alignmentRectInsets?: EdgeInsets
  renderingMode?: 'automatic' | 'alwaysOriginal' | 'alwaysTemplate'
  tintColor?: ColorValue
}

export interface ProcessedImageValue
  extends Omit<ImageProps, 'source' | 'tintColor'> {
  source?: ImageResolvedAssetSource
  tintColor?: ProcessedColorValue | null | undefined
}

export const Image: React.FC<ImageProps> = () => null

export function processImage({
  props
}: React.ReactElement<ImageProps>): ProcessedImageValue {
  const final: ProcessedImageValue = { ...(props as any) }

  if (props.source) {
    final.source = RNImage.resolveAssetSource(props.source)
  }

  if (props.tintColor) {
    final.tintColor = processColor(props.tintColor)
  }

  return final
}
