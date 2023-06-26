import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import ButtonHomeUsuario from "../../components/ButtonHomeUsuario";
import {ImageBackground} from "react-native";
import DatabaseConecction from "../../database/db-connection";

const db = DatabaseConecction.getConnection();


const HomeZonas = ({ navigation }) => {

    const dropDb = (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS zonas', []);
      }
    
      const createDb = (txn) => {
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS zonas (id INTEGER PRIMARY KEY AUTOINCREMENT, lugar VARCHAR(60), depto VARCHAR(20), cantTrab VARCHAR(50), latitud VARCHAR(60), longitud VARCHAR(60))',
          []
        );
      }
    
      useEffect(() => {
        db.transaction((txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='zonas'", [],
            (_, results) => {
              if(results.rows.length == 0){
                dropDb(txn);
                createDb(txn);
              } else {
                console.log("Tabla ya existe");
                //dropDb(txn);
                //createDb(txn);
              }
            }
          )
        });
      }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/Imagenes/Fondo3.jpg')}
                style={styles.headerBackground}
            >
                <SafeAreaView>
                    <View>
                        <View>
                            <ScrollView>
                                <View>
                                    <ButtonHomeUsuario
                                        title="Agregar Zona"
                                        btnColor="#31994d"
                                        btnIcon="map-pin"
                                        onPress={() => navigation.navigate('AddZonas')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Borrar Zona"
                                        btnColor="#31994d"
                                        btnIcon="window-close-o"
                                        onPress={() => navigation.navigate('DeleteZonas')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Modificar Zona"
                                        btnColor="#31994d"
                                        btnIcon="edit"
                                        onPress={() => navigation.navigate('UpdateZonas')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Ver zona"
                                        btnColor="#31994d"
                                        btnIcon="safari"
                                        onPress={() => navigation.navigate('ViewZona')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Todas las zonas"
                                        btnColor="#31994d"
                                        btnIcon="globe"
                                        onPress={() => navigation.navigate('ViewAllZonas')}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
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

export default HomeZonas;


