import React, { Component } from 'react';
import { Keyboard, Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { CommentItem } from './CommentItem'
import axios from 'axios'
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    height: h - 114
  },
  // аватрака в форме
  avatar: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 15,
    top: 18,
    borderRadius: 20
  },
  favatar: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 15,
    top: 10,
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
  // комменатрий
  commentitem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E0EA'
  },
  // текст комментария
  commenttext: {
    fontSize: 14,
    lineHeight: 16,
    color: '#716F81',
    paddingLeft: 71,
    paddingTop: 10
  },
  // футер с формой
  commentfooter: {
    width: w,
    paddingLeft: 71,
    paddingTop: 14,
    paddingBottom: 20
  },
  // кнпока лайка
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
  // правая часть футера
  commentfooterright: {
    position: 'absolute',
    right: 18,
    top: 14,
    fontSize: 11,
    lineHeight: 14,
    color: '#9B99A9'
  },
  // форма добавления комментария
  addform: {
    position: 'absolute',
    left: 0,
    bottom: -50,
    width: w,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    shadowRadius: 10,
    shadowOpacity: 0.1
  },
  // текстовое поле
  inputstyle: {
    color: '#71859E',
    textAlign: 'left',
    fontSize: 13,
    lineHeight: 16,
    minHeight: 0
  },
  inputfield: {
    marginLeft: 70,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 0,
    width: w - 85,
    paddingRight: 80,
    borderColor: '#E1E0EA',
    minHeight: 0
  },
  // кнопка отправки
  sendbtn: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  // текст кнопки отправки
  sendbtntext: {
    fontSize: 14,
    lineHeight: 20,
    color: '#07296F'
  },
  // прелоадер
  indicator: {
    paddingTop: 10
  },
  // кнопка атворизации
  authbtn: {
    position: 'absolute',
    left: 0,
    bottom: -50,
    width: w,
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    shadowRadius: 10,
    shadowOpacity: 0.1,
    backgroundColor: '#f2f7fb'
  },
  // текст кнпоки атворизации
  authbtntext: {
    position: 'absolute',
    width: w,
    height: 50,
    color: '#07296F',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 50
  },
  // скрываем форму
  addformhide: {
    display: 'none'
  },
  // скрываем кнопку авторизации
  authbtnhide: {
    display: 'none'
  }
})



const { container, avatar, username, commentitem, indicator, commenttext, commentfooter, likebtn, likebtnimage, likebtntext, commentfooterright, addform, favatar, flatlist, inputstyle, inputfield, sendbtn, sendbtntext, authbtn, authbtntext, authbtnhide, addformhide } = styles

class NewsCommentsLayout extends Component {
  constructor(props) {
    super(props);
    this.animatedHeight = new Animated.Value(h - 114);
    this.state = { isLoading: true, data: [], page: 0, url: '', isFocused: true, itemId: 0, part: 0, userdata: [], comm: '', isCommFocused: false, inputheight: 20, cheight: h - 114, userlogin: false };
  }

  componentDidMount = async () => {
    const { page } = this.state
    this.makeRequest()
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillChangeFrame', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
  }

  // работа с клаиватурой
  _keyboardDidShow = (e) => {
    Animated.timing(this.animatedHeight, {
      toValue: (h - 114 - e.endCoordinates.height ),
      duration: 350,
      easing: Easing.out(Easing.cubic)
    }).start()

  }
  _keyboardDidHide = (e) => {
    Animated.timing(this.animatedHeight, {
      toValue: (h - 114),
      duration: 350,
      easing: Easing.out(Easing.cubic)
    }).start()
  }


  sendPress(){
    // console.log(this.state.part)
    var par = this

    // получить данные пользователя чтобы отправить комментарий с его данными
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

        // добавить комментарий
        var url = 'https://mygsr.ru/addcomment'


        var data = {
          partid: this.state.itemId,
          part: this.state.part,
          info: this.state.comm,
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
          url: url,
          headers: {'Authorization': 'Bearer token', 'Content-Type': 'application/x-www-form-urlencoded'},
          data: formBody
        })
        .then(function (response) {
          par.setState({ comm: "", page: 0, data: [], isCommFocused: false })
          par.makeRequest()
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

  makeRequest = () => {
    const { page } = this.state;
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null
    const part = params ? params.part : null
    this.setState({ itemId: itemId, part: part })

    // получить данные пользователя и загрузить спиосок коммаентариев
    AsyncStorage.getItem("userdata").then((value) => {
      if (value != null){
        this.setState({
          userdata: JSON.parse(value),
          // если авторизован то отображается кнопка добавления комментария, иначе кнопка атворизации
          userlogin: true
        })
      }else{

      }

      // получить комментарии постранично
      const url = `https://mygsr.ru/get_comments_page_with_error?part=${part}&partid=${itemId}&userid=${this.state.userdata.id}&token=${this.state.userdata.token}&page=${page}`

      axios.get(url)
        .then(res => {
          this.setState({
            isLoading: false,
            data: [...this.state.data, ...res.data]
          })
        }).catch((error)=>{
          this.setState({
            isLoading: false
          })
          console.log("Api call error")
        })

    })
    .then(res => {
    })
  }

  // загружаем другие страницы при прокрутке
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest()
    })
  }

  // рисуем футер с прелоадером
  renderFooter = () => {
    return (
      <View style={styles.headerBg}>
        <ActivityIndicator style={indicator} size="small" color="#07296F"/>
      </View>
    );
  };


  // вывод отдельного комментария
  renderItem(item) {
    return (
      <CommentItem data={item} key={item.id} />
    )
  }

  // работа с плейсхолдером
  onCommFocus() {
    const { comm } = this.state
    this.setState({
      isCommFocused: true
    });
  }
  onCommBlur() {
    const { comm } = this.state
    this.setState({
      isCommFocused: false
    });
  }

  updateInoutSize(input) {
    // console.log(input.size)
    // this.setState({
    //   comm: comm
    // })
  }

  // при возврате на страницу с комментариями
  handlePageChange = () => {
    AsyncStorage.getItem("userdata").then((value) => {
      if (value != null){
        this.setState({
          userdata: JSON.parse(value),
          userlogin: true
        })
      }else{
        userlogin: false
      }
    })
    .then(res => {
    })
  }

  render() {
    const {isLoading, data, isCommFocused, isFocused, userdata, comm, inputheight, cheight, userlogin} = this.state

    return (
      <Animated.View style={{height: this.animatedHeight}}>
        <NavigationEvents
          onWillFocus={payload => this.handlePageChange()}
          onDidBlur={payload => this.handlePageChange()}
        />
        <FlatList
          data={data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id}
          ListFooterComponent={isLoading ? this.renderFooter : null}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
        />
        <View style={userlogin ? addform : addformhide}>
          <Image source={{ uri: userdata.image }} style={favatar} contain="cover" />
          <View style={inputfield}>
            <Input
                onChangeText={comm => this.setState({ comm })}
                value={comm}
                multiline
                inputStyle={[inputstyle, {height: inputheight}]}
                keyboardAppearance="light"
                placeholder={isCommFocused ? "" : "Ваш комментарий"}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => this.onCommFocus({ comm })}
                onBlur={() => this.onCommBlur({ comm })}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                ref={input => this.updateInoutSize(input)}
                blurOnSubmit={false}
                placeholderTextColor="#71859E"
                onContentSizeChange={(event) => {
                  this.setState({ inputheight: event.nativeEvent.contentSize.height + 10 })
                }}
              />
              <TouchableOpacity style={sendbtn} onPress={() => this.sendPress()} activeOpacity={0.8}>
                <Text style={sendbtntext}>Отправить</Text>
              </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={userlogin ? authbtnhide : authbtn} onPress={() => this.props.navigation.navigate('Auth')} activeOpacity={0.8}>
          <Text style={authbtntext}>Авторизация</Text>
        </TouchableOpacity>
      </Animated.View>

    )
  }
}


export { NewsCommentsLayout }
