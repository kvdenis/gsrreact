// import React, { Component } from 'react'
// import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { VoiceItem } from './VoiceItem'
import axios from 'axios';

// import OpenNews from './OpenNews'
import images from 'res/images'
import { w, h } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    height: h - 64
  },
  horisontalpages: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: 2 * w,
    height: h - 60,
    overflow: 'hidden'
  },
  indicator: {
    paddingTop: 20,
    paddingBottom: 20,
    width: w
  },
  formenu: {
    position: 'absolute',
    width: 10,
    height: h,
    backgroundColor: '#ff00ff'
  }
})

const { container, horisontalpages, indicator, formenu } = styles

// const url = 'https://mygsr.ru/get_news_page?page=0&category='

// type Props = {
//     navigator: Object
// };

class VoiceLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, data: [], page: 0, cityid: '' };
    console.disableYellowBox = true;
  }

  componentDidMount() {


    var par = this
    AsyncStorage.getItem("city").then((value) => {
      par.setState({
        cityid: JSON.parse(value).id
      })
      console.log(JSON.parse(value).id)
      this.makeRequest()
    }).catch(() => {
      this.makeRequest();
    })
  }


  makeRequest = () => {
    const { page, cityid } = this.state;
    const url = `https://mygsr.ru/get_voice_page?page=${page}&city=${cityid}`
    console.log(url)
    axios.get(url)
      .then(res => {
        this.setState({
          isLoading: false,
          data: [...this.state.data, ...res.data]
        })
      }).catch((error)=>{
         console.log("Api call error")
         this.setState({
           isLoading: false
         })
      })
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest();
    })
  }

  renderFooter = () => {
    return (
      <View style={styles.headerBg}>
        <ActivityIndicator style={indicator} size="small" color="#07296F"/>
      </View>
    );
  };



  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenVoiceScreen', {itemId: item.item.id})} activeOpacity={0.8}>
        <VoiceItem data={item} key={item.id} />
      </TouchableOpacity>
    );
  }

  render() {
    const { isLoading } = this.state


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, left: -10 }}>
          <ActivityIndicator style={indicator} size="small" color="#07296F"/>
        </View>
      )
    }


    return (
      <View style={container}>
        <View style={horisontalpages}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={item => item.id}
            ListFooterComponent={isLoading ? this.renderFooter : null}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          />
        </View>
      </View>

    )
  }
}



export { VoiceLayout }
