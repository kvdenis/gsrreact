import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
// добавляем ширину экрана
import { w } from '../../../../constants'

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
  // краткий текст
  shortstyle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#07296F',
    paddingLeft: 16,
    paddingBottom: 5
  },
  // заголовок
  titlestyle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#07296F',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 5
  },
  // контакты
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

  // формируем текст контактов
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
