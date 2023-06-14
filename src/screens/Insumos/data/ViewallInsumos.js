import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native'
import MyText from '../../../components/MyText'
import { useNavigation } from '@react-navigation/native'
import DatabaseConecction from '../../../database/db-connection'
const db = DatabaseConecction.getConnection();

const ViewallInsumos = () => {


  const [id, setInsumoid] = useState([]);
  const navigation = useNavigation();

// metodo para setear los estados

useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM insumos`, [], (tx, results) => {
      console.log("results", results);
      if (results.rows.length > 0) {
        setInsumoid(results.rows._array);
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
      <Text style={styles.title2}>Informacion del Insumo:</Text>
      <View style={styles.userInfoContainer}>
          <MyText textValue="ID del Insumo:" textStyle={styles.title} />
          <MyText textValue={item.id} textStyle={styles.textStyle} />
        </View>
      <View style={styles.userInfoContainer}>
        <MyText textValue="Nombre del insumo:" textStyle={styles.title} />
        <MyText textValue={item.insumoName} textStyle={styles.textStyle} />
      </View>
      <View style={styles.userInfoContainer}>
        <MyText textValue="Cantidad de litros:" textStyle={styles.title} />
        <MyText textValue={item.cantidadLitros} textStyle={styles.textStyle} />
      </View>
    </View>
  );
};

return (
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={id}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6',
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
    color: 'black',
    textAlign: 'center',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 10,
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 5,
  },
  listItemView: {
    backgroundColor: '#C6E2CB',
    margin: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  formContainer: {
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#C6E2CB',
    flex: 1,
  },
  userInfoContainer: {
    marginBottom: 2,
  },
  flatListContainer: {
    paddingHorizontal: 15,
  },
});

export default ViewallInsumos
