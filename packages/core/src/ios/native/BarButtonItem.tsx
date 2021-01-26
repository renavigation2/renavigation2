import React, { useContext } from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { processTextStyle } from '../../utils/processTextStyle'
import { StyleSheet } from '../../utils/StyleSheet'
import { Contexts } from '../context'
import { EdgeInsets } from '../typings/EdgeInsets'
import { TextStyle } from '../typings/TextStyle'

const RNRBarButtonItem = requireNativeComponent<any>('RNRBarButtonItem')

export interface BarButtonItemProps {
  fixedSpace?: number
  flexibleSpace?: boolean
  enabled?: boolean // isEnabled
  title?: string
  imageInsets?: EdgeInsets
  landscapeImagePhoneInsets?: EdgeInsets
  largeContentSizeImageInsets?: EdgeInsets
  titleStyle?: TextStyle
  titleStyleFocused?: TextStyle
  titleStyleDisabled?: TextStyle
  titleStyleHighlighted?: TextStyle
  style?: 'plain' | 'done'
  width?: number
  possibleTitles?: string[]
  tintColor?: ColorValue // _tintColor
  backgroundVerticalPositionAdjustment?: number
  backgroundVerticalPositionAdjustmentCompact?: number
  backgroundVerticalPositionAdjustmentDefaultPrompt?: number
  backgroundVerticalPositionAdjustmentCompactPrompt?: number
  titlePositionAdjustment?: number
  titlePositionAdjustmentCompact?: number
  titlePositionAdjustmentDefaultPrompt?: number
  titlePositionAdjustmentCompactPrompt?: number
  backButtonTitlePositionAdjustment?: number
  backButtonTitlePositionAdjustmentCompact?: number
  backButtonTitlePositionAdjustmentDefaultPrompt?: number
  backButtonTitlePositionAdjustmentCompactPrompt?: number
  backButtonBackgroundVerticalPositionAdjustment?: number
  backButtonBackgroundVerticalPositionAdjustmentCompact?: number
  backButtonBackgroundVerticalPositionAdjustmentDefaultPrompt?: number
  backButtonBackgroundVerticalPositionAdjustmentCompactPrompt?: number
  primaryAction?: React.ReactElement<any> | null
  menu?: React.ReactElement<any> | null
  image?: React.ReactElement<any> | null
  landscapeImagePhone?: React.ReactElement<any> | null
  largeContentSizeImage?: React.ReactElement<any> | null
  backButtonBackgroundImage?: React.ReactElement<any> | null
  backButtonBackgroundImageCompact?: React.ReactElement<any> | null
  backButtonBackgroundImageCompactDisabled?: React.ReactElement<any> | null
  backButtonBackgroundImageCompactFocused?: React.ReactElement<any> | null
  backButtonBackgroundImageCompactHighlighted?: React.ReactElement<any> | null
  backButtonBackgroundImageCompactPrompt?: React.ReactElement<any> | null
  backButtonBackgroundImageCompactPromptDisabled?: React.ReactElement<any> | null
  backButtonBackgroundImageCompactPromptFocused?: React.ReactElement<any> | null
  backButtonBackgroundImageCompactPromptHighlighted?: React.ReactElement<any> | null
  backButtonBackgroundImageDefaultPrompt?: React.ReactElement<any> | null
  backButtonBackgroundImageDefaultPromptDisabled?: React.ReactElement<any> | null
  backButtonBackgroundImageDefaultPromptFocused?: React.ReactElement<any> | null
  backButtonBackgroundImageDefaultPromptHighlighted?: React.ReactElement<any> | null
  backButtonBackgroundImageDisabled?: React.ReactElement<any> | null
  backButtonBackgroundImageFocused?: React.ReactElement<any> | null
  backButtonBackgroundImageHighlighted?: React.ReactElement<any> | null
  backgroundImage?: React.ReactElement<any> | null
  backgroundImageCompact?: React.ReactElement<any> | null
  backgroundImageCompactDisabled?: React.ReactElement<any> | null
  backgroundImageCompactFocused?: React.ReactElement<any> | null
  backgroundImageCompactHighlighted?: React.ReactElement<any> | null
  backgroundImageCompactPrompt?: React.ReactElement<any> | null
  backgroundImageCompactPromptDisabled?: React.ReactElement<any> | null
  backgroundImageCompactPromptFocused?: React.ReactElement<any> | null
  backgroundImageCompactPromptHighlighted?: React.ReactElement<any> | null
  backgroundImageDefaultPrompt?: React.ReactElement<any> | null
  backgroundImageDefaultPromptDisabled?: React.ReactElement<any> | null
  backgroundImageDefaultPromptFocused?: React.ReactElement<any> | null
  backgroundImageDefaultPromptHighlighted?: React.ReactElement<any> | null
  backgroundImageDisabled?: React.ReactElement<any> | null
  backgroundImageFocused?: React.ReactElement<any> | null
  backgroundImageHighlighted?: React.ReactElement<any> | null
}

export const BarButtonItem: React.FC<BarButtonItemProps> = ({
  flexibleSpace,
  enabled,
  titleStyle,
  titleStyleFocused,
  titleStyleDisabled,
  titleStyleHighlighted,
  style,
  tintColor,
  primaryAction,
  menu,
  image,
  landscapeImagePhone,
  largeContentSizeImage,
  backButtonBackgroundImage,
  backButtonBackgroundImageCompact,
  backButtonBackgroundImageCompactDisabled,
  backButtonBackgroundImageCompactFocused,
  backButtonBackgroundImageCompactHighlighted,
  backButtonBackgroundImageCompactPrompt,
  backButtonBackgroundImageCompactPromptDisabled,
  backButtonBackgroundImageCompactPromptFocused,
  backButtonBackgroundImageCompactPromptHighlighted,
  backButtonBackgroundImageDefaultPrompt,
  backButtonBackgroundImageDefaultPromptDisabled,
  backButtonBackgroundImageDefaultPromptFocused,
  backButtonBackgroundImageDefaultPromptHighlighted,
  backButtonBackgroundImageDisabled,
  backButtonBackgroundImageFocused,
  backButtonBackgroundImageHighlighted,
  backgroundImage,
  backgroundImageCompact,
  backgroundImageCompactDisabled,
  backgroundImageCompactFocused,
  backgroundImageCompactHighlighted,
  backgroundImageCompactPrompt,
  backgroundImageCompactPromptDisabled,
  backgroundImageCompactPromptFocused,
  backgroundImageCompactPromptHighlighted,
  backgroundImageDefaultPrompt,
  backgroundImageDefaultPromptDisabled,
  backgroundImageDefaultPromptFocused,
  backgroundImageDefaultPromptHighlighted,
  backgroundImageDisabled,
  backgroundImageFocused,
  backgroundImageHighlighted,
  ...props
}) => {
  const hasPrompt = useContext(Contexts.HasPromptContext)
  let index = 0
  return (
    <RNRBarButtonItem
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      hasPrompt={processBoolean(hasPrompt)}
      flexibleSpace={processBoolean(flexibleSpace)}
      isEnabled={processBoolean(enabled)} // isEnabled
      titleStyle={titleStyle ? processTextStyle(titleStyle) : undefined}
      titleStyleFocused={
        titleStyleFocused ? processTextStyle(titleStyleFocused) : undefined
      }
      titleStyleDisabled={
        titleStyleDisabled ? processTextStyle(titleStyleDisabled) : undefined
      }
      titleStyleHighlighted={
        titleStyleHighlighted
          ? processTextStyle(titleStyleHighlighted)
          : undefined
      }
      _style={style}
      _tintColor={processColor(tintColor)}
      {...props}
      elementsIndices={{
        primaryAction: primaryAction ? index++ : -1,
        menu: menu ? index++ : -1,
        image: image ? index++ : -1,
        landscapeImagePhone: landscapeImagePhone ? index++ : -1,
        largeContentSizeImage: largeContentSizeImage ? index++ : -1,
        backButtonBackgroundImage: backButtonBackgroundImage ? index++ : -1,
        backButtonBackgroundImageCompact: backButtonBackgroundImageCompact
          ? index++
          : -1,
        backButtonBackgroundImageCompactDisabled: backButtonBackgroundImageCompactDisabled
          ? index++
          : -1,
        backButtonBackgroundImageCompactFocused: backButtonBackgroundImageCompactFocused
          ? index++
          : -1,
        backButtonBackgroundImageCompactHighlighted: backButtonBackgroundImageCompactHighlighted
          ? index++
          : -1,
        backButtonBackgroundImageCompactPrompt: backButtonBackgroundImageCompactPrompt
          ? index++
          : -1,
        backButtonBackgroundImageCompactPromptDisabled: backButtonBackgroundImageCompactPromptDisabled
          ? index++
          : -1,
        backButtonBackgroundImageCompactPromptFocused: backButtonBackgroundImageCompactPromptFocused
          ? index++
          : -1,
        backButtonBackgroundImageCompactPromptHighlighted: backButtonBackgroundImageCompactPromptHighlighted
          ? index++
          : -1,
        backButtonBackgroundImageDisabled: backButtonBackgroundImageDisabled
          ? index++
          : -1,
        backButtonBackgroundImageFocused: backButtonBackgroundImageFocused
          ? index++
          : -1,
        backButtonBackgroundImageHighlighted: backButtonBackgroundImageHighlighted
          ? index++
          : -1,
        backButtonBackgroundImageDefaultPrompt: backButtonBackgroundImageDefaultPrompt
          ? index++
          : -1,
        backButtonBackgroundImageDefaultPromptDisabled: backButtonBackgroundImageDefaultPromptDisabled
          ? index++
          : -1,
        backButtonBackgroundImageDefaultPromptFocused: backButtonBackgroundImageDefaultPromptFocused
          ? index++
          : -1,
        backButtonBackgroundImageDefaultPromptHighlighted: backButtonBackgroundImageDefaultPromptHighlighted
          ? index++
          : -1,
        backgroundImage: backgroundImage ? index++ : -1,
        backgroundImageCompact: backgroundImageCompact ? index++ : -1,
        backgroundImageCompactDisabled: backgroundImageCompactDisabled
          ? index++
          : -1,
        backgroundImageCompactFocused: backgroundImageCompactFocused
          ? index++
          : -1,
        backgroundImageCompactHighlighted: backgroundImageCompactHighlighted
          ? index++
          : -1,
        backgroundImageCompactPrompt: backgroundImageCompactPrompt
          ? index++
          : -1,
        backgroundImageCompactPromptDisabled: backgroundImageCompactPromptDisabled
          ? index++
          : -1,
        backgroundImageCompactPromptFocused: backgroundImageCompactPromptFocused
          ? index++
          : -1,
        backgroundImageCompactPromptHighlighted: backgroundImageCompactPromptHighlighted
          ? index++
          : -1,
        backgroundImageDefaultPrompt: backgroundImageDefaultPrompt
          ? index++
          : -1,
        backgroundImageDefaultPromptDisabled: backgroundImageDefaultPromptDisabled
          ? index++
          : -1,
        backgroundImageDefaultPromptFocused: backgroundImageDefaultPromptFocused
          ? index++
          : -1,
        backgroundImageDefaultPromptHighlighted: backgroundImageDefaultPromptHighlighted
          ? index++
          : -1,
        backgroundImageDisabled: backgroundImageDisabled ? index++ : -1,
        backgroundImageFocused: backgroundImageFocused ? index++ : -1,
        backgroundImageHighlighted: backgroundImageHighlighted ? index++ : -1
      }}
    >
      {primaryAction}
      {menu}
      {image}
      {landscapeImagePhone}
      {largeContentSizeImage}
      {backButtonBackgroundImage}
      {backButtonBackgroundImageCompact}
      {backButtonBackgroundImageCompactDisabled}
      {backButtonBackgroundImageCompactFocused}
      {backButtonBackgroundImageCompactHighlighted}
      {backButtonBackgroundImageCompactPrompt}
      {backButtonBackgroundImageCompactPromptDisabled}
      {backButtonBackgroundImageCompactPromptFocused}
      {backButtonBackgroundImageCompactPromptHighlighted}
      {backButtonBackgroundImageDisabled}
      {backButtonBackgroundImageFocused}
      {backButtonBackgroundImageHighlighted}
      {backButtonBackgroundImageDefaultPrompt}
      {backButtonBackgroundImageDefaultPromptDisabled}
      {backButtonBackgroundImageDefaultPromptFocused}
      {backButtonBackgroundImageDefaultPromptHighlighted}
      {backgroundImage}
      {backgroundImageCompact}
      {backgroundImageCompactDisabled}
      {backgroundImageCompactFocused}
      {backgroundImageCompactHighlighted}
      {backgroundImageCompactPrompt}
      {backgroundImageCompactPromptDisabled}
      {backgroundImageCompactPromptFocused}
      {backgroundImageCompactPromptHighlighted}
      {backgroundImageDefaultPrompt}
      {backgroundImageDefaultPromptDisabled}
      {backgroundImageDefaultPromptFocused}
      {backgroundImageDefaultPromptHighlighted}
      {backgroundImageDisabled}
      {backgroundImageFocused}
      {backgroundImageHighlighted}
    </RNRBarButtonItem>
  )
}
