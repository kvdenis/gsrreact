import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Image, Text, Animated, TouchableOpacity, AsyncStorage, Button, Easing } from 'react-native'
import Switch from 'react-native-switch-pro'
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    width: w,
    height: h - 64,
    backgroundColor: 'white'
  },
  avatar: {
    position: 'absolute',
    width: 79,
    height: 79,
    left: 25,
    top: 20,
    borderRadius: 40
  },
  namestyle: {
    position: 'absolute',
    left: 128,
    top: 20,
    width: w - 150,
    color:'#07296F',
    fontSize: 14,
    lineHeight: 17
  },
  bonus: {
    position: 'absolute',
    left: 128,
    top: 60,
    width: w - 150,
    color:'#5494CE',
    fontSize: 14,
    lineHeight: 17
  },
  userlevel: {
    position: 'absolute',
    left: 243,
    top: 60,
    width: w - 150,
    color:'#5494CE',
    fontSize: 14,
    lineHeight: 17
  },
  touchid: {
    position: 'absolute',
    left: 128,
    top: 85
  },
  switchlabel: {
    position: 'absolute',
    left: 44,
    width: 200,
    top: 0,
    fontSize: 14,
    lineHeight: 17,
    color: '#07296F'
  },
  circlestyle: {
    width: 9,
    height: 9,
    margin: 3.5
  },
  rightheaderbtn: {
    width: 44,
    height: 44
  },
  editprofilebtn: {
    position: 'absolute',
    left: 128,
    top: 114,
    width: w - 150,
    height: 34,
    borderWidth: 2,
    borderColor: '#6392c9',
    borderRadius: 17
  },
  editprofilebtnlabel: {
    position: 'absolute',
    width: '100%',
    color:'#07296F',
    fontSize: 14,
    lineHeight: 30,
    textAlign: 'center'
  },
  editbtnshadow: {
    position: 'absolute',
    width: '100%',
    height: 10,
    left: 0,
    top: 32
  },
  bookmarks: {
    position: 'absolute',
    top: 200,
    height: 30,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
  },
  bookmarksline: {
    position: 'absolute',
    width: (w / 2),
    height: 2,
    backgroundColor: '#EB7155',
    bottom: 0
  },
  bookmark: {
    position: 'absolute',
    fontSize: 14,
    width: (w / 2),
    height: 30,
    lineHeight: 20
  },
  bookmarktext: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 20,
    color: '#07296F'
  },
  listview: {
    position: 'absolute',
    top: 230,
    width: w,
    height: 210,
    flex: 1,
    flexDirection: 'row'
  },
  horisontalpages: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: 2 * w,
    height: 210,
    overflow: 'hidden',
  },
  horisontalpage: {
    width: w
  },
  listitem:{
    height: 52,
    borderBottomWidth: 1,
    borderColor: '#eceef2',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  listitemtext: {
    fontSize: 14,
    lineHeight: 52,
    color: '#07296F',
    paddingLeft: 20
  },
  listitemtextlight: {
    fontSize: 14,
    lineHeight: 52,
    marginLeft: 5,
    color: '#5494CE',
  },
  listitemarrow: {
    position: 'absolute',
    width: 6,
    height: 10,
    top: 21,
    right: 15
  },
  profilelinks: {
    position: 'absolute',
    width: w,
    top: 474
  },
  profilelink: {
    fontSize: 16,
    lineHeight: 22,
    color: '#07296F',
    textAlign: 'center',
    marginBottom: 18
  }
})

const { container, avatar, namestyle, bonus, userlevel, touchid, switchlabel, circlestyle, rightheaderbtn, editprofilebtn, editprofilebtnlabel, editbtnshadow, bookmarks, bookmark, bookmarktext, bookmarksline, listview, horisontalpages, horisontalpage, listitem, listitemtext, listitemarrow, profilelinks, profilelink, listitemtextlight } = styles

class ProfileLayout extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [], profileData: {}, bookmarkslinex: 0, profileScrollView: null}
  }


  // разлогиниться
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem('userdata', (err, result) => {
              navigation.navigate('CountryNewsScreen')
            })

          }} activeOpacity={0.8}>
          <Image source={images.exit} style={rightheaderbtn} resizeMode="cover" />
        </TouchableOpacity>
      ),
    };
  };

  async componentDidMount() {
    // получаем данные пользователя
    try {
      AsyncStorage.getItem('userdata', (err, result) => {
        if (result){
          this.setState({ profileData: JSON.parse(result) })
        }else{
          this.props.navigation.openDrawer()
        }
      })
    } catch (e) {
      throw e
    }
  }

  // прокрутка блока с закладками и выбор активной закладки
  onScroll(event) {
    this.setState({ bookmarkslinex: event.nativeEvent.contentOffset.x/2 })
  }

  // нажатие на закладку
  bookmarkPage(page){
    this.state.profileScrollView.scrollTo({x: w * page, y: 0, animated: true})
  }

  render() {
    const { data, profileData, bookmarkslinex } = this.state
    return (
      <View style={container}>
        <Image source={{ uri: profileData.image }} style={avatar} contain="cover" />
        <Text style={namestyle}>{profileData.surname + " " + profileData.name + " " + profileData.lastname}</Text>
        <Text style={bonus}>{profileData.bonus + " бонусов"}</Text>
        <Text style={userlevel}>{profileData.level}</Text>
        <View style={touchid}>
          <Switch width={36} height={16} backgroundActive={'#F0492B'} backgroundInactive={'#71859E'} circleStyle={circlestyle}/>
          <Text style={switchlabel}>Использование биометрии</Text>
        </View>
        <TouchableOpacity style={editprofilebtn} activeOpacity={0.8}>
          <Image source={images.button_login_shadow} style={editbtnshadow} resizeMode="stretch" />
          <Text style={editprofilebtnlabel}>Редактировать профиль</Text>
        </TouchableOpacity>

        <View style={bookmarks}>
          <TouchableOpacity style={bookmark} onPress={() => this.bookmarkPage(0)} activeOpacity={0.8}>
            <Text style={bookmarktext}>Активность</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[bookmark, { left: (w / 2) }]} onPress={() => this.bookmarkPage(1)} activeOpacity={0.8}>
            <Text style={bookmarktext}>Достижения</Text>
          </TouchableOpacity>
          <Animated.View style={[bookmarksline, {left: bookmarkslinex}]} />
        </View>
        <ScrollView pagingEnabled horisontal showsHorizontalScrollIndicator={false} alwaysBounceVertical={false} style={listview} scrollEventThrottle={ 10 } onScroll={this.onScroll.bind(this)} ref={ref => {this.state.profileScrollView = ref}}>
          <View style={horisontalpages}>
            <View style={horisontalpage}>
              <TouchableOpacity style={listitem} activeOpacity={0.8}>
                <Image source={images.btn_arrow} style={listitemarrow} resizeMode="stretch" />
                <Text style={listitemtext}>Ваши комментарии</Text>
                <Text style={listitemtextlight}>({profileData.comments})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={listitem} activeOpacity={0.8}>
                <Image source={images.btn_arrow} style={listitemarrow} resizeMode="stretch" />
                <Text style={listitemtext}>Ваши голосования</Text>
                <Text style={listitemtextlight}>({profileData.voice})</Text>
              </TouchableOpacity>
            </View>
            <View style={horisontalpage}>
              <TouchableOpacity style={listitem} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('UserLavelScreen')}>
                <Image source={images.btn_arrow} style={listitemarrow} resizeMode="stretch" />
                <Text style={listitemtext}>Уровень участия:</Text>
                <Text style={listitemtextlight}>{profileData.level}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={listitem} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('UserBonusScreen')}>
                <Image source={images.btn_arrow} style={listitemarrow} resizeMode="stretch" />
                <Text style={listitemtext}>Мои бонусы:</Text>
                <Text style={listitemtextlight}>{profileData.bonus} бонусов</Text>
              </TouchableOpacity>
              <TouchableOpacity style={listitem} activeOpacity={0.8}>
                <Image source={images.btn_arrow} style={listitemarrow} resizeMode="stretch" />
                <Text style={listitemtext}>Потратить бонусы</Text>
              </TouchableOpacity>
              <TouchableOpacity style={listitem} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ProfileRulesScreen')}>
                <Image source={images.btn_arrow} style={listitemarrow} resizeMode="stretch" />
                <Text style={listitemtext}>Правила участия</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={profilelinks}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileSogScreen')} activeOpacity={0.8}>
            <Text style={profilelink}>Пользовательское соглашение</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePolicyScreen')} activeOpacity={0.8}>
            <Text style={profilelink}>Политика конфиденциальности</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={profilelink}>Обратная связь</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export { ProfileLayout }
