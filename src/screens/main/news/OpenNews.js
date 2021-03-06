import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, Animated, ListView, TouchableOpacity, View, AsyncStorage, Share } from 'react-native'
import { OtherNewsItem } from './OtherNewsItem'
import HTMLView from 'react-native-htmlview'
import axios from 'axios'
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'

// ссылка для получения данных
const url = 'https://mygsr.ru/get_news_by_id?id='
// const favurl = 'https://mygsr.ru/is_favorite_ios'
// const otherurl = 'https://mygsr.ru/get_other_news?category=12&id='

const styles = StyleSheet.create({
  container: {
    width: w,
    height: h - 64,
    backgroundColor: 'white'
  },
  // скрытый контейнер
  containerhidden: {
    display: 'none'
  },
  // блок с прокруткой
  scrollcontainer: {
    width: w,
    height: h - 104
  },
  // фото
  simage: {
    position: 'absolute',
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
  // заголовок
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    paddingTop: 10
  },
  // текст категории
  categorystyle: {
    fontSize: 12,
    lineHeight: 14,
    color: '#71859E',
    paddingLeft: 16,
    paddingTop: 10
  },
  // текст
  textstyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    opacity: 0.3
  },
  // блок с иконками
  iconsblock: {
    position: 'absolute',
    top: 190,
    right: 10,
    flexDirection: 'row'
  },
  // иконка
  iconbtn: {
    width: 44,
    height: 44,
    marginLeft: -8
  },
  // количество лайков
  liketext: {
    fontSize: 14,
    lineHeight: 44,
    color: '#5494CE',
    marginLeft: -6,
    paddingRight: 6
  },
  // кнпока комментариев
  commentbtn: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: w,
    height: 50,
    backgroundColor: '#f2f7fb',
    flexDirection: 'row'
  },
  // иконка кнопки комментарев
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
  },
  // блок с другими новостями
  othernews:{
    paddingBottom: 80
  },
  // загловок блока с другими новостями
  othernewstitle:{
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 30,
    fontSize: 18,
    color: '#5C6979'
  }
})
const htmlstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    color: '#5C6979',
    fontSize: 14
  }
})


const { container, containerhidden, scrollcontainer, datestyle, simage, titlestyle, textstyle, categorystyle, iconsblock, iconbtn, liketext, commentbtn, commentbtnimg, commentbtntext, commentcounttext, othernews, othernewstitle } = styles


class OpenNews extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [], other: [], itemId: 0, part: 0, userdata: [], isfav: 0, likeed: 0, likestat: 0, likes: 0, dislikes: 0, commentscount: 0, category: 0, imageheight: 187, imagetop: 0, isLoading: true }
  }



  // обрабатываем кнопка шаринга
  share = async () => {
    const par = this
    try {
      const result = await Share.share({
        message: par.state.data.title
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }



  componentDidMount = async () => {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null
    const part = params ? params.part : null
    const category = params ? params.category : null

    this.setState({ itemId: itemId, part: part, category: category })


    AsyncStorage.getItem("userdata").then((value) => {
      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })
      }else{

      }
      // определяем в избранном или нет
      const favurl = `https://mygsr.ru/is_favorite_ios?part=${part}&partid=${itemId}&userid=${this.state.userdata.id}&token=${this.state.userdata.token}`
      // лайкнул новость или нет
      const likeurl = `https://mygsr.ru/is_news_liked?id=${itemId}&userid=${this.state.userdata.id}&token=${this.state.userdata.token}`
      // ссылка для получения количества комментариев
      const commentsurl = `https://mygsr.ru/get_comments_count?part=${part}&partid=${itemId}`

      axios.all([axios.get(url + itemId),
                axios.get(favurl),
                axios.get(likeurl),
                axios.get(commentsurl)
               ])
           .then(axios.spread((firstResponse, secondResponse, thirdResponse, fourthResponse) => {
             this.setState({
               data: firstResponse.data,
               isfav: secondResponse.data.count,
               likeed: thirdResponse.data.count,
               likestat: thirdResponse.data.stat,
               likes: firstResponse.data.likes,
               dislikes: firstResponse.data.dislikes,
               commentscount: fourthResponse.data.count,
               isLoading: false
             })
             this.loadOtherNews(itemId, firstResponse.data.category)
           }))
           .catch(error => console.log("Api call error"))

    })
    .then(res => {
    })
  }

  loadOtherNews(itemId, category){
    // получаем другие новости из категории теуущей новости
    const otherurl = `https://mygsr.ru/get_other_news?id=${itemId}&category=${category}`

    axios.all([axios.get(otherurl)])
         .then(axios.spread((otherResponse) => {
           this.setState({
             other: otherResponse.data
           })
           // console.log(otherResponse.data)
         }))
         .catch(error => console.log("Api call error"))
  }

  addRemoveFavourite() {
    const { isfav } = this.state
    const par = this
    // получаем данные для добавления и удаления из избранного
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

        // добавляем в избранное
        var favapiurl = 'https://mygsr.ru/addfavorite'
        // если уже в избранно удаляем из избранного
        if (isfav > 0){
          favapiurl = 'https://mygsr.ru/removefavorite'
        }

        console.log(this.state.part)

        var data = {
          part: this.state.part,
          partid: this.state.itemId,
          userid: this.state.userdata.id,
          token: this.state.userdata.token
        }
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
          // console.log(isfav)
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
        this.props.navigation.navigate('Auth')
      }

    })
    .then(res => {
    });
  }


  likeDislike(val) {
    const { likeed, likestat, isfav, likes, dislikes } = this.state
    const par = this

    // получаем данные для лакйа и дизлайка
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

        // ставим лайк новости
        var likeurl = 'https://mygsr.ru/addnewslike'
        // если уже стоит лайк удаляем его
        if (likeed != 0 && likestat == 1 && val == 1){
          likeurl = 'https://mygsr.ru/removenewslike'
        }else if (likeed != 0 && likestat != 1 && val == 0){
          likeurl = 'https://mygsr.ru/removenewslike'
        }


        var data = {
          id: this.state.itemId,
          stat: val,
          userid: this.state.userdata.id,
          token: this.state.userdata.token
        }
        var formBody = []
        for (var property in data) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(data[property])
          formBody.push(encodedKey + "=" + encodedValue)
        }
        formBody = formBody.join("&")
        axios({
          method: 'POST',
          url: likeurl,
          headers: {'Authorization': 'Bearer token', 'Content-Type': 'application/x-www-form-urlencoded'},
          data: formBody
        })
        .then(function (response) {
          // если небыло лайка и нажали на лайк
          if (likeurl == 'https://mygsr.ru/addnewslike' && val == 1){
            // если уже был поставлен дизлайк то убирайем дизайлк и добавляем лайк иначе просто добавляем лайк
            if (likeed == 1 && likestat == 0){
              par.setState({ likeed: 1 , likestat: 1, dislikes: dislikes - 1, likes: likes + 1 })
            }else{
              par.setState({ likeed: 1 , likestat: 1, likes: likes + 1 })
            }
            // если небыло лайка и нажали на дизлайк
          } else if (likeurl == 'https://mygsr.ru/addnewslike' && val == 0){
            // если был лайк то удаляем лайк и добавляем дизлайк иначе просто добавляем дизлайк
            if (likeed == 1 && likestat == 1){
              par.setState({ likeed: 1 , likestat: 0, dislikes: dislikes + 1, likes: likes - 1 })
            }else{
              par.setState({ likeed: 1 , likestat: 0, dislikes: dislikes + 1 })
            }
            // если был лайк
          } else if (likeurl == 'https://mygsr.ru/removenewslike'){
            // если нажали на лайк то убираем лайк, если нажали на дизалйк убираем дизлайк
            if (val == 1){
              par.setState({ likeed: 0 , likestat: 1, likes: likes - 1 })
            }else{
              par.setState({ likeed: 0 , likestat: 0, dislikes: dislikes - 1 })
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      }else{
        // если не авторизован открываем окно авторизации
        this.props.navigation.navigate('Auth')
      }

    })
    .then(res => {
    });
  }

  // увеличиваем фото при прокрутке
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
    const { data, other, isfav, likeed, likestat, likes, dislikes, commentscount, part, itemId, imageheight, imagetop, isLoading } = this.state


    return (
      <View style={isLoading ? containerhidden : container}>
        <Image source={{ uri: data.image }} style={[simage, {height: imageheight, top: imagetop}]}  resizeMode="cover" />
        <ScrollView style={scrollcontainer} onScroll={this.onScroll.bind(this)} scrollEventThrottle={ 1 }>
          <View style={{width: w, height: 187}}></View>
          <Text style={datestyle}>{data.dte}</Text>
          <Text style={titlestyle}>{data.title}</Text>
          <Text style={categorystyle}>{data.category_title}</Text>
          <View style={iconsblock}>
            <TouchableOpacity onPress={() => this.share} activeOpacity={0.8}>
              <Image style={iconbtn} source={images.share} backgroundSize="cover" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.addRemoveFavourite()} activeOpacity={0.8}>
              <Image style={iconbtn} source={isfav==0 ? images.favourite : images.favourite_active} backgroundSize="cover" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.likeDislike(1)} activeOpacity={0.8}>
              <Image style={iconbtn} source={likeed != 0 ? (likestat == 1 ? images.active_news_like : images.news_like) : images.news_like} backgroundSize="cover" />
              <Text style={liketext}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.likeDislike(0)} activeOpacity={0.8}>
              <Image style={iconbtn} source={likeed != 0 ? (likestat == 1 ? images.news_dislike : images.active_news_dislike) : images.news_dislike} backgroundSize="cover" />
              <Text style={liketext}>{dislikes}</Text>
            </TouchableOpacity>
          </View>

          <HTMLView value={'<section>'+data.info+"</section>"} stylesheet={htmlstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />

          <View style={othernews}>
            <Text style={othernewstitle}>Читайте так же</Text>
            { other.map((item, key)=>(
              <TouchableOpacity onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'OpenCountryNewsScreen',
                  params: {itemId: item.id},
                  key: 'APage' + (Math.random () * 10000)
                })
              } activeOpacity={0.8}>
                <OtherNewsItem data={item} key={item.id} />
              </TouchableOpacity>)
            )}
          </View>
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
export { OpenNews }
