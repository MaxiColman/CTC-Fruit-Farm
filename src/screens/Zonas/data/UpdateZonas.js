import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert,} from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";

const db = DatabaseConnection.getConnection();

const UpdateZonas = () => {

const [lugar, setLugar] = useState("");
const [departamento, setDepartamento] = useState("");
const [cantTrabajo, setCantTrabajo] = useState("");
const [latitud, setLatitud] = useState("");
const [longitud, setLongitud] = useState("");

const navigation = useNavigation();

  // metodo para setear los estados
  const handleLugar = (lugar) => {
    setLugar(lugar);
  }
  
  const handleDepartamento = (departamento) => {
    setDepartamento(departamento);
  }
  
  const handleCantTrabajo = (cantTrabajo) => {
    setCantTrabajo(cantTrabajo);
  }
  
  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  }
  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>

            <MyInputText 
              placeholder="Nombre de lugar"
              value={lugar}
              onChangeText={handleLugar}
              />

            <MyInputText 
              placeholder="Nombre de departamento"
              value={departamento}
              onChangeText={handleDepartamento}
            />

            <MyInputText 
              placeholder="Cantidad de trabajadores"
              value={cantTrabajo}
              onChangeText={handleCantTrabajo}
            />

             <MyInputText 
              placeholder="Latitud"
              value={latitud}
              onChangeText={handleLatitud}
            />
             <MyInputText 
              placeholder="Longitud"
              value={longitud}
              onChangeText={handleLongitud}
            />

            <SingleButton 
              title="Editar Zona" onPress={{}} 
              btnColor="green"
              />

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
    }
  });

export default UpdateZonas