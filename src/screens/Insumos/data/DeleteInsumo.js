import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteInsumo = () => {
  const [insumoId, setInsumoId] = useState("");
  const navigation = useNavigation();

  const deleteInsumo = () => {
    if (!insumoId || !insumoId.trim()) {
      Alert.alert("Error", "El numero de ID del insumo es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM insumos WHERE id = ?',
        [insumoId],
        (_, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Exito", "Esta zona fue borrada correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeInsumos"),
              }
            ],
              {
                text: "Cancel",
                cancelable: false
              }
            );
          } else {
            Alert.alert("Error", "El insumo no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeInsumos"),
              }
            ],
              {
                text: "Cancel",
                cancelable: false
              }
            )
          }
        }
      );
    });
  }

  const handleInsumoId = (id) => {
    setInsumoId(id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Formulario para eliminar un insumo" textStyle={styles.title} />
            <KeyboardAvoidingView>
              <MyInputText
                style={styles.input}
                placeholder="ID del Insumo que quiere borrar"
                onChangeText={handleInsumoId}
                keyboardType='numeric'
                value={insumoId}
              />
              <SingleButton
                style={styles.button}
                title="Borrar Insumo"
                btnColor="green"
                onPress={deleteInsumo}
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

export default DeleteInsumo