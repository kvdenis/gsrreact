import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { BonusItem } from './BonusItem'
import axios from 'axios';

// импорт картинок
import images from 'res/images'
// добавляем ширину и высоту экрана
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
  // прелоадер
  indicator: {
    paddingTop: 20,
    paddingBottom: 20,
    width: w
  },
  // стиль скрытого прелоадера
  indicatorhidden: {
    display: 'none'
  },
  // задаем высоту футера
  footerblock: {
    height: 20
  },
})

const { container, horisontalpages, indicator, footerblock, indicatorhidden } = styles

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

    // получаем данные о пользовтаеле и загружаем его бонусы по id
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })
        // получить список активностей пользователя
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

  // загрузка страниц данных при прокрутке
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest();
    })
  }

  // выводим прелоадер в футере при прокрутке
  renderFooter = () => {
    const {isLoading } = this.state
    return (
      <View style={footerblock}>
        <ActivityIndicator style={isLoading ? indicator : indicatorhidden} size="small" color="#07296F"/>
      </View>
    )
  }




  // выводим бонус
  renderItem(item) {
    return (
      <BonusItem data={item} key={item.id} />
    )
  }

  render() {
    // если идет загрузка выводим прелоадер в футере
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
