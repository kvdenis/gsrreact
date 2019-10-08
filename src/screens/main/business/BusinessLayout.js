import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { BusinessItem } from './BusinessItem'
import axios from 'axios';
import images from 'res/images'
import { w, h } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    height: h - 64
  },
  bookmarks: {
    height: 30,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    zIndex: 1
  },
  bookmarksline: {
    position: 'absolute',
    width: (w / 2 - 22),
    height: 2,
    backgroundColor: '#EB7155',
    bottom: 0
  },
  allbutton: {
    position: 'absolute',
    fontSize: 14,
    width: (w / 2 - 22),
    height: 30,
    lineHeight: 20
  },
  bookmarktext: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 20,
    color: '#07296F'
  },
  filterbutton: {
    position: 'absolute',
    width: 44,
    height: 30,
    left: w - 44
  },
  filterbuttonimg: {
    position: 'absolute',
    width: 44,
    height: 30
  },
  newslistview: {
    width: w,
    height: h - 30,
    flex: 1,
    flexDirection: 'row'
  },
  newspage: {
    width: w,
    height: h - 94
  },
  horisontalpages: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: 2 * w,
    height: h - 90,
    overflow: 'hidden'
  },
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
  charlistview: {
    position: 'absolute',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: w,
    top: 10,
    height: 30,
    paddingTop: 5,
    overflow: 'hidden',
    zIndex: 10,
    backgroundColor: 'white'
  },
  indicator: {
    paddingTop: 20,
    paddingBottom: 20,
    width: w
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
  char: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 10
  },
  firstchar: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 20
  },
  lastchar: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 10,
    paddingRight: 20
  },
  chartouch: {

  },
  charlistblock: {
    flexWrap: 'nowrap',
    flexDirection: 'row'
  },
  footerblock: {
    height: 20
  }
})

const { container, bookmarks, allbutton, bookmarktext, filterbutton, filterbuttonimg, newspage, newslistview, horisontalpages, indicator, square, formenu, bookmarksline, filterview, favlist, hiddenfavlist, categoriestitle, filteritem, filterchb, filtertitle, filterchbselect, filtersubmit, filtersubmitimg, filtersubmittext, cityfilter, cityfiltertext, cityfilterarrow, charlistview, charlistblock, chartouch, char, firstchar, lastchar, indicatorhidden, footerblock } = styles


class BusinessLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isFavLoading: true, data: [], filterids: [], filterstring: "", categories: [], favdata: [], page: 0, favpage: 0, bookmarkslinex: 0, filtery: new Animated.Value(h), filteropen: false, url: '', favurl: '', userlogined: false, refreshfav: false, isFocused: true, filtercity:'Выберите город', cityid: '', chars: ['0','1','2','3','4','5','6','7','8','9','А','Б','В','Г','Д','Е','Ё','Ж','З','И','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Э','Ю','Я','A','B','C','D','E','G','H','I','K','L','M','N','O','P','Q','R','S','T','V','W','X','Y'], char: '' };
    console.disableYellowBox = true;
  }

  componentDidMount = async () => {

    var par = this
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

    const { page, cityid, char } = this.state
    const url = `https://mygsr.ru/get_char_business_page?page=${page}&city=${cityid}&char=${char}`
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
        const favurl = `https://mygsr.ru/get_favorite_page?part=10&page=${favpage}&userid=${this.state.userdata.id}`
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


  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest()
    })
  }
  handleLoadMoreFav = () => {
    this.setState({
      favpage: this.state.favpage + 1,
    }, () => {
      this.makeFavRequest()
    })
  }

  renderFooter = () => {
    const {isLoading } = this.state
    return (
      <View style={footerblock}>
        <ActivityIndicator style={isLoading ? indicator : indicatorhidden} size="small" color="#07296F"/>
      </View>
    );
  };
  renderFavFooter = () => {
    const {isFavLoading } = this.state
    return (
      <View style={footerblock}>
        <ActivityIndicator style={isFavLoading ? indicator : indicatorhidden} size="small" color="#07296F"/>
      </View>
    );
  };


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
  onScroll(event) {
    if (event.nativeEvent.contentOffset.x > 0){
      let x_pos = (event.nativeEvent.contentOffset.x * (w/2-22)) / w
      this.setState({ bookmarkslinex: x_pos, refreshfav: false })
    }else{
      this.setState({ bookmarkslinex: 0 })
    }
  }
  typePage(page){
    const { filteropen } = this.state
    this.setState({ filteropen: false })
    Animated.timing(this.state.filtery, {
      toValue: h,
      duration: 500,
      easing: Easing.out(Easing.cubic)
    }).start()
    console.log(page)
    this.state.itemsScrollView.scrollTo({x: w * page, y: 0, animated: true})
  }
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

  filterSubmit() {
    const { page, cityid, char } = this.state
    const url = `https://mygsr.ru/get_char_business_page?page=0&city=${cityid}&char=${char}`
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


  setChar(char){
    this.setState({
      char: char
    })
    console.log(char)
    const { page, cityid } = this.state
    const url = `https://mygsr.ru/get_char_business_page?page=0&city=${cityid}&char=${char}`
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
      }).catch((error)=>{
         console.log("Api call error")
      })
  }


  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenBusinessScreen', {itemId: item.item.id})} activeOpacity={0.8}>
        <BusinessItem data={item} key={item.id} />
      </TouchableOpacity>
    );
  }

  render() {
    const {isLoading, isFavLoading, data, favdata, bookmarkslinex, filtery, filteropen, userlogined, refreshfav, isFocused, categories, filterids, filtercity, chars } = this.state

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
        <ScrollView pagingEnabled horisontal alwaysBounceVertical={false} style={newslistview} scrollEventThrottle={ 20 } onScroll={this.onScroll.bind(this)} ref={ref => {this.state.itemsScrollView = ref}}>
          <View style={horisontalpages}>
            <ScrollView horisontal showsHorizontalScrollIndicator={false} alwaysBounceVertical={false} style={charlistview} >
              <View style={charlistblock}>
              <TouchableOpacity style={chartouch} onPress={() => this.setChar('')}>
                <Text style={firstchar}>Все</Text>
              </TouchableOpacity>
              { chars.map((item, key)=>(
                <TouchableOpacity style={chartouch} onPress={() => this.setChar(item)}>
                  <Text style={char}>{item}</Text>
                </TouchableOpacity>)
              )}
              <TouchableOpacity style={chartouch} onPress={() => this.setChar('Z')}>
                <Text style={lastchar}>Z</Text>
              </TouchableOpacity>
              </View>
            </ScrollView>
            <FlatList
              style={{width: w, top: 30, height: h - 120}}
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



export { BusinessLayout }
