import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";

const HomeUsuarios = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
                <View>
                    <ScrollView>
                        <View>
                            <Text>Usuarios</Text>
                            <Button
                                title="Add User"
                                btnColor="green"
                                btnIcon="user"
                                onPress={() => navigation.navigate('AddUser')}
                            />
                            <Button
                                title="Delete User"
                                btnColor="red"
                                btnIcon="map"
                                onPress={() => navigation.navigate('DeleteUser')}
                            />
                            <Button
                                title="Update User"
                                btnColor="blue"
                                btnIcon="apple"
                                onPress={() => navigation.navigate('UpdateUser')}
                            />
                             <Button
                                title="View User"
                                btnColor="purple"
                                btnIcon="apple"
                                onPress={() => navigation.navigate('ViewUser')}
                            />
                             <Button
                                title="View all Users"
                                btnColor="pink"
                                btnIcon="apple"
                                onPress={() => navigation.navigate('ViewallUsers')}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {},
    viewContainer: {},

});

export default HomeUsuarios;