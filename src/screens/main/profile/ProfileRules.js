import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, WebView } from 'react-native'
import HTMLView from 'react-native-htmlview'
// добавляем ширину и высоту экрана
import { w, h } from '../../../../constants'
// получить текст правил
const url = 'https://mygsr.ru/get_app_rules'

const styles = StyleSheet.create({
  container: {
    width: w,
    marginTop: 0,
    backgroundColor: 'white'
  }
})
// html стили текста
const htmlstyles = StyleSheet.create({
  a: {
    color: '#07296F'
  },
  section: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    marginTop: 0,
    fontSize: 14,
    lineHeight: 20,
    color: '#5C6979',
    paddingBottom: 20,
  },
  table:{
    flex:1,
    flexDirection:'row',
    borderLeftWidth:1,
    borderTopWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#ccc',
    borderWidth:0.5,
  },
  tbody:{
  },
  tr:{
    flex:1,
    borderBottomWidth:1,
    flexDirection:'row',
    borderBottomColor:'#ccc'
  },
  td:{
    justifyContent:'flex-start',
    width:'50%',
    paddingHorizontal:12,
    paddingVertical:5,
    borderRightWidth:0.5,
    borderRightColor:'#ccc',
    alignItems:'flex-start'
  }
})

const { container } = styles

class ProfileRules extends Component {

  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  async componentDidMount(){
    const { params } = this.props.navigation.state;

    // получаем данные
    try {
      const response = await fetch(url)
      const data = await response.json()
      this.setState({ data })
    } catch (e) {
      throw e
    }
  }

  render() {
    const { data } = this.state
    const { params } = this.props.navigation.state;
    const link = params ? params.link : null
    return (
      <View style={container}>
        <HTMLView value={`<section>`+data.info+`</section>`} stylesheet={htmlstyles}/>
      </View>
    )
  }
}

export { ProfileRules }
