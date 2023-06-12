import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Alert, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import ModalDelete from "../../../components/ModalDelete";
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const UpdateUser = () => {
  // estados
  const [userNameSearch, setUserNameSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cedula, setCedula] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
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

  const openConfirmationModal = () => {
    if (!userName || !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return;
    }
  
    setShowConfirmationModal(true);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.generalView}>
        <ScrollView>
          <MyText textValue="Buscar usuario:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <Icon name="user" size={20} color="black" style={styles.icon} />
            <Text style={styles.title2}>Nombre del Usuario:</Text>
            <MyInputText
              placeholder="Ingrese el nombre"
              onChangeText={handleUserNameSearch}
              styles={styles.input}
              value={userNameSearch}
            />
            <SingleButton
              title="Buscar Usuario"
              onPress={searchUser}
              btnColor='green'
            />
          </View>
          <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <Icon name="user" size={20} color="black" style={styles.icon1} />
            <Text style={styles.title2}>Nombre del Usuario:</Text>
            <MyInputText
              placeholder="Ingrese el nombre"
              value={userName}
              onChangeText={handleUserName}
            />
            <Icon name="users" size={20} color="black" style={styles.icon2} />
            <Text style={styles.title2}>Apellido del Usuario:</Text>
            <MyInputText
              placeholder="Ingrese el apellido"
              value={lastName}
              onChangeText={handleUserLastName}
            />
            <Icon name="v-card" size={20} color="black" style={styles.icon3} />
            <Text style={styles.title2}>Cedula del Usuario:</Text>
            <MyInputText
              placeholder="Ingrese la cedula"
              value={cedula}
              onChangeText={handleCedula}
            />
            <SingleButton
              style={styles.button}
              title="Modificar Usuario"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas modificar este usuario?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                editUser();
              }}
              onCancel={() => setShowConfirmationModal(false)}
            />
          </View>
        </ScrollView>
      </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    marginBottom: 15,
  },
  icon: {
    position: 'absolute',
    left: 65,
    top: 22,
  },
  icon1: {
    position: 'absolute',
    left: 65,
    top: 22,
  },
  icon2: {
    position: 'absolute',
    left: 65,
    top: 136,
  },
  icon3: {
    position: 'absolute',
    left: 65,
    top: 252,
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
    marginTop: 15,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 72,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 5,
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
});

export default UpdateUser;
