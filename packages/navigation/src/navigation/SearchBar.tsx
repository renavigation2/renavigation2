/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import {
  requireNativeComponent,
  Platform,
  StyleSheet,
  UIManager,
  View
} from 'react-native'

class SearchBar extends React.Component<any, any> {
  private ref: React.RefObject<View>
  constructor(props: any) {
    super(props)
    this.state = { show: false, top: 56 }
    this.ref = React.createRef<View>()
    this.onChangeText = this.onChangeText.bind(this)
  }
  static defaultProps = {
    obscureBackground: true,
    hideNavigationBar: true,
    hideWhenScrolling: false,
    autoCapitalize: 'sentences'
  }
  onChangeText({ nativeEvent }: any) {
    const { onChangeText } = this.props as any
    const { eventCount: mostRecentEventCount, text } = nativeEvent
    this.ref.current!.setNativeProps({ mostRecentEventCount })
    if (onChangeText) onChangeText(text)
  }
  render() {
    const { show, top } = this.state
    let { autoCapitalize, children, ...props } = this.props
    const constants = (UIManager as any).getViewManagerConfig('NVSearchBar')
      .Constants
    autoCapitalize =
      Platform.OS === 'android'
        ? constants.AutoCapitalize[autoCapitalize]
        : autoCapitalize
    const showStyle = Platform.OS == 'android' && {
      top,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 58
    }
    return (
      <NVSearchBar
        {...props}
        ref={this.ref}
        autoCapitalize={autoCapitalize}
        onChangeText={this.onChangeText}
        onExpand={({ nativeEvent: { top } }: any) =>
          this.setState({ show: true, top })
        }
        onCollapse={() => this.setState({ show: false })}
        style={[styles.searchBar, show && showStyle]}
      >
        {Platform.OS === 'ios' || this.state.show ? children : null}
      </NVSearchBar>
    )
  }
}

const NVSearchBar = requireNativeComponent<any>('NVSearchBar')

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    ...Platform.select({
      android: {
        zIndex: -58
      }
    })
  }
})

export default SearchBar
