import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import images from 'res/images'
import { w } from '../../../../constants'
// import OpenNews from './OpenNews'

const styles = StyleSheet.create({
  container: {
    width: w - 40,
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 20,
    shadowRadius: 5,
    shadowOpacity: 0.15,
    paddingBottom: 15
  },
  shortstyle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#07296F',
    paddingLeft: 16,
    paddingBottom: 5
  },
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 5
  },
  contacts: {
    fontSize: 12,
    lineHeight: 16,
    color: '#5494CE',
    paddingLeft: 16,
    paddingRight: 16
  }

})


const BusinessItem = ({ data }) => {
  const { container, shortstyle, titlestyle, contacts } = styles
  const { title, short, site, address, email, phone } = data.item

  var conatcts_str = ''
  if (phone != ''){
    conatcts_str += 'Телефон: ' + phone + '\n'
  }
  if (email != ''){
    conatcts_str += 'E-mail: ' + email + '\n'
  }
  if (site != ''){
    conatcts_str += 'Сайт: ' + site + '\n'
  }
  conatcts_str += address
  // console.log(data)
  return (
    <View style={container}>
      <Text style={titlestyle}>{title}</Text>
      <Text style={shortstyle}>{short}</Text>
      <Text style={contacts}>{conatcts_str}</Text>
    </View>
  )
}

export { BusinessItem }
