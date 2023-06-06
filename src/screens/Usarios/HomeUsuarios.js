import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
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
                                    <Button
                                        title="Agregar"
                                        btnColor="#31994d"
                                        btnIcon="user-plus"
                                        onPress={() => navigation.navigate('AddUser')}
                                    />
                                    <Button
                                        title="Borrar"
                                        btnColor="#31994d"
                                        btnIcon="user-times"
                                        onPress={() => navigation.navigate('DeleteUser')}
                                    />
                                    <Button
                                        title="Modificar"
                                        btnColor="#31994d"
                                        btnIcon="user-circle-o"
                                        onPress={() => navigation.navigate('UpdateUser')}
                                    />
                                    <Button
                                        title="Ver usuario"
                                        btnColor="#31994d"
                                        btnIcon="user"
                                        onPress={() => navigation.navigate('ViewUser')}
                                    />
                                    <Button
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