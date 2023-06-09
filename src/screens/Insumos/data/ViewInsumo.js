import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView,} from "react-native";
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
      <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView>
            <MyText text="Filtrar Insumo por ID" style={styles.text} />
            <MyText textValue="Formulario para buscar Insumos:" textStyle={styles.title} />
            <MyInputText
              placeholder="ID del insumo"
              onChangeText={handleInsumoId}
              style={styles.input}
              value={insumoID}
            />
            <SingleButton title="Buscar Insumo" btnColor="green" onPress={getInsumo} />

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
  },
  title: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
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

export default ViewInsumo

