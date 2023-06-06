import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import MyInputText from '../../../components/MyInputText'
import SingleButton from '../../../components/SingleButton'
import DatabaseConecction from '../../../database/db-connection'


const db = DatabaseConecction.getConnection();

const AddUser = () => {

  //Seteo de estados
  const [UserName, SetUserName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [UserCi, SetUserCi] = useState("");

  const handleUserName = (UserName) =>{
    SetUserName(UserName);
  }

  const handleLastName = (LastName) =>{
    SetLastName(LastName);
  }

  const handleUserCi = (UserCi) =>{
    SetUserCi(UserCi);
  }


// metodo para guardar el formulario

const Adduser = () => {
  if(ValidarDatos()){
   db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO users (UserName, LastName, Ci) VALUES (?, ?, ?)',
      [UserName,LastName,Ci],
      (tx, results) =>{
        if(results.rowsAffected > 0){
          Alert.alert("Exito, Usuario Agregado");
          ClearData();
        }else{
          Alert.alert("Error, no se pudo guardar el usuario");
        }
      }
    )
   }
   )
  }
}

//Validacion de datos

const ValidarDatos = () =>{
  if(UserName === ""){
    Alert.alert("Error, El nombre es obligatorio rellene el campo");
    return false;
  }
  if(LastName === ""){
    Alert.alert("Error, El apellido es obligatorio rellene el campo");
    return false;
  }
  if(UserCi === ""){
    Alert.alert("Error, La cedula es obligatoria rellene el campo");
    return false;
  }
  return true;
}

// Limpiar datos

const ClearData = () =>{
  SetUserName("");
  SetLastName("");
  SetUserCi("");
}

  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
          <KeyboardAvoidingView>
          <MyInputText
          styles={styles.inputNom}
          placeholder = "Nombre"
          OnChangeText = {handleUserName}
          value={UserName} 
          />
          <MyInputText
          styles={styles.inputApell}
          placeholder = "Apellido"
          OnChangeText = {handleLastName}
          value={LastName} 
          />
          <MyInputText
          styles={styles.inputCi}
          placeholder = "Cedula"
          OnChangeText = {handleUserCi}
          keyboardType = "numeric"
          value={UserCi}
          />
          <SingleButton 
          title='Registrar Usuario'
          btnColor= "green"
          customPress = {console.log("click")}          
          />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {},
  inputNom: {},
  inputApell: {},
  inputCi: {},
})

export default AddUser