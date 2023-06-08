import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import ButtonHomeUsuario from "../../components/ButtonHomeUsuario";
import {ImageBackground} from "react-native";


const HomeZonas = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/Imagenes/Fondo3.jpg')}
                style={styles.headerBackground}
            >
                <SafeAreaView>
                    <View>
                        <View>
                            <ScrollView>
                                <View>
                                    <ButtonHomeUsuario
                                        title="Agregar Zona"
                                        btnColor="#31994d"
                                        btnIcon="map-pin"
                                        onPress={() => navigation.navigate('AddZonas')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Borrar Zona"
                                        btnColor="#31994d"
                                        btnIcon="window-close-o"
                                        onPress={() => navigation.navigate('DeleteZonas')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Modificar Zona"
                                        btnColor="#31994d"
                                        btnIcon="edit"
                                        onPress={() => navigation.navigate('UpdateZonas')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Ver zona"
                                        btnColor="#31994d"
                                        btnIcon="safari"
                                        onPress={() => navigation.navigate('ViewZona')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Todas las zonas"
                                        btnColor="#31994d"
                                        btnIcon="globe"
                                        onPress={() => navigation.navigate('ViewAllZonas')}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
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

export default HomeZonas;


