/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import * as React from 'react'
import { Platform } from 'react-native'
type PopSyncProps<T> = {
  data: T[]
  getKey: any
  children: (
    items: { key: string; data: T }[],
    popNative: (key: string) => void
  ) => React.ReactElement<any>[]
}

class PopSync<T> extends React.Component<PopSyncProps<T>, any> {
  constructor(props: any) {
    super(props)
    this.state = { items: [], data: null }
    this.popNative = this.popNative.bind(this)
  }
  static getDerivedStateFromProps(
    props: any,
    { items: prevItems, data: prevData }: any
  ) {
    const { data, getKey } = props
    if (data === prevData) return null
    const dataByKey = data.reduce(
      (acc: any, item: any, index: any) => ({
        ...acc,
        [getKey(item)]: { ...item, index }
      }),
      {}
    )
    const itemsByKey = prevItems.reduce(
      (acc: any, item: any) => ({ ...acc, [item.key]: item }),
      {}
    )
    const items = prevItems
      .map((item: any) => {
        const matchedItem = dataByKey[item.key]
        const nextItem: any = {
          key: item.key,
          data: matchedItem || item.data,
          reactPop: !matchedItem
        }
        nextItem.index = !matchedItem ? item.index : matchedItem.index
        return nextItem
      })
      .concat(
        data
          .filter((item: any) => !itemsByKey[getKey(item)])
          .map((item: any) => {
            const index = dataByKey[getKey(item)].index
            return { key: getKey(item), data: item, index, reactPop: false }
          })
      )
      .sort((a: any, b: any) =>
        a.index !== b.index ? a.index - b.index : a.key.length - b.key.length
      )
    return { items, data }
  }
  popNative(key: string) {
    this.setState(({ items: prevItems }: any) => {
      const poppedItem = prevItems.filter((item: any) => item.key === key)[0]
      if (Platform.OS === 'android' && !poppedItem.reactPop) return null
      const items = prevItems.filter((item: any) => item.key !== key)
      return { items }
    })
  }
  render() {
    return this.props.children(this.state.items, this.popNative)
  }
}

export default PopSync
