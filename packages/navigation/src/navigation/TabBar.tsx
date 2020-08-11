/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import {
  requireNativeComponent,
  Platform,
  StyleSheet,
  View
} from 'react-native'
import BackButton from './BackButton'

class TabBar extends React.Component<any, any> {
  private ref: React.RefObject<View>
  constructor(props: any) {
    super(props)
    this.state = { selectedTab: props.tab || props.defaultTab }
    this.ref = React.createRef<View>()
    this.onTabSelected = this.onTabSelected.bind(this)
  }
  static defaultProps = {
    defaultTab: 0,
    scrollable: false,
    primary: Platform.OS === 'ios',
    scrollsToTop: true
  }
  static getDerivedStateFromProps({ tab }: any, { selectedTab }: any) {
    if (tab != null && tab !== selectedTab) return { selectedTab: tab }
    return null
  }
  onTabSelected({ nativeEvent }: any) {
    const { eventCount: mostRecentEventCount, tab } = nativeEvent
    this.ref.current!.setNativeProps({ mostRecentEventCount })
    this.changeTab(tab)
  }
  changeTab(selectedTab: any) {
    const { tab, onChangeTab } = this.props
    if (this.state.selectedTab !== selectedTab) {
      if (tab == null) this.setState({ selectedTab })
      if (!!onChangeTab) onChangeTab(selectedTab)
      return true
    }
    return false
  }
  render() {
    let {
      children,
      barTintColor,
      selectedTintColor,
      unselectedTintColor,
      bottomTabs,
      scrollable,
      primary,
      swipeable,
      scrollsToTop
    } = this.props
    bottomTabs = bottomTabs != null ? bottomTabs : primary
    primary =
      Platform.OS === 'android' && swipeable != null ? !swipeable : primary
    const tabBarItems = React.Children.toArray(children).filter(
      (child) => !!child
    )
    const titleOnly = !tabBarItems.find(
      ({ props }: any) => props.title && props.image
    )
    let tabViewHeight = !primary ? (titleOnly ? 48 : 72) : 56
    tabViewHeight = Platform.OS === 'android' ? tabViewHeight : 28
    const TabBar = primary ? NVTabBar : NVTabBarPager
    let TabView = primary ? NVTabNavigation : NVTabLayout
    TabView = Platform.OS === 'android' ? TabView : NVSegmentedTab
    const tabLayout = (Platform.OS === 'android' || !primary) && (
      <TabView
        bottomTabs={bottomTabs}
        selectedTintColor={selectedTintColor}
        unselectedTintColor={unselectedTintColor}
        selectedIndicatorAtTop={bottomTabs}
        titles={tabBarItems.map(({ props }: any) => props.title)}
        scrollable={scrollable}
        style={{
          height: tabViewHeight,
          backgroundColor: barTintColor
        }}
      />
    )
    return (
      <>
        {!bottomTabs && tabLayout}
        {!!tabBarItems.length && (
          <TabBar
            ref={this.ref}
            tabCount={tabBarItems.length}
            onTabSelected={this.onTabSelected}
            selectedTab={this.state.selectedTab}
            barTintColor={barTintColor}
            selectedTintColor={selectedTintColor}
            unselectedTintColor={unselectedTintColor}
            scrollsToTop={scrollsToTop}
            style={styles.tabBar}
          >
            <BackButton onPress={() => this.changeTab(0)} />
            {tabBarItems
              .filter((child) => !!child)
              .map((child: any, index) => {
                const selected = index === this.state.selectedTab
                return React.cloneElement(child, {
                  ...child.props,
                  index,
                  selected
                })
              })}
          </TabBar>
        )}
        {bottomTabs && tabLayout}
      </>
    )
  }
}

const NVTabLayout = requireNativeComponent<any>('NVTabLayout')
const NVTabNavigation = requireNativeComponent<any>('NVTabNavigation')
const NVSegmentedTab = requireNativeComponent<any>('NVSegmentedTab')
const NVTabBar = requireNativeComponent<any>('NVTabBar')
const NVTabBarPager = requireNativeComponent<any>('NVTabBarPager')

const styles = StyleSheet.create({
  tabBar: {
    flex: 1
  }
})

export default TabBar
