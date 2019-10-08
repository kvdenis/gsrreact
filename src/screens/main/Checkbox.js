import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import images from 'res/images'
// import OpenNews from './OpenNews'

const styles = StyleSheet.create({
  container: {
    width: w - 40,
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 20,
    shadowRadius: 5,
    shadowOpacity: 0.15
  },
  simage: {
    width: w - 40,
    height: 162
  },
  datestyle: {
    fontSize: 12,
    lineHeight: 34,
    color: '#71859E',
    paddingLeft: 16
  },
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  }
})


const Checkbox = ({ data }) => {
  const { filteritem, filterchb, filtertitle } = styles
  const { title } = data.item
  // console.log(data)
  return (
    <TouchableOpacity style={filteritem} onPress={ref => {this.clickChb(ref)}} activeOpacity={0.8}>
      <View style={filterchb}></View>
      <Text style={filtertitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export { Checkboxs }
