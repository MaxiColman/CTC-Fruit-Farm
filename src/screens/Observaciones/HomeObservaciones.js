import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import ButtonHomeObs from "../../components/ButtonHomeObs";
import { ImageBackground } from "react-native";
import DatabaseConecction from "../../database/db-connection";
const db = DatabaseConecction.getConnection();

const HomeObservaciones = ({ navigation }) => {

    const dropDb = (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS observaciones', []);
    }

    const createDb = (txn) => {
        txn.executeSql(
            'CREATE TABLE IF NOT EXISTS observaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(60), foto VARCHAR(350), latitud VARCHAR(80), longitud VARCHAR(80))',
            []
        );
    }

    useEffect(() => {
        db.transaction((txn) => {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='observaciones'", [],
                (_, results) => {
                    if (results.rows.length == 0) {
                        dropDb(txn);
                        createDb(txn);
                    } else {
                        console.log("Tabla ya existe");
                        dropDb(txn);
                        createDb(txn);
                    }
                }
            )
        });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/Imagenes/Fondo3.jpg')}
                style={styles.headerBackground}
            >
                <SafeAreaView style={styles.safeAreaView}>
                    <ScrollView>
                        <View style={styles.contentContainer}>
                            <ButtonHomeObs
                                title="Agregar Observación"
                                btnColor="#31994d"
                                btnIcon="envelope-open-o"
                                onPress={() => navigation.navigate('AddObservacion')}
                            />
                            <ButtonHomeObs
                                title="Borrar Observación"
                                btnColor="#31994d"
                                btnIcon="trash-o"
                                onPress={() => navigation.navigate('DeleteObservacion')}
                            />
                            <ButtonHomeObs
                                title="Modificar Observación"
                                btnColor="#31994d"
                                btnIcon="refresh"
                                onPress={() => navigation.navigate('UpdateObservacion')}
                            />
                            <ButtonHomeObs
                                title="Ver Observación"
                                btnColor="#31994d"
                                btnIcon="table"
                                onPress={() => navigation.navigate('ViewObservacion')}
                            />
                            <ButtonHomeObs
                                title="Todas las Observaciones"
                                btnColor="#31994d"
                                btnIcon="folder-o"
                                onPress={() => navigation.navigate('ViewAllObservaciones')}
                            />
                        </View>
                    </ScrollView>
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

export default HomeObservaciones;