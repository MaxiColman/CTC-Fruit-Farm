import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { ImageBackground } from 'react-native';
import DatabaseConecction from "../database/db-connection";

const db = DatabaseConecction.getConnection();

const HomeScreen = ({ navigation }) => {

  const dropDb = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS users', []);
  }

  const createDb = (txn) => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(60), lastName VARCHAR(20), cedula NUMERIC(8))',
      []
    );
  }

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'", [],
        (_, results) => {
          if(results.rows.length == 0){
            dropDb(txn);
            createDb(txn);
          } else {
            console.log("Table already exists");
          }
        }
      )
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/Imagenes/Fondo2.jpg')}
        style={styles.headerBackground}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <Button
                title="Usuarios"
                btnColor="#31994d"
                btnIcon="user"
                onPress={() => navigation.navigate('HomeUsuarios')}
              />
              <Button
                title="Zonas"
                btnColor="#31994d"
                btnIcon="map"
                onPress={() => console.log('click')}
              />
              <Button
                title="Insumos"
                btnColor="#31994d"
                btnIcon="apple"
                onPress={() => console.log('click')}
              />
               <Button
                title="Observaciones"
                btnColor="#31994d"
                btnIcon="compass"
                onPress={() => console.log('click')}
              />
               <Button
                title="Tratamientos"
                btnColor="#31994d"
                btnIcon="street-view"
                onPress={() => console.log('click')}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    flex: 1,
  },
  headerBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default HomeScreen;