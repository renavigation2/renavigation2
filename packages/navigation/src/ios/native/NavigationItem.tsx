import {
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
  let index = 0
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
        elementsIndices={{
          titleView: titleView ? index++ : -1,
          leftBarButtonItem: leftBarButtonItem ? index++ : -1,
          leftBarButtonItems: leftBarButtonItems ? index++ : -1,
          leftContent: leftContent ? index++ : -1,
          backBarButtonItem: backBarButtonItem ? index++ : -1,
          rightBarButtonItem: rightBarButtonItem ? index++ : -1,
          rightBarButtonItems: rightBarButtonItems ? index++ : -1,
          rightContent: rightContent ? index++ : -1,
          standardAppearance: standardAppearance ? index++ : -1,
          compactAppearance: compactAppearance ? index++ : -1,
          scrollEdgeAppearance: scrollEdgeAppearance ? index++ : -1,
          refreshControl: refreshControl ? index++ : -1,
          searchBar: searchBar ? index++ : -1
        }}
      >
        {titleView ? (
          <NavigationBarContent>{titleView}</NavigationBarContent>
        ) : null}
        {leftBarButtonItem}
        {leftBarButtonItems ? (
          <BarButtonItems>{leftBarButtonItems}</BarButtonItems>
        ) : null}
        {leftContent ? (
          <NavigationBarContent>{leftContent}</NavigationBarContent>
        ) : null}
        {backBarButtonItem}
        {rightBarButtonItem}
        {rightBarButtonItems ? (
          <BarButtonItems>{rightBarButtonItems}</BarButtonItems>
        ) : null}
        {rightContent ? (
          <NavigationBarContent>{rightContent}</NavigationBarContent>
        ) : null}
        {standardAppearance}
        {compactAppearance}
        {scrollEdgeAppearance}
        {refreshControl}
        {searchBar}
      </RNRNavigationItem>
    </Contexts.HasPromptContext.Provider>
  )
}
