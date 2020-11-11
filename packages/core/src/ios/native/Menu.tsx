import React from 'react'
import { requireNativeComponent } from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { StyleSheet } from '../../utils/StyleSheet'
import { EmptyComponent } from './EmptyComponent'

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
    | 'newScene'
    | 'openRecent'
    | 'close'
    | 'print'
    | 'undoRedo'
    | 'standardEdit'
    | 'find'
    | 'replace'
    | 'share'
    | 'textStyle'
    | 'spelling'
    | 'spellingPanel'
    | 'spellingOptions'
    | 'substitutions'
    | 'substitutionsPanel'
    | 'substitutionOptions'
    | 'transformations'
    | 'speech'
    | 'lookup'
    | 'learn'
    | 'format'
    | 'font'
    | 'textSize'
    | 'textColor'
    | 'textStylePasteboard'
    | 'text'
    | 'writingDirection'
    | 'alignment'
    | 'toolbar'
    | 'fullscreen'
    | 'minimizeAndZoom'
    | 'bringAllToFront'
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
    >
      {image ? image : <EmptyComponent />}
      {children}
    </RNRMenu>
  )
}
