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

const Stack = createStackNavigator();

/* PARA HACER: Importar aca cada una de las pantallas
...
*/
/*
Esto es de prueba mia
*/
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Para hacer. Agregar cada una de las pantallas */}
                <Stack.Screen
                    name="Fruit Farm"
                    component={HomeScreen}
                    option={{
                        title: "Fruit Farm",
                        headerstyle: {
                            backgroundColor: "#730823"
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen name="HomeUsuarios" component={HomeUsuarios} />
                <Stack.Screen name="AddUser" component={AddUser} />
                <Stack.Screen name="DeleteUser" component={DeleteUser} />
                <Stack.Screen name="UpdateUser" component={UpdateUser} />
                <Stack.Screen name="ViewUser" component={ViewUser} />
                <Stack.Screen name="ViewallUsers" component={ViewallUsers} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;