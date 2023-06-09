import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import MyInputText from '../../../components/MyInputText'
import MyText from '../../../components/MyText'
import SingleButton from '../../../components/SingleButton'
import DatabaseConecction from '../../../database/db-connection'
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConecction.getConnection();

const AddInsumo = () => {

  // estados para los campos del formulario
  const [insumoName, setInsumoName] = useState("");
  const [ cantidadLitros, setCantidadLitros] = useState("");

  const navigation = useNavigation();

// metodo para setear los estados
const handleinsumoName = (insumoName) => {
  setInsumoName(insumoName);
}

const handlecantidadLitros = (cantidadLitros) => {
  setCantidadLitros(cantidadLitros);
}

const addInsumos = () => {
  console.log("### add insumos ###");
  if (validateData()) {
    console.log("### save insumos ###");
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO insumos (insumoName, cantLitros) VALUES (?, ?)',
        [insumoName, cantidadLitros],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Exito", "Insumo agregado correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeInsumos"),
              }
            ],
              {
                text: "Cancel",
                cancelable: false
              });
            clearData();
          } else {
            Alert.alert("Error", "Error al registrar el insumo");
          }
        }
      )
    });
  }
}

// metodo validar datos
const validateData = () => {
  if (insumoName === "" && !insumoName.trim()) {
    Alert.alert("Error", "El nombre del insumo es un campo obligatorio");
    return false;
  }

  if (cantidadLitros === "" && !cantidadLitros.trim()) {
    Alert.alert("Error", "La cantidad de litros es un campo obligatoria");
    return false;
  }

  return true;
}

//  clear de los datos
const clearData = () => {
  setInsumoName("");
  setCantidadLitros("");
}

return (

  <SafeAreaView>
    <ScrollView>
        <MyText textValue="Formulario de ingreso de insumos:" textStyle={styles.title} />
        <MyInputText
          style={styles.input}
          placeholder="Nombre del Insumo"
          onChangeText={handleinsumoName}
          value={insumoName}
        />
        <MyInputText
          style={styles.input}
          placeholder="Cantidad de litros"
          onChangeText={handlecantidadLitros}
          keyboardType="numeric"
          value={cantidadLitros}
        />
        <SingleButton
          title="Registrar Insumo"
          btnColor="green"
          onPress={addInsumos}
        />
    </ScrollView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
formContainer: {
flex: 1,
justifyContent: 'center',
paddingHorizontal: 20,
},
title: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
textAlign: 'center',
marginTop: 15,
},
input: {
height: 40,
borderWidth: 2,
borderColor: 'green',
marginBottom: 10,
paddingHorizontal: 10,
marginTop: 10,
},
});

export default AddInsumo