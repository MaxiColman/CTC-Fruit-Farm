import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from "../../../database/db-connection";
import ModalDelete from '../../../components/ModalDelete';
const db = DatabaseConnection.getConnection();

const DeleteObservacion = () => {
  const [ObsId, setObsId] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigation = useNavigation();

  const deleteObservacion = () => {
   
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM observaciones WHERE id = ?',
        [ObsId],
        (_, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Exito", "Esta observación fue borrada correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeObservaciones"),
              }
            ],
              {
                text: "Cancel",
                cancelable: false
              }
            );
          } else {
            Alert.alert("Error", "La observación no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeObservaciones"),
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

  const handleObseId = (id) => {
    setObsId(id);
  }

  const openConfirmationModal = () => {
    if (!ObsId || !ObsId.trim()) {
      Alert.alert("Error", "El ID de la observación es obligatorio");
      return;
    }
  
    setShowConfirmationModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MyText textValue="Formulario para eliminar una observación" textStyle={styles.title} />
        <View style={styles.formContainer}>
          <KeyboardAvoidingView>
            <MyText textValue="Ingrese ID de la observación" textStyle={styles.title2} />
            <MyInputText
              style={styles.input}
              placeholder="Ingrese un ID"
              onChangeText={handleObseId}
              keyboardType='numeric'
              value={ObsId}
            />
            <SingleButton
              style={styles.button}
              title="Borrar Observación"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas eliminar esta observación?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                deleteObservacion();
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

export default DeleteObservacion
