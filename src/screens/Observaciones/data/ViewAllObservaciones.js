import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, Image } from 'react-native'
import MyText from '../../../components/MyText'
import { useNavigation } from '@react-navigation/native'
import DatabaseConecction from '../../../database/db-connection'
const db = DatabaseConecction.getConnection();

const ViewAllObservaciones = () => {

  const [Obsid, setObsid] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM observaciones`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setObsid(results.rows._array);
        } else {
          Alert.alert(
            "ERROR",
            "No hay observaciónes!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeObservaciones"),
              },
            ],
            {
              text: "Cancel",
              cancelable: false
            }
          );
        }
      });
    });
  }, []);

  const listItemView = (item) => {

    return (
      <View key={item.id} style={styles.formContainer}>
        <Text style={styles.title2}>Informacion de la observación:</Text>
        <View style={styles.userInfoContainer}>
          <MyText textValue="ID de la observación:" textStyle={styles.title} />
          <MyText textValue={item.id} textStyle={styles.textStyle} />
        </View>
        <View style={styles.userInfoContainer}>
          <MyText textValue="Titulo:" textStyle={styles.title} />
          <MyText textValue={item.titulo} textStyle={styles.textStyle} />
        </View>
        <View style={styles.userInfoContainer}>
          <MyText textValue="Foto:" textStyle={styles.title} />
          <Image source={{ uri: item.foto }} style={styles.image} />
        </View>
        <View style={styles.userInfoContainer}>
          <MyText textValue="Latitud:" textStyle={styles.title} />
          <MyText textValue={item.latitud} textStyle={styles.textStyle} />
        </View>
        <View style={styles.userInfoContainer}>
          <MyText textValue="Longitud:" textStyle={styles.title} />
          <MyText textValue={item.longitud} textStyle={styles.textStyle} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={Obsid}
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
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
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
})

export default ViewAllObservaciones

