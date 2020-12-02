import { MutableRefObject, RefObject } from 'react'
import { NativeModules, findNodeHandle } from 'react-native'
import { EdgeInsets } from '../typings/EdgeInsets'

const RNREdgeInsetsHelper = NativeModules.RNREdgeInsetsHelper

interface EdgeInsetsHelperObject {
  getSafeAreaInsetsForRootView(): Promise<EdgeInsets>
  getLayoutMarginsForRootView(): Promise<EdgeInsets>
  getSafeAreaInsetsForView(
    view: MutableRefObject<any> | RefObject<any>
  ): Promise<EdgeInsets>
  getLayoutMarginsForView(
    view: MutableRefObject<any> | RefObject<any>
  ): Promise<EdgeInsets>
}

const EdgeInsetsHelper: EdgeInsetsHelperObject = {
  ...RNREdgeInsetsHelper,
  getSafeAreaInsetsForView: (view: MutableRefObject<any> | RefObject<any>) => {
    return new Promise((resolve, reject) => {
      if (view.current) {
        const nodeHandle = findNodeHandle(view.current)
        if (nodeHandle) {
          // Use timeout so that useEffect/useLayoutEffect do not call it before the view is ready
          setTimeout(() => {
            RNREdgeInsetsHelper.getSafeAreaInsetsForView(nodeHandle)
              .then(resolve)
              .catch(reject)
          }, 0)
        } else {
          reject()
        }
      } else {
        reject()
      }
    })
  },
  getLayoutMarginsForView: (view: MutableRefObject<any> | RefObject<any>) => {
    return new Promise((resolve, reject) => {
      if (view.current) {
        const nodeHandle = findNodeHandle(view.current)
        if (nodeHandle) {
          // Use timeout so that useEffect/useLayoutEffect do not call it before the view is ready
          setTimeout(() => {
            RNREdgeInsetsHelper.getLayoutMarginsForView(nodeHandle)
              .then(resolve)
              .catch(reject)
          }, 0)
        } else {
          reject()
        }
      } else {
        reject()
      }
    })
  }
}

export const getSafeAreaInsetsForRootView: EdgeInsetsHelperObject['getSafeAreaInsetsForRootView'] =
  EdgeInsetsHelper.getSafeAreaInsetsForRootView

export const getLayoutMarginsForRootView: EdgeInsetsHelperObject['getLayoutMarginsForRootView'] =
  EdgeInsetsHelper.getLayoutMarginsForRootView

export const getSafeAreaInsetsForView: EdgeInsetsHelperObject['getSafeAreaInsetsForView'] =
  EdgeInsetsHelper.getSafeAreaInsetsForView

export const getLayoutMarginsForView: EdgeInsetsHelperObject['getLayoutMarginsForView'] =
  EdgeInsetsHelper.getLayoutMarginsForView
