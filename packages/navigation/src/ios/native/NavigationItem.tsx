import {
  EmptyComponent,
  processBoolean,
  StyleSheet,
  Contexts,
  BarButtonItems
} from '@renavigation2/core'
import React from 'react'
import { requireNativeComponent } from 'react-native'
import { NavigationBarContent } from './NavigationBarContent'

const RNRNavigationItem = requireNativeComponent<any>('RNRNavigationItem')

export interface NavigationItemProps {
  title?: string
  leftItemsSupplementBackButton?: boolean
  largeTitleDisplayMode?: 'automatic' | 'always' | 'never'
  prompt?: string
  backButtonTitle?: string
  hidesBackButton?: boolean
  backButtonDisplayMode?: 'default' | 'generic' | 'minimal'
  hidesSearchBarWhenScrolling?: boolean
  titleView?: React.ReactElement<any> | null
  leftBarButtonItem?: React.ReactElement<any> | null
  leftBarButtonItems?: React.ReactElement<any>[] | null
  leftContent?: React.ReactElement<any> | null
  backBarButtonItem?: React.ReactElement<any> | null
  rightBarButtonItem?: React.ReactElement<any> | null
  rightBarButtonItems?: React.ReactElement<any>[] | null
  rightContent?: React.ReactElement<any> | null
  standardAppearance?: React.ReactElement<any> | null
  compactAppearance?: React.ReactElement<any> | null
  scrollEdgeAppearance?: React.ReactElement<any> | null
  refreshControl?: React.ReactElement<any> | null
  searchBar?: React.ReactElement<any> | null
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  title,
  leftItemsSupplementBackButton,
  largeTitleDisplayMode,
  prompt,
  backButtonTitle,
  hidesBackButton,
  backButtonDisplayMode,
  hidesSearchBarWhenScrolling,
  titleView,
  leftBarButtonItem,
  leftBarButtonItems,
  leftContent,
  backBarButtonItem,
  rightBarButtonItem,
  rightBarButtonItems,
  rightContent,
  standardAppearance,
  compactAppearance,
  scrollEdgeAppearance,
  refreshControl,
  searchBar,
  ...props
}) => {
  return (
    <Contexts.HasPromptContext.Provider value={!!prompt}>
      <RNRNavigationItem
        style={StyleSheet.absoluteHidden}
        pointerEvents="none"
        title={title}
        leftItemsSupplementBackButton={processBoolean(
          leftItemsSupplementBackButton
        )}
        largeTitleDisplayMode={largeTitleDisplayMode}
        prompt={prompt}
        backButtonTitle={backButtonTitle}
        hidesBackButton={processBoolean(hidesBackButton)}
        backButtonDisplayMode={backButtonDisplayMode}
        hidesSearchBarWhenScrolling={processBoolean(
          hidesSearchBarWhenScrolling
        )}
        {...props}
      >
        {titleView ? (
          <NavigationBarContent>{titleView}</NavigationBarContent>
        ) : (
          <EmptyComponent />
        )}
        {leftBarButtonItem ? leftBarButtonItem : <EmptyComponent />}
        {leftBarButtonItems ? (
          <BarButtonItems>{leftBarButtonItems}</BarButtonItems>
        ) : (
          <EmptyComponent />
        )}
        {leftContent ? (
          <NavigationBarContent>{leftContent}</NavigationBarContent>
        ) : (
          <EmptyComponent />
        )}
        {backBarButtonItem ? backBarButtonItem : <EmptyComponent />}
        {rightBarButtonItem ? rightBarButtonItem : <EmptyComponent />}
        {rightBarButtonItems ? (
          <BarButtonItems>{rightBarButtonItems}</BarButtonItems>
        ) : (
          <EmptyComponent />
        )}
        {rightContent ? (
          <NavigationBarContent>{rightContent}</NavigationBarContent>
        ) : (
          <EmptyComponent />
        )}
        {standardAppearance ? standardAppearance : <EmptyComponent />}
        {compactAppearance ? compactAppearance : <EmptyComponent />}
        {scrollEdgeAppearance ? scrollEdgeAppearance : <EmptyComponent />}
        {refreshControl ? refreshControl : <EmptyComponent />}
        {searchBar ? searchBar : <EmptyComponent />}
      </RNRNavigationItem>
    </Contexts.HasPromptContext.Provider>
  )
}
