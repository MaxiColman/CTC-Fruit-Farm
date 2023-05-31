import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
                <View>
                    <ScrollView>
                        <View>
                            <Text>Home Screen</Text>
                            <Button
                                title="Usuarios"
                                btnColor="blue"
                                btnIcon="user"
                                onPress={() => navigation.navigate('HomeUsuarios')}
                            />
                            <Button
                                title="Zonas"
                                btnColor="green"
                                btnIcon="map"
                                onPress={() => console.log('click')}
                            />
                            <Button
                                title="Insumos"
                                btnColor="purple"
                                btnIcon="apple"
                                onPress={() => console.log('click')}
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

export default HomeScreen;