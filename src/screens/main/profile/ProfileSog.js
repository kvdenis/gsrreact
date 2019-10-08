import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { w, h } from '../../../../constants'
const url = 'https://mygsr.ru/get_app_user_sog'

const styles = StyleSheet.create({
  container: {
    width: w,
    marginTop: 30,
    height: h - 30,
    backgroundColor: 'white'
  },
  closebtn: {
    position: "absolute",
    height: 50,
    width: w,
    backgroundColor: "#f2f7fb",
    bottom: 0,
  },
  closebtntext: {
    fontSize: 17,
    lineHeight: 50,
    textAlign: 'center',
    color: '#07296F',
  }
})

const htmlstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
    fontSize: 14,
    lineHeight: 20,
    color: '#5C6979',
    paddingBottom: 20,
  }
})

const { container, closebtn, closebtntext } = styles

class ProfileSog extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  async componentDidMount(){
    const { params } = this.props.navigation.state;

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
    const link = params ? params.link : null
    return (
      <View style={container}>
        <ScrollView style={container}>
          <HTMLView value={`<section>`+data.info+`</section>`} stylesheet={htmlstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />

        </ScrollView>
        <TouchableOpacity style={closebtn} onPress={() => this.props.navigation.goBack(null)} activeOpacity={0.8}>
          <Text style={closebtntext}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export { ProfileSog }
