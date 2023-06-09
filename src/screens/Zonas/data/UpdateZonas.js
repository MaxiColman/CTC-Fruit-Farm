import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";

const db = DatabaseConnection.getConnection();

const UpdateZonas = () => {

  const [ZonaId, setZonaId] = useState("");
  const [lugar, setLugar] = useState("");
  const [depto, setDepartamento] = useState("");
  const [cantTrab, setCantTrabajo] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  const navigation = useNavigation();

  // metodo para setear los estados

  const handlesetZonaId = (ZonaId) => {
    setZonaId(ZonaId);
  };


  const handleLugar = (lugar) => {
    setLugar(lugar);
  }

  const handleDepartamento = (depto) => {
    setDepartamento(depto);
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

  // metodo validar datos
  const validateData = () => {

    if (!lugar && !lugar.length && lugar === "" && !lugar.trim()) {
      Alert.alert("Error", "El nombre del lugar es obligatorio");
      return false;
    }

    if (!depto && !depto.length && depto === "" && !depto.trim()) {
      Alert.alert("Error", "El departamento es obligatorio");
      return false;
    }

    if (!cantTrab && !cantTrab.length && !cantTrab.trim()) {
      Alert.alert("Error", "La cantidad de trabajadores es un campo obligatorio");
      return false;
    }

    if (!latitud && !latitud.length && !latitud.trim()) {
      Alert.alert("Error", "La latitud es un campo obligatorio");
      return false;
    }

    if (!longitud && !longitud.length && !longitud.trim()) {
      Alert.alert("Error", "La longitud es un campo obligatorio");
      return false;
    }

    return true;
  };

  const clearZonaId = () => {
    setZonaId("");
  }

  //  clear de los datos
  const clearData = () => {
    setLugar("");
    setDepartamento("");
    setCantTrabajo("");
    setLatitud("");
    setLongitud("");
  };

  const editZonas = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE zonas set lugar=?, depto=?, cantTrab=?, latitud=?, longitud=? WHERE id=?",
          [lugar, depto, cantTrab, latitud, longitud, ZonaId],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Zona actualizada correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeZonas"),
                },
                {
                  text: "Cancel",
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar la zona");
            }
          }
        )
      })
    }
  };

  const searchZona = () => {
    if (!ZonaId.trim() && ZonaId === "") {
      Alert.alert("Error", "El numero de ID de la zona es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM zonas WHERE id = ?",
        [ZonaId],
        (_, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            setLugar(user.lugar);
            setDepartamento(user.depto);
            setCantTrabajo(user.cantTrab);
            setLatitud(user.latitud);
            setLongitud(user.longitud);
          } else {
            Alert.alert("Error", "Zona no encontrada");
            clearZonaId();
          }
        }
      )
    });

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText textValue="Buscar zona:" textStyle={styles.title} />
              <MyInputText
                placeholder="Ingrese el ID de la zona a buscar"
                onChangeText={handlesetZonaId}
                styles={styles.input}
                value={ZonaId}
              />
              <SingleButton
                title="Buscar"
                onPress={searchZona}
                btnColor='green'
              />
              <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
              <MyInputText
                placeholder="Nombre del lugar"
                value={lugar}
                onChangeText={handleLugar}
              />

              <MyInputText
                placeholder="Nombre del departamento"
                value={depto}
                onChangeText={handleDepartamento}
              />

              <MyInputText
                placeholder="Cantidad de trabajadores"
                value={cantTrab}
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
                title="Editar Zona"
                onPress={() => editZonas()}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 15,
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