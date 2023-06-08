import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import MyInputText from '../../../components/MyInputText'
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
      
      // Llama a la función getConnection() en lugar de usar la variable db directamente
      const database = DatabaseConecction.getConnection();
  
      database.transaction((tx) => {
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
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                style={styles.inputNom}
                placeholder="Nombre"
                onChangeText={handleUserName}
                value={userName}
              />
              <MyInputText
                style={styles.inputApell}
                placeholder="Apellido"
                onChangeText={handleLastName}
                value={lastName}
              />
              <MyInputText
                style={styles.inputCi}
                placeholder="Cedula"
                onChangeText={handleUserCi}
                keyboardType="numeric"
                value={cedula}
              />
              <SingleButton
                title='Registrar Usuario'
                btnColor="green"
                onPress={addUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {},
  inputNom: {},
  inputApell: {},
  inputCi: {},
})

export default AddUser