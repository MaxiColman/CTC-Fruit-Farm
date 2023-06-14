import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import MyInputText from '../../../components/MyInputText'
import MyText from '../../../components/MyText'
import SingleButton from '../../../components/SingleButton'
import DatabaseConecction from '../../../database/db-connection'
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConecction.getConnection();

const AddZonas = () => {

  // estados para los campos del formulario
  const [lugar, setLugar] = useState("");
  const [depto, setDepartamento] = useState("");
  const [cantTrab, setCantTrabajo] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  const navigation = useNavigation();

  // metodo para setear los estados
  const handleLugar = (lugar) => {
    setLugar(lugar);
  }

  const handleDepartamento = (depto) => {
    setDepartamento(depto);
  }

  const handleCantTrabajo = (cantTrab) => {
    setCantTrabajo(cantTrab);
  }

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  }
  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  }

  const addZonas = () => {
    console.log("### add zonas ###");
    if (validateData()) {
      console.log("### save zonas ###");
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO zonas (lugar, depto, cantTrab, latitud, longitud) VALUES (?, ?, ?, ?, ?)',
          [lugar, depto, cantTrab, latitud, longitud],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert("Exito", "Zona registrada correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeZonas"),
                }
              ],
                {
                  text: "Cancel",
                  cancelable: false
                });
              clearData();
            } else {
              Alert.alert("Error", "Error al registrar la zona");
            }
          }
        )
      });
    }
  }

  // metodo validar datos
  const validateData = () => {
    if (lugar === "" && !lugar.trim()) {
      Alert.alert("Error", "El nombre del lugar es un campo obligatorio");
      return false;
    }

    if (depto === "" && !depto.trim()) {
      Alert.alert("Error", "El departamento es un campo obligatorio");
      return false;
    }

    if (cantTrab === "" && !cantTrab.trim()) {
      Alert.alert("Error", "La cantidad de trabajadores es un campo obligatorio");
      return false;
    }

    if (latitud === "" && !latitud.trim()) {
      Alert.alert("Error", "La latitud es un campo obligatorio");
      return false;
    }

    if (longitud === "" && !longitud.trim()) {
      Alert.alert("Error", "La longitud es un campo obligatorio");
      return false;
    }

    return true;
  }

  //  clear de los datos
  const clearData = () => {
    setLugar("");
    setDepartamento("");
    setCantTrabajo("");
    setLatitud("");
    setLongitud("");
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MyText textValue="Formulario de ingreso de zonas:" textStyle={styles.title} />
        <View style={styles.formContainer}>
        <MyText textValue="Seleccione un lugar:" textStyle={styles.title2} />
          <View style={styles.input}>
            <Picker
              selectedValue={lugar}
              onValueChange={(itemValue) => setLugar(itemValue)}
            >
              <Picker.Item label="Estancia" value="Estancia" />
              <Picker.Item label="Quinta" value="Quinta" />
              <Picker.Item label="Plantacion" value="Plantacion" />
            </Picker>
          </View>
          <MyText textValue="Departamento:" textStyle={styles.title2} />
          <MyInputText
            style={styles.input}
            placeholder="Ingrese un Departamento"
            onChangeText={handleDepartamento}
            value={depto}
          />
          <MyText textValue="Cantidad de trabajadores:" textStyle={styles.title2} />
          <MyInputText
            style={styles.input}
            placeholder="Ingrese cantidad de trabajadores"
            onChangeText={handleCantTrabajo}
            keyboardType="numeric"
            value={cantTrab}
          />
          <MyText textValue="Latitud:" textStyle={styles.title2} />
          <MyInputText
            style={styles.input}
            placeholder="Ingrese una latitud"
            onChangeText={handleLatitud}
            value={latitud}
          />
          <MyText textValue="Longitud:" textStyle={styles.title2} />
          <MyInputText
            style={styles.input}
            placeholder="Ingrese una longitud"
            onChangeText={handleLongitud}
            value={longitud}
          />
          <SingleButton
            title="Registrar Zona"
            btnColor="green"
            onPress={addZonas}
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

export default AddZonas;