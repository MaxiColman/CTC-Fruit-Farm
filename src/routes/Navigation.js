import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from "../screens/HomeScreen";
import HomeUsuarios from '../screens/Usuarios/HomeUsuarios';
import AddUser from '../screens/Usuarios/data/AddUser';
import DeleteUser from '../screens/Usuarios/data/DeleteUser';
import UpdateUser from '../screens/Usuarios/data/UpdateUser';
import ViewUser from '../screens/Usuarios/data/ViewUser';
import ViewallUsers from '../screens/Usuarios/data/ViewallUsers';

import { Image, View, Text } from 'react-native';

import HomeZonas from '../screens/Zonas/HomeZonas';
import AddZonas from '../screens/Zonas/data/AddZonas';
import DeleteZonas from '../screens/Zonas/data/DeleteZonas';
import UpdateZonas from '../screens/Zonas/data/UpdateZonas';
import ViewZona from '../screens/Zonas/data/ViemZona';
import ViewAllZonas from '../screens/Zonas/data/ViewAllZonas';



const Stack = createStackNavigator();

/* PARA HACER: Importar aca cada una de las pantallas
...
*/
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Para hacer. Agregar cada una de las pantallas */}
                <Stack.Screen
                    name="Fruit Farm"
                    component={HomeScreen}
                    options={{
                        headerTitle: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={require('../../assets/Imagenes/Logo.png')}
                                    style={{ width: 50, height: 50, marginRight: 10 }}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>
                                    FRUIT FARM
                                </Text>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: '#31994d',
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen
                    name="HomeUsuarios"
                    component={HomeUsuarios}
                    options={{
                        title: "USUARIOS",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="AddUser"
                    component={AddUser}
                    options={{
                        title: "Agregar Usuarios",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="DeleteUser"
                    component={DeleteUser}
                    options={{
                        title: "Borrar Usuarios",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="UpdateUser"
                    component={UpdateUser}
                    options={{
                        title: "Modificar Usuarios",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="ViewUser"
                    component={ViewUser}
                    options={{
                        title: "Ver Usuario",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="ViewallUsers"
                    component={ViewallUsers}
                    options={{
                        title: "Todos los Usuarios",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="HomeZonas"
                    component={HomeZonas}
                    options={{
                        title: "ZONAS",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="AddZonas"
                    component={AddZonas}
                    options={{
                        title: "Agregar Zonas",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="DeleteZonas"
                    component={DeleteZonas}
                    options={{
                        title: "Borrar Zonas",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="UpdateZonas"
                    component={UpdateZonas}
                    options={{
                        title: "Modificar Zonas",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="ViewZona"
                    component={ViewZona}
                    options={{
                        title: "Ver Zona",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="ViewAllZonas"
                    component={ViewAllZonas}
                    options={{
                        title: "Todos las Zonas",
                        headerStyle: {
                            backgroundColor: "#31994d",
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;