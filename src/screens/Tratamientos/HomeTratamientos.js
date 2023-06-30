import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import ButtonHomeUsuario from '../../components/ButtonHomeUsuario';
import { ImageBackground } from 'react-native';
import DatabaseConecction from '../../database/db-connection';

const db = DatabaseConecction.getConnection();

const HomeTratamientos = ({ navigation }) => {
  const dropDb = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS tratamientos', []);
  };

  const createDb = (txn) => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS tratamientos (id INTEGER PRIMARY KEY AUTOINCREMENT, identificacion VARCHAR(20), nombre VARCHAR(60), zonas VARCHAR(60), users VARCHAR(60), fechaInicio VARCHAR(60), fechaFin VARCHAR(60), tiempo VARCHAR(60), ordenTrabajo VARCHAR(300), insumos VARCHAR(60), observaciones VARCHAR(60))',
      []
    );
  };

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tratamientos'",
        [],
        (_, results) => {
          if (results.rows.length == 0) {
            dropDb(txn);
            createDb(txn);
          } else {
            console.log('Tabla ya existe');
            //dropDb(txn);
            //createDb(txn);
          }
        }
      );
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
                    title="Agregar Tratamiento"
                    btnColor="#31994d"
                    btnIcon="plus-square"
                    onPress={() => navigation.navigate('AddTratamientos')}
                  />
                  <ButtonHomeUsuario
                    title="Borrar Tratamiento"
                    btnColor="#31994d"
                    btnIcon="minus-square"
                    onPress={() => navigation.navigate('DeleteTratamientos')}
                  />
                  <ButtonHomeUsuario
                    title="Modificar Tratamiento"
                    btnColor="#31994d"
                    btnIcon="edit"
                    onPress={() => navigation.navigate('UpdateTratamientos')}
                  />
                  <ButtonHomeUsuario
                    title="Ver Tratamiento"
                    btnColor="#31994d"
                    btnIcon="file-text-o"
                    onPress={() => navigation.navigate('ViewTratamientos')}
                  />
                  <ButtonHomeUsuario
                    title="Todos los Tratamientos"
                    btnColor="#31994d"
                    btnIcon="list"
                    onPress={() => navigation.navigate('ViewAllTratamientos')}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

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

export default HomeTratamientos;
