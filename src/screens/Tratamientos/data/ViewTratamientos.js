import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, Image } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const ViewTratamientos = () => {

  const [tratamientoId, setTratamientoId] = useState("");
  const [id, setId] = useState(null);

  const navigation = useNavigation();

    // metodo para setear los estados
    const handleTratamientoId = (id) => {
      setTratamientoId(id);
    }

    const getTratamiento = () => {
      if (!tratamientoId && !tratamientoId.length && tratamientoId === "") {
        Alert.alert("Error", "El ID del tratamiento es obligatorio");
        return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tratamientos WHERE id=?",
        [tratamientoId],
        (tx, results) => {
          console.log("Results", results.rows);
          if (results.rows.length > 0) {
            console.log('seteo tratamientos')
            setId(results.rows._array[0]);
          } else {
            Alert.alert("Error", "El tratamiento no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeTratamientos"),
              }
            ],
              {
                text: "Cancel",
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
      <MyText textValue="Formulario para buscar Tratamientos:" textStyle={styles.title} />
      <View style={styles.formContainer}>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text style={styles.title2}>Ingrese ID del tratamiento:</Text>
            <MyInputText
              placeholder="ID del tratamiento"
              onChangeText={handleTratamientoId}
              style={styles.input}
              value={tratamientoId}
            />
            <SingleButton title="Buscar tratamiento" btnColor="green" onPress={getTratamiento} />
            <Text style={styles.title2}>Información del Tratamiento:</Text>
            <View style={styles.presenterView}>
              {id ? (
                <>
                  <MyText textValue="ID del tratamiento:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.id.toString()} textStyle={styles.presenterText} />
                  <MyText textValue="Nombre:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.nombre} textStyle={styles.presenterText} />
                  <MyText textValue="Identificación:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.identificacion} textStyle={styles.presenterText} />
                  <MyText textValue="Fecha de inicio:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.fechaInicio} textStyle={styles.presenterText} />
                  <MyText textValue="Observaciones:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.observaciones} textStyle={styles.presenterText} />
                </>
              ) : (
                <Text style={styles.presenterTextBold}>Ingrese un tratamiento</Text>
              )}
            </View>
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

export default ViewTratamientos
