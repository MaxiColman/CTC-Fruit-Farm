import React, {useEffect} from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { ImageBackground } from 'react-native';


const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/Imagenes/Fondo2.jpg')}
        style={styles.headerBackground}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <Button
                title="Usuarios"
                btnColor="#31994d"
                btnIcon="user"
                onPress={() => navigation.navigate('HomeUsuarios')}
              />
              <Button
                title="Zonas"
                btnColor="#31994d"
                btnIcon="map"
                onPress={() => navigation.navigate('HomeZonas')}
              />
              <Button
                title="Insumos"
                btnColor="#31994d"
                btnIcon="apple"
                onPress={() => navigation.navigate('HomeInsumos')}
              />
               <Button
                title="Observaciones"
                btnColor="#31994d"
                btnIcon="compass"
                onPress={() => navigation.navigate('HomeObservaciones')}
              />
               <Button
                title="Tratamientos"
                btnColor="#31994d"
                btnIcon="street-view"
                onPress={() => console.log('click')}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    flex: 1,
  },
  headerBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default HomeScreen;