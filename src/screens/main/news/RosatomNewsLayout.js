import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { NewsItem } from './NewsItem'
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
  footerblock: {
    height: 20
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
  }

})



const { container, bookmarks, allbutton, bookmarktext, filterbutton, filterbuttonimg, newspage, newslistview, horisontalpages, indicator, square, formenu, bookmarksline, filterview, favlist, hiddenfavlist, categoriestitle, filteritem, filterchb, filtertitle, filterchbselect, filtersubmit, filtersubmitimg, filtersubmittext, footerblock, indicatorhidden } = styles

class RosatomNewsLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isFavLoading: true, data: [], filterids: [], filterstring: "", categories: [], favdata: [], page: 0, favpage: 0, bookmarkslinex: 0, filtery: new Animated.Value(h), filteropen: false, url: '', favurl: '', userlogined: false, refreshfav: false, isFocused: true };
    console.disableYellowBox = true;
  }

  componentDidMount = async () => {
    const { page, favpage } = this.state
    this.loadCategories()
    // this.makeFavRequest()
  }


  loadCategories = () => {
    const { page } = this.state;
    const url = `https://mygsr.ru/get_rosatom_news_categories`
    axios.get(url)
      .then(res => {
        this.setState({
          categories: [...this.state.categories, ...res.data]
        })
        var cats = []
        var ids = []
        ids['0'] = true
        this.state.categories.map((catitem) => {
          cats.push(catitem.id)
          ids[catitem.id] = false
        })
        var carts_string = cats.join(',')
        this.setState({
          filterids: ids,
          filterstring: carts_string
        })
        this.makeRequest()
      }).catch((error)=>{
         console.log("Api call error")
      })
  }
  makeRequest = () => {

    const { page, filterstring } = this.state
    const url = `https://mygsr.ru/get_news_page?category=${filterstring}&page=${page}`
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
        const favurl = `https://mygsr.ru/get_favorite_page?part=13&page=${favpage}&userid=${this.state.userdata.id}`
        axios.get(favurl)
          .then(favres => {
            this.setState({
              isFavLoading: false,
              favdata: [...this.state.favdata, ...favres.data]
            })
            console.log(this.state.favdata)
            console.log("--")
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
    )
  }
  renderFavFooter = () => {
    const {isFavLoading } = this.state
    return (
      <View style={footerblock}>
        <ActivityIndicator style={isFavLoading ? indicator : indicatorhidden} size="small" color="#07296F"/>
      </View>
    )
  }


  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenCountryNewsScreen', {itemId: item.item.id, part: 13, category: item.item.category})} activeOpacity={0.8}>
        <NewsItem data={item} key={item.id} />
      </TouchableOpacity>
    );
  }

  handlePageChange = () => {
    this.setState({
      favdata: [],
      favpage: 0
    })
    this.makeFavRequest()
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
    this.state.anonsScrollView.scrollTo({x: w * page, y: 0, animated: true})
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

  clickChb(id) {
    var ids = this.state.filterids

    if (id == "0"){
      ids.map((catitem, key) => {
        ids[key] = false
      })
      ids["0"] = true
    } else {
      ids["0"] = false
      ids[id] = !ids[id]
    }

    var nofilter = 0
    ids.map((catitem, key) => {
      if (ids[key]){
        nofilter++
      }
    })

    if (nofilter == 0){
      ids.map((catitem, key) => {
        ids[key] = false
      })
      ids["0"] = true
    }

    this.setState({
      filterids: ids
    })
  }

  filterSubmit() {

    var ids = this.state.filterids
    var cats = []
    if (ids['0']){
      ids.map((catitem, key) => {
        cats.push(key)
      })
    }else{
      ids.map((catitem, key) => {
        if (ids[key]){
          cats.push(key)
        }
      })
    }
    var carts_string = cats.join(',')
    this.setState({
      page: 0,
      data: [],
      filteropen: false,
      filterstring: carts_string
    })
    const { page } = this.state
    const url = `https://mygsr.ru/get_news_page?category=${carts_string}&page=0`
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

  render() {
    const {isLoading, isFavLoading, data, favdata, bookmarkslinex, filtery, filteropen, userlogined, refreshfav, isFocused, categories, filterids } = this.state

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
            <View style={{position:'absolute', left: w, top: 0, width: w, height: h}}></View>
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
          <Text style={categoriestitle}>Категории:</Text>
          <TouchableOpacity style={filteritem} onPress={ref => {this.clickChb('0')}} activeOpacity={0.8}>
            <View style={filterids['0'] ? filterchbselect : filterchb}></View>
            <Text style={filtertitle}>Все</Text>
          </TouchableOpacity>
          { categories.map((item, key)=>(
            <TouchableOpacity style={filteritem} onPress={ref => {this.clickChb(item.id)}} activeOpacity={0.8}>
              <View style={filterids[item.id] ? filterchbselect : filterchb}></View>
              <Text style={filtertitle}>{item.title}</Text>
            </TouchableOpacity>)
          )}

          <TouchableOpacity style={filtersubmit} onPress={() => {this.filterSubmit()}} activeOpacity={0.8}>
            <Image style={filtersubmitimg} source={images.blue_bg} backgroundSize="stretch" />
            <Text style={filtersubmittext}>Применить</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

    )
  }
}


export { RosatomNewsLayout }
