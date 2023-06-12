import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import ModalDelete from '../../../components/ModalDelete';
import Icon from 'react-native-vector-icons/Entypo';
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = () => {
  const [userName, setUserName] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigation = useNavigation();

  const deleteUser = () => {  

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE userName = ?',
        [userName],
        (_, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Exito", "Usuario borrado correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeUsuarios"),
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
                onPress: () => navigation.navigate("HomeUsuarios"),
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

  const handleUserName = (username) => {
    setUserName(username);
  }

  const openConfirmationModal = () => {
    if (!userName || !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return;
    }
  
    setShowConfirmationModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MyText textValue="Formulario para eliminar usuarios:" textStyle={styles.title} />
        <View style={styles.formContainer}>
          <Icon name="remove-user" size={20} color="black" style={styles.icon} />
          <Text style={styles.title2}>Nombre del Usuario:</Text>
          <MyInputText
            style={styles.input}
            placeholder="Ingrese un nombre"
            onChangeText={handleUserName}
            value={userName}
          />
          <SingleButton
            style={styles.button}
            title="Borrar Usuario"
            btnColor="green"
            onPress={openConfirmationModal}
          />
         <ModalDelete
        visible={showConfirmationModal}
        message="¿Estás seguro que deseas eliminar este usuario?"
        onConfirm={() => {
          setShowConfirmationModal(false);
          deleteUser();
        }}
        onCancel={() => setShowConfirmationModal(false)}
      />
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
  icon: {
    position: 'absolute',
    left: 65,
    top: 26,
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
    marginLeft: 72,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default DeleteUser;


