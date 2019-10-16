import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { VoiceItem } from './VoiceItem'
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


class VoiceLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, data: [], page: 0, cityid: '' };
    console.disableYellowBox = true;
  }

  componentDidMount() {


    var par = this
    // получаем выбранный город из AsyncStorage
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
    // получить список голосований в выбранном городе. если город пустой то придут все города
    const url = `https://mygsr.ru/get_voice_page?page=${page}&city=${cityid}`
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

  // подгружаем следующую страницу
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.makeRequest();
    })
  }

  // выводим прелоадер в футере по мере прокрутки
  renderFooter = () => {
    return (
      <View style={styles.headerBg}>
        <ActivityIndicator style={indicator} size="small" color="#07296F"/>
      </View>
    );
  };


  // формируем элемент списка голосования
  renderItem(item) {
    return (
        // при нажатии на элемент переходим в открытое голосование
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenVoiceScreen', {itemId: item.item.id})} activeOpacity={0.8}>
        <VoiceItem data={item} key={item.id} />
      </TouchableOpacity>
    );
  }

  render() {
    const { isLoading } = this.state


    // если идет загрузка отображаем прелоадер в футере
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, left: -10 }}>
          <ActivityIndicator style={indicator} size="small" color="#07296F"/>
        </View>
      )
    }


    // выводим список
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
