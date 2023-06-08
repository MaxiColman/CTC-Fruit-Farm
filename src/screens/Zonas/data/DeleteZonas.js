import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../../../components/MyText';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from "../../../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteZonas = () => {
  const [lugar, setLugar] = useState("");
  const navigation = useNavigation();

  const handleLugar = (lugar) => {
    setLugar(lugar);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Formulario para eliminar lugar" textStyle={styles.title}/>
            <KeyboardAvoidingView>
              <MyInputText
                style={styles.input}
                placeholder="Nombre de lugar"
                onChangeText={handleLugar}
                value={lugar}
              />
              <SingleButton
                style={styles.button}
                title="Borrar"
                btnColor="green"
                onPress={{}}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default DeleteZonas
