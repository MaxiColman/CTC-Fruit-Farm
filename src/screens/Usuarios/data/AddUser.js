import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import MyInputText from '../../../components/MyInputText'
import MyText from '../../../components/MyText'
import SingleButton from '../../../components/SingleButton'
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import DatabaseConecction from '../../../database/db-connection'
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MyText textValue="Formulario ingreso de Usuarios:" textStyle={styles.title} />
        <View style={styles.formContainer}>
          <Text style={styles.title2}>Nombre:</Text>
          <MyInputText
            style={styles.input}
            placeholder="Ingrese un nombre"
            onChangeText={handleUserName}
            value={userName}
          />
          <Text style={styles.title2}>Apellido:</Text>
          <MyInputText
            style={styles.input}
            placeholder="Ingrese un apellido"
            onChangeText={handleLastName}
            value={lastName}
          />
          <Text style={styles.title2}>Cedula:</Text>
          <MyInputText
            style={styles.input}
            placeholder="Ingrese una cedula"
            onChangeText={handleUserCi}
            keyboardType="numeric"
            value={cedula}
          />
          <SingleButton
            title="Registrar Usuario"
            btnColor="green"
            onPress={addUser}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  formContainer: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  icon: {
    position: 'absolute',
    left: 45,
    top: 27,
  },
  icon1: {
    position: 'absolute',
    left: 45,
    top: 146,
  },
  icon2: {
    position: 'absolute',
    left: 45,
    top: 266,
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
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 10,
  },
  input: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 35,
    marginTop: 20,
  },
});

export default AddUser