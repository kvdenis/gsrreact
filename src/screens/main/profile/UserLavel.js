import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import HTMLView from 'react-native-htmlview'
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'
// получить уровень пользователя
const url = 'https://mygsr.ru/get_levels?id='

const styles = StyleSheet.create({
  container: {
    width: w,
    marginTop: 0,
    height: h - 30,
    backgroundColor: 'white'
  },
  // закрыть
  closebtn: {
    position: "absolute",
    height: 50,
    width: w,
    backgroundColor: "#f2f7fb",
    bottom: 0,
  },
  // текст кнопки закрыть
  closebtntext: {
    fontSize: 17,
    lineHeight: 50,
    textAlign: 'center',
    color: '#07296F',
  },
  // заголовок уровня
  laveltitle: {
    fontSize: 20,
    paddingLeft: 10,
    color: '#07296F',
    lineHeight: 24,
    marginTop: 20
  },
  // текст уровня
  laveltext: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#5C6979',
    lineHeight: 17,
    marginTop: 8
  },
  // голубой заголовок шкалы прогресса
  lavelprogresstitleblue: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#5494CE',
    lineHeight: 17,
    marginTop: 10
  },
  // красный заголовок шкалы прогресса
  lavelprogresstitlered: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#EB7155',
    lineHeight: 17,
    marginTop: 10
  },
  // шкала прогресса
  lavelprogress: {
    width: w - 60,
    left: 10,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 4,
    backgroundColor: '#DFE2E6'
  },
  // цвета закрашиваемой шкалы
  lavelprogressimg:{
    height: 8,
    borderRadius: 4,
  }
})

const { container, closebtn, closebtntext, laveltitle, laveltext, lavelprogresstitleblue, lavelprogresstitlered, lavelprogress, lavelprogressimg } = styles

class UserLavel extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [], profileData: {}, levelData: {} }
  }


  async componentDidMount(){

    // получаем данные о пользователе и запрашиваем уго уровень
    try {
      AsyncStorage.getItem('userdata', (err, result) => {
        if (result){
          this.setState({ profileData: JSON.parse(result) })

          this.loadLavelData()

          // console.log(JSON.parse(result))
        }else{
          // this.props.navigation.DrawerNavigator().
          this.props.navigation.openDrawer()
        }
      })
    } catch (e) {
      throw e
    }
  }

  async loadLavelData(){
    // записываем полученный уровень для отрисовки
    try {
      const response = await fetch(url + this.state.profileData.id)
      const data = await response.json()
      this.setState({ levelData: data })
    } catch (e) {
      throw e
    }
  }

  render() {
    const { levelData } = this.state
    return (
      <View style={container}>
        <Text style={laveltitle}>{levelData.title1}</Text>
        <Text style={laveltext}>{levelData.info1}</Text>
        <Text style={laveltitle}>{levelData.title2}</Text>
        <Text style={lavelprogresstitleblue}>Срок активного использования</Text>
        <View style={lavelprogress}>
          <Image source={images.blue_bg} style={[lavelprogressimg, {width: levelData.daysproc2 + "%"}]} resizeMode="stretch" />
        </View>
        <Text style={lavelprogresstitlered}>Активность</Text>
        <View style={lavelprogress}>
          <Image source={images.protiv_voice} style={[lavelprogressimg, {width: levelData.activeproc2 + "%"}]} resizeMode="stretch" />
        </View>
        <Text style={laveltext}>{levelData.info2}</Text>
        <Text style={laveltitle}>{levelData.title3}</Text>
        <Text style={lavelprogresstitleblue}>Срок активного использования</Text>
        <View style={lavelprogress}>
          <Image source={images.blue_bg} style={[lavelprogressimg, {width: levelData.daysproc3 + "%"}]} resizeMode="stretch" />
        </View>
        <Text style={lavelprogresstitlered}>Активность</Text>
        <View style={lavelprogress}>
          <Image source={images.protiv_voice} style={[lavelprogressimg, {width: levelData.activeproc3 + "%"}]} resizeMode="stretch" />
        </View>
        <Text style={laveltext}>{levelData.info3}</Text>
      </View>
    )
  }
}

export { UserLavel }
