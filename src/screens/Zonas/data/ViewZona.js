import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView,} from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const ViewZona = () => {

  const [zonaID, setZonaId] = useState("");
  const [id, setid] = useState(null);
  const navigation = useNavigation();

  // metodo para setear los estados
const handleZonaId = (id) => {
  setZonaId(id);
}

const getZona = () => {
  if (!zonaID && !zonaID.length && zonaID === "") {
    Alert.alert("Error", "El ID de la zona es obligatorio");
    return false;
  }

  console.log("### ID Zona ###", zonaID);

  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM zonas WHERE id=?",
      [zonaID],
      (tx, results) => {
        console.log("Results", results.rows);
        if (results.rows.length > 0) {
          console.log('seteo zona')
          setid(results.rows._array[0]);
        } else {
          Alert.alert("Error", "El la zona no existe", [
            {
              text: "Ok",
              onPress: () => navigation.navigate("HomeZonas"),
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
            <MyText text="Filtrar Zona por ID" style={styles.text} />
            <MyText textValue="Formulario para buscar Zonas:" textStyle={styles.title} />
            <MyInputText
              placeholder="ID de la Zona"
              onChangeText={handleZonaId}
              style={styles.input}
              value={zonaID}
            />
            <SingleButton title="Buscar Zona" btnColor="green" onPress={getZona} />

            <View style={styles.presenterView}>
              {id ? (
                <>
                  <MyText textValue="ID de la Zona:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.id.toString()} textStyle={styles.presenterText} />
                  <MyText textValue="Nombre del lugar:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.lugar} textStyle={styles.presenterText} />
                  <MyText textValue="Departamento:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.depto} textStyle={styles.presenterText} />
                  <MyText textValue="Cantidad de Trabajadores:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.cantTrab} textStyle={styles.presenterText} />
                  <MyText textValue="Latitud:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.latitud} textStyle={styles.presenterText} />
                  <MyText textValue="Longitud:" textStyle={styles.presenterTextBold} />
                  <MyText textValue={id.longitud} textStyle={styles.presenterText} />
                </>
              ) : (
                <Text style={styles.presenterTextBold}>Ingrese una Zona</Text>
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


export default ViewZona
