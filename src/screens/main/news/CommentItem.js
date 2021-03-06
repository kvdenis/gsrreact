import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
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
  // аватарка
  avatar: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 15,
    top: 18,
    borderRadius: 20
  },
  // имя
  username: {
    paddingTop: 21,
    paddingLeft: 71,
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F'
  },
  // элемент - комментарий
  commentitem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E0EA'
  },
  commentitemhide: {
    height: 0,
    overflow: 'hidden'
  },
  // текст комментария
  commenttext: {
    fontSize: 14,
    lineHeight: 16,
    color: '#716F81',
    paddingLeft: 71,
    paddingTop: 10
  },
  // нижняя часть комментария с кайками и датой
  commentfooter: {
    width: w,
    paddingLeft: 71,
    paddingTop: 14,
    paddingBottom: 20
  },
  // кнопка лайка
  likebtn: {
    width: 16,
    height: 14,
    flexDirection: 'row'
  },
  // икаонка лайка
  likebtnimage: {
    width: 16,
    height: 14
  },
  // количество лайков
  likebtntext:{
    fontSize: 11,
    lineHeight: 14,
    paddingLeft: 5,
    color: '#9B99A9'
  },
  // правая часть футера комментария с датой
  commentfooterright: {
    position: 'absolute',
    right: 18,
    top: 14,
    fontSize: 11,
    lineHeight: 14,
    color: '#9B99A9',
    flexDirection: 'row'
  },
  // кнопка удалить
  removetext: {
    fontSize: 11,
    lineHeight: 14,
    marginRight: 5,
    color: 'red'
  },
  showblock: {
    opacity: 1
  },
  hideblock: {
    opacity: 1
  }
})
const { avatar, commentitem, commentitemhide, username, commenttext, commentfooter, likebtn, likebtnimage, likebtntext, commentfooterright, removebtn, removetext, showblock, hideblock } = styles

class CommentItem extends Component {
  constructor(props) {
    super(props)
    this.state = { userlike: 0, likecount: 0, userdata: [], isusercomment: false, isHidden: false }
    var par = this
    // получаем данные пользователя из AsyncStorage чтобы проверить его комментарий или нет
    AsyncStorage.getItem("userdata").then((value) => {
      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })
        // если комменатрий его выводим у него кнопку удалить
        if (this.state.userdata.id == this.props.data.item.user.id){
          this.setState({
            isusercomment: true
          })
          console.log(this.state.isusercomment)
        }
      }else{

      }

    })
    .then(res => {
    })
  }

  componentDidMount = async () => {
    this.setState({ userlike: this.props.data.item.userlike, likecount: this.props.data.item.likecount, isHidden: false })
  }

  likePress(){
    // ставим или убираем лайк с комментария
    if (this.state.userlike == 0){
      this.likeLike(1)
    }else{
      this.likeLike(0)
    }
  }

  likeLike(val) {
    const par = this
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

        // добавить комментарий в избранное
        var likeurl = 'https://mygsr.ru/addlike'
        // если уже в избранном удаляем из избранного
        if (val == 0){
          likeurl = 'https://mygsr.ru/removelike'
        }

        var data = {
          id: par.props.data.item.id,
          userid: par.state.userdata.id
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
          if (val == 1){
            par.setState({
              userlike: 1,
              likecount: par.state.likecount * 1 + 1
            })
          }else{
            par.setState({
              userlike: 0,
              likecount: par.state.likecount * 1 - 1
            })
          }

        })
        .catch(function (error) {
          console.log(error);
        })
      }else{
      }

    })
    .then(res => {
    })
  }

  removePress() {
    const par = this
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

        // удалить комментарий
        var url = 'https://mygsr.ru/remove_comment'


        var data = {
          id: par.props.data.item.id,
          token: par.state.userdata.token
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
          url: url,
          headers: {'Authorization': 'Bearer token', 'Content-Type': 'application/x-www-form-urlencoded'},
          data: formBody
        })
        .then(function (response) {
          console.log(response)
          par.setState({
            isHidden: true
          })
        })
        .catch(function (error) {
          console.log(error);
        })
      }else{
      }

    })
    .then(res => {
    })
  }
  render() {
    const { item } = this.props.data
    const { userlike, likecount, isusercomment, isHidden } = this.state
    return (
      <View style={isHidden ? commentitemhide : commentitem}>
        <Image source={{ uri: item.user.image }} style={avatar} contain="cover" />
        <Text style={username}>{item.user.surname} {item.user.name} {item.user.lastname}</Text>
        <Text style={commenttext}>{item.info}</Text>
        <View style={commentfooter}>
          <TouchableOpacity style={likebtn} onPress={() => this.likePress(item.userlike)} activeOpacity={0.8}>
            <Image style={likebtnimage} source={userlike == 0 ? images.like : images.like_active } backgroundSize="cover" />
            <Text style={likebtntext}>{likecount}</Text>
          </TouchableOpacity>
          <View style={commentfooterright}>
            <TouchableOpacity onPress={() => this.removePress()} activeOpacity={0.8}>
              <Text style={removetext}>{isusercomment ? "Удалить" : ""}</Text>
            </TouchableOpacity>
            <Text style={likebtntext}>{item.created_at}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export { CommentItem }
