import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native'
import MyText from '../../../components/MyText'
import { useNavigation } from '@react-navigation/native'
import DatabaseConecction from '../../../database/db-connection'
const db = DatabaseConecction.getConnection();

const ViewAllZonas = () => {

const [Zonaid, setZonaid] = useState([]);
const navigation = useNavigation();

useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM zonas`, [], (tx, results) => {
      console.log("results", results);
      if (results.rows.length > 0) {
        setZonaid(results.rows._array);
      } else{
        Alert.alert(
          "Mensaje",
          "No hay zonas!!!",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("HomeZonas"),
            },
          ],
          { cancelable: false }
        );
      }
    });
  });
}, []);

const listItemView = (item) => {
    
  return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Nombre del lugar:" textStyle={styles.textStyle} />
        <MyText textValue={item.lugar} textStyle={styles.textStyle} />
        <MyText textValue="Nombre del Departamento:" textStyle={styles.textStyle} />
        <MyText textValue={item.depto} textStyle={styles.textStyle} />
        <MyText textValue="Cantidad Trabajadores:" textStyle={styles.textStyle} />
        <MyText textValue={item.cantTrab} textStyle={styles.textStyle} />
        <MyText textValue="Latitud:" textStyle={styles.textStyle} />
        <MyText textValue={item.latitud} textStyle={styles.textStyle} />
        <MyText textValue="Longitud" textStyle={styles.textStyle} />
        <MyText textValue={item.longitud} textStyle={styles.textStyle} />
      </View>
    );
  };



return (
  <SafeAreaView style={styles.container}>
    <View>
      <View>
        <FlatList
          data={Zonaid}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => listItemView(item)}
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

