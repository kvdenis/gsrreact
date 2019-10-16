import React, { Component } from 'react'
import { StyleSheet, WebView } from 'react-native'
// добавляем ширину и высоту экрана
import { w, h } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    width: w,
    height: h - 64,
    backgroundColor: 'white'
  }
})


const { container } = styles

class WebViewLayout extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
  }


  render() {
    const { params } = this.props.navigation.state;
    const link = params ? params.link : null;
    return (
      <WebView style={container} source={{uri: link}} />
    )
  }
}

export { WebViewLayout }
