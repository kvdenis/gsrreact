import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ProjectItem } from './ProjectItem'
import axios from 'axios';
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    height: h - 64
  },
  // закладки
  bookmarks: {
    height: 30,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    zIndex: 1
  },
  // подчеркивание активной закладки
  bookmarksline: {
    position: 'absolute',
    width: (w / 2 - 22),
    height: 2,
    backgroundColor: '#EB7155',
    bottom: 0
  },
  // кнопка Все
  allbutton: {
    position: 'absolute',
    fontSize: 14,
    width: (w / 2 - 22),
    height: 30,
    lineHeight: 20
  },
  // текст кнопки в закладке
  bookmarktext: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 20,
    color: '#07296F'
  },
  // кнопка фильтра
  filterbutton: {
    position: 'absolute',
    width: 44,
    height: 30,
    left: w - 44
  },
  // иконка кнопки
  filterbuttonimg: {
    position: 'absolute',
    width: 44,
    height: 30
  },
  // список новостей
  newslistview: {
    width: w,
    height: h - 30,
    flex: 1,
    flexDirection: 'row'
  },
  // блок с нвоостями
  newspage: {
    width: w,
    height: h - 94
  },
  // блок с горизонтальной прокруткой для закладок
  horisontalpages: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: 2 * w,
    height: h - 90,
    overflow: 'hidden'
  },
  // прелоадер
  indicator: {
    paddingTop: 20,
    paddingBottom: 20,
    width: w
  },
  // скрываем индикатор
  indicatorhidden: {
    display: 'none'
  },
  square: {
    width: w,
    height: 100,
    backgroundColor: '#cccccc'
  },
  formenu: {
    position: 'absolute',
    width: 10,
    height: h,
    backgroundColor: '#ff00ff'
  },
  // окно фильтра
  filterview: {
    position: 'absolute',
    width: w,
    height: h - 90,
    top: 0,
    backgroundColor: 'white',
    zIndex: 2
  },
  favlist: {

  },
  // скрываем список избранного
  hiddenfavlist: {
    display: 'none'
  },
  // заголовок категорий в фильтре
  categoriestitle: {
    fontSize: 17,
    lineHeight: 20,
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 10,
    color: '#07296F'
  },
  // категория в фильтре
  filteritem: {
    paddingLeft: 30,
    paddingTop: 10,
    flexDirection: 'row'
  },
  // чекбокс категории
  filterchb: {
    width: 17,
    height: 17,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#07296F'
  },
  // текст категории
  filtertitle: {
    fontSize: 16,
    color: '#07296F'
  },
  // чекбокс активен
  filterchbselect: {
    width: 17,
    height: 17,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#07296F',
    backgroundColor: '#07296F'
  },
  // кнопка применить
  filtersubmit: {
    marginLeft: 30,
    width: w - 60,
    height: 48,
    marginTop: 30
  },
  // фон кнопки
  filtersubmitimg: {
    position: 'absolute',
    width: w - 60,
    height: 48,
    borderRadius: 24
  },
  // текст кнопки
  filtersubmittext: {
    width: w - 60,
    lineHeight: 48,
    textAlign: 'center',
    color: 'white',
    fontSize: 17
  },
  // выпадающий список города
  cityfilter: {
    marginLeft: 30,
    marginTop: 30,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: '#A8B6C8',
    height: 48,
    width: w - 60,
    borderRadius: 24
  },
  // текст выпадающего списка
  cityfiltertext:{
    paddingLeft: 20,
    lineHeight: 44,
    fontSize: 13,
    color: '#71859E'
  },
  // стрелочка выпадающег списка
  cityfilterarrow: {
    position: 'absolute',
    width: 10,
    height: 6,
    right: 20,
    top: 20
  },
  // футер
  footerblock: {
    height: 20
  }
})

const { container, bookmarks, allbutton, bookmarktext, filterbutton, filterbuttonimg, newspage, newslistview, horisontalpages, indicator, square, formenu, bookmarksline, filterview, favlist, hiddenfavlist, categoriestitle, filteritem, filterchb, filtertitle, filterchbselect, filtersubmit, filtersubmitimg, filtersubmittext, cityfilter, cityfiltertext, cityfilterarrow, footerblock, indicatorhidden } = styles

// const url = 'https://mygsr.ru/get_news_page?page=0&category='

// type Props = {
//     navigator: Object
// };

class CityProjectsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isFavLoading: true, data: [], filterids: [], filterstring: "", categories: [], favdata: [], page: 0, favpage: 0, bookmarkslinex: 0, filtery: new Animated.Value(h), filteropen: false, url: '', favurl: '', userlogined: false, refreshfav: false, isFocused: true, filtercity:'Выберите город', cityid: '' };
    console.disableYellowBox = true;
  }

  componentDidMount = async () => {

    var par = this
    // получаем данные о городе в AsyncStorage
    AsyncStorage.getItem("city").then((value) => {
      par.setState({
        filtercity: JSON.parse(value).title,
        cityid: JSON.parse(value).id
      })
      if (JSON.parse(value).title == ""){
        par.setState({
          filtercity: 'Выберите город',
          cityid: ''
        })
      }
      this.makeRequest();
    }).catch(() => {
      this.makeRequest();
    })
  }


  makeRequest = () => {

    const { page, cityid } = this.state
    // получить новости города по выбранному городу
    const url = `https://mygsr.ru/get_city_projects_page?page=${page}&city=${cityid}`
    axios.get(url)
      .then(res => {
        this.setState({
          isLoading: false,
          data: [...this.state.data, ...res.data]
        })
      }).catch((error)=>{
         console.log("Api call error")
      })
  }
  makeFavRequest = () => {
    const { favpage } = this.state;
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })
        // получить избранные
        const favurl = `https://mygsr.ru/get_favorite_page?part=9&page=${favpage}&userid=${this.state.userdata.id}`
        axios.get(favurl)
          .then(favres => {
            this.setState({
              isFavLoading: false,
              favdata: [...this.state.favdata, ...favres.data]
            })
          }).catch((error)=>{
             console.log("Api call error ads")
          })
      }else{
        this.setState({
          isFavLoading: false,
          favdata: []
        })
      }

    })
    .then(res => {
    });
  }


  // загрузка страницы при прокрутке
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest()
    })
  }
  // загрузка страницы избранного при прокрутке
  handleLoadMoreFav = () => {
    this.setState({
      favpage: this.state.favpage + 1,
    }, () => {
      this.makeFavRequest()
    })
  }

  // рисуем футер
  renderFooter = () => {
    const {isLoading } = this.state
    return (
      <View style={footerblock}>
        <ActivityIndicator style={isLoading ? indicator : indicatorhidden} size="small" color="#07296F"/>
      </View>
    )
  }
  // рисуем футер избранного
  renderFavFooter = () => {
    const {isFavLoading } = this.state
    return (
      <View style={footerblock}>
        <ActivityIndicator style={isFavLoading ? indicator : indicatorhidden} size="small" color="#07296F"/>
      </View>
    )
  }


  // обработка после возврата на страницу при выборе нового города в меню
  handlePageChange = () => {
    var par = this
    AsyncStorage.getItem("city").then((value) => {
      par.setState({
        filtercity: JSON.parse(value).title,
        cityid: JSON.parse(value).id,
        favdata: [],
        favpage: 0
      })
      if (JSON.parse(value).title == ""){
        par.setState({
          filtercity: 'Выберите город'
        })
      }
      par.makeFavRequest()
    })
  }
  // смена активности заклаки при горизонтальном скролле
  onScroll(event) {
    if (event.nativeEvent.contentOffset.x > 0){
      let x_pos = (event.nativeEvent.contentOffset.x * (w/2-22)) / w
      this.setState({ bookmarkslinex: x_pos, refreshfav: false })
    }else{
      this.setState({ bookmarkslinex: 0 })
    }
  }
  // нажатие на заклаки
  typePage(page){
    const { filteropen } = this.state
    this.setState({ filteropen: false })
    Animated.timing(this.state.filtery, {
      toValue: h,
      duration: 500,
      easing: Easing.out(Easing.cubic)
    }).start()
    console.log(page)
    this.state.anonsScrollView.scrollTo({x: w * page, y: 0, animated: true})
  }
  // скрываем показываем фильтр
  filterPress(){
    const { filteropen } = this.state
    this.setState({ filteropen: !filteropen })
    if (!filteropen){
      Animated.timing(this.state.filtery, {
        toValue: 30,
        duration: 500,
        easing: Easing.out(Easing.cubic)
      }).start()
    }else{
      Animated.timing(this.state.filtery, {
        toValue: h,
        duration: 500,
        easing: Easing.out(Easing.cubic)
      }).start()
    }
  }

  // применить фильтр
  filterSubmit() {
    const { page, cityid } = this.state
    // применить фильтр по городу
    const url = `https://mygsr.ru/get_city_projects_page?page=0&city=${cityid}`
    this.setState({
      page: 0,
      data: [],
      filteropen: false
    })
    axios.get(url)
      .then(res => {
        this.setState({
          isLoading: false,
          data: [...this.state.data, ...res.data]
        })
        Animated.timing(this.state.filtery, {
          toValue: h,
          duration: 500,
          easing: Easing.out(Easing.cubic)
        }).start()
      }).catch((error)=>{
         console.log("Api call error")
      })

  }



  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenCityProjectsScreen', {itemId: item.item.id})} activeOpacity={0.8}>
        <ProjectItem data={item} key={item.id} />
      </TouchableOpacity>
    );
  }

  render() {
    const {isLoading, isFavLoading, data, favdata, bookmarkslinex, filtery, filteropen, userlogined, refreshfav, isFocused, categories, filterids, filtercity } = this.state

    // в зависимости открыт или нет фильтр выводим нужную иконку
    let filterimage = images.filter
    if (filteropen){
      filterimage = images.filter_active
    }


    return (
      <View style={container}>
        <NavigationEvents
          onWillFocus={payload => this.handlePageChange()}
          onDidBlur={payload => this.handlePageChange()}
        />
        <View style={bookmarks}>
          <TouchableOpacity style={allbutton} onPress={() => this.typePage(0)} activeOpacity={0.8}>
            <Text style={bookmarktext}>Все</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[allbutton, { left: (w / 2 - 22) }]} onPress={() => this.typePage(2)} activeOpacity={0.8}>
            <Text style={bookmarktext}>Избранные</Text>
          </TouchableOpacity>
          <TouchableOpacity style={filterbutton} onPress={() => this.filterPress()} activeOpacity={0.8}>
            <Image style={filterbuttonimg} source={filterimage} backgroundSize="cover" />
          </TouchableOpacity>
          <View style={[bookmarksline, {left: bookmarkslinex}]}></View>
        </View>
        <ScrollView pagingEnabled horisontal alwaysBounceVertical={false} style={newslistview} scrollEventThrottle={ 10 } onScroll={this.onScroll.bind(this)} ref={ref => {this.state.anonsScrollView = ref}}>
          <View style={horisontalpages}>
            <FlatList
              style={{width: w}}
              data={data}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={item => item.id}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
            />
            <FlatList
              style={{width: w}}
              data={favdata}
              renderItem={this.renderItem.bind(this)}
              extraData={this.state}
              keyExtractor={item => item.id}
              ListFooterComponent={this.renderFavFooter}
              onEndReached={this.handleLoadMoreFav}
              onEndReachedThreshold={0}
            />
          </View>
        </ScrollView>
        <Animated.View style={[filterview, {top: filtery}]}>
          <TouchableOpacity style={cityfilter} onPress={() => this.props.navigation.navigate('CitySelect')} activeOpacity={0.8}>
            <Text style={cityfiltertext}>{filtercity}</Text>
            <Image style={cityfilterarrow} source={images.dropdown} backgroundSize="cover" />
          </TouchableOpacity>
          <TouchableOpacity style={filtersubmit} onPress={() => {this.filterSubmit()}} activeOpacity={0.8}>
            <Image style={filtersubmitimg} source={images.blue_bg} backgroundSize="stretch" />
            <Text style={filtersubmittext}>Применить</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>

    )
  }
}



export { CityProjectsLayout }
