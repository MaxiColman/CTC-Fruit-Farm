import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";
import { ImageBackground } from "react-native";

const db = DatabaseConnection.getConnection();

const UpdateUser = () => {
  // estados
  const [userNameSearch, setUserNameSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cedula, setCedula] = useState("");
  const navigation = useNavigation();

  // metodo para setear los estados
  const handleUserNameSearch = (username) => {
    setUserNameSearch(username);
  };

  const handleUserName = (userName) => {
    setUserName(userName);
  };

  const handleUserLastName = (lastName) => {
    setLastName(lastName);
  };

  const handleCedula = (cedula) => {
    setCedula(cedula);
  };
  // metodo validar datos
  const validateData = () => {
    if (!userName && !userName.length && userName === "" && !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    if (!lastName && !lastName.length && lastName === "" && !lastName.trim()) {
      Alert.alert("Error", "El apellido del usuario es obligatoria");
      return false;
    }

    if (!cedula && !cedula.length && !cedula.trim()) {
      Alert.alert("Error", "El la cedula es un campo obligatorio");
      return false;
    }

    return true;
  };

  const clearUsernameSearch = () => {
    setUserNameSearch("");
  }

  //  clear de los datos
  const clearData = () => {
    setUserName("");
    setLastName("");
    setCedula("");
  };

  const editUser = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE users set userName=?, lastName=?, cedula=? WHERE userName=?",
          [userName, lastName, cedula, userNameSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Usuario actualizado correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeUsuarios"),
                },
                {
                  text: "Cancel",
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar el usuario");
            }
          }
        )
      })
    }
  };

  const searchUser = () => {
    if (!userNameSearch.trim() && userNameSearch === "") {
      Alert.alert("Error", "El nombre de usuario es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE userName = ?",
        [userNameSearch],
        (_, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            setUserName(user.userName);
            setLastName(user.lastName);
            setCedula(user.cedula);
          } else {
            Alert.alert("Error", "Usuario no encontrado");
            clearUsernameSearch();
          }
        }
      )
    });

  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../../assets/Imagenes/Fondo3.jpg')}
        style={styles.headerBackground}
      >
        <SafeAreaView style={styles.container}>

          <View style={styles.generalView}>
            <ScrollView>
              <KeyboardAvoidingView style={styles.keyboardView}>
                <MyText textValue="Buscar usuario:" textStyle={styles.title} />
                <MyInputText
                  placeholder="Ingrese el nombre de usuario"
                  onChangeText={handleUserNameSearch}
                  styles={styles.input}
                  value={userNameSearch}
                />
                <SingleButton
                  title="Buscar"
                  onPress={searchUser}
                  btnColor='green'
                />
                <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
                <MyInputText
                  placeholder="Nombre de usuario"
                  value={userName}
                  onChangeText={handleUserName}
                />

                <MyInputText
                  placeholder="Apellido del usuario"
                  value={lastName}
                  onChangeText={handleUserLastName}
                />

                <MyInputText
                  placeholder="Cedula del usuario"
                  value={cedula}
                  onChangeText={handleCedula}
                />

                <SingleButton
                  title="Editar" onPress={() => editUser()}
                  btnColor="green"
                />

              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 15,
  },
  generalView: {
    flex: 1,
  },
  textStyle: {
    padding: 10,
    marginLeft: 20,
    color: "black",
  },
  input: {
    padding: 15
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default UpdateUser;
