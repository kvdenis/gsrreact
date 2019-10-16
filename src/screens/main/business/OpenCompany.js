import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Image, Text, Animated, TouchableOpacity, AsyncStorage } from 'react-native'
import HTMLView from 'react-native-htmlview'
import axios from 'axios'
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'

// ссылка для получения данных
const url = 'https://mygsr.ru/get_companies_by_id?id='

const styles = StyleSheet.create({
  container: {
    width: w,
    height: h - 64,
    backgroundColor: 'white'
  },
  containerhidden: {
    display: 'none'
  },
  // блок со скроллом
  scrollcontainer: {
    position: 'absolute',
    width: w,
    height: h - 104
  },
  // фото компании
  simage: {
    width: w,
    height: 187
  },
  // дата
  datestyle: {
    fontSize: 12,
    lineHeight: 14,
    color: '#71859E',
    paddingLeft: 16,
    paddingTop: 20
  },
  // название
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 20,
    width: w - 60
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
  // блок с иконками избранного
  iconsblock: {
    position: 'absolute',
    top: 190,
    right: 10,
    flexDirection: 'row'
  },
  // иконка избранного
  iconbtn: {
    width: 44,
    height: 44,
    marginLeft: -8
  },
})

// html стили для текста
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
// html стили для текста с контактами
const htmlcontactsstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    color: '#5494CE',
    fontSize: 14,
    paddingBottom: 20
  }
})


const { scrollcontainer, container, containerhidden, datestyle, simage, titlestyle, textstyle, iconsblock, iconbtn } = styles

class OpenCompany extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [], imageheight: 187, userdata: [], itemId: 0, part: "7", imagetop: 0, isLoading: true, isfav: 0 }
  }

  componentDidMount = async () => {
    const { params } = this.props.navigation.state;
    const part = params ? params.part : null
    const itemId = params ? params.itemId : null;
    this.setState({ itemId: itemId })

      // получаем данные о пользователе
        AsyncStorage.getItem("userdata").then((value) => {
          if (value != null){
            this.setState({
              userdata: JSON.parse(value)
            })

          }else{

          }
          // определяем избранное или нет
          const favurl = `https://mygsr.ru/is_favorite_ios?part=7&partid=${itemId}&userid=${this.state.userdata.id}&token=${this.state.userdata.token}`

          console.log(favurl)

          // загружаем информацию о компании и значение избранного
          axios.all([axios.get(url + itemId),
                    axios.get(favurl)
                   ])
               .then(axios.spread((firstResponse, secondResponse) => {
                 this.setState({
                   data: firstResponse.data,
                   isfav: secondResponse.data.count,
                   isLoading: false
                 })
                 console.log(secondResponse.data)
               }))
               .catch(error => console.log("Api call error"))

        })
        .then(res => {
        })
  }
  addRemoveFavourite() {
    const { isfav } = this.state
    const par = this
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

        // добавление в избранное
        var favapiurl = 'https://mygsr.ru/addfavorite'
        // если уже в избранном удаляем из избранного
        if (isfav > 0){
          favapiurl = 'https://mygsr.ru/removefavorite'
        }

        var data = {
          part: this.state.part,
          partid: this.state.itemId,
          userid: this.state.userdata.id,
          token: this.state.userdata.token
        }

        // отправляем запрос
        var formBody = []
        for (var property in data) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(data[property])
          formBody.push(encodedKey + "=" + encodedValue)
        }
        formBody = formBody.join("&")
        axios({
          method: 'POST',
          url: favapiurl,
          headers: {'Authorization': 'Bearer token', 'Content-Type': 'application/x-www-form-urlencoded'},
          data: formBody
        })
        .then(function (response) {
          if (isfav == 0){
            par.setState({ isfav: 1 })
          } else {
            par.setState({ isfav: 0 })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      }else{

        // если не авторизован выводим окно авторизации
        this.props.navigation.navigate('Auth')
      }

    })
    .then(res => {
    });
  }

  // при скролле масштабируем фото если скролл минусовой
  onScroll(event) {
    if (event.nativeEvent.contentOffset.y < 0){
      this.setState({
        imageheight: 187 - event.nativeEvent.contentOffset.y,
        imagetop: 0
      })
    }else{
      this.setState({
        imageheight: 187,
        imagetop: -event.nativeEvent.contentOffset.y
      })
    }
  }

  render() {
    const { data, isLoading, isfav, imageheight, imagetop } = this.state
    // формируем текст контактов
    var conatcts_str = ''
    if (data.phone != ''){
      conatcts_str += 'Телефон: <a href="callto:' + data.phone + '">' + data.phone + '</a>\n'
    }
    if (data.email != ''){
      conatcts_str += 'E-mail: <a href="mailto:' + data.email + '">' + data.email + '</a>\n'
    }
    if (data.site != ''){
      conatcts_str += 'Сайт: <a href="' + data.site + '">' + data.site + '</a>\n'
    }
    conatcts_str += data.address

    return (
      <View style={isLoading ? containerhidden : container}>
        <Image source={{ uri: data.image }} style={[simage, {height: imageheight, top: imagetop}]}  resizeMode="cover" />
        <ScrollView style={scrollcontainer} onScroll={this.onScroll.bind(this)} scrollEventThrottle={ 1 }>
          <View style={{width: w, height: 187}}></View>
          <Text style={titlestyle}>{data.title}</Text>
          <View style={iconsblock}>
            <TouchableOpacity onPress={() => this.addRemoveFavourite()} activeOpacity={0.8}>
              <Image style={iconbtn} source={isfav==0 ? images.favourite : images.favourite_active} backgroundSize="cover" />
            </TouchableOpacity>
          </View>
          <HTMLView value={'<section>'+conatcts_str+"</section>"} stylesheet={htmlcontactsstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />
          <HTMLView value={'<section>'+data.info+"</section>"} stylesheet={htmlstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />
        </ScrollView>
      </View>
    )
  }
}

export { OpenCompany }
