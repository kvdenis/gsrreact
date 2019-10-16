import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { AnonsItem } from './AnonsItem'
import { AdsItem } from './AdsItem'
import axios from 'axios';
// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    height: h - 64,
    overflow: 'hidden'
  },
  // закладки
  bookmarks: {
    height: 30,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    zIndex: 3
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
  // список
  listview: {
    width: w,
    height: h - 30,
    flex: 1,
    flexDirection: 'row'
  },
  // список
  listviewinner: {
    width: w*2,
    height: h - 30,
    flex: 1,
    flexDirection: 'row'
  },
  page: {
    width: w,
    height: h - 124,
  },
  // блок с горизонтальной прокруткой для закладок
  horisontal_an_add:{
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: w,
    height: h - 90,
    overflow: 'hidden',
    marginTop: 30,
    left: w
  },
  // блок с горизонтальной прокруткой для закладок
  horisontalpages: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: 3 * w,
    height: h - 90,
    overflow: 'hidden',
    marginTop: 0
  },
  afisha_ads_list: {
    marginTop: 50,
    width: w,
  },
  fav_list: {
    paddingTop: 20,
    width: w,
  },
  typetouch: {

  },
  typelistblock: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  typelistview: {
    position: 'absolute',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: 180,
    top: 40,
    height: 30,
    paddingTop: 5,
    overflow: 'hidden',
    zIndex: 1,
    left: w/2 - 27
  },
  // прелоадер
  indicator: {
    paddingTop: 20,
    paddingBottom: 20,
    width: w
  },
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
  hiddenfavlist: {
    display: 'none'
  },
  categoriestitle: {
    fontSize: 17,
    lineHeight: 20,
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 10,
    color: '#07296F'
  },
  filteritem: {
    paddingLeft: 30,
    paddingTop: 10,
    flexDirection: 'row'
  },
  filterchb: {
    width: 17,
    height: 17,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#07296F'
  },
  filtertitle: {
    fontSize: 16,
    color: '#07296F'
  },
  filterchbselect: {
    width: 17,
    height: 17,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#07296F',
    backgroundColor: '#07296F'
  },
  filtersubmit: {
    marginLeft: 30,
    width: w - 60,
    height: 48,
    marginTop: 30
  },
  filtersubmitimg: {
    position: 'absolute',
    width: w - 60,
    height: 48,
    borderRadius: 24
  },
  filtersubmittext: {
    width: w - 60,
    lineHeight: 48,
    textAlign: 'center',
    color: 'white',
    fontSize: 17
  },
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
  cityfiltertext:{
    paddingLeft: 20,
    lineHeight: 44,
    fontSize: 13,
    color: '#71859E'
  },
  cityfilterarrow: {
    position: 'absolute',
    width: 10,
    height: 6,
    right: 20,
    top: 20
  },
  char: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 10
  },
  firsttype: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
  },
  secondtype:{
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    marginLeft: 20
  },
  lasttype: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 10,
    paddingRight: 20
  },
  footerblock: {
    height: 20
  }
})

const { container, bookmarks, allbutton, bookmarktext, filterbutton, filterbuttonimg, page, listview, horisontalpages, indicator, square, formenu, char, typelistview, typetouch, typelistblock, firsttype, secondtype, lastchar, bookmarksline, horisontalpages_add,listviewinner,horisontal_an_add, afisha_ads_list, fav_list, filterview, filteritem, filterchb, filtertitle, filterchbselect, filtersubmit, filtersubmitimg, filtersubmittext, cityfilter, cityfiltertext, cityfilterarrow, indicatorhidden, footerblock  } = styles


class AnonsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isAdsLoading: true, isFavLoading: true, data: [], adsdata: [], favdata: [], page: 0, adspage: 0, favpage: 0, typelinex: w/2 - 27, type1opacity: 1, type2opacity: 0.3, bookmarkslinex: 0, filtery: new Animated.Value(h), filteropen: false, url: '', favurl: '', userlogined: false, refreshfav: false, isFocused: true, filtercity:'Выберите город', cityid: '' };
    console.disableYellowBox = true;
  }


  componentDidMount = async () => {
    const { page, adspage, favpage } = this.state;
    var par = this
    let url = `https://mygsr.ru/get_anons_page?page=0&city=`
    let adsurl = `https://mygsr.ru/get_ads_page?page=0&city=`

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
      url = `https://mygsr.ru/get_anons_page?page=0&city=${JSON.parse(value).id}`
      adsurl = `https://mygsr.ru/get_ads_page?page=0&city=${JSON.parse(value).id}`

      axios.all([axios.get(url),
                 axios.get(adsurl)])
           .then(axios.spread((firstResponse, secondResponse) => {
             par.setState({
               isLoading: false,
               isAdsLoading: false,
               data: [...par.state.data, ...firstResponse.data],
               adsdata: [...par.state.data, ...secondResponse.data]
             })
             this.makeFavRequest()
           }))
           .catch(error => console.log("Api call error"));
    }).catch(()=>{
      axios.all([axios.get(url),
                 axios.get(adsurl)])
           .then(axios.spread((firstResponse, secondResponse) => {
             par.setState({
               isLoading: false,
               isAdsLoading: false,
               data: [...par.state.data, ...firstResponse.data],
               adsdata: [...par.state.data, ...secondResponse.data]
             })
             this.makeFavRequest()
           }))
           .catch(error => console.log("Api call error"));
    })


  }

  makeFirstRequest = () => {

  }


  makeRequest = () => {
    const { page } = this.state;
    // ссылка для получения данных анонса
    const url = `https://mygsr.ru/get_anons_page?category=&page=${page}`
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
  makeAdsRequest = () => {
    const { adspage } = this.state;
    // ссылка для получения данных объявлений
    const adsurl = `https://mygsr.ru/get_ads_page?category=&page=${adspage}`
    console.log(adsurl)
    axios.get(adsurl)
      .then(adsres => {
        this.setState({
          isAdsLoading: false,
          adsdata: [...this.state.adsdata, ...adsres.adsdata]
        })

      }).catch((error)=>{
         console.log("Api call error ads")
      })
  }

  makeFavRequest = () => {
    const { favpage } = this.state;
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })
        // ссылка для получения избранного
        const favurl = `https://mygsr.ru/get_favorite_page?part=3&page=${favpage}&userid=${this.state.userdata.id}`

        console.log(favurl)
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
    })
  }

  // загрузка страницы анонсов при прокрутке
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest();
    })
  }
  // загрузка страницы объявлений при прокрутке
  handleLoadMoreAds = () => {
    this.setState({
      adspage: this.state.adspage + 1,
    }, () => {
      this.makeAdsRequest();
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

  // рисуем футер для анонса
  renderFooter = () => {
    return (
      <View style={styles.headerBg}>
        <ActivityIndicator style={indicator} size="small" color="#07296F"/>
      </View>
    )
  }

  // рисуем футер для объявлений
  renderAdsFooter = () => {
    return (
      <View style={styles.headerBg}>
        <ActivityIndicator style={indicator} size="small" color="#07296F"/>
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
    );
  };

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

  // создаем анонс
  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenAnonsScreen', {itemId: item.item.id})} activeOpacity={0.8}>
        <AnonsItem data={item} key={item.id} />
      </TouchableOpacity>
    )
  }
  // создаем объявление
  renderAdsItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenAdsScreen', {itemId: item.item.id})} activeOpacity={0.8}>
        <AdsItem data={item} key={item.id} />
      </TouchableOpacity>
    )
  }
  // создаем избранные анонс и объявление в зависимости от того какой тип вернулся с сервера. если ad = 1 то это объявление
  renderFavItem(item) {
    if (item.item.ad == "1"){
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenAdsScreen', {itemId: item.item.id})} activeOpacity={0.8}>
          <AdsItem data={item} key={item.id} />
        </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenAnonsScreen', {itemId: item.item.id})} activeOpacity={0.8}>
          <AnonsItem data={item} key={item.id} />
        </TouchableOpacity>
      )
    }

  }
  // смена активности заклаки при горизонтальном скролле
  onScroll(event) {
    let x_pos = w/2 - 27 - (event.nativeEvent.contentOffset.x * 90 / w)
    if (event.nativeEvent.contentOffset.x > w){
      x_pos = x_pos - (event.nativeEvent.contentOffset.x - w)/2
      this.setState({ bookmarkslinex: (event.nativeEvent.contentOffset.x - w - 44*(event.nativeEvent.contentOffset.x - w)/w)/2 })
    }else{
      this.setState({ bookmarkslinex: 0 })
    }

    if (event.nativeEvent.contentOffset.x < w/2){
      this.setState({ type1opacity: 1, type2opacity: 0.3 })
    }else{
      this.setState({ type1opacity: 0.3, type2opacity: 1 })
    }
    this.setState({ typelinex: x_pos })
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
    var par = this
    const { page, adspage, cityid } = this.state
    this.setState({
      page: 0,
      adspage: 0,
      data: [],
      adsdata: [],
      filteropen: false
    })

    // ссылка для получения данных первой страницы в зависимости от города
    const url = `https://mygsr.ru/get_anons_page?page=0&city=${cityid}`
    const adsurl = `https://mygsr.ru/get_ads_page?page=0&city=${cityid}`

    // console.log(url)

    axios.all([axios.get(url),
               axios.get(adsurl)])
         .then(axios.spread((firstResponse, secondResponse) => {
           par.setState({
             isLoading: false,
             isAdsLoading: false,
             data: [...par.state.data, ...firstResponse.data],
             adsdata: [...par.state.data, ...secondResponse.data]
           })
           this.makeFavRequest()
           Animated.timing(this.state.filtery, {
             toValue: h,
             duration: 500,
             easing: Easing.out(Easing.cubic)
           }).start()
         }))
         .catch(error => console.log("Api call error"));

  }


  render() {

    const {data, adsdata, favdata, typelinex, type1opacity, type2opacity, bookmarkslinex, filtery, filteropen, filteritem, filterchb, filtertitle, filterchbselect, filtercity, isLoading, isAdsLoading, isFavLoading} = this.state

    // выводим прелоадер при загрузке
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator style={indicator} size="small" color="#07296F"/>
        </View>
      )
    }

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
        <View style={[typelistview, {left: typelinex}]}>
          <View style={typelistblock}>
          <TouchableOpacity style={typetouch} onPress={() => this.typePage(0)} activeOpacity={0.8}>
            <Text style={[firsttype, {opacity: type1opacity}]}>Анонсы</Text>
          </TouchableOpacity>
          <TouchableOpacity style={typetouch} onPress={() => this.typePage(1)} activeOpacity={0.8}>
            <Text style={[secondtype, {opacity: type2opacity}]}>Объявления</Text>
          </TouchableOpacity>
          </View>
        </View>

        <ScrollView pagingEnabled horisontal alwaysBounceVertical={false} style={listview} scrollEventThrottle={ 10 } onScroll={this.onScroll.bind(this)} ref={ref => {this.state.anonsScrollView = ref}}>
            <View style={horisontalpages}>
              <FlatList
                data={data}
                style={afisha_ads_list}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={item => item.id}
                ListFooterComponent={isLoading ? this.renderFooter : null}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0}
              />
              <View style={{position:'absolute', left: w, top: 0, width: w, height: h}}></View>
              <FlatList
                data={adsdata}
                style={afisha_ads_list}
                renderItem={this.renderAdsItem.bind(this)}
                keyExtractor={item => item.id}
                ListFooterComponent={isAdsLoading ? this.renderAdsFooter : null}
                onEndReached={this.handleLoadMoreAds}
                onEndReachedThreshold={0}
              />
              <FlatList
                data={favdata}
                style={fav_list}
                renderItem={this.renderFavItem.bind(this)}
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



export { AnonsLayout }
