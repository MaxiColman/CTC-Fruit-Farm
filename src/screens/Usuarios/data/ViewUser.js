import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  console.log("### user ###", user)

  const handleUserName = (username) => {
    setUserName(username);
  };

  const getUser = () => {
    if (!userName && !userName.length && userName === "") {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    console.log("### userName ###", userName);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE userName=?",
        [userName],
        (tx, results) => {
          console.log("Results", results.rows);
          if (results.rows.length > 0) {
            console.log('seteo usuario')
            setUser(results.rows._array[0]);
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
  };

  return (
        <SafeAreaView style={styles.container}>
          <View style={styles.viewContainer}>
          <MyText textValue="Formulario para buscar usuarios:" textStyle={styles.title} />
            <View style={styles.formContainer}>
              <ScrollView>
                <KeyboardAvoidingView>
                <Text style={styles.title2}>Nombre del Usuario:</Text>
                  <MyInputText
                    placeholder="Ingrese un nombre"
                    onChangeText={handleUserName}
                    style={styles.input}
                    value={userName}
                  />
                  <SingleButton title="Buscar" btnColor="green" onPress={getUser} />
                  <Text style={styles.title2}>Informacion del Usuario:</Text>
                  <View style={styles.presenterView}>
                    {user ? (
                      <>
                        <MyText textValue="ID del Usuario:" textStyle={styles.presenterTextBold} />
                        <MyText textValue={user.id.toString()} textStyle={styles.presenterText} />
                        <MyText textValue="Nombre del Usuario:" textStyle={styles.presenterTextBold} />
                        <MyText textValue={user.userName} textStyle={styles.presenterText} />
                        <MyText textValue="Apellido de usuario:" textStyle={styles.presenterTextBold} />
                        <MyText textValue={user.lastName} textStyle={styles.presenterText} />
                        <MyText textValue="Cedula de usuario:" textStyle={styles.presenterTextBold} />
                        <MyText textValue={user.cedula} textStyle={styles.presenterText} />
                      </>
                    ) : (
                      <Text style={styles.presenterTextBold}>Ingrese un Usuario</Text>
                    )}
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
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
    marginBottom: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
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
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 5,
  },
  icon: {
    position: 'absolute',
    left: 45,
    top: 6,
  },
  icon1: {
    position: 'absolute',
    left: 45,
    top: 202,
  },
  viewContainer: {
    flex: 1,
  },
  headerBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  generalView: {
    flex: 1,
  },
  text: {
    padding: 10,
    marginLeft: 20,
    color: 'black'
  },
  input: {
    padding: 10,
    margin: 10,
    color: 'black'
  },
  presenterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignContent: "center",
    margin: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#C6E2CB',
  },
  presenterText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  presenterTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    marginTop: 5,
  },
});

export default ViewUser;
