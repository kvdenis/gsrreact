import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text, Dimentions, TextInput, Alert, AsyncStorage } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { Input, Button } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
// импорт картинок
import images from 'res/images'
import menuitems from 'res/menuitems'
// добавляем ширину и высоту экрана
import { w, h } from '../../../constants'

const koef = w / 375
const styles = StyleSheet.create({
  container: {
    width: w,
    height: h
  },
  loginlogo: {
    width: 217*koef,
    height: 114*koef,
    marginTop: 35,
    left: 72*koef
  },
  authtitle: {
    width: w,
    paddingTop: 35,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 18,
    color: '#71859E',
    marginBottom: 5
  },
  restoretitle: {
    width: w,
    paddingTop: 85,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 18,
    color: '#71859E',
    marginBottom: 5
  },
  inputstyle: {
    color: '#71859E',
    textAlign: 'left',
    paddingLeft: 20,
    fontSize: 13
  },
  inputcontainerstyle:{
    color: '#71859E',
    borderColor: '#71859E',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35
  },
  inputcontainerstyle_err:{
    color: '#71859E',
    borderColor: 'red',
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 20,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35
  },
  loginbtns: {
    width: w - 90,
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    marginTop: 15,
    marginLeft: 45,
    marginRight: 45,
    height: 48,
    flexDirection: 'row'
  },
  loginbtn: {
    width: w - 260,
    height: 48
  },
  loginbtnimage: {
    position: 'absolute',
    width: '100%',
    height: 48,
    borderRadius: 24
  },
  loginbtnimageshadow: {
    position: 'absolute',
    width: w - 280,
    height: 20,
    left: 10,
    top: 48
  },
  loginbtntext: {
    width: "100%",
    lineHeight: 48,
    textAlign: "center",
    fontSize: 17,
    color: "white"
  },
  socloginbtn: {
    width: 50,
    height: 67
  },
  forgetbtntext:{
    fontSize: 17,
    lineHeight: 22,
    color: '#5494CE',
    textAlign: 'center',
    marginTop: 18
  },
  regbtntext:{
    fontSize: 17,
    lineHeight: 22,
    color: '#5494CE',
    textAlign: 'center',
    marginTop: 18
  },
  cancelbtntext: {
    fontSize: 17,
    lineHeight: 22,
    color: '#F0492B',
    textAlign: 'center',
    marginTop: 18
  },
  fingerbtn: {
    width: 60,
    height: 60,
    left: w / 2 - 30,
    marginTop: 18
  },
  listview: {
    width: w,
    height: h - 30,
    flex: 1,
    flexDirection: 'row'
  },
  horisontalpages: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: 2 * w,
    height: h,
    overflow: 'hidden',
  },
  horisontalpage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: w,
    height: h
  },
  secondpage: {
    position: 'absolute',
    left: w,
    top: 0,
    width: w,
    height: h
  },
  restorebtn: {
    width: w - 90,
    height: 48
  },
  restorebtnimage: {
    position: 'absolute',
    width: '100%',
    height: 48,
    borderRadius: 24
  },
  restorebtnimageshadow: {
    position: 'absolute',
    width: w - 110,
    height: 20,
    left: 10,
    top: 48
  },
  restorebtntext: {
    width: "100%",
    lineHeight: 48,
    textAlign: "center",
    fontSize: 17,
    color: "white"
  },
  backtext:{
    fontSize: 17,
    lineHeight: 22,
    color: '#5494CE',
    textAlign: 'center',
    marginTop: 40
  },

})
const { container, loginlogo, authtitle, inputstyle, inputcontainerstyle, loginbtn, loginbtnimage, loginbtns, loginbtnimageshadow, loginbtntext, socloginbtn, forgetbtntext, regbtntext, cancelbtntext, fingerbtn, inputcontainerstyle_err, listview, horisontalpages, horisontalpage, secondpage, restoretitle, restorebtn, restorebtnimage, restorebtnimageshadow, restorebtntext, backtext } = styles

class AuthLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      email: '',
      restoreemail: '',
      password: '',
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isRestoreEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      isEmailFocused: false,
      isRestoreEmailFocused: false,
      isPasswordFocused: false,
      scrollListRef: null,
      isRegPage: true
    }
    this.login = this.login.bind(this)
  }
  async componentDidMount() {
    this.setState({ fontLoaded: true })
  }
  // валидация email
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
  }

  // авторизация
  login = async() => {
    const { email, password } = this.state
    this.setState({ isLoading: true })
    this.setState({
      isLoading: false,
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 3 || this.passwordInput.shake(),
    })
    if (this.validateEmail(email) && password.length >= 3){
      // ссылка для получения данных
      const url = `https://mygsr.ru/userlogin`
      var data = {
       email: email,
       password: password
      }
      var formBody = []
      for (var property in data) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(data[property])
        formBody.push(encodedKey + "=" + encodedValue)
      }
      formBody = formBody.join("&")


      fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer token',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
      }).then((response) => response.json())
          .then((responseData) => {
            if (responseData.error){
              Alert.alert('Ошибка', 'Проверьте правильность введенных данных')
            }else{
              AsyncStorage.setItem('userdata', JSON.stringify(responseData))

              var values = {id: responseData.city, title: responseData.city_name};
              try {
                AsyncStorage.setItem('city', JSON.stringify(values))
              } catch (e) {
              }

              this.props.navigation.navigate('ProfileScreen')

            }
          })
          .done()
    }
  }


  // восстановление пароля
  restore = async() => {
      const { restoreemail } = this.state
      this.setState({ isLoading: true })
      this.setState({
        isLoading: false,
        isRestoreEmailValid: this.validateEmail(restoreemail) || this.restoreEmailInput.shake(),
      })
      if (this.validateEmail(restoreemail)){
        // ссылка для восстанволения пароля. передается email
        const url = `https://mygsr.ru/restore.php?email=`+restoreemail
        var data = {
         email: restoreemail
        }
        var formBody = []
        for (var property in data) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(data[property])
          formBody.push(encodedKey + "=" + encodedValue)
        }
        formBody = formBody.join("&")
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer token',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseData) => {
              if (responseData.error){
                Alert.alert('Ошибка', 'Проверьте правильность введенных данных')
              }else{
                Alert.alert('Восстановление пароля', 'Пароль был выслан вам на почту')
                this.authPage()

              }
            })
            .done()
      }
  }

  // открыть страницу регситрации
  regPage(){
    this.setState({
      isRegPage: true,
    });
    this.state.scrollListRef.scrollTo({x: w, y: 0, animated: true})
  }
  restorePage(){
    this.setState({
      isRegPage: false,
      isRestoreEmailValid: true,
    });
    this.state.scrollListRef.scrollTo({x: w, y: 0, animated: true})
  }
  authPage(){
    this.state.scrollListRef.scrollTo({x: 0, y: 0, animated: true})
  }

  async onFetchLoginRecords() {
    const { email, password } = this.state;
  }

  submitLoginCredentials() {
    const { showLoading } = this.state;

    this.setState({
      showLoading: !showLoading,
    });
  }


  // обработка плейсхолдеров
  onEmailFocus() {
    const { email, password } = this.state
    this.setState({
      isEmailFocused: true
    });
  }
  onEmailBlur() {
    const { email, password } = this.state
    this.setState({
      isEmailFocused: false
    });
  }
  onPasswordFocus() {
    this.setState({
      isPasswordFocused: true
    });
  }
  onPasswordBlur() {
    this.setState({
      isPasswordFocused: false
    });
  }


  onRestoreEmailFocus() {
    this.setState({
      isRestoreEmailFocused: true
    });
  }
  onRestoreEmailBlur() {
    this.setState({
      isRestoreEmailFocused: false
    });
  }


  render() {
    const { data,
      selectedCategory,
      isLoading,
      isRestoreEmailValid,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      restoreemail,
      email,
      password,
      passwordConfirmation,
      isEmailFocused,
      isRestoreEmailFocused,
      isPasswordFocused,
      isRegPage} = this.state

    return (
        <View style={container}>
          <ScrollView pagingEnabled horisontal scrollEnabled={false} alwaysBounceVertical={false} style={listview}  ref={(ref) => { this.state.scrollListRef = ref }}>
            <View style={horisontalpages}>
              <View style={horisontalpage}>
                <Image source={images.login_logo} style={loginlogo} resizeMode="cover" />
                <Text style={authtitle}>Авторизация</Text>

                <Input
                      onChangeText={email => this.setState({ email })}
                      value={email}
                      inputStyle={inputstyle}
                      keyboardAppearance="light"
                      placeholder={isEmailFocused ? "" : "E-mail"}
                      autoFocus={false}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onFocus={() => this.onEmailFocus({ email })}
                      onBlur={() => this.onEmailBlur({ email })}
                      keyboardType="email-address"
                      underlineColorAndroid="transparent"
                      inputContainerStyle={isEmailValid ? inputcontainerstyle : inputcontainerstyle_err}
                      returnKeyType="next"
                      ref={input => (this.emailInput = input)}
                      onSubmitEditing={() => this.passwordInput.focus()}
                      blurOnSubmit={false}
                      placeholderTextColor="#71859E"
                      errorStyle={{ textAlign: 'center', fontSize: 11 }}
                      errorMessage={
                        isEmailValid ? null : 'Пожалуйста введите правильный E-mail'
                      }
                    />
                <Input
                      onChangeText={password => this.setState({ password })}
                      value={password}
                      inputStyle={inputstyle}
                      keyboardAppearance="light"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      autoCorrect={false}
                      secureTextEntry={true}
                      returnKeyType={'done'}
                      blurOnSubmit={true}
                      onFocus={() => this.onPasswordFocus({ password })}
                      onBlur={() => this.onPasswordBlur({ password })}
                      inputContainerStyle={isPasswordValid ? inputcontainerstyle : inputcontainerstyle_err}
                      placeholder={isPasswordFocused ? "" : "Пароль"}
                      placeholderTextColor="#71859E"
                      ref={input => (this.passwordInput = input)}
                      onSubmitEditing={() =>
                          this.login()
                      }
                      errorStyle={{ textAlign: 'center', fontSize: 11 }}
                      errorMessage={
                        isPasswordValid
                          ? null
                          : 'Проль должен быть не короче 3 символов'
                      }
                    />


                <View style={loginbtns}>
                  <TouchableOpacity
                    onPress={() => {
                      this.login();
                    }} activeOpacity={0.8} style={loginbtn}>
                    <Image source={images.blue_bg} style={loginbtnimage} resizeMode="cover" />
                    <Image source={images.button_login_shadow} style={loginbtnimageshadow} resizeMode="stretch" />
                    <Text style={loginbtntext}>Войти</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8}>
                    <Image source={images.vk} style={socloginbtn} resizeMode="cover" />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image source={images.fb} style={socloginbtn} resizeMode="cover" />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image source={images.ok} style={socloginbtn} resizeMode="cover" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.restorePage();
                  }} activeOpacity={0.8}>
                  <Text style={forgetbtntext}>Забыли пароль?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                  }} activeOpacity={0.8}>
                  <Text style={regbtntext}>Регистрация</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack(null);
                  }} activeOpacity={0.8}>
                  <Text style={cancelbtntext}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack(null);
                  }} activeOpacity={0.8}>
                  <Image source={images.finger} style={fingerbtn} resizeMode="cover" />
                </TouchableOpacity>
              </View>

              <View style={isRegPage ? {display: 'none'} : secondpage }>
                <Image source={images.login_logo} style={loginlogo} resizeMode="cover" />
                <Text style={restoretitle}>Восстановление пароля</Text>

                <Input
                      onChangeText={restoreemail => this.setState({ restoreemail })}
                      value={restoreemail}
                      inputStyle={inputstyle}
                      keyboardAppearance="light"
                      placeholder={isRestoreEmailFocused ? "" : "Введите E-mail"}
                      autoFocus={false}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onFocus={() => this.onRestoreEmailFocus({ restoreemail })}
                      onBlur={() => this.onRestoreEmailBlur({ restoreemail })}
                      keyboardType="email-address"
                      underlineColorAndroid="transparent"
                      inputContainerStyle={isRestoreEmailValid ? inputcontainerstyle : inputcontainerstyle_err}
                      returnKeyType="next"
                      ref={input => (this.restoreEmailInput = input)}
                      blurOnSubmit={false}
                      placeholderTextColor="#71859E"
                      errorStyle={{ textAlign: 'center', fontSize: 11 }}
                      errorMessage={
                        isRestoreEmailValid ? null : 'Пожалуйста введите правильный E-mail'
                      }
                    />



                <View style={loginbtns}>
                  <TouchableOpacity
                    onPress={() => {
                      this.restore();
                    }} activeOpacity={0.8} style={restorebtn}>
                    <Image source={images.blue_bg} style={restorebtnimage} resizeMode="cover" />
                    <Image source={images.button_login_shadow} style={restorebtnimageshadow} resizeMode="stretch" />
                    <Text style={restorebtntext}>Продолжить</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.authPage();
                  }} activeOpacity={0.8}>
                  <Text style={backtext}>Назад</Text>
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </View>
    )
  }
}

export { AuthLayout }
