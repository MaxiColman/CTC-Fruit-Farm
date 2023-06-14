import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native'
import MyText from '../../../components/MyText'
import { useNavigation } from '@react-navigation/native'
import DatabaseConecction from '../../../database/db-connection'
const db = DatabaseConecction.getConnection();


const ViewallUsers = () => {

  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM users`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setUsers(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeUsuarios"),
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
      <Text style={styles.title2}>Informacion del Usuario:</Text>
      <View style={styles.userInfoContainer}>
          <MyText textValue="ID del Usuario:" textStyle={styles.title} />
          <MyText textValue={item.id} textStyle={styles.textStyle} />
        </View>
        <View style={styles.userInfoContainer}>
          <MyText textValue="Nombre:" textStyle={styles.title} />
          <MyText textValue={item.userName} textStyle={styles.textStyle} />
        </View>
        <View style={styles.userInfoContainer}>
          <MyText textValue="Apellido:" textStyle={styles.title} />
          <MyText textValue={item.lastName} textStyle={styles.textStyle} />
        </View>
        <View style={styles.userInfoContainer}>
          <MyText textValue="Cedula:" textStyle={styles.title} />
          <MyText textValue={item.cedula} textStyle={styles.textStyle} />
        </View>
      </View>
    );
  };

  return (
        <SafeAreaView style={styles.container}>
          <View>
            <FlatList
              data={users}
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
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 15,
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
    marginBottom: 3,
  },
  flatListContainer: {
    paddingHorizontal: 15,
  },
});


export default ViewallUsers