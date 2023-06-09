import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView,} from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
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
    if(!userName && !userName.length && userName === ""){
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
          if(results.rows.length > 0){
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
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyText text="Filtrar usuario" style={styles.text}/>
              <MyText textValue="Formulario para buscar usuarios:" textStyle={styles.title}/>
              <MyInputText
                placeholder="Nombre de usuario"
                onChangeText={handleUserName}
                style={styles.input}
                value={userName}
              />
              <SingleButton title="Buscar" btnColor="green" onPress={getUser} />

              <View style={styles.presenterView}>
                {user ? (
                  <>
                    <MyText textValue="ID del Usuario:" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.id.toString()} textStyle={styles.presenterText}/>
                    <MyText textValue="Nombre del Usuario:" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.userName} textStyle={styles.presenterText}/>
                    <MyText textValue="Apellido de usuario:" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.lastName} textStyle={styles.presenterText}/>
                    <MyText textValue="Cedula de usuario:" textStyle={styles.presenterTextBold}/>
                    <MyText textValue={user.cedula} textStyle={styles.presenterText}/>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  text:{
    padding: 10,
    marginLeft: 20,
    color: 'black'
  },
  input:{
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
    borderRadius: 10,
    backgroundColor: '#C6E2CB',
  },
  presenterText: {
    fontSize: 18,
    color: "red",
  },
  presenterTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    marginTop: 5,
  }
});

export default ViewUser;
