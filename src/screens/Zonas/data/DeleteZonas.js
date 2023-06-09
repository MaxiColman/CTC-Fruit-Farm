import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteZonas = () => {
  const [ZonaId, setZonaId] = useState("");
  const navigation = useNavigation();

  const deleteZona = () => {
    if (!ZonaId || !ZonaId.trim()) {
      Alert.alert("Error", "El numero de ID de la zona es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM zonas WHERE id = ?',
        [ZonaId],
        (_, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Exito", "Esta zona fue borrada correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeZonas"),
              }
            ],
              {
                cancelable: false
              }
            );
          } else {
            Alert.alert("Error", "El usuario no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeZonas"),
              }
            ],
              {
                cancelable: false
              }
            )
          }
        }
      );
    });
  }

  const handleZonaId = (id) => {
    setZonaId(id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Formulario para eliminar una zona" textStyle={styles.title} />
            <KeyboardAvoidingView>
              <MyInputText
                style={styles.input}
                placeholder="ID de la zona que quiere borrar"
                onChangeText={handleZonaId}
                keyboardType='numeric'
                value={ZonaId}
              />
              <SingleButton
                style={styles.button}
                title="Borrar Zona"
                btnColor="green"
                onPress={deleteZona}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default DeleteZonas
