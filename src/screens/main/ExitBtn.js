import React, { Component } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
// импорт картинок
import images from 'res/images'

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44
  },
  exitbtn:{
    width: 44,
    height: 44
  }
})

const { container, exitbtn } = styles

class ExitBtn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
  }

  render() {
    const { data } = this.state;
    return (
      <TouchableOpacity style={container}  activeOpacity={0.8} onPress={() => { console.log(this.props) }}>
        <Image source={images.exit} style={exitbtn} resizeMode="cover" />
      </TouchableOpacity>
    )
  }
}

export { ExitBtn }
