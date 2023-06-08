import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native'
import MyText from '../../../components/MyText'
import { useNavigation } from '@react-navigation/native'
import DatabaseConecction from '../../../database/db-connection'
const db = DatabaseConecction.getConnection();

const ViewAllZonas = () => {

const [lugar, setLugar] = useState([]);
const navigation = useNavigation();

const listItemView = (item) => {
  return (
    <View key={item.id} style={styles.listItemView}>
      <MyText textValue="Nombre de usuario" textStyle={styles.textStyle} />
      <MyText textValue={item.userName} textStyle={styles.textStyle} />
      <MyText textValue="Apellido de usuario" textStyle={styles.textStyle} />
      <MyText textValue={item.lastName} textStyle={styles.textStyle} />
      <MyText textValue="Cedula del usuario" textStyle={styles.textStyle} />
      <MyText textValue={item.cedula} textStyle={styles.textStyle} />
    </View>
  )
}

return (
    <SafeAreaView style={styles.container}>
    <View>
      <View>
        <FlatList
          data={{}}
          keyExtractor={({ item }) => listItemView(item)}
          renderItem={{}}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        />
      </View>
    </View>
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textStyle: {
    color: 'black',
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  listItemView: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
})

export default ViewAllZonas

