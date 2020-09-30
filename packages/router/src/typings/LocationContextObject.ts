import { Action, Location } from '@renavigation2/history'
import { Navigator } from './Navigator'

export interface LocationContextObject {
  action?: Action
  location?: Location
  navigator?: Navigator
  static: boolean
}
