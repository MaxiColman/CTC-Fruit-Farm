import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import ModalDelete from "../../../components/ModalDelete";
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

  const openConfirmationModal = () => {
    if (!ZonaId || !ZonaId.trim()) {
      Alert.alert("Error", "El campo ID Zona es obligatorio");
      return;
    }

    setShowConfirmationModal(true);
  };

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
      <ScrollView>
        <KeyboardAvoidingView>
          <MyText textValue="Formulario para modificar Zonas:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Buscar Zona:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese el ID"
              onChangeText={handlesetZonaId}
              styles={styles.input}
              value={ZonaId}
            />
            <SingleButton
              title="Buscar Zona"
              onPress={searchZona}
              btnColor='green'
            />
          </View>
          <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Lugar:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese el tipo de lugar"
              value={lugar}
              onChangeText={handleLugar}
            />
            <MyText textValue="Departamento:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese un departamento"
              value={depto}
              onChangeText={handleDepartamento}
            />
            <MyText textValue="Cantidad de trabajadores:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese cantidad de trabajadores"
              value={cantTrab}
              onChangeText={handleCantTrabajo}
            />
            <MyText textValue="Latitud:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese latitud"
              value={latitud}
              onChangeText={handleLatitud}
            />
            <MyText textValue="Longitud:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese longitud"
              value={longitud}
              onChangeText={handleLongitud}
            />
            <SingleButton
              style={styles.button}
              title="Editar Zona"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas modificar esta Zona?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                editZonas();
              }}
              onCancel={() => setShowConfirmationModal(false)}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    marginBottom: 15,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
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
  textStyle: {
    padding: 10,
    marginLeft: 20,
    color: "black",
  },
  input: {
    padding: 15
  },
});

export default UpdateZonas