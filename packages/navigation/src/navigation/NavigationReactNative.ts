/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import { Platform } from 'react-native'
import NavigationStack from './NavigationStack'
import Scene from './Scene'
import NavigationBar from './NavigationBar'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import BarButton from './BarButton'
import SearchBar from './SearchBar'
import TabBar from './TabBar'
import TabBarItem from './TabBarItem'
import SharedElement from './SharedElement'
import TitleBar from './TitleBar'
import BackHandlerContext from './BackHandlerContext'
import ModalBackHandler from './ModalBackHandler'
import CoordinatorLayout from './CoordinatorLayout'
import CollapsingBar from './CollapsingBar'
import ActionBar from './ActionBar'
import useNavigating from './useNavigating'
import useNavigated from './useNavigated'
import useUnloading from './useUnloading'
import useUnloaded from './useUnloaded'

const NavigationBarIOS: any = Platform.OS === 'ios' ? NavigationBar : () => null
const TitleBarIOS = Platform.OS === 'ios' ? TitleBar : () => null
const RightBarIOS = Platform.OS === 'ios' ? RightBar : () => null
const LeftBarIOS = Platform.OS === 'ios' ? LeftBar : () => null
const BarButtonIOS = Platform.OS === 'ios' ? BarButton : () => null
const SearchBarIOS = Platform.OS === 'ios' ? SearchBar : () => null
const TabBarIOS = Platform.OS === 'ios' ? TabBar : () => null
const TabBarItemIOS = Platform.OS === 'ios' ? TabBarItem : () => null
const SharedElementAndroid =
  Platform.OS === 'android' ? SharedElement : () => null

export {
  NavigationStack,
  Scene,
  NavigationBar,
  LeftBar,
  RightBar,
  BarButton,
  TitleBar,
  NavigationBarIOS,
  LeftBarIOS,
  RightBarIOS,
  BarButtonIOS,
  TitleBarIOS,
  SearchBar,
  SearchBarIOS,
  TabBar,
  TabBarItem,
  TabBarIOS,
  TabBarItemIOS,
  SharedElement,
  SharedElementAndroid,
  BackHandlerContext,
  ModalBackHandler,
  CoordinatorLayout,
  CollapsingBar,
  ActionBar,
  useNavigating,
  useNavigated,
  useUnloading,
  useUnloaded
}
