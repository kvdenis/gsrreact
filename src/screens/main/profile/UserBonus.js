import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { BonusItem } from './BonusItem'
import axios from 'axios';

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
  indicatorhidden: {
    display: 'none'
  },
  footerblock: {
    height: 20
  },
  formenu: {
    position: 'absolute',
    width: 10,
    height: h,
    backgroundColor: '#ff00ff'
  }
})

const { container, horisontalpages, indicator, formenu, footerblock, indicatorhidden } = styles

class UserBonus extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, data: [], page: 0 };
    console.disableYellowBox = true;
  }

  componentDidMount = async () => {
    this.makeRequest();
  }


  makeRequest = () => {
    const { page } = this.state;

    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })
        const url = `https://mygsr.ru/get_user_bonus_page?page=${page}&userid=${JSON.parse(value).id}`
        axios.get(url)
          .then(res => {
            this.setState({
              isLoading: false,
              data: [...this.state.data, ...res.data]
            })
          }).catch((error)=>{
             console.log("Api call error ads")
          })
      }else{
        this.setState({
          isLoading: false,
          data: []
        })
      }

    })
    .then(res => {
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
    const {isLoading } = this.state
    return (
      <View style={footerblock}>
        <ActivityIndicator style={isLoading ? indicator : indicatorhidden} size="small" color="#07296F"/>
      </View>
    )
  }




  renderItem(item) {
    return (
      <BonusItem data={item} key={item.id} />
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
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
            ListFooterComponent={this.renderFooter}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          />
        </View>
      </View>

    )
  }
}



export { UserBonus }
