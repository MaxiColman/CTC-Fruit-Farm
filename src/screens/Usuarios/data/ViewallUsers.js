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
        } else{
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeUsuarios"),
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
          <MyText textValue="Nombre de Usuario" textStyle={styles.textStyle} />
          <MyText textValue={item.userName} textStyle={styles.textStyle} />
  
          <MyText textValue="Cedula del pibe" textStyle={styles.textStyle} />
          <MyText textValue={item.cedula} textStyle={styles.textStyle} />
        </View>
      );
    };

  

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={users}
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

export default ViewallUsers