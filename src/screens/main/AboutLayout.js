import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, Animated } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { w, h } from '../../../constants'
const url = 'https://mygsr.ru/get_about'

const styles = StyleSheet.create({
  container: {
    width: w,
    height: h - 64,
    backgroundColor: 'white'
  }
})

const htmlstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    lineHeight: 22,
    color: '#5494CE',
    paddingBottom: 20,
    paddingTop: 20
  }
})
const htmlcontactsstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 14,
    lineHeight: 20,
    color: '#5C6979',
    paddingBottom: 20
  }
})

const { container } = styles

class AboutLayout extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  componentDidMount = async () => {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;

    try {
      const response = await fetch(url)
      const data = await response.json()
      this.setState({ data })
    } catch (e) {
      throw e
    }
  }

  render() {
    const { data } = this.state
    const { params } = this.props.navigation.state;
    const link = params ? params.link : null;
    return (
      <ScrollView style={container}>
        <HTMLView value={'<section>'+data.contacts+"</section>"} stylesheet={htmlstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />
        <HTMLView value={'<section>'+data.info+"</section>"} stylesheet={htmlcontactsstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />
      </ScrollView>
    )
  }
}

export { AboutLayout }
