import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native'
import MyText from '../../../components/MyText'
import { ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native'
import DatabaseConecction from '../../../database/db-connection'
const db = DatabaseConecction.getConnection();

const ViewallInsumos = () => {


  const [insumoName, setInsumoName] = useState("");
  const [ cantidadLitros, setCantidadLitros] = useState("");

  const navigation = useNavigation();

// metodo para setear los estados
const handleinsumoName = (insumoName) => {
  setInsumoName(insumoName);
}

const handlecantidadLitros = (cantidadLitros) => {
  setCantidadLitros(cantidadLitros);
}
useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM insumos`, [], (tx, results) => {
      console.log("results", results);
      if (results.rows.length > 0) {
        setInsumoName(results.rows._array);
      } else {
        Alert.alert(
          "Mensaje",
          "No hay insumos!!!",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("HomeInsumos"),
            },
          ],
          { cancelable: false , text: "Cancelar",}
        );
      }
    });
  });
}, []);

const listItemView = (item) => {
  console.log("### algo ###", item);

  return (
    <View key={item.id} style={styles.listItemView}>
      <View style={styles.userInfoContainer}>
        <MyText textValue="Nombre del insumo:" textStyle={styles.title} />
        <MyText textValue={item.insumoName} textStyle={styles.textStyle} />
      </View>
      <View style={styles.userInfoContainer}>
        <MyText textValue="Cantidad de litros:" textStyle={styles.title} />
        <MyText textValue={item.cantLitros} textStyle={styles.textStyle} />
      </View>
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
          <FlatList
            data={insumoName}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  </View>
);
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
});

export default ViewallInsumos
