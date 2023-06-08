import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import MyInputText from '../../../components/MyInputText'
import MyText from '../../../components/MyText'
import SingleButton from '../../../components/SingleButton'
import DatabaseConecction from '../../../database/db-connection'
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConecction.getConnection();

const AddZonas = () => {

// estados para los campos del formulario
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
    <SafeAreaView>
        <ScrollView>
            <MyText textValue="Formulario de ingreso de zonas:" textStyle={styles.title} />
            <MyInputText
              style={styles.input}
              placeholder="Lugar"
              onChangeText={handleLugar}
              value={lugar}
            />
            <MyInputText
              style={styles.input}
              placeholder="Departamento"
              onChangeText={handleDepartamento}
              value={departamento}
            />
            <MyInputText
              style={styles.input}
              placeholder="Cantidad de trabajadores"
              onChangeText={handleCantTrabajo}
              keyboardType="numeric"
              value={cantTrabajo}
            />
              <MyInputText
              style={styles.input}
              placeholder="Latitud"
              onChangeText={handleLatitud}
              value={latitud}
            />
              <MyInputText
              style={styles.input}
              placeholder="Longitud"
              onChangeText={handleLongitud}
              value={longitud}
            />
            <SingleButton
              title="Registrar Zona"
              btnColor="green"
              onPress={{}}
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

  export default AddZonas;