import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import ModalDelete from "../../../components/ModalDelete";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();


const UpdateInsumo = () => {

  const [InsumoId, setInsumoId] = useState("");
  const [insumoName, setInsumoName] = useState("");
  const [cantidadLitros, setCantLitros] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigation = useNavigation();

  // metodo para setear los estados

  const handlesetInsumoId = (InsumoId) => {
    setInsumoId(InsumoId);
  };

  const handleinsumoName = (insumoName) => {
    setInsumoName(insumoName);
  }
  const handleCantidadLitros = (cantLitros) => {
    setCantLitros(cantLitros);
  }
  
  const openConfirmationModal = () => {
    if (!InsumoId || !InsumoId.trim()) {
      Alert.alert("Error", "El campo ID Insumo es obligatorio");
      return;
    }

    setShowConfirmationModal(true);
  };

  const editInsumos = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE insumos set insumoName=?, cantLitros=? WHERE id=?",
          [insumoName, cantidadLitros, InsumoId],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Exito", "Insumo actualizado correctamente", [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeInsumos"),
                },
                {
                  text: "Cancel",
                  cancelable: false,
                }
              ]);
            } else {
              Alert.alert("Error", "Error al actualizar el insumo");
            }
          }
        )
      })
    }
  };

  const searchInsumo = () => {
    if (!InsumoId.trim() && InsumoId === "") {
      Alert.alert("Error", "El numero de ID del insumo es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumos WHERE id = ?",
        [InsumoId],
        (_, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            setInsumoName(user.insumoName);
            setCantLitros(user.cantLitros);
          } else {
            Alert.alert("Error", "Insumo no encontrado");
            clearInsumoId();
          }
        }
      )
    });

  };

  // clear Datos del buscador del ID
  const clearInsumoId = () => {
    setInsumoId("");
  }

  //  clear de los datos
  const clearData = () => {
    setInsumoName("");
    setCantLitros("");
  };

  const validateData = () => {

    if (!insumoName && !insumoName.length && insumoName === "" && !insumoName.trim()) {
      Alert.alert("Error", "El nombre del insumo es obligatorio");
      return false;
    }

    if (!cantidadLitros && !cantidadLitros.length && cantidadLitros === "" && !cantidadLitros.trim()) {
      Alert.alert("Error", "La cantidad de litros es un campo obligatorio");
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.keyboardView}>
          <MyText textValue="Formulario para modificar Insumos:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Buscar Insumo:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese el ID"
              onChangeText={handlesetInsumoId}
              keyboardType="numeric"
              styles={styles.input}
              value={InsumoId}
            />
            <SingleButton
              title="Buscar Insumo"
              onPress={searchInsumo}
              btnColor='green'
            />
          </View>
          <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
          <View style={styles.formContainer}>
            <MyText textValue="Nombre:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese nombre del insumo"
              value={insumoName}
              onChangeText={handleinsumoName}
            />
            <MyText textValue="Cantidad de litros:" textStyle={styles.title2} />
            <MyInputText
              placeholder="Ingrese cantidad de litros"
              value={cantidadLitros}
              onChangeText={handleCantidadLitros}
            />
            <SingleButton
              style={styles.button}
              title="Editar Insumo"
              btnColor="green"
              onPress={openConfirmationModal}
            />
            <ModalDelete
              visible={showConfirmationModal}
              message="¿Estás seguro que deseas modificar este Insumo?"
              onConfirm={() => {
                setShowConfirmationModal(false);
                editInsumos();
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
})

export default UpdateInsumo