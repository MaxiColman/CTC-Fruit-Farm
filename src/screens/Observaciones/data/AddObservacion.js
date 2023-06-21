import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import MyInputText from '../../../components/MyInputText';
import MyText from '../../../components/MyText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from '../../../database/db-connection';
import { useNavigation } from '@react-navigation/native';

const db = DatabaseConnection.getConnection();

const AddObservacion = () => {
  const [titulo, setTitulo] = useState('');
  const [foto, setFoto] = useState(null);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const navigation = useNavigation();

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

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  };

  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  };

  const addObservacion = () => {
    console.log('### add observacion ###');
    if (validateData()) {
      console.log('### save observacion ###');
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO observaciones (titulo, foto, latitud, longitud) VALUES (?, ?, ?, ?)',
          [titulo, foto, latitud, longitud],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Exito',
                'Observación agregada correctamente',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('HomeObservaciones'),
                  },
                ],
                {
                  text: 'Cancel',
                  cancelable: false,
                }
              );
              clearData();
            } else {
              Alert.alert('Error', 'Error al registrar la observación');
            }
          }
        );
      });
    }
  };

  const validateData = () => {
    if (titulo === '' || !titulo.trim()) {
      Alert.alert('Error', 'El título es un campo obligatorio');
      return false;
    }

    if (foto === null) {
      Alert.alert('Error', 'Debe seleccionar una foto');
      return false;
    }

    if (latitud === '' || !latitud.trim()) {
      Alert.alert('Error', 'La latitud es un campo obligatorio');
      return false;
    }

    if (longitud === '' || !longitud.trim()) {
      Alert.alert('Error', 'La longitud es un campo obligatorio');
      return false;
    }

    return true;
  };

  const clearData = () => {
    setTitulo('');
    setFoto(null);
    setLatitud('');
    setLongitud('');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <MyText textValue="Formulario de ingreso de observaciones:" textStyle={styles.title} />
        <View style={styles.formContainer}>
          <MyText textValue="Título:" textStyle={styles.title2} />
          <View style={styles.input}>
            <Picker
              selectedValue={titulo}
              onValueChange={(itemValue) => setTitulo(itemValue)}
            >
              <Picker.Item label="Plaga detectada" value="Plaga detectada" />
              <Picker.Item label="Planta en mal estado" value="Planta en mal estado" />
              <Picker.Item label="Falta de riego" value="Falta de riego" />
            </Picker>
          </View>
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
            style={styles.input}
            placeholder="Ingrese la latitud"
            onChangeText={handleLatitud}
            value={latitud}
          />
          <MyText textValue="Longitud:" textStyle={styles.title2} />
          <MyInputText
            style={styles.input}
            placeholder="Ingrese la longitud"
            onChangeText={handleLongitud}
            value={longitud}
          />
          <SingleButton title="Registrar Observación" btnColor="green" onPress={addObservacion} />
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
});

export default AddObservacion;


