import React from 'react'
import { requireNativeComponent } from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { StyleSheet } from '../../utils/StyleSheet'

const RNRMenu = requireNativeComponent<any>('RNRMenu')

export interface MenuProps {
  identifier?:
    | 'application'
    | 'file'
    | 'edit'
    | 'view'
    | 'window'
    | 'help'
    | 'about'
    | 'preferences'
    | 'services'
    | 'hide'
    | 'quit'
    | 'new-scene'
    | 'open-recent'
    | 'close'
    | 'print'
    | 'undo-redo'
    | 'standard-edit'
    | 'find'
    | 'replace'
    | 'share'
    | 'text-style'
    | 'spelling'
    | 'spelling-panel'
    | 'spelling-options'
    | 'substitutions'
    | 'substitutions-panel'
    | 'substitution-options'
    | 'transformations'
    | 'speech'
    | 'lookup'
    | 'learn'
    | 'format'
    | 'font'
    | 'text-size'
    | 'text-color'
    | 'text-style-pasteboard'
    | 'text'
    | 'writing-direction'
    | 'alignment'
    | 'toolbar'
    | 'fullscreen'
    | 'minimize-and-zoom'
    | 'bring-all-to-front'
    | 'root'
    | string
  title?: string
  destructive?: boolean
  displayInline?: boolean
  image?: React.ReactElement<any> | null
  loading?: boolean
}

export const Menu: React.FC<MenuProps> = ({
  identifier,
  title,
  destructive,
  displayInline,
  image,
  children,
  loading,
  ...props
}) => {
  let index = 0
  return (
    <RNRMenu
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      identifier={identifier}
      title={title}
      destructive={processBoolean(destructive)}
      displayInline={processBoolean(displayInline)}
      loading={processBoolean(loading)}
      {...props}
      elementsIndices={{
        image: image ? index++ : -1,
        children: children ? index++ : -1
      }}
    >
      {image}
      {children}
    </RNRMenu>
  )
}
