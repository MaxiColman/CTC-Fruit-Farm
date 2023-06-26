import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import MyInputText from '../../../components/MyInputText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from '../../../database/db-connection';
import CustomPicker from '../../../components/CustomPicker';
import { useNavigation } from '@react-navigation/native';

const db = DatabaseConnection.getConnection();

const AddTratamiento = () => {
    const [identificacion, setIdentificacion] = useState('');
    const [nombreTratamiento, setNombreTratamiento] = useState('');
    const [selectedZona, setSelectedZona] = useState('');
    const [selectedUsuario, setSelectedUsuario] = useState('');
    const [selectedObservacion, setSelectedObservacion] = useState('');
    const [selectedInsumo, setSelectedInsumo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [ordenTrabajo, setOrdenTrabajo] = useState('');

    //Guardo los datos que traigo de la Base de Datos
    const [zonas, setZonas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [observaciones, setObservaciones] = useState([]);
    const [insumos, setInsumos] = useState([]);

    const navigation = useNavigation();

    const addTratamiento = () => {
        if (validateData()) {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO tratamientos (identificacion, nombreTratamiento, zonas, users, fechaInicio, fechaFin, tiempo, ordenTrabajo, insumos, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [identificacion, nombreTratamiento, selectedZona, selectedUsuario, fechaInicio, fechaFin, tiempo, ordenTrabajo, selectedInsumo, selectedObservacion],
                    (_, results) => {
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Éxito',
                                'Tratamiento agregado correctamente',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => navigation.navigate('HomeTratamientos'),
                                    },
                                ],
                                {
                                    cancelable: false,
                                }
                            );
                            clearData();
                        } else {
                            Alert.alert('Error', 'Error al registrar el tratamiento');
                        }
                    }
                );
            });
        }
    };

    useEffect(() => {
        fetchZonas();
        fetchUsuarios();
        fetchObservaciones();
        fetchInsumos();
    }, []);

    const fetchZonas = () => {
        db.transaction((txn) => {
            txn.executeSql('SELECT lugar FROM zonas', [], (_, { rows }) => {
                const zonasList = [];
                for (let i = 0; i < rows.length; i++) {
                    zonasList.push({ label: rows.item(i).lugar, value: rows.item(i).lugar });
                }
                setZonas(zonasList);
            });
        });
    };

    const fetchUsuarios = () => {
        db.transaction((txn) => {
            txn.executeSql('SELECT userName FROM users', [], (_, { rows }) => {
                const usuariosList = [];
                for (let i = 0; i < rows.length; i++) {
                    usuariosList.push({ label: rows.item(i).userName, value: rows.item(i).userName });
                }
                setUsuarios(usuariosList);
            });
        });
    };

    const fetchObservaciones = () => {
        db.transaction((txn) => {
            txn.executeSql('SELECT titulo FROM observaciones', [], (_, { rows }) => {
                const observacionesList = [];
                for (let i = 0; i < rows.length; i++) {
                    observacionesList.push({ label: rows.item(i).titulo, value: rows.item(i).titulo });
                }
                setObservaciones(observacionesList);
            });
        });
    };

    const fetchInsumos = () => {
        db.transaction((txn) => {
            txn.executeSql('SELECT insumoName FROM insumos', [], (_, { rows }) => {
                const insumosList = [];
                for (let i = 0; i < rows.length; i++) {
                    insumosList.push({ label: rows.item(i).insumoName, value: rows.item(i).insumoName });
                }
                setInsumos(insumosList);
            });
        });
    };

    const handleZonaChange = (value) => {
        setSelectedZona(value);
    };

    const handleUsuarioChange = (value) => {
        setSelectedUsuario(value);
    };

    const handleObservacionChange = (value) => {
        setSelectedObservacion(value);
    };

    const handleInsumoChange = (value) => {
        setSelectedInsumo(value);
    };

    const validateData = () => {
        if (identificacion === '' || !identificacion.trim()) {
            Alert.alert('Error', 'La identificación es un campo obligatorio');
            return false;
        }

        // Validar los demás campos...

        return true;
    };

    const clearData = () => {
        setIdentificacion('');
        setNombreTratamiento('');
        setSelectedZona('');
        setSelectedUsuario('');
        setFechaInicio('');
        setFechaFin('');
        setTiempo('');
        setOrdenTrabajo('');
        setSelectedInsumo('');
        setSelectedObservacion('');
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Formulario de ingreso:</Text>
                    <View style={styles.formContainer}>
                        <MyInputText
                            style={styles.input}
                            placeholder="Identificación"
                            onChangeText={setIdentificacion}
                            value={identificacion}
                        />
                        <MyInputText
                            style={styles.input}
                            placeholder="Nombre de tratamiento"
                            onChangeText={setNombreTratamiento}
                            value={nombreTratamiento}
                        />
                        <CustomPicker
                            label="Zona"
                            selectedValue={selectedZona}
                            onValueChange={handleZonaChange}
                            items={zonas}
                        />
                        <CustomPicker
                            label="Usuario"
                            selectedValue={selectedUsuario}
                            onValueChange={handleUsuarioChange}
                            items={usuarios}
                        />
                        <MyInputText
                            style={styles.input}
                            placeholder="Fecha de inicio"
                            onChangeText={setFechaInicio}
                            value={fechaInicio}
                        />
                        <MyInputText
                            style={styles.input}
                            placeholder="Fecha de fin"
                            onChangeText={setFechaFin}
                            value={fechaFin}
                        />
                        <MyInputText
                            style={styles.input}
                            placeholder="Tiempo"
                            onChangeText={setTiempo}
                            value={tiempo}
                        />
                        <MyInputText
                            style={styles.input}
                            placeholder="Orden de trabajo"
                            onChangeText={setOrdenTrabajo}
                            value={ordenTrabajo}
                        />
                        <CustomPicker
                            label="Insumos"
                            selectedValue={selectedInsumo}
                            onValueChange={handleInsumoChange}
                            items={insumos}
                        />
                        <CustomPicker
                            label="Observaciones"
                            selectedValue={selectedObservacion}
                            onValueChange={handleObservacionChange}
                            items={observaciones}
                        />
                        <SingleButton
                            title="Agregar tratamiento"
                            btnColor="green"
                            onPress={addTratamiento}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAF6',
    },
    formContainer: {
        marginTop: 15,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 2,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        margin: 10,
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        marginTop: 45,
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        marginTop: 10,
    },
    input: {
        width: '80%',
        alignSelf: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 35,
        marginTop: 20,
    },
});

export default AddTratamiento;