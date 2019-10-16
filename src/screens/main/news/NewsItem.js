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
    marginTop: 20,
    shadowRadius: 5,
    shadowOpacity: 0.15
  },
  // фото
  simage: {
    width: w - 40,
    height: 162
  },
  // дата
  datestyle: {
    fontSize: 12,
    lineHeight: 34,
    color: '#71859E',
    paddingLeft: 16
  },
  // заголовок
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  }
})



const NewsItem = ({ data }) => {
  const { container, simage, datestyle, titlestyle } = styles
  const { dte, title, image } = data.item
  // console.log(data)
  return (
    <View style={container}>
      <Image source={{ uri: image }} style={simage} resizeMode="cover" />
      <Text style={datestyle}>{dte}</Text>
      <Text style={titlestyle}>{title}</Text>
    </View>
  )
}

export { NewsItem }
