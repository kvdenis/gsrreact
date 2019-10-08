import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text, Dimentions, TextInput, Alert, AsyncStorage, PickerIOS, Picker } from 'react-native'
import axios from 'axios';
import images from 'res/images'
import { w, h } from '../../../constants'

const koef = w / 375
const styles = StyleSheet.create({
  container: {
    width: w,
    height: h
  },
  pickerstyle: {
    width: w,
    left: 0,
    top: h / 2 - 150,
    height: 200
  },
  pickersubmit: {
    position: 'absolute',
    marginLeft: 30,
    width: w - 60,
    height: 48,
    top: h / 2 + 100
  },
  pickersubmitimg: {
    position: 'absolute',
    width: w - 60,
    height: 48,
    borderRadius: 24
  },
  pickersubmittext: {
    width: w - 60,
    lineHeight: 48,
    textAlign: 'center',
    color: 'white',
    fontSize: 17
  },
  backbtn:{
    position: 'absolute',
    width: w,
    height: h,
    left:0,
    top:0
  }
})
const { container, pickerstyle, pickersubmit, pickersubmitimg, pickersubmittext, backbtn } = styles

class CitySelectLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {city: '', cities: [], citytitle: ''}
  }
  componentDidMount() {
    const url = `https://mygsr.ru/get_cities_ios`
    axios.get(url)
      .then(res => {
        this.setState({
          cities: [...this.state.cities, ...res.data]
        })
      }).catch((error)=>{
         console.log("Api call error")
      })
  }

  pickerSubmit = async () => {
    var values = {id: this.state.city, title: this.state.citytitle};

    var par = this.props.navigation
    par.goBack()
    console.log(values)
    try {
      await AsyncStorage.setItem('city', JSON.stringify(values))
    } catch (e) {
    }


  }

  setInfo(itemValue, itemIndex) {
    this.setState({city: itemValue, citytitle: this.state.cities[itemIndex-1].title })
    if (itemIndex >= 0){
    }else{
      this.setState({city: itemValue, citytitle: this.state.cities[0].title })
    }
  }


  render() {
    const { cities } = this.state
    return (
        <View style={container}>
          <TouchableOpacity style={backbtn} onPress={() => {this.props.navigation.goBack()}}></TouchableOpacity>
          <Picker
            selectedValue={this.state.city}
            style={pickerstyle}
            onValueChange={(itemValue, itemIndex) => this.setInfo(itemValue, itemIndex)}>
            <Picker.Item label='Все города' value='' />
            { cities.map((item, key)=>(
              <Picker.Item label={item.title} value={item.id} />)
            )}
          </Picker>
          <TouchableOpacity style={pickersubmit} onPress={() => {this.pickerSubmit()}} activeOpacity={0.8}>
            <Image style={pickersubmitimg} source={images.blue_bg} backgroundSize="stretch" />
            <Text style={pickersubmittext}>Выбрать</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export { CitySelectLayout }
