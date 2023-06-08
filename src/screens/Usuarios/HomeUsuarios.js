import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import ButtonHomeUsuario from "../../components/ButtonHomeUsuario";
import {ImageBackground} from "react-native";

const HomeUsuarios = ({ navigation }) => {
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
                                        title="Agregar usuario"
                                        btnColor="#31994d"
                                        btnIcon="user-plus"
                                        onPress={() => navigation.navigate('AddUser')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Borrar usuario"
                                        btnColor="#31994d"
                                        btnIcon="user-times"
                                        onPress={() => navigation.navigate('DeleteUser')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Modificar usuario"
                                        btnColor="#31994d"
                                        btnIcon="user-circle"
                                        onPress={() => navigation.navigate('UpdateUser')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Ver usuario"
                                        btnColor="#31994d"
                                        btnIcon="id-card-o"
                                        onPress={() => navigation.navigate('ViewUser')}
                                    />
                                    <ButtonHomeUsuario
                                        title="Todos los usuarios"
                                        btnColor="#31994d"
                                        btnIcon="users"
                                        onPress={() => navigation.navigate('ViewallUsers')}
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

export default HomeUsuarios;