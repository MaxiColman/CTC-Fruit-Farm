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
  const [cantidadLitros, setCantidadLitros] = useState("");

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
        <View style={styles.formContainer}>
        <MyText textValue="Nombre:" textStyle={styles.title2} />
          <MyInputText
            style={styles.input}
            placeholder="Ingrese un nombre"
            onChangeText={handleinsumoName}
            value={insumoName}
          />
          <MyText textValue="Cantidad de litros:" textStyle={styles.title2} />
          <MyInputText
            style={styles.input}
            placeholder="Ingrese la cantidad de litros"
            onChangeText={handlecantidadLitros}
            keyboardType="numeric"
            value={cantidadLitros}
          />
          <SingleButton
            title="Registrar Insumo"
            btnColor="green"
            onPress={addInsumos}
          />
        </View>
      </ScrollView>
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    marginTop: 45,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 10,
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 35,
    marginTop: 20,
  },
});

export default AddInsumo