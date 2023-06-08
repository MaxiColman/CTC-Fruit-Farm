import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import ButtonHomeUsuario from "../../components/ButtonHomeUsuario";
import {ImageBackground} from "react-native";

const HomeInsumos = ({ navigation }) => {
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
                                        title="Agregar Insumo"
                                        btnColor="#31994d"
                                        btnIcon="cart-plus"
                                        onPress={() => navigation.navigate('AddInsumo')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Borrar Insumo"
                                        btnColor="#31994d"
                                        btnIcon="times-circle-o"
                                        onPress={() => navigation.navigate('DeleteInsumo')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Modificar Insumo"
                                        btnColor="#31994d"
                                        btnIcon="edit"
                                        onPress={() => navigation.navigate('UpdateInsumo')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Ver insumo"
                                        btnColor="#31994d"
                                        btnIcon="shopping-cart"
                                        onPress={() => navigation.navigate('ViewInsumo')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Todos los insumos"
                                        btnColor="#31994d"
                                        btnIcon="list-ol"
                                        onPress={() => navigation.navigate('ViewallInsumos')}
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

export default HomeInsumos;