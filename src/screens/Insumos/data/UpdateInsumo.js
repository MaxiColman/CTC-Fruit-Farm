import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, } from "react-native";
import MyText from "../../../components/MyText";
import MyInputText from "../../../components/MyInputText";
import SingleButton from "../../../components/SingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();


const UpdateInsumo = () => {

  const [InsumoId, setInsumoId] = useState("");
  const [insumoName, setInsumoName] = useState("");
  const [cantidadLitros, setCantLitros] = useState("");

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
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText textValue="Buscar Insumo:" textStyle={styles.title} />
              <MyInputText
                placeholder="Ingrese el ID del Insumo a buscar"
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
              <MyText textValue="Ingrese los nuevos datos:" textStyle={styles.title} />
              <MyInputText
                placeholder="Nombre del insumo"
                value={insumoName}
                onChangeText={handleinsumoName}
              />

              <MyInputText
                placeholder="Cantidad de litros"
                value={cantidadLitros}
                onChangeText={handleCantidadLitros}
              />

              <SingleButton
                title="Editar Insumo"
                onPress={() => editInsumos()}
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
})

export default UpdateInsumo