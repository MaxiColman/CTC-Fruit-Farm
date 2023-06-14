import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from "../../../database/db-connection";
import ModalDelete from '../../../components/ModalDelete';
const db = DatabaseConnection.getConnection();

const DeleteZonas = () => {
  const [ZonaId, setZonaId] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigation = useNavigation();

  const deleteZona = () => {
   
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
                text: "Cancel",
                cancelable: false
              }
            );
          } else {
            Alert.alert("Error", "La zona no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeZonas"),
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

  const handleZonaId = (id) => {
    setZonaId(id);
  }

  const openConfirmationModal = () => {
    if (!ZonaId || !ZonaId.trim()) {
      Alert.alert("Error", "El ID de la zona es obligatorio");
      return;
    }
  
    setShowConfirmationModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MyText textValue="Formulario para eliminar una zona" textStyle={styles.title} />
        <View style={styles.formContainer}>
          <KeyboardAvoidingView>
            <MyText textValue="Ingrese ID de la zona a borrar" textStyle={styles.title2} />
            <MyInputText
              style={styles.input}
              placeholder="ID de la zona"
              onChangeText={handleZonaId}
              keyboardType='numeric'
              value={ZonaId}
            />
            <SingleButton
              style={styles.button}
              title="Borrar Zona"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas eliminar esta zona?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                deleteZona();
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

export default DeleteZonas
