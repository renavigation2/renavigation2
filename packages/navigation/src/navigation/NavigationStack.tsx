/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React, { ReactNode } from 'react'
import { requireNativeComponent, StyleSheet, View } from 'react-native'
import { Crumb, State } from 'navigation'
import { NavigationContext } from 'navigation-react'
import BackButton from './BackButton'
import PopSync from './PopSync'
import Scene from './Scene'
type NavigationStackProps = {
  stateNavigator: any
  fragmentMode: boolean
  title: (state: State, data: any) => string
  crumbStyle: any
  unmountStyle: any
  hidesTabBar: any
  sharedElements: any
  renderScene: (state: State, data: any) => ReactNode
}
type NavigationStackState = {
  stateNavigator: any
  keys: string[]
  finish: boolean
}

class NavigationStack extends React.Component<
  NavigationStackProps,
  NavigationStackState
> {
  private ref: React.RefObject<View>
  private resumeNavigation?: (() => void) | null
  constructor(props: any) {
    super(props)
    this.state = { stateNavigator: null, keys: [], finish: false }
    this.ref = React.createRef<View>()
    this.handleBack = this.handleBack.bind(this)
    this.onWillNavigateBack = this.onWillNavigateBack.bind(this)
    this.onDidNavigateBack = this.onDidNavigateBack.bind(this)
    this.onNavigateToTop = this.onNavigateToTop.bind(this)
  }
  static defaultProps = {
    fragmentMode: true,
    unmountStyle: () => null,
    crumbStyle: () => null,
    hidesTabBar: () => false,
    sharedElements: () => null
  }
  static getDerivedStateFromProps(
    { stateNavigator }: NavigationStackProps,
    { keys: prevKeys, stateNavigator: prevStateNavigator }: NavigationStackState
  ) {
    if (stateNavigator === prevStateNavigator) return null
    const { state, crumbs, nextCrumb } = stateNavigator.stateContext
    const prevState =
      prevStateNavigator && prevStateNavigator.stateContext.state
    const currentKeys = crumbs.concat(nextCrumb).map((_: any, i: any) => '' + i)
    const newKeys = currentKeys.slice(prevKeys.length)
    const keys = prevKeys.slice(0, currentKeys.length).concat(newKeys)
    if (prevKeys.length === keys.length && prevState !== state)
      keys[keys.length - 1] += '+'
    return { keys, stateNavigator }
  }
  onWillNavigateBack({ nativeEvent }: any) {
    const { stateNavigator } = this.props
    const distance =
      stateNavigator.stateContext.crumbs.length - nativeEvent.crumb
    this.resumeNavigation = null
    if (stateNavigator.canNavigateBack(distance)) {
      const url = stateNavigator.getNavigationBackLink(distance)
      stateNavigator.navigateLink(
        url,
        undefined,
        true,
        (_stateContext: any, resumeNavigation: any) => {
          this.resumeNavigation = resumeNavigation
        }
      )
    }
  }
  onDidNavigateBack({ nativeEvent }: any) {
    const mostRecentEventCount = nativeEvent.eventCount
    this.ref.current!.setNativeProps({ mostRecentEventCount })
    if (this.resumeNavigation) this.resumeNavigation()
  }
  onNavigateToTop() {
    const { stateNavigator } = this.props
    const { crumbs } = stateNavigator.stateContext
    if (crumbs.length > 0) stateNavigator.navigateBack(crumbs.length)
  }
  handleBack() {
    const { fragmentMode } = this.props
    this.setState(() => (!fragmentMode ? { finish: true } : null))
    return !fragmentMode
  }
  getAnimation() {
    const {
      stateNavigator,
      unmountStyle,
      crumbStyle,
      sharedElements: getSharedElements
    } = this.props
    const {
      state,
      data,
      oldState,
      oldData,
      oldUrl,
      crumbs,
      nextCrumb
    } = stateNavigator.stateContext
    if (!oldState) return null
    const { crumbs: oldCrumbs } = stateNavigator.parseLink(oldUrl)
    let enterAnim: any
    let exitAnim: any
    let sharedElements: any
    let oldSharedElements: any

    if (oldCrumbs.length < crumbs.length) {
      const { state: nextState, data: nextData } = crumbs.concat(nextCrumb)[
        oldCrumbs.length + 1
      ]
      enterAnim = unmountStyle(true, state, data, crumbs)
      exitAnim = crumbStyle(
        false,
        oldState,
        oldData,
        oldCrumbs,
        nextState,
        nextData
      )
      sharedElements = getSharedElements(state, data, crumbs)
    }
    if (crumbs.length < oldCrumbs.length) {
      const nextCrumb = new Crumb(
        oldData,
        oldState,
        null as any,
        null as any,
        false
      )
      const { state: nextState, data: nextData } = oldCrumbs.concat(nextCrumb)[
        crumbs.length + 1
      ]
      enterAnim = crumbStyle(true, state, data, crumbs, nextState, nextData)
      exitAnim = unmountStyle(false, oldState, oldData, oldCrumbs)
      oldSharedElements = getSharedElements(oldState, oldData, oldCrumbs)
    }
    if (crumbs.length === oldCrumbs.length) {
      enterAnim = unmountStyle(true, state, data, crumbs)
      exitAnim = unmountStyle(false, oldState, oldData, oldCrumbs, state, data)
    }
    return { enterAnim, exitAnim, sharedElements, oldSharedElements }
  }
  render() {
    const { keys, finish } = this.state
    const {
      stateNavigator,
      fragmentMode,
      unmountStyle,
      crumbStyle,
      hidesTabBar,
      title,
      renderScene
    } = this.props
    const { crumbs, nextCrumb } = stateNavigator.stateContext
    return (
      <NVNavigationStack
        ref={this.ref}
        keys={keys}
        finish={finish}
        fragmentMode={fragmentMode}
        style={[
          styles.stack,
          fragmentMode ? { backgroundColor: '#000' } : null
        ]}
        {...this.getAnimation()}
        onWillNavigateBack={this.onWillNavigateBack}
        onDidNavigateBack={this.onDidNavigateBack}
        onNavigateToTop={this.onNavigateToTop}
      >
        <BackButton onPress={this.handleBack} />
        <PopSync<{ crumb: number }>
          data={crumbs
            .concat(nextCrumb || [])
            .map((_: any, crumb: any) => ({ crumb }))}
          getKey={({ crumb }: any) => keys[crumb]}
        >
          {(scenes, popNative) =>
            scenes.map(({ key, data: { crumb } }: any) => (
              <Scene
                key={key}
                crumb={crumb}
                sceneKey={key}
                unmountStyle={unmountStyle}
                crumbStyle={crumbStyle}
                hidesTabBar={hidesTabBar}
                title={title}
                popped={popNative}
                renderScene={renderScene}
              />
            ))
          }
        </PopSync>
      </NVNavigationStack>
    )
  }
}

const NVNavigationStack = requireNativeComponent<any>('NVNavigationStack')

const styles = StyleSheet.create({
  stack: {
    flex: 1
  }
})

export default (props: any) => (
  <NavigationContext.Consumer>
    {({ stateNavigator }: any) => (
      <NavigationStack stateNavigator={stateNavigator} {...props} />
    )}
  </NavigationContext.Consumer>
)
