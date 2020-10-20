import React, { useCallback, useRef } from 'react'
import {
  requireNativeComponent,
  RefreshControlProps,
  NativeSyntheticEvent
} from 'react-native'
import { NavigationEmptyComponent } from './NavigationEmptyComponent'
import {
  processLargeTitleDisplayMode,
  LargeTitleDisplayModeValue
} from './LargeTitleDisplayMode'
import { NavigationSearchProps } from './NavigationSearch'
import { processBoolean } from '../utils/processBoolean'
import {
  NavigationBarAppearanceProps,
  processNavigationBarAppearance
} from './NavigationBarAppearance'
import {
  BackButtonDisplayModeValue,
  processBackButtonDisplayMode
} from './BackButtonDisplayMode'
import { ButtonProps, processButton } from './Button'
import { findActionInButton } from '../utils/findActionInButton'

const RNRNavigationBarItem = requireNativeComponent<any>('RNRNavigationBarItem')

export interface NavigationBarItemProps {
  title?: string
  titleView?: React.ReactElement | null
  rightContent?: React.ReactElement | null
  leftContent?: React.ReactElement | null
  leftButton?: React.ReactElement<ButtonProps>
  leftButtons?: React.ReactElement<ButtonProps>[]
  backButton?: React.ReactElement<ButtonProps>
  rightButton?: React.ReactElement<ButtonProps>
  rightButtons?: React.ReactElement<ButtonProps>[]
  leftItemsSupplementBackButton?: boolean
  largeTitleDisplayMode?: LargeTitleDisplayModeValue
  refreshControl?: React.ReactElement<RefreshControlProps>
  search?: React.ReactElement<NavigationSearchProps>
  prompt?: string
  backButtonTitle?: string
  hidesBackButton?: boolean
  backButtonDisplayMode?: BackButtonDisplayModeValue
  hidesSearchBarWhenScrolling?: boolean
  standardAppearance?: React.ReactElement<NavigationBarAppearanceProps>
  compactAppearance?: React.ReactElement<NavigationBarAppearanceProps>
  scrollEdgeAppearance?: React.ReactElement<NavigationBarAppearanceProps>
}

export const NavigationBarItem: React.FC<NavigationBarItemProps> = ({
  title,
  titleView,
  rightContent,
  leftContent,
  leftButton,
  leftButtons,
  backButton,
  rightButton,
  rightButtons,
  largeTitleDisplayMode = 'automatic',
  refreshControl,
  search,
  leftItemsSupplementBackButton,
  hidesSearchBarWhenScrolling,
  hidesBackButton,
  backButtonDisplayMode,
  standardAppearance,
  compactAppearance,
  scrollEdgeAppearance,
  ...props
}) => {
  props = processBoolean(props, 'leftItemsSupplementBackButton')

  const buttons = {
    leftButton: leftButton ? processButton(leftButton) : undefined,
    leftButtons: leftButtons
      ? leftButtons.map((button) => processButton(button))
      : undefined,
    backButton: backButton ? processButton(backButton) : undefined,
    rightButton: rightButton ? processButton(rightButton) : undefined,
    rightButtons: rightButtons
      ? rightButtons.map((button) => processButton(button))
      : undefined
  }

  const buttonsRef = useRef(buttons)

  buttonsRef.current = buttons

  const onActionButtonPress = useCallback(
    (event: NativeSyntheticEvent<{ id: string }>) => {
      let match
      for (const prop in buttonsRef.current) {
        if (
          buttonsRef.current.hasOwnProperty(prop) &&
          (buttonsRef.current as any)[prop]
        ) {
          match = findActionInButton(
            (buttonsRef.current as any)[prop],
            event.nativeEvent.id
          )
          if (match) break
        }
      }
      if (match) {
        if (match.onPress) match.onPress(event)
      }
    },
    []
  )

  return (
    <RNRNavigationBarItem
      {...props}
      largeTitleDisplayMode={
        largeTitleDisplayMode
          ? processLargeTitleDisplayMode(largeTitleDisplayMode)
          : undefined
      }
      title={title}
      style={{ position: 'absolute', top: 0, left: 0 }}
      leftItemsSupplementBackButton={processBoolean(
        leftItemsSupplementBackButton
      )}
      hidesSearchBarWhenScrolling={processBoolean(hidesSearchBarWhenScrolling)}
      hidesBackButton={processBoolean(hidesBackButton)}
      backButtonDisplayMode={
        backButtonDisplayMode
          ? processBackButtonDisplayMode(backButtonDisplayMode)
          : undefined
      }
      standardAppearance={
        standardAppearance
          ? processNavigationBarAppearance(standardAppearance)
          : undefined
      }
      compactAppearance={
        compactAppearance
          ? processNavigationBarAppearance(compactAppearance)
          : undefined
      }
      scrollEdgeAppearance={
        scrollEdgeAppearance
          ? processNavigationBarAppearance(scrollEdgeAppearance)
          : undefined
      }
      {...buttons}
      onActionButtonPress={onActionButtonPress}
    >
      {leftContent ? leftContent : <NavigationEmptyComponent />}
      {titleView ? titleView : <NavigationEmptyComponent />}
      {rightContent ? rightContent : <NavigationEmptyComponent />}
      {refreshControl ? refreshControl : <NavigationEmptyComponent />}
      {search ? search : <NavigationEmptyComponent />}
      {backButton ? backButton : <NavigationEmptyComponent />}
    </RNRNavigationBarItem>
  )
}
