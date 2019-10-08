import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import images from 'res/images'
import { w } from '../../../../constants'
// import OpenNews from './OpenNews'

const styles = StyleSheet.create({
  container: {
    width: w - 40,
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 20,
    shadowRadius: 5,
    shadowOpacity: 0.1
  },
  simage: {
    width: w - 40,
    height: 162,
  },
  datestyle: {
    fontSize: 12,
    lineHeight: 34,
    color: '#71859E',
    paddingLeft: 16
  },
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10
  },
  shortstyle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  }
})


const ProjectItem = ({ data }) => {
  const { container, simage, datestyle, titlestyle, shortstyle } = styles
  const { dte, title, image, short } = data.item
  return (
    <View style={container}>
      <Image source={{ uri: image }} style={simage} resizeMode="cover" />
      <Text style={titlestyle}>{title}</Text>
      <Text style={datestyle}>{dte}</Text>
      <Text style={shortstyle}>{short}</Text>
    </View>
  )
}

export { ProjectItem }
