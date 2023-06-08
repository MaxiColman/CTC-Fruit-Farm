import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import MyInputText from '../../../components/MyInputText'
import MyText from '../../../components/MyText'
import SingleButton from '../../../components/SingleButton'
import DatabaseConecction from '../../../database/db-connection'
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConecction.getConnection();

const AddUser = () => {

  // estados para los campos del formulario
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cedula, setCedula] = useState("");

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleUserName = (userName) => {
    setUserName(userName);
  }

  const handleLastName = (lastName) => {
    setLastName(lastName);
  }

  const handleUserCi = (cedula) => {
    setCedula(cedula);
  }


  const addUser = () => {
    console.log("### add user ###");
    if (validateData()) {
      console.log("### save user ###");
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (userName, lastName, cedula) VALUES (?, ?, ?)',
          [userName, lastName, cedula],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert("Exito", "Usuario registrado correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeUsuarios"),
                }
              ],
                {
                  cancelable: false
                });
              clearData();
            } else {
              Alert.alert("Error", "Error al registrar el usuario");
            }
          }
        )
      });
    }
  }
  

  // metodo validar datos
  const validateData = () => {
    if (userName === "" && !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es un campo obligatorio");
      return false;
    }

    if (lastName === "" && !lastName.trim()) {
      Alert.alert("Error", "El apellido es un campo obligatoria");
      return false;
    }

    if (cedula === "" && !cedula.trim()) {
      Alert.alert("Error", "La cedula es un campo obligatorio");
      return false;
    }

    return true;
  }

  //  clear de los datos
  const clearData = () => {
    setUserName("");
    setLastName("");
    setCedula("");
  }
  return (

      <SafeAreaView>
        <ScrollView>
            <MyText textValue="Formulario de ingreso de usuarios:" textStyle={styles.title} />
            <MyInputText
              style={styles.input}
              placeholder="Nombre"
              onChangeText={handleUserName}
              value={userName}
            />
            <MyInputText
              style={styles.input}
              placeholder="Apellido"
              onChangeText={handleLastName}
              value={lastName}
            />
            <MyInputText
              style={styles.input}
              placeholder="Cedula"
              onChangeText={handleUserCi}
              keyboardType="numeric"
              value={cedula}
            />
            <SingleButton
              title="Registrar Usuario"
              btnColor="green"
              onPress={addUser}
            />
        </ScrollView>
      </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
formContainer: {
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: 20,
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
  marginTop: 15,
},
input: {
  height: 40,
  borderWidth: 2,
  borderColor: 'green',
  marginBottom: 10,
  paddingHorizontal: 10,
  marginTop: 10,
},
});

export default AddUser