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
    marginBottom: 30,
    marginTop: 5
  },
  simage: {
    width: w - 40,
    height: 162,
  },
  datestyle: {
    fontSize: 12,
    lineHeight: 20,
    color: '#71859E',
    paddingLeft: 54
  },
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 54,
    paddingRight: 16,
    paddingTop: 0
  },
  adsicon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 42,
    height: 42
  }
})


const AdsItem = ({ data }) => {
  const { container, simage, datestyle, titlestyle, adsicon } = styles
  const { dte, tpe, time, title } = data.item
  let image = images.adred
  if (tpe != "1"){
    image = images.adblue
  }
  return (
    <View style={container}>
      <Image source={image} style={adsicon} resizeMode="stretch" />
      <Text style={titlestyle}>{title}</Text>
      <Text style={datestyle}>{dte} {time}</Text>
    </View>
  )
}

export { AdsItem }
