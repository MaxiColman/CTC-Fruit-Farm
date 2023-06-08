import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView,} from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";

import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const ViewZona = () => {

const [lugar, setLugar] = useState("");

  // metodo para setear los estados
const handleLugar = (lugar) => {
  setLugar(lugar);
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyText text="Filtrar Lugar" style={styles.text}/>
              <MyInputText
                placeholder="Nombre de lugar"
                onChangeText={handleLugar}
                style={styles.input}
                value={lugar}
              />
              <SingleButton title="Buscar" btnColor="green" onPress={{}} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#e0e0e0",
  },
  presenterText: {
    fontSize: 18,
    color: "black",
  },
  presenterTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  }
});

export default ViewZona
