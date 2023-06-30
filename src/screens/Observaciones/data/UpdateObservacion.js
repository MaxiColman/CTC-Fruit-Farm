import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Image, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText";
import * as ImagePicker from "expo-image-picker";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import ModalDelete from "../../../components/ModalDelete";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const UpdateObservacion = () => {

  const [obsId, setObsId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [foto, setFoto] = useState(null);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigation = useNavigation();

  const handlesetObsId = (obsId) => {
    setObsId(obsId);
  };

  const handlesetTitulo = (titulo) => {
    setTitulo(titulo);
  }

  const handleFoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso requerido', 'Se requiere acceso a la galería de imágenes para seleccionar una foto.');
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!imagePickerResult.canceled) {
      setFoto(imagePickerResult.assets[0].uri);
    }
  };

  const handlesetLatitud = (latitud) => {
    setLatitud(latitud);
  }
  const handlesetLongitud = (longitud) => {
    setLongitud(longitud);
  }

  const openConfirmationModal = () => {
    if (!obsId || !obsId.trim()) {
      Alert.alert("Error", "El campo ID observación es obligatorio");
      return;
    }

    setShowConfirmationModal(true);
  };

  const editObs = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE observaciones set titulo=?, foto=?, latitud=?, longitud=? WHERE id=?",
          [titulo, foto, latitud, longitud, obsId],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Observación actualizada correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeObservaciones"),
                },
                {
                  text: "Cancel",
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar la observación");
            }
          }
        )
      })
    }
  };

  const searchObs = () => {
    if (!obsId.trim() && obsId === "") {
      Alert.alert("Error", "El numero de ID de la observación es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM observaciones WHERE id = ?",
        [obsId],
        (_, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            setTitulo(user.titulo);
            setFoto(user.foto);
            setLatitud(user.latitud);
            setLongitud(user.longitud);
          } else {
            Alert.alert("Error", "Observación no encontrada");
            clearObsId();
          }
        }
      )
    });

  };

  // clear Datos del buscador del ID
  const clearObsId = () => {
    setObsId("");
  }

  //  clear de los datos
  const clearData = () => {
    setTitulo("");
    setFoto(null);
    setLatitud("");
    setLongitud("");
  };

  const validateData = () => {

    if (!titulo && !titulo.length && titulo === "" && !titulo.trim()) {
      Alert.alert("Error", "El titulo de la observación es obligatorio");
      return false;
    }

    if (foto === null) {
      Alert.alert("Error", "La foto es un campo obligatorio");
      return false;
    }

    if (!latitud && !latitud.length && latitud === "" && !latitud.trim()) {
      Alert.alert("Error", "La latitud es un campo obligatorio");
      return false;
    }

    if (!longitud && !longitud.length && longitud === "" && !longitud.trim()) {
      Alert.alert("Error", "La longitud es un campo obligatorio");
      return false;
    }

    return true;
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.keyboardView}>
          <MyText textValue="Formulario para modificar Observaciónes:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Buscar observaciónes:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese el ID"
              onChangeText={handlesetObsId}
              keyboardType="numeric"
              styles={styles.input}
              value={obsId}
            />
            <SingleButton
              title="Buscar Observación"
              onPress={searchObs}
              btnColor='green'
            />
          </View>
          <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Titulo:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese nombre del titulo"
              value={titulo}
              onChangeText={handlesetTitulo}
            />
            <MyText textValue="Seleccione una Imagen:" textStyle={styles.title2} />
            <TouchableOpacity style={styles.imagePicker} onPress={handleFoto}>
              {foto ? (
                <Image source={{ uri: foto }} style={styles.selectedImage} />
              ) : (
                <Text style={styles.imagePickerText}>Seleccionar foto</Text>
              )}
            </TouchableOpacity>
            <MyText textValue="Latitud:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese una latitud"
              value={latitud}
              onChangeText={handlesetLatitud}
            />
            <MyText textValue="Longitud:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese una longitud"
              value={longitud}
              onChangeText={handlesetLongitud}
            />
            <SingleButton
              style={styles.button}
              title="Editar Observación"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas modificar esta observación?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                editObs();
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
  imagePicker: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    backgroundColor: 'green',
  },
  selectedImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  imagePickerText: {
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})


export default UpdateObservacion