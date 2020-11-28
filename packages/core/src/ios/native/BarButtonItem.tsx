import React, { useContext } from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { processTextStyle } from '../../utils/processTextStyle'
import { StyleSheet } from '../../utils/StyleSheet'
import { Contexts } from '../context'
import { EdgeInsets } from '../typings/EdgeInsets'
import { TextStyle } from '../typings/TextStyle'
import { EmptyComponent } from './EmptyComponent'

const RNRBarButtonItem = requireNativeComponent<any>('RNRBarButtonItem')

export interface BarButtonItemProps {
  fixedSpace?: number
  flexibleSpace?: boolean
  enabled?: boolean // isEnabled
  title?: string
  imageInsets?: EdgeInsets
  landscapeImagePhoneInsets?: EdgeInsets
  largeContentSizeImageInsets?: EdgeInsets
  normalTitleStyle?: TextStyle
  focusedTitleStyle?: TextStyle
  disabledTitleStyle?: TextStyle
  highlightedTitleStyle?: TextStyle
  style?: 'plain' | 'done'
  width?: number
  possibleTitles?: string[]
  tintColor?: ColorValue // _tintColor
  defaultBackgroundVerticalPositionAdjustment?: number
  compactBackgroundVerticalPositionAdjustment?: number
  defaultPromptBackgroundVerticalPositionAdjustment?: number
  compactPromptBackgroundVerticalPositionAdjustment?: number
  defaultTitlePositionAdjustment?: number
  compactTitlePositionAdjustment?: number
  defaultPromptTitlePositionAdjustment?: number
  compactPromptTitlePositionAdjustment?: number
  defaultBackButtonTitlePositionAdjustment?: number
  compactBackButtonTitlePositionAdjustment?: number
  defaultPromptBackButtonTitlePositionAdjustment?: number
  compactPromptBackButtonTitlePositionAdjustment?: number
  defaultBackButtonBackgroundVerticalPositionAdjustment?: number
  compactBackButtonBackgroundVerticalPositionAdjustment?: number
  defaultPromptBackButtonBackgroundVerticalPositionAdjustment?: number
  compactPromptBackButtonBackgroundVerticalPositionAdjustment?: number
  primaryAction?: React.ReactElement<any> | null
  menu?: React.ReactElement<any> | null
  image?: React.ReactElement<any> | null
  landscapeImagePhone?: React.ReactElement<any> | null
  largeContentSizeImage?: React.ReactElement<any> | null
  normalDefaultBackgroundImage?: React.ReactElement<any> | null
  normalCompactBackgroundImage?: React.ReactElement<any> | null
  normalDefaultPromptBackgroundImage?: React.ReactElement<any> | null
  normalCompactPromptBackgroundImage?: React.ReactElement<any> | null
  focusedDefaultBackgroundImage?: React.ReactElement<any> | null
  focusedCompactBackgroundImage?: React.ReactElement<any> | null
  focusedDefaultPromptBackgroundImage?: React.ReactElement<any> | null
  focusedCompactPromptBackgroundImage?: React.ReactElement<any> | null
  disabledDefaultBackgroundImage?: React.ReactElement<any> | null
  disabledCompactBackgroundImage?: React.ReactElement<any> | null
  disabledDefaultPromptBackgroundImage?: React.ReactElement<any> | null
  disabledCompactPromptBackgroundImage?: React.ReactElement<any> | null
  highlightedDefaultBackgroundImage?: React.ReactElement<any> | null
  highlightedCompactBackgroundImage?: React.ReactElement<any> | null
  highlightedDefaultPromptBackgroundImage?: React.ReactElement<any> | null
  highlightedCompactPromptBackgroundImage?: React.ReactElement<any> | null
  normalDefaultBackButtonBackgroundImage?: React.ReactElement<any> | null
  normalCompactBackButtonBackgroundImage?: React.ReactElement<any> | null
  normalDefaultPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
  normalCompactPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
  focusedDefaultBackButtonBackgroundImage?: React.ReactElement<any> | null
  focusedCompactBackButtonBackgroundImage?: React.ReactElement<any> | null
  focusedDefaultPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
  focusedCompactPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
  disabledDefaultBackButtonBackgroundImage?: React.ReactElement<any> | null
  disabledCompactBackButtonBackgroundImage?: React.ReactElement<any> | null
  disabledDefaultPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
  disabledCompactPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
  highlightedDefaultBackButtonBackgroundImage?: React.ReactElement<any> | null
  highlightedCompactBackButtonBackgroundImage?: React.ReactElement<any> | null
  highlightedDefaultPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
  highlightedCompactPromptBackButtonBackgroundImage?: React.ReactElement<any> | null
}

export const BarButtonItem: React.FC<BarButtonItemProps> = ({
  fixedSpace,
  flexibleSpace,
  enabled,
  title,
  imageInsets,
  landscapeImagePhoneInsets,
  largeContentSizeImageInsets,
  normalTitleStyle,
  focusedTitleStyle,
  disabledTitleStyle,
  highlightedTitleStyle,
  style,
  width,
  possibleTitles,
  tintColor,
  defaultBackgroundVerticalPositionAdjustment,
  compactBackgroundVerticalPositionAdjustment,
  defaultPromptBackgroundVerticalPositionAdjustment,
  compactPromptBackgroundVerticalPositionAdjustment,
  defaultTitlePositionAdjustment,
  compactTitlePositionAdjustment,
  defaultPromptTitlePositionAdjustment,
  compactPromptTitlePositionAdjustment,
  defaultBackButtonTitlePositionAdjustment,
  compactBackButtonTitlePositionAdjustment,
  defaultPromptBackButtonTitlePositionAdjustment,
  compactPromptBackButtonTitlePositionAdjustment,
  defaultBackButtonBackgroundVerticalPositionAdjustment,
  compactBackButtonBackgroundVerticalPositionAdjustment,
  defaultPromptBackButtonBackgroundVerticalPositionAdjustment,
  compactPromptBackButtonBackgroundVerticalPositionAdjustment,
  primaryAction,
  menu,
  image,
  landscapeImagePhone,
  largeContentSizeImage,
  normalDefaultBackgroundImage,
  normalCompactBackgroundImage,
  normalDefaultPromptBackgroundImage,
  normalCompactPromptBackgroundImage,
  focusedDefaultBackgroundImage,
  focusedCompactBackgroundImage,
  focusedDefaultPromptBackgroundImage,
  focusedCompactPromptBackgroundImage,
  disabledDefaultBackgroundImage,
  disabledCompactBackgroundImage,
  disabledDefaultPromptBackgroundImage,
  disabledCompactPromptBackgroundImage,
  highlightedDefaultBackgroundImage,
  highlightedCompactBackgroundImage,
  highlightedDefaultPromptBackgroundImage,
  highlightedCompactPromptBackgroundImage,
  normalDefaultBackButtonBackgroundImage,
  normalCompactBackButtonBackgroundImage,
  normalDefaultPromptBackButtonBackgroundImage,
  normalCompactPromptBackButtonBackgroundImage,
  focusedDefaultBackButtonBackgroundImage,
  focusedCompactBackButtonBackgroundImage,
  focusedDefaultPromptBackButtonBackgroundImage,
  focusedCompactPromptBackButtonBackgroundImage,
  disabledDefaultBackButtonBackgroundImage,
  disabledCompactBackButtonBackgroundImage,
  disabledDefaultPromptBackButtonBackgroundImage,
  disabledCompactPromptBackButtonBackgroundImage,
  highlightedDefaultBackButtonBackgroundImage,
  highlightedCompactBackButtonBackgroundImage,
  highlightedDefaultPromptBackButtonBackgroundImage,
  highlightedCompactPromptBackButtonBackgroundImage,
  ...props
}) => {
  const hasPrompt = useContext(Contexts.HasPromptContext)
  return (
    <RNRBarButtonItem
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      hasPrompt={processBoolean(hasPrompt)}
      fixedSpace={fixedSpace}
      flexibleSpace={processBoolean(flexibleSpace)}
      isEnabled={processBoolean(enabled)} // isEnabled
      title={title}
      imageInsets={imageInsets}
      landscapeImagePhoneInsets={landscapeImagePhoneInsets}
      largeContentSizeImageInsets={largeContentSizeImageInsets}
      normalTitleStyle={
        normalTitleStyle ? processTextStyle(normalTitleStyle) : undefined
      }
      focusedTitleStyle={
        focusedTitleStyle ? processTextStyle(focusedTitleStyle) : undefined
      }
      disabledTitleStyle={
        disabledTitleStyle ? processTextStyle(disabledTitleStyle) : undefined
      }
      highlightedTitleStyle={
        highlightedTitleStyle
          ? processTextStyle(highlightedTitleStyle)
          : undefined
      }
      _style={style}
      width={width}
      possibleTitles={possibleTitles}
      _tintColor={processColor(tintColor)}
      defaultBackgroundVerticalPositionAdjustment={
        defaultBackgroundVerticalPositionAdjustment
      }
      compactBackgroundVerticalPositionAdjustment={
        compactBackgroundVerticalPositionAdjustment
      }
      defaultPromptBackgroundVerticalPositionAdjustment={
        defaultPromptBackgroundVerticalPositionAdjustment
      }
      compactPromptBackgroundVerticalPositionAdjustment={
        compactPromptBackgroundVerticalPositionAdjustment
      }
      defaultTitlePositionAdjustment={defaultTitlePositionAdjustment}
      compactTitlePositionAdjustment={compactTitlePositionAdjustment}
      defaultPromptTitlePositionAdjustment={
        defaultPromptTitlePositionAdjustment
      }
      compactPromptTitlePositionAdjustment={
        compactPromptTitlePositionAdjustment
      }
      defaultBackButtonTitlePositionAdjustment={
        defaultBackButtonTitlePositionAdjustment
      }
      compactBackButtonTitlePositionAdjustment={
        compactBackButtonTitlePositionAdjustment
      }
      defaultPromptBackButtonTitlePositionAdjustment={
        defaultPromptBackButtonTitlePositionAdjustment
      }
      compactPromptBackButtonTitlePositionAdjustment={
        compactPromptBackButtonTitlePositionAdjustment
      }
      defaultBackButtonBackgroundVerticalPositionAdjustment={
        defaultBackButtonBackgroundVerticalPositionAdjustment
      }
      compactBackButtonBackgroundVerticalPositionAdjustment={
        compactBackButtonBackgroundVerticalPositionAdjustment
      }
      defaultPromptBackButtonBackgroundVerticalPositionAdjustment={
        defaultPromptBackButtonBackgroundVerticalPositionAdjustment
      }
      compactPromptBackButtonBackgroundVerticalPositionAdjustment={
        compactPromptBackButtonBackgroundVerticalPositionAdjustment
      }
      {...props}
    >
      {primaryAction ? primaryAction : <EmptyComponent />}
      {menu ? menu : <EmptyComponent />}
      {image ? image : <EmptyComponent />}
      {landscapeImagePhone ? landscapeImagePhone : <EmptyComponent />}
      {largeContentSizeImage ? largeContentSizeImage : <EmptyComponent />}
      {normalDefaultBackgroundImage ? (
        normalDefaultBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {normalCompactBackgroundImage ? (
        normalCompactBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {focusedDefaultBackgroundImage ? (
        focusedDefaultBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {focusedCompactBackgroundImage ? (
        focusedCompactBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {disabledDefaultBackgroundImage ? (
        disabledDefaultBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {disabledCompactBackgroundImage ? (
        disabledCompactBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {highlightedDefaultBackgroundImage ? (
        highlightedDefaultBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {highlightedCompactBackgroundImage ? (
        highlightedCompactBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {normalDefaultBackButtonBackgroundImage ? (
        normalDefaultBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {normalCompactBackButtonBackgroundImage ? (
        normalCompactBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {focusedDefaultBackButtonBackgroundImage ? (
        focusedDefaultBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {focusedCompactBackButtonBackgroundImage ? (
        focusedCompactBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {disabledDefaultBackButtonBackgroundImage ? (
        disabledDefaultBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {disabledCompactBackButtonBackgroundImage ? (
        disabledCompactBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {highlightedDefaultBackButtonBackgroundImage ? (
        highlightedDefaultBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {highlightedCompactBackButtonBackgroundImage ? (
        highlightedCompactBackButtonBackgroundImage
      ) : (
        <EmptyComponent />
      )}
      {hasPrompt ? (
        normalDefaultPromptBackgroundImage ? (
          normalDefaultPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        normalCompactPromptBackgroundImage ? (
          normalCompactPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        focusedDefaultPromptBackgroundImage ? (
          focusedDefaultPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        focusedCompactPromptBackgroundImage ? (
          focusedCompactPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        disabledDefaultPromptBackgroundImage ? (
          disabledDefaultPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        disabledCompactPromptBackgroundImage ? (
          disabledCompactPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        highlightedDefaultPromptBackgroundImage ? (
          highlightedDefaultPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        highlightedCompactPromptBackgroundImage ? (
          highlightedCompactPromptBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        normalDefaultPromptBackButtonBackgroundImage ? (
          normalDefaultPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        normalCompactPromptBackButtonBackgroundImage ? (
          normalCompactPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        focusedDefaultPromptBackButtonBackgroundImage ? (
          focusedDefaultPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        focusedCompactPromptBackButtonBackgroundImage ? (
          focusedCompactPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        disabledDefaultPromptBackButtonBackgroundImage ? (
          disabledDefaultPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        disabledCompactPromptBackButtonBackgroundImage ? (
          disabledCompactPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        highlightedDefaultPromptBackButtonBackgroundImage ? (
          highlightedDefaultPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
      {hasPrompt ? (
        highlightedCompactPromptBackButtonBackgroundImage ? (
          highlightedCompactPromptBackButtonBackgroundImage
        ) : (
          <EmptyComponent />
        )
      ) : null}
    </RNRBarButtonItem>
  )
}
