import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Text, Animated, AsyncStorage } from 'react-native'
import HTMLView from 'react-native-htmlview'
import axios from 'axios'
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'
// получить данные голосвания по ID
const url = 'https://mygsr.ru/get_voice_by_id?id='

const styles = StyleSheet.create({
  container: {
    width: w,
    height: h - 64,
    backgroundColor: 'white'
  },
  // скрытый блок
  containerhidden: {
    display: 'none'
  },
  // дата
  datestyle: {
    fontSize: 12,
    lineHeight: 14,
    color: '#71859E',
    paddingLeft: 16,
    paddingTop: 20
  },
  // заголовок
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16
  },
  // инициатор
  initial: {
    fontSize: 12,
    lineHeight: 14,
    color: '#71859E',
    paddingLeft: 16,
    paddingBottom: 16
  },
  // текст
  textstyle: {
    fontSize: 14,
    lineHeight: 18,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    opacity: 0.3
  },
  // ответ
  answer: {
    marginBottom: 10
  },
  // текст ответа
  answertext: {
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    lineHeight: 18,
    color: '#5494CE'
  },
  // прогрессбар ответа
  answerprogress: {
    width: w - 72,
    left: 16,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DFE2E6',
    marginTop: 5
  },
  // цвет прогресс бара
  answerprogressimg:{
    height: 6,
    borderRadius: 3
  },
  // надпись о том сколько ответов можно выбрать
  answerstype: {
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    marginBottom: 10
  },
  // ответ для выбора
  filteritem: {
    paddingLeft: 16,
    paddingTop: 10,
    flexDirection: 'row'
  },
  // чекбокса ответа
  filterchb: {
    width: 17,
    height: 17,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#07296F'
  },
  // текст ответа
  filtertitle: {
    fontSize: 16,
    color: '#07296F'
  },
  // чекбокс поставлен
  filterchbselect: {
    width: 17,
    height: 17,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#07296F',
    backgroundColor: '#07296F'
  },
  // отпарвить ответ
  sendbutton: {
    marginTop: 20,
    marginLeft: 16,
    width: w - 32,
    height: 48,
    borderRadius: 20,
    marginBottom: 70
  },
  // фон кнопки отправки отвтеа
  sendbuttonimg: {
    position: 'absolute',
    width: w - 32,
    height: 48,
    borderRadius: 24
  },
  // текст кнопки
  sendbuttontext: {
    fontSize: 17,
    color: 'white',
    lineHeight: 48,
    textAlign: 'center'
  },
  // кнопка комментариев
  commentbtn: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: w,
    height: 50,
    backgroundColor: '#f2f7fb',
    flexDirection: 'row'
  },
  // иконка кнопки
  commentbtnimg: {
    width: 40,
    height: 40,
    marginTop: 5,
    marginLeft: 10
  },
  // текст кнопки
  commentbtntext: {
    fontSize: 17,
    color: '#07296F',
    lineHeight: 46
  },
  // количество комментариев
  commentcounttext: {
    fontSize: 17,
    color: '#71859E',
    lineHeight: 46,
    marginLeft: 5
  }
})

// html стили текста
const htmlstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    color: '#5C6979',
    fontSize: 14,
    paddingBottom: 20
  }
})
// type Props = {
//     navigator: Object
// };

const { container, containerhidden, datestyle, titlestyle, textstyle, initial, answer, answerprogress, answertext, answerprogressimg, answerstype, filteritem, filterchb, filtertitle, filterchbselect, sendbutton, sendbuttontext, sendbuttonimg, commentbtn, commentbtnimg, commentbtntext, commentcounttext } = styles

class OpenVoice extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [], answers: [], ids: [], itemId: 0, part: 0, commentscount: 0, isLoading: true }
  }

  componentDidMount = async () => {
    const { params } = this.props.navigation.state
    const itemId = params ? params.itemId : null
    const part = 5


    this.setState({ itemId: itemId, part: part })


    // получаем данные пользователя
    AsyncStorage.getItem("userdata").then((value) => {
      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

      }else{

      }
      // получить данные голосвания по ID
      const url = `https://mygsr.ru/get_voice_by_id?id=${itemId}`
      // получить количество комментариев в голосовании
      const commentsurl = `https://mygsr.ru/get_comments_count?part=${part}&partid=${itemId}`

      axios.all([axios.get(url),
                axios.get(commentsurl)
               ])
           .then(axios.spread((firstResponse, seconddResponse) => {
             this.setState({
               data: firstResponse.data,
               commentscount: seconddResponse.data.count,
               answers: firstResponse.data.answers,
               isLoading: false
             })
             firstResponse.data.answers.map((item, key) => {
               ids[key] = false
             })
           }))
           .catch(error => console.log("Api call error"))

    })
    .then(res => {
    })

  }


  // обрабатывам нажатие на ответ
  clickChb(id) {
    console.log(id)
    var ids = this.state.ids

    // если у опроса можно выбрать несколько овтетов ставим всем активность иначе убираем у всех и ставим одному пункту
    if (this.state.data.multi == 1) {
      ids[id] = !ids[id]
    }else{
      ids.map((catitem, key) => {
        ids[key] = false
      })
      ids[id] = true
    }



    this.setState({
      ids: ids
    })
  }

  render() {
    const { data, answers, ids, commentscount, part, itemId, isLoading } = this.state
    const answersarr = [data.answer1, data.answer2, data.answer3, data.answer4, data.answer5, data.answer6, data.answer7, data.answer8, data.answer9, data.answer10]

    return (
      <View style={isLoading ? containerhidden : container}>
        <ScrollView style={container}>
          <Text style={datestyle}>{data.dte}</Text>
          <Text style={titlestyle}>{data.title}</Text>
          <Text style={initial}>От: <Text style={{color: '#07296F'}}>{data.initial}</Text></Text>
          { answers.map((item, key)=>(
            <View style={answer}>
              <Text style={answertext}>{item.answer}</Text>
              <View style={answerprogress}>
                <Image style={[answerprogressimg, {width: (w-72)*item.percent/100}]} source={images.blue_bg} backgroundSize="stretch" />
              </View>
            </View> )
          )}
          <HTMLView value={'<section>'+data.info+"</section>"} style={{marginTop:5}} stylesheet={htmlstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />

          <Text style={answerstype}>{data.multy = 1 ? 'Выберите один ответ:' : 'Выберите один или несколько ответов:'}</Text>
          {
            answers.map((item, key)=>(
            <TouchableOpacity style={filteritem} onPress={ref => {this.clickChb(key)}} activeOpacity={0.8}>
              <View style={ids[key] ? filterchbselect : filterchb}></View>
              <Text style={filtertitle}>{answersarr[key]}</Text>
            </TouchableOpacity>)
          )}

          <TouchableOpacity style={sendbutton} onPress={() => this.typePage(0)} activeOpacity={0.8}>
            <Image style={sendbuttonimg} source={images.vozd_voice} backgroundSize="stretch" />
            <Text style={sendbuttontext}>Ответить</Text>
          </TouchableOpacity>

        </ScrollView>
        <TouchableOpacity style={commentbtn} activeOpacity={1} onPress={() => this.props.navigation.navigate('NewsCommentsLayoutScreen', {itemId: itemId, part: part})}>
          <Image style={commentbtnimg} source={images.comments_icon} backgroundSize="cover" />
          <Text style={commentbtntext}>Комментарии</Text>
          <Text style={commentcounttext}>({commentscount})</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export { OpenVoice }
