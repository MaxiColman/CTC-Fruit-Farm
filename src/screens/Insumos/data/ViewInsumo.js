import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();



const ViewInsumo = () => {

  const [insumoID, setinsumoId] = useState("");
  const [id, setid] = useState(null);
  const navigation = useNavigation();


  // metodo para setear los estados
  const handleInsumoId = (id) => {
    setinsumoId(id);
  }

  const getInsumo = () => {
    if (!insumoID && !insumoID.length && insumoID === "") {
      Alert.alert("Error", "El ID del insumo es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumos WHERE id=?",
        [insumoID],
        (tx, results) => {
          console.log("Results", results.rows);
          if (results.rows.length > 0) {
            console.log('seteo insumo')
            setid(results.rows._array[0]);
          } else {
            Alert.alert("Error", "El insumo no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeInsumos"),
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
        <MyText textValue="Formulario para buscar Insumos:" textStyle={styles.title} />
        <View style={styles.formContainer}>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text style={styles.title2}>Ingrese ID del Insumo:</Text>
              <MyInputText
                placeholder="ID del insumo"
                onChangeText={handleInsumoId}
                style={styles.input}
                value={insumoID}
              />
              <SingleButton title="Buscar Insumo" btnColor="green" onPress={getInsumo} />
              <Text style={styles.title2}>Informacion del Insumo:</Text>
              <View style={styles.presenterView}>
                {id ? (
                  <>
                    <MyText textValue="ID del insumo:" textStyle={styles.presenterTextBold} />
                    <MyText textValue={id.id.toString()} textStyle={styles.presenterText} />
                    <MyText textValue="Nombre del insumo:" textStyle={styles.presenterTextBold} />
                    <MyText textValue={id.insumoName} textStyle={styles.presenterText} />
                    <MyText textValue="Cantidad de litros:" textStyle={styles.presenterTextBold} />
                    <MyText textValue={id.cantLitros} textStyle={styles.presenterText} />
                  </>
                ) : (
                  <Text style={styles.presenterTextBold}>Ingrese un Insumo</Text>
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
  }
});

export default ViewInsumo

