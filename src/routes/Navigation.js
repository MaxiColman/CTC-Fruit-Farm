import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "../screens/HomeScreen";
import HomeUsuarios from '../screens/Usarios/HomeUsuarios';
import AddUser from '../screens/Usarios/data/AddUser';
import DeleteUser from '../screens/Usarios/data/DeleteUser';
import UpdateUser from '../screens/Usarios/data/UpdateUser';
import ViewUser from '../screens/Usarios/data/ViewUser';
import ViewallUsers from '../screens/Usarios/data/ViewallUsers';
import { Image, View, Text } from 'react-native';



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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;