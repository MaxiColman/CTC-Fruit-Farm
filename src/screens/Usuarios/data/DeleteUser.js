import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = () => {
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();

  const deleteUser = () => {
    if (!userName || !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Formulario para eliminar usuarios" textStyle={styles.title}/>
            <KeyboardAvoidingView>
              <MyInputText
                style={styles.input}
                placeholder="Nombre de usuario"
                onChangeText={handleUserName}
                value={userName}
              />
              <SingleButton
                style={styles.button}
                title="Borrar"
                btnColor="green"
                onPress={deleteUser}
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

export default DeleteUser;

