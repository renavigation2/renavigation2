/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React, { ReactElement } from 'react'
import { requireNativeComponent, Image, Platform, Animated } from 'react-native'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import SearchBar from './SearchBar'
import TitleBar from './TitleBar'
import CollapsingBar from './CollapsingBar'
import TabBar from './TabBar'

class NavigationBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const {
      hidden,
      logo,
      navigationImage,
      overflowImage,
      children,
      style = { height: undefined },
      ...otherProps
    } = this.props
    if (Platform.OS === 'android' && hidden) return null
    const childrenArray = React.Children.toArray(children) as ReactElement<
      any
    >[]
    const collapsingBar = childrenArray.find(
      ({ type }) => type === CollapsingBar
    )
    return (
      <>
        <NVNavigationBar
          hidden={hidden}
          style={{
            height:
              Platform.OS === 'android' && collapsingBar ? style.height : null
          }}
          {...otherProps}
        >
          {Platform.OS === 'ios' ? (
            children
          ) : (
            <Container
              collapse={!!collapsingBar}
              {...otherProps}
              {...(collapsingBar && collapsingBar.props)}
            >
              {collapsingBar && collapsingBar.props.children}
              <NVToolbar
                logo={Image.resolveAssetSource(logo)}
                navigationImage={Image.resolveAssetSource(navigationImage)}
                overflowImage={Image.resolveAssetSource(overflowImage)}
                pin={!!collapsingBar}
                {...otherProps}
                barTintColor={!collapsingBar ? otherProps.barTintColor : null}
                style={{ height: 56 }}
              >
                {[
                  childrenArray.find(({ type }) => type === TitleBar),
                  childrenArray.find(({ type }) => type === LeftBar),
                  childrenArray.find(({ type }) => type === RightBar)
                ]}
              </NVToolbar>
              {childrenArray.find(({ type }) => type === TabBar)}
            </Container>
          )}
        </NVNavigationBar>
        {Platform.OS === 'ios'
          ? null
          : childrenArray.find(({ type }) => type === SearchBar)}
      </>
    )
  }
}

const Container: any = ({ collapse, children, ...props }: any) =>
  !collapse ? children : <CollapsingBar {...props}>{children}</CollapsingBar>

const NVNavigationBar = requireNativeComponent<any>('NVNavigationBar')
const NVToolbar = requireNativeComponent<any>('NVToolbar')

export default Animated.createAnimatedComponent(NavigationBar)
