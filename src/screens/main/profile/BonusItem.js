import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
// импорт картинок
import images from 'res/images'
// добавляем ширину экрана
import { w } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    width: w - 40,
    marginLeft: 20,
    marginTop: 20
  },
  // фото
  simage: {
    position: 'absolute',
    width: 21,
    height: 21,
    left: 0,
    top: 0
  },
  // дата
  datestyle: {
    fontSize: 12,
    lineHeight: 34,
    color: '#71859E',
    paddingLeft: 34
  },
  // заголовок
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 34,
    paddingRight: 16,
    paddingBottom: 0
  },
  // текст баллов
  coinsstyle: {
    position: 'absolute',
    height: 21,
    right: 0,
    top: 0,
    color: '#5393CD',
    fontSize: 22,
    lineHeight: 22
  }
})



const BonusItem = ({ data }) => {
  const { container, simage, datestyle, titlestyle, coinsstyle } = styles
  const { created_at, title, coins } = data.item
  // console.log(data)
  return (
    <View style={container}>
      <Image source={images.comment_icon} style={simage} resizeMode="cover" />
      <Text style={titlestyle}>{title}</Text>
      <Text style={datestyle}>{created_at}</Text>
      <Text style={coinsstyle}>+{coins}</Text>
    </View>
  )
}

export { BonusItem }
