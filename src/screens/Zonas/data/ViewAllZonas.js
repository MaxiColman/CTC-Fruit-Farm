import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native'
import MyText from '../../../components/MyText'
import { useNavigation } from '@react-navigation/native'
import { ImageBackground } from "react-native";
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
        <MyText textValue="Nombre del lugar:" textStyle={styles.title} />
        <MyText textValue={item.lugar} textStyle={styles.textStyle} />
        <MyText textValue="Nombre del Departamento:" textStyle={styles.title} />
        <MyText textValue={item.depto} textStyle={styles.textStyle} />
        <MyText textValue="Cantidad Trabajadores:" textStyle={styles.title} />
        <MyText textValue={item.cantTrab} textStyle={styles.textStyle} />
        <MyText textValue="Latitud:" textStyle={styles.title} />
        <MyText textValue={item.latitud} textStyle={styles.textStyle} />
        <MyText textValue="Longitud" textStyle={styles.title} />
        <MyText textValue={item.longitud} textStyle={styles.textStyle} />
      </View>
    );
  };



return (
  <View style={styles.container}>
    <ImageBackground
      source={require('../../../../assets/Imagenes/FondoFormularios2.jpg')}
      style={styles.headerBackground}
    >
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
  </ImageBackground>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textStyle: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  headerBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  listItemView: {
    backgroundColor: '#C6E2CB',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  userInfoContainer: {
    marginBottom: 3,
  },
  flatListContainer: {
    paddingHorizontal: 15,
  },
})

export default ViewAllZonas

