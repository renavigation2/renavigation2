/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { requireNativeComponent, Platform } from 'react-native'
import NavigationBar from './NavigationBar'
import SearchBar from './SearchBar'

const CoordinatorLayout = ({ overlap, children }: any) => {
  const { clonedChildren, searchBar } = React.Children.toArray(children).reduce<
    any
  >(
    (val: any, child: any) => {
      if (child.type === NavigationBar) {
        const barChildren = React.Children.toArray(child.props.children)
        val.searchBar = barChildren.find(({ type }: any) => type === SearchBar)
        child = React.cloneElement(
          child,
          child.props,
          barChildren.filter((c) => c !== val.searchBar)
        )
      }
      val.clonedChildren.push(child)
      return val
    },
    { clonedChildren: [], searchBar: null }
  )
  return (
    <>
      <NVCoordinatorLayout overlap={overlap} style={{ flex: 1 }}>
        {clonedChildren}
      </NVCoordinatorLayout>
      {searchBar}
    </>
  )
}
const NVCoordinatorLayout = requireNativeComponent<any>('NVCoordinatorLayout')

export default Platform.OS === 'android'
  ? CoordinatorLayout
  : ({ children }: any) => children
