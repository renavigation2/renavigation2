/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React, { ReactNode } from 'react'
import { requireNativeComponent, Platform, StyleSheet } from 'react-native'
import { StateNavigator, StateContext, State, Crumb } from 'navigation'
import { NavigationContext, NavigationEvent } from 'navigation-react'
import BackButton from './BackButton'
type SceneProps = {
  crumb: number
  sceneKey: string
  renderScene: (state: State, data: any) => ReactNode
  crumbStyle: any
  unmountStyle: any
  hidesTabBar: any
  title: (state: State, data: any) => string
  popped: (key: string) => void
  navigationEvent: NavigationEvent
}
type SceneState = { navigationEvent: NavigationEvent | null }

class Scene extends React.Component<SceneProps, SceneState> {
  constructor(props: any) {
    super(props)
    this.state = { navigationEvent: null }
    this.handleBack = this.handleBack.bind(this)
    this.onBeforeNavigate = this.onBeforeNavigate.bind(this)
  }
  static defaultProps = {
    title: (state: State) => state.title,
    renderScene: (state: State, data: any) => state.renderScene(data)
  }
  componentDidMount() {
    const { stateNavigator } = this.props.navigationEvent
    stateNavigator.onBeforeNavigate(this.onBeforeNavigate)
  }
  static getDerivedStateFromProps(
    props: SceneProps,
    { navigationEvent: prevNavigationEvent }: SceneState
  ) {
    const { crumb, navigationEvent } = props
    const {
      state,
      oldState,
      oldUrl,
      crumbs
    } = navigationEvent.stateNavigator.stateContext
    if (!state || crumbs.length !== crumb) return null
    if (!oldUrl || !prevNavigationEvent) return { navigationEvent }
    const { crumbs: oldCrumbs } = navigationEvent.stateNavigator.parseLink(
      oldUrl
    )
    const replace = oldCrumbs.length === crumb && oldState !== state
    return !replace ? { navigationEvent } : null
  }
  shouldComponentUpdate(_nextProps: any, { navigationEvent }: SceneState) {
    return navigationEvent !== this.state.navigationEvent
  }
  componentWillUnmount() {
    const { stateNavigator } = this.props.navigationEvent
    stateNavigator.offBeforeNavigate(this.onBeforeNavigate)
  }
  handleBack() {
    const { navigationEvent } = this.state
    if (navigationEvent && navigationEvent.stateNavigator.canNavigateBack(1)) {
      navigationEvent.stateNavigator.navigateBack(1)
      return true
    }
    return false
  }
  onBeforeNavigate(_state: any, _data: any, url: string) {
    const { crumb, navigationEvent } = this.props
    if (url.split('crumb=').length - 1 !== crumb || Platform.OS === 'android')
      return true
    const { crumbs, nextCrumb } = navigationEvent.stateNavigator.stateContext
    let changed = !this.state.navigationEvent && crumb < crumbs.length
    if (!changed && crumb < crumbs.length) {
      const { state: latestState, data: latestData } = crumbs[crumb]
      const {
        state,
        data
      } = this.state.navigationEvent!.stateNavigator.stateContext
      changed =
        state !== latestState ||
        Object.keys(data).length !== Object.keys(latestData).length
      for (const key in data) {
        changed = changed || data[key] !== latestData[key]
      }
    }
    if (changed) {
      const { stateNavigator } = navigationEvent
      const peekNavigator = new StateNavigator(
        stateNavigator,
        stateNavigator.historyManager
      )
      peekNavigator.stateContext = Scene.createStateContext(
        crumbs,
        nextCrumb,
        crumb
      )
      peekNavigator.configure = stateNavigator.configure
      peekNavigator.onBeforeNavigate = stateNavigator.onBeforeNavigate
      peekNavigator.offBeforeNavigate = stateNavigator.offBeforeNavigate
      peekNavigator.onNavigate = stateNavigator.onNavigate
      peekNavigator.offNavigate = stateNavigator.offNavigate
      peekNavigator.navigateLink = stateNavigator.navigateLink.bind(
        stateNavigator
      )
      const { oldState, state, data, asyncData } = peekNavigator.stateContext
      this.setState({
        navigationEvent: {
          oldState,
          state,
          data,
          asyncData,
          stateNavigator: peekNavigator,
          nextState: undefined,
          nextData: undefined
        } as any
      })
    }
    return true
  }
  static createStateContext(crumbs: Crumb[], nextCrumb: Crumb, crumb: number) {
    const stateContext = new StateContext()
    const { state: state1, data: data1, url: url1, title } = crumbs[crumb]
    ;(stateContext as any)['peek'] = true
    stateContext.state = state1
    stateContext.data = data1
    stateContext.url = url1
    stateContext.title = title
    stateContext.crumbs = crumbs.slice(0, crumb)
    stateContext.nextCrumb = crumbs[crumb]
    const { state, data, url } = nextCrumb
    stateContext.oldState = state
    stateContext.oldData = data
    stateContext.oldUrl = url
    if (crumb > 1) {
      const { state, data, url } = crumbs[crumb - 1]
      stateContext.previousState = state
      stateContext.previousData = data
      stateContext.previousUrl = url
    }
    return stateContext
  }
  getAnimation() {
    const {
      crumb,
      navigationEvent: { stateNavigator },
      unmountStyle,
      crumbStyle,
      hidesTabBar: hidesTabBar1
    } = this.props
    const { crumbs, nextCrumb } = stateNavigator.stateContext
    const { state, data } = crumbs[crumb] || nextCrumb
    const currentCrumbs = crumbs.slice(0, crumb)
    let enterAnim: any
    if (crumb > 0) {
      const { state: prevState, data: prevData } = crumbs[crumb - 1]
      const prevCrumbs = crumbs.slice(0, crumb - 1)
      enterAnim = crumbStyle(true, prevState, prevData, prevCrumbs, state, data)
    }
    const exitAnim = unmountStyle(false, state, data, currentCrumbs)
    const hidesTabBar = hidesTabBar1(state, data, currentCrumbs)
    return { enterAnim, exitAnim, hidesTabBar }
  }
  render() {
    const { navigationEvent } = this.state
    const {
      crumb,
      title,
      sceneKey,
      popped,
      navigationEvent: { stateNavigator }
    } = this.props
    const { crumbs } = stateNavigator.stateContext
    const { state, data } = navigationEvent
      ? navigationEvent.stateNavigator.stateContext
      : crumbs[crumb]
    return (
      <NVScene
        sceneKey={sceneKey}
        {...this.getAnimation()}
        title={title(state, data)}
        style={styles.scene}
        onPopped={() => popped(sceneKey)}
      >
        <BackButton onPress={this.handleBack} />
        <NavigationContext.Provider value={navigationEvent as any}>
          {navigationEvent && this.props.renderScene(state, data)}
        </NavigationContext.Provider>
      </NVScene>
    )
  }
}

const NVScene = requireNativeComponent<any>('NVScene')

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})

export default (props: any) => (
  <NavigationContext.Consumer>
    {(navigationEvent) => (
      <Scene navigationEvent={navigationEvent} {...props} />
    )}
  </NavigationContext.Consumer>
)
