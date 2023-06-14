import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import ModalDelete from '../../../components/ModalDelete';
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteInsumo = () => {
  const [insumoId, setInsumoId] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigation = useNavigation();

  const deleteInsumo = () => {

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

  const openConfirmationModal = () => {
    if (!insumoId || !insumoId.trim()) {
      Alert.alert("Error", "El ID del Insumo es obligatorio");
      return;
    }

    setShowConfirmationModal(true);
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MyText textValue="Formulario para eliminar un Insumo" textStyle={styles.title} />
        <View style={styles.formContainer}>
          <KeyboardAvoidingView>
          <MyText textValue="Ingrese ID del Insumo a borrar" textStyle={styles.title2} />
            <MyInputText
              style={styles.input}
              placeholder="Ingrese un ID"
              onChangeText={handleInsumoId}
              keyboardType='numeric'
              value={insumoId}
            />
            <SingleButton
              style={styles.button}
              title="Borrar Insumo"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas eliminar este Insumo?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                deleteInsumo();
              }}
              onCancel={() => setShowConfirmationModal(false)}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  formContainer: {
    marginTop: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
  },
  content: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 45,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 44,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 10,
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