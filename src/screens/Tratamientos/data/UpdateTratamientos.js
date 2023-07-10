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

const UpdateTratamientos = () => {

  const [tratamientoId, settratamientoId] = useState("");
  const [identificacion, setIdentificacion] = useState('');
  const [nombreTratamiento, setNombreTratamiento] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [ordenTrabajo, setOrdenTrabajo] = useState(null);
  const [selectedZona, setSelectedZona] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [selectedObservacion, setSelectedObservacion] = useState('');
  const [selectedInsumo, setSelectedInsumo] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigation = useNavigation();


  const handlesetTratamientoId = (tratamientoId) => {
    settratamientoId(tratamientoId);
  };

  const handlesetIden = (identificacion) => {
    setIdentificacion(identificacion);
  };

  const handlesetNombre = (nombreTratamiento) => {
    setNombreTratamiento(nombreTratamiento);
  };

  const handlesetFechaInicio = (fechaInicio) => {
    setFechaInicio(fechaInicio);
  };

  const handlesetFechaFin = (fechaFin) => {
    setFechaFin(fechaFin);
  };

  const handlesetTiempo = (tiempo) => {
    setTiempo(tiempo);
  };

  const handlesetOrden = (ordenTrabajo) => {
    setOrdenTrabajo(ordenTrabajo);
  };

  const handlesetZonas = (zona) => {
    setSelectedZona(zona);
  };

  const handlesetUsuarios = (usuario) => {
    setSelectedUsuario(usuario);
  };

  const handlesetInsumos = (insumo) => {
    setSelectedInsumo(insumo);
  };

  const handlesetObservaciones = (observaciones) => {
    setSelectedObservacion(observaciones);
  };


  const handleFoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso requerido', 'Se requiere acceso a la galería de imágenes para seleccionar una foto.');
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!imagePickerResult.canceled) {
      setOrdenTrabajo(imagePickerResult.assets[0].uri);
    }
  };

  const openConfirmationModal = () => {
    if (!tratamientoId || !tratamientoId.trim()) {
      Alert.alert("Error", "El campo ID tratamiento es obligatorio");
      return;
    }

    setShowConfirmationModal(true);
  };

  const edittratamientos = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE tratamientos set identificacion=?, nombre=?, zonas=?, users=?, fechaInicio=?, fechaFin=?, tiempo=?, ordenTrabajo=?, insumos=?, observaciones=? WHERE id=?",
          [identificacion, nombreTratamiento, selectedZona, selectedUsuario, fechaInicio, fechaFin, tiempo, ordenTrabajo, selectedInsumo, selectedObservacion, tratamientoId],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Tratamiento actualizado correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeTratamientos"),
                },
                {
                  text: "Cancel",
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar el tratamiento");
            }
          }
        )
      })
    }
  };

  const searchTrat = () => {
    if (!tratamientoId.trim() && tratamientoId === "") {
      Alert.alert("Error", "El numero de ID del tratamiento es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tratamientos WHERE id = ?",
        [tratamientoId],
        (_, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            setIdentificacion(user.identificacion);
            setNombreTratamiento(user.nombre);
            setFechaInicio(user.fechaInicio);
            setFechaFin(user.fechaFin);
            setTiempo(user.tiempo);
            setOrdenTrabajo(user.ordenTrabajo);
            setSelectedZona(user.zonas);
            setSelectedUsuario(user.users);
            setSelectedInsumo(user.insumos);
            setSelectedObservacion(user.observaciones);
          } else {
            Alert.alert("Error", "Tratamiento no encontrado");
            clearTratamientoId();
          }
        }
      )
    });

  };

  // clear Datos del buscador del ID
  const clearTratamientoId = () => {
    settratamientoId("");
  }

  //  clear de los datos
  const clearData = () => {
    setIdentificacion("");
    setNombreTratamiento("");
    setFechaInicio("");
    setFechaFin("");
    setTiempo("");
    setOrdenTrabajo(null);
    setSelectedZona("");
    setSelectedUsuario("");
    setSelectedInsumo("");
    setSelectedObservacion("");
  };

  const validateData = () => {

    if (!identificacion && !identificacion.length && identificacion === "" && !identificacion.trim()) {
      Alert.alert("Error", "La identificación es obligatoria");
      return false;
    }

    if (!nombreTratamiento && !nombreTratamiento.length && nombreTratamiento === "" && !nombreTratamiento.trim()) {
      Alert.alert("Error", "El nombre es un campo obligatorio");
      return false;
    }

    if (!fechaInicio && !fechaInicio.length && fechaInicio === "" && !fechaInicio.trim()) {
      Alert.alert("Error", "La fecha de inicio es un campo obligatorio");
      return false;
    }

    if (!fechaFin && !fechaFin.length && fechaFin === "" && !fechaFin.trim()) {
      Alert.alert("Error", "La fecha de fin es un campo obligatorio");
      return false;
    }

    if (!tiempo && !tiempo.length && tiempo === "" && !tiempo.trim()) {
      Alert.alert("Error", "El tiempo es un campo obligatorio");
      return false;
    }

    if (ordenTrabajo === null) {
      Alert.alert("Error", "La foto es un campo obligatorio");
      return false;
    }

    if (!selectedZona && !selectedZona.length && selectedZona === "" && !selectedZona.trim()) {
      Alert.alert("Error", "La zona es un campo obligatorio");
      return false;
    }

    if (!selectedUsuario && !selectedUsuario.length && selectedUsuario === "" && !selectedUsuario.trim()) {
      Alert.alert("Error", "El usuario es un campo obligatorio");
      return false;
    }

    if (!selectedInsumo && !selectedInsumo.length && selectedInsumo === "" && !selectedInsumo.trim()) {
      Alert.alert("Error", "El insumo es un campo obligatorio");
      return false;
    }

    if (!selectedObservacion && !selectedObservacion.length && selectedObservacion === "" && !selectedObservacion.trim()) {
      Alert.alert("Error", "La observación es un campo obligatorio");
      return false;
    }

    return true;
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.keyboardView}>
          <MyText textValue="Formulario para modificar Tratamientos:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Buscar tratamiento:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese el ID"
              onChangeText={handlesetTratamientoId}
              keyboardType="numeric"
              styles={styles.input}
              value={tratamientoId}
            />
            <SingleButton
              title="Buscar Tratamiento"
              onPress={searchTrat}
              btnColor='green'
            />
          </View>
          <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Identificación:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese la identificación"
              value={identificacion}
              onChangeText={handlesetIden}
            />
            <MyText textValue="Nombre del tratamiento:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese el nombre"
              value={nombreTratamiento}
              onChangeText={handlesetNombre}
            />
            <MyText textValue="Zona:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese la zona"
              value={selectedZona}
              onChangeText={handlesetZonas}
            />
            <MyText textValue="Usuario:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese el usuario"
              value={selectedUsuario}
              onChangeText={handlesetUsuarios}
            />
            <MyText textValue="Fecha Inicio:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese la fecha de inicio"
              value={fechaInicio}
              onChangeText={handlesetFechaInicio}
            />
            <MyText textValue="Fecha Fin:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese la fecha de fin"
              value={fechaFin}
              onChangeText={handlesetFechaFin}
            />
            <MyText textValue="Horas de ejecución:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese las horas de ejecución"
              value={tiempo}
              onChangeText={handlesetTiempo}
            />
            <MyText textValue="Seleccione una Imagen:" textStyle={styles.title2} />
            <TouchableOpacity style={styles.imagePicker} onPress={handleFoto}>
              {ordenTrabajo ? (
                <Image source={{ uri: ordenTrabajo }} style={styles.selectedImage} />
              ) : (
                <Text style={styles.imagePickerText}>Seleccionar foto</Text>
              )}
            </TouchableOpacity>
            <MyText textValue="Insumo:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese un insumo"
              value={selectedInsumo}
              onChangeText={handlesetInsumos}
            />
            <MyText textValue="Observacion:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese una observación"
              value={selectedObservacion}
              onChangeText={handlesetObservaciones}
            />
            <SingleButton
              style={styles.button}
              title="Editar Tratamiento"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas modificar este tratamiento?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                edittratamientos();
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


export default UpdateTratamientos