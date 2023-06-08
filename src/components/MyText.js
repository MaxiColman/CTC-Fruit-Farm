import React from 'react'
import { StyleSheet, Text } from 'react-native'

const MyText = ({
    textStyle,
    textValue
}) => {
  return <Text style={[styles.text, textStyle]}>{textValue}</Text>
}


const styles = StyleSheet.create({
    text: {
        color: 'black'
    }
})

export default MyText