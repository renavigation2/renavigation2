/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { BackHandler } from 'react-native'
import BackHandlerContext from './BackHandlerContext'

class BackButton extends React.Component<{
  backHandler: BackHandler
  onPress: () => boolean
}> {
  constructor(props: any) {
    super(props)
    this.handleBack = this.handleBack.bind(this)
  }
  componentDidMount() {
    this.props.backHandler.addEventListener(
      'hardwareBackPress',
      this.handleBack
    )
  }
  componentWillUnmount() {
    this.props.backHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBack
    )
  }
  handleBack() {
    return this.props.onPress()
  }
  render() {
    return null
  }
}

export default (props: any) => (
  <BackHandlerContext.Consumer>
    {(backHandler) => <BackButton {...props} backHandler={backHandler} />}
  </BackHandlerContext.Consumer>
)
