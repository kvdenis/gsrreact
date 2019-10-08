import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, Animated, ListView, TouchableOpacity, View, AsyncStorage } from 'react-native'
import HTMLView from 'react-native-htmlview'
import axios from 'axios'
import images from 'res/images'
import { w, h } from '../../../../constants'

const url = 'https://mygsr.ru/get_ads_by_id?id='

const styles = StyleSheet.create({
  container: {
    width: w,
    height: h - 64,
    backgroundColor: 'white'
  },
  containerhidden: {
    display: 'none'
  },
  scrollcontainer: {
    position: 'absolute',
    width: w,
    height: h - 104
  },
  datestyle: {
    fontSize: 14,
    lineHeight: 14,
    color: '#71859E',
    paddingLeft: 16,
    paddingTop: 20
  },
  timestyle:{
    fontSize: 14,
    lineHeight: 14,
    color: '#71859E',
    paddingLeft: 16,
    paddingTop: 0,
    paddingBottom: 20
  },
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16
  },
  textstyle: {
    fontSize: 14,
    lineHeight: 18,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    opacity: 0.3
  },
  faviconbtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: w - 50,
    top: 0
  },
  favicon:{
    width: 50,
    height: 50
  }

})
const htmlstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    color: '#5C6979',
    fontSize: 14,
    paddingBottom: 20
  }
})

const { scrollcontainer, containerhidden, container, datestyle, titlestyle, textstyle, timestyle, faviconbtn, favicon } = styles



class OpenAds extends Component {
  nScroll = new Animated.Value(0);

  constructor(props) {
    super(props)
    this.state = { data: [], isfav: 0, isLoading: true, part:'4' }
  }

  componentDidMount = async () => {
    const { params } = this.props.navigation.state;
    const part = params ? params.part : null
    const itemId = params ? params.itemId : null;
    this.setState({ itemId: itemId })


    AsyncStorage.getItem("userdata").then((value) => {
      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

      }else{

      }
      const favurl = `https://mygsr.ru/is_favorite_ios?part=4&partid=${itemId}&userid=${this.state.userdata.id}&token=${this.state.userdata.token}`

      console.log(favurl)

      axios.all([axios.get(url + itemId),
                axios.get(favurl)
               ])
           .then(axios.spread((firstResponse, secondResponse) => {
             this.setState({
               data: firstResponse.data,
               isfav: secondResponse.data.count,
               isLoading: false
             })
             console.log(secondResponse.data)
           }))
           .catch(error => console.log("Api call error"))

    })
    .then(res => {
    })
  }

  addRemoveFavourite() {
    const { isfav } = this.state
    const par = this
    AsyncStorage.getItem("userdata").then((value) => {

      if (value != null){
        this.setState({
          userdata: JSON.parse(value)
        })

        var favapiurl = 'https://mygsr.ru/addfavorite'
        if (isfav > 0){
          favapiurl = 'https://mygsr.ru/removefavorite'
        }

        var data = {
          part: this.state.part,
          partid: this.state.itemId,
          userid: this.state.userdata.id,
          token: this.state.userdata.token
        }
        console.log(favapiurl)

        var formBody = []
        for (var property in data) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(data[property])
          formBody.push(encodedKey + "=" + encodedValue)
        }
        formBody = formBody.join("&")
        axios({
          method: 'POST',
          url: favapiurl,
          headers: {'Authorization': 'Bearer token', 'Content-Type': 'application/x-www-form-urlencoded'},
          data: formBody
        })
        .then(function (response) {
          // console.log(isfav)
          if (isfav == 0){
            par.setState({ isfav: 1 })
          } else {
            par.setState({ isfav: 0 })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      }else{
        this.props.navigation.navigate('Auth')
      }

    })
    .then(res => {
    });
  }

  render() {
    const { data, isfav, isLoading } = this.state
    console.log(data)

    return (
      <View style={isLoading ? containerhidden : container}>
        <ScrollView style={scrollcontainer}>
          <Text style={datestyle}>{data.dte}</Text>
          <TouchableOpacity activeOpacity={0.8} style={faviconbtn} onPress={() => this.addRemoveFavourite()}>
            <Image source={isfav==0 ? images.favourite : images.favourite_active} style={favicon} resizeMode="stretch" />
          </TouchableOpacity>
          <Text style={titlestyle}>{data.title}</Text>
          <Text style={timestyle}>{data.time}</Text>
          <HTMLView style={{paddingBottom: 50}} value={'<section>'+data.info+"</section>"} stylesheet={htmlstyles} onLinkPress={url => this.props.navigation.navigate('WebViewScreen', {link: url})} />
        </ScrollView>
      </View>
    )
  }
}

export { OpenAds }
