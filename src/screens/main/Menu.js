import React, { Component } from 'react'
import { Modal, StyleSheet, View, Image, TouchableOpacity, Text, Dimentions, AsyncStorage } from 'react-native'
import { StackNavigator, NavigationEvents } from 'react-navigation'
// импорт картинок
import images from 'res/images'
// импортируем массив с пунктами меню
import menuitems from 'res/menuitems'
// добавляем ширину и высоту экрана
import { w, h } from '../../../constants'

const koef = w / 375
const styles = StyleSheet.create({
  container: {
    width: w
  },
  // первый треугольник в меню
  preloader_t1: {
    position: 'absolute',
    width: 582 / 2,
    height: 288 / 2,
    top: -20,
    right: 0
  },
  // второй трекугольник в меню
  preloader_t2: {
    position: 'absolute',
    width: 394 / 2,
    height: 288 / 2,
    top: -20,
    right: 0
  },
  // логотип
  preloader_logo: {
    position: 'absolute',
    width: w,
    height: 78,
    top: 21
  },
  // спииок иконок с сылками
  menuitemlist: {
    position: 'absolute',
    width: w,
    height: h - 200,
    top: 114 * koef,
    left: 0,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  // иконка с текстом
  menuitem: {
    alignItems: 'center',
    width: w / 3,
    marginBottom: 20 * koef
  },
  // иконка
  menuimage: {
    width: 63 * koef,
    height: 63 * koef
  },
  // текст иконки
  menulabel: {
    paddingLeft: 10 * koef,
    paddingRight: 10 * koef,
    paddingTop: 5 * koef,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#ffffff'
  },
  // фон меню
  menubg: {
    position: 'absolute',
    width: w+10,
    height: h
  },
  // футер с кнопками
  menufooter: {
    position: 'absolute',
    left: 0,
    top: h - 71,
    height: 71,
    width: w
  },
  // фон кнопки выбора города
  menufootercitybg: {
    position: 'absolute',
    height: 71,
    width: w / 2,
    left: 0,
    top: 0
  },
  // кнопка выбора города
  menufootercity: {
    position: 'absolute',
    height: 71,
    width: w / 2,
    left: 0,
    top: 0
  },
  // фон кнопки профиля
  menufooterprofilebg: {
    position: 'absolute',
    height: 71,
    width: w / 2,
    left: 0,
    top: 0
  },
  // кнопка профиля
  menufooterprofile: {
    position: 'absolute',
    height: 71,
    width: w / 2,
    left: w / 2,
    top: 0
  },
  // текст кнопки профиля
  menufootertext: {
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    color: 'white'
  }
})
const { container, preloader_t1, preloader_t2, preloader_logo, menuitemlist, menuimage, menuitem, menulabel, menubg, menufootercitybg, menufootercity, menufooter, menufooterprofile, menufooterprofilebg, menufootertext } = styles

class Menu extends Component {
  constructor(props) {
    super(props)
    // по умолчанию вместо имени стоит надпись Войти и вместо города Все города
    this.state = { data: [], profileData: null, profileName: 'Войти', profileLogin: false, citytitle: 'Все города'}
  }

  componentDidMount() {
    // проверяем наличие авторизации в AsyncStorage и меняем данные если пользовател авторизован
    try {
      this.setState({ profileName: 'Войти' })
      AsyncStorage.getItem('userdata', (err, result) => {
        if (result){
          this.setState({ profileLogin: true })
          this.setState({ profileData: JSON.parse(result) })
          this.setState({ profileName: JSON.parse(result).surname + " " + JSON.parse(result).name[0] + "." })
        }
      })
    } catch (e) {
      throw e
    }
  }


  handlePageChange = () => {
    var par = this
    // провыеряем наличие выбранного города в AsyncStorage и меняем навзание если город был выбран
    try {
      AsyncStorage.getItem('city', (err, result) => {
        if (result){
          if (JSON.parse(result).title == ''){
            par.setState({ citytitle: 'Все города' })
          }else{
            par.setState({ citytitle: JSON.parse(result).title })
          }

        }else{
          par.setState({ citytitle: 'Все города' })
        }
      })
    } catch (e) {
      throw e
    }
  }

  // после возврата со страницы авторизации
  componentWillReceiveProps = (props) => {
    // после успешной авторизации прописываем данные в State
    try {
      AsyncStorage.getItem('userdata', (err, result) => {
        if (result){
          if (result){
            this.setState({ profileLogin: true })
            this.setState({ profileData: JSON.parse(result) })
            this.setState({ profileName: JSON.parse(result).surname + " " + JSON.parse(result).name[0] + "." })
          }
        }else{
          this.setState({ profileName: 'Войти', profileLogin: false })
        }
      })
    } catch (e) {
      throw e
    }
  }

  render() {
    const { data, profileData, profileName, profileLogin, citytitle } = this.state


    return (
      <View style={container}>
        <NavigationEvents
          onWillFocus={payload => this.handlePageChange()}
          onDidBlur={payload => this.handlePageChange()}
        />
        <Image source={images.launchbg} style={menubg} resizeMode="cover" />
        <Image source={images.preloader_t1} style={preloader_t1} resizeMode="contain" />
        <Image source={images.preloader_t2} style={preloader_t2} resizeMode="contain" />
        <Image source={images.preloader_logo} style={preloader_logo} resizeMode="contain" />
        <View style={menuitemlist}>
          { menuitems.map(item => ( // onPress={() => this.props.navigation.navigate('CountryNewsScreen')}
            <TouchableOpacity style={menuitem} onPress={() => {
              this.props.navigation.navigate(item.link)
              this.props.navigation.closeDrawer()
            }} activeOpacity={0.8}>
              <Image source={item.icon} style={menuimage} resizeMode="contain" />
              <Text style={menulabel}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={menufooter}>
          <TouchableOpacity style={menufootercity} onPress={() => {this.props.navigation.navigate('CitySelect')}} activeOpacity={0.8}>
            <Image source={images.city_menu} style={menufootercitybg} resizeMode="stretch" />
            <Text style={menufootertext}>Ваш город:{'\n'}{citytitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menufooterprofile} onPress={() => {
            profileLogin ? this.props.navigation.navigate('ProfileScreen') : this.props.navigation.navigate('Auth')
          }} activeOpacity={0.8}>
            <Image source={images.profile_menu} style={menufooterprofilebg} resizeMode="stretch" />
            <Text style={menufootertext}>Личный кабинет:{'\n'}{profileName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export { Menu }
