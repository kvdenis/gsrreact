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
  },
  answer: {
    marginTop: 10
  },
  answertext: {
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    lineHeight: 18,
    color: '#5494CE'
  },
  answerprogress: {
    width: w - 72,
    left: 16,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DFE2E6',
    marginTop: 5
  },
  answerprogressimg:{
    height: 6,
    borderRadius: 3
  },
  voicebtn: {
    width: w - 40,
    left: 0,
    height: 40,
    backgroundColor: '#5494CE22',
    marginTop: 20
  },
  voicebtntxt: {
    width: w - 40,
    left: 0,
    height: 40,
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 40,
    color: '#07296F'
  }
})


const VoiceItem = ({ data }) => {
  const { container, titlestyle, shortstyle, answer, linestyle, answertext, answerprogress, answerprogressimg, voicebtn, voicebtntxt } = styles
  const { title, answers } = data.item
  return (
    <View style={container}>
      <Text style={titlestyle}>{title}</Text>
      { answers.map((item, key)=>(
        <View style={answer}>
          <Text numberOfLines={1}  ellipsizeMode='tail' style={answertext}>{item.answer}</Text>
          <View style={answerprogress}>
            <Image style={[answerprogressimg, {width: (w-72)*item.percent/100}]} source={images.blue_bg} backgroundSize="stretch" />
          </View>
        </View> )
      )}
      <View style={voicebtn}>
        <Text style={voicebtntxt}>Голосовать</Text>
      </View>

    </View>
  )
}

export { VoiceItem }
