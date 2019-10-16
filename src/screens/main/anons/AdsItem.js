import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
// импорт картинок
import images from 'res/images'
// добавляем ширину экрана
import { w } from '../../../../constants'

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

  // если тип объявления важный то красная иконка
  let image = images.adred
  // если тип объявления не особо важный - синяя
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
