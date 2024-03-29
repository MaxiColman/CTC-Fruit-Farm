import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image, View, Text } from 'react-native';
/* ZONA DE IMPORT DE COMPONENTES DE USUARIOS*/
import HomeScreen from "../screens/HomeScreen";
import HomeUsuarios from '../screens/Usuarios/HomeUsuarios';
import AddUser from '../screens/Usuarios/data/AddUser';
import DeleteUser from '../screens/Usuarios/data/DeleteUser';
import UpdateUser from '../screens/Usuarios/data/UpdateUser';
import ViewUser from '../screens/Usuarios/data/ViewUser';
import ViewallUsers from '../screens/Usuarios/data/ViewallUsers';
/*---------------------------------------------------------------*/
/* ZONA DE IMPORT DE COMPONENTES DE ZONA*/
import HomeZonas from '../screens/Zonas/HomeZonas';
import AddZonas from '../screens/Zonas/data/AddZonas';
import DeleteZonas from '../screens/Zonas/data/DeleteZonas';
import UpdateZonas from '../screens/Zonas/data/UpdateZonas';
import ViewZona from '../screens/Zonas/data/ViewZona';
import ViewAllZonas from '../screens/Zonas/data/ViewAllZonas';
/*---------------------------------------------------------------*/
/* ZONA DE IMPORT DE COMPONENTES DE INSUMOS*/
import HomeInsumos from '../screens/Insumos/HomeInsumos';
import AddInsumo from '../screens/Insumos/data/AddInsumo';
import DeleteInsumo from '../screens/Insumos/data/DeleteInsumo';
import UpdateInsumo from '../screens/Insumos/data/UpdateInsumo';
import ViewInsumo from '../screens/Insumos/data/ViewInsumo';
import ViewallInsumos from '../screens/Insumos/data/ViewallInsumos';
/*---------------------------------------------------------------*/
/* ZONA DE IMPORT DE COMPONENTES DE OBSERVACIONES*/
import HomeObservaciones from '../screens/Observaciones/HomeObservaciones';
import AddObservacion from '../screens/Observaciones/data/AddObservacion';
import DeleteObservacion from '../screens/Observaciones/data/DeleteObservacion';
import UpdateObservacion from '../screens/Observaciones/data/UpdateObservacion';
import ViewObservacion from '../screens/Observaciones/data/ViewObservacion';
import ViewAllObservaciones from '../screens/Observaciones/data/ViewAllObservaciones';
/*---------------------------------------------------------------*/
/* ZONA DE IMPORT DE COMPONENTES DE TRATAMIENTOS*/
import HomeTratamientos from '../screens/Tratamientos/HomeTratamientos';
import AddTratamientos from '../screens/Tratamientos/data/AddTratamientos';
import DeleteTratamientos from '../screens/Tratamientos/data/DeleteTratamientos'
import UpdateTratamientos from '../screens/Tratamientos/data/UpdateTratamientos'
import ViewTratamientos from '../screens/Tratamientos/data/ViewTratamientos'
import ViewAllTratamientos from '../screens/Tratamientos/data/ViewAllTratamientos'
/*---------------------------------------------------------------*/
/*ZONA DE IMPORT DEL MAPA */
import MapaTratamientos from '../screens/MapaTratamientos/MapaTratamientos'



const Stack = createStackNavigator();

/* PARA HACER: Importar aca cada una de las pantallas
...
*/
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Para hacer. Agregar cada una de las pantallas */}

                {/* PANTALLA HOMESCREEN(INICIO) */}
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
                 {/* PANTALLA HOMESUSUARIOS(USUARIOS) */}
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
                 {/* PANTALLA HOMEZONAS(ZONAS) */}
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
                        title: "Todas las Zonas",
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
                 {/* PANTALLA HOMEINSUMOS(INSUMOS) */}
                 <Stack.Screen
                    name="HomeInsumos"
                    component={HomeInsumos}
                    options={{
                        title: "INSUMOS",
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
                    name="AddInsumo"
                    component={AddInsumo}
                    options={{
                        title: "Agregar Insumos",
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
                    name="DeleteInsumo"
                    component={DeleteInsumo}
                    options={{
                        title: "Borrar Insumos",
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
                    name="UpdateInsumo"
                    component={UpdateInsumo}
                    options={{
                        title: "Modificar Insumos",
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
                    name="ViewInsumo"
                    component={ViewInsumo}
                    options={{
                        title: "Ver Insumo",
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
                    name="ViewallInsumos"
                    component={ViewallInsumos}
                    options={{
                        title: "Todos los Insumos",
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
                {/* PANTALLA HOMEOBSERVACIONES(OBSERVACIONES) */}
                <Stack.Screen
                    name="HomeObservaciones"
                    component={HomeObservaciones}
                    options={{
                        title: "OBSERVACIONES",
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
                    name="AddObservacion"
                    component={AddObservacion}
                    options={{
                        title: "Agregar Observación",
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
                    name="DeleteObservacion"
                    component={DeleteObservacion}
                    options={{
                        title: "Borrar Observación",
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
                    name="UpdateObservacion"
                    component={UpdateObservacion}
                    options={{
                        title: "Modificar Observación",
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
                    name="ViewObservacion"
                    component={ViewObservacion}
                    options={{
                        title: "Ver Observación",
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
                    name="ViewAllObservaciones"
                    component={ViewAllObservaciones}
                    options={{
                        title: "Todas las Observaciones",
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
                    name="HomeTratamientos"
                    component={HomeTratamientos}
                    options={{
                        title: "HomeTratamientos",
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
                    name="AddTratamientos"
                    component={AddTratamientos}
                    options={{
                        title: "Agregar Tratamiento",
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
                    name="DeleteTratamientos"
                    component={DeleteTratamientos}
                    options={{
                        title: "Borrar Tratamiento",
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
                    name="UpdateTratamientos"
                    component={UpdateTratamientos}
                    options={{
                        title: "Modificar Tratamiento",
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
                    name="ViewTratamientos"
                    component={ViewTratamientos}
                    options={{
                        title: "Ver Tratamiento",
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
                    name="ViewAllTratamientos"
                    component={ViewAllTratamientos}
                    options={{
                        title: "Todos los Tratamientos",
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
                    name="MapaTratamientos"
                    component={MapaTratamientos}
                    options={{
                        title: "Mapa de los Tratamientos",
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