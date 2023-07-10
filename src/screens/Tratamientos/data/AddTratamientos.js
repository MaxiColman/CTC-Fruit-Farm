import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MyInputText from '../../../components/MyInputText';
import MyText from '../../../components/MyText';
import SingleButton from '../../../components/SingleButton';
import DatabaseConnection from '../../../database/db-connection';
import CustomPicker from '../../../components/CustomPicker';
import { useNavigation } from '@react-navigation/native';

const db = DatabaseConnection.getConnection();

const AddTratamiento = () => {

    //Datos de los campos de los formularios
    const [identificacion, setIdentificacion] = useState('');
    const [nombreTratamiento, setNombreTratamiento] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [ordenTrabajo, setOrdenTrabajo] = useState(null);
    const [selectedZona, setSelectedZona] = useState('');
    const [selectedUsuario, setSelectedUsuario] = useState('');
    const [selectedObservacion, setSelectedObservacion] = useState('');
    const [selectedInsumo, setSelectedInsumo] = useState('');

    //Guardo los datos que traigo de la Base de Datos
    const [zonas, setZonas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [observaciones, setObservaciones] = useState([]);
    const [insumos, setInsumos] = useState([]);

    const navigation = useNavigation();

    const handleFoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permiso requerido', 'Se requiere acceso a la galería de imágenes para seleccionar una foto.');
            return;
        }

        const imagePickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!imagePickerResult.canceled) {
            setOrdenTrabajo(imagePickerResult.assets[0].uri);
        }
    };

    //Agrego un tratamiento
    const addTratamiento = () => {
        console.log("### add user ###");
        if (validateData()) {
            console.log("### save user ###");
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO tratamientos (identificacion, nombre, zonas, users, fechaInicio, fechaFin, tiempo, ordenTrabajo, insumos, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [identificacion, nombreTratamiento, selectedZona, selectedUsuario, fechaInicio, fechaFin, tiempo, ordenTrabajo, selectedInsumo, selectedObservacion],
                    (_, results) => {
                        console.log("### results ###", results);
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

    //Funciones para traer datos que queremos de la base de datos
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
                observacionesList.unshift({ label: "No hay observaciones", value: null });
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

    //Seteo los estados
    const handleIdentChange = (identificacion) => {
        setIdentificacion(identificacion);
    };

    const handleNomTratChange = (nombreTratamiento) => {
        setNombreTratamiento(nombreTratamiento);
    };

    const handleZonaChange = (value) => {
        setSelectedZona(value);
    };

    const handleUsuarioChange = (value) => {
        setSelectedUsuario(value);
    };

    const handleFechaIniChange = (fechaInicio) => {
        setFechaInicio(fechaInicio);
    };

    const handleFechaFinChange = (fechaFin) => {
        setFechaFin(fechaFin);
    };

    const handleTiempoChange = (tiempo) => {
        setTiempo(tiempo);
    };

    const handleObservacionChange = (value) => {
        setSelectedObservacion(value);
    };

    const handleInsumoChange = (value) => {
        setSelectedInsumo(value);
    };

    // Validacion de todos los campos
    const validateData = () => {
        if (identificacion === '' || !identificacion.trim()) {
            Alert.alert('Error', 'La identificación es un campo obligatorio');
            return false;
        }
        if (nombreTratamiento === '' || !nombreTratamiento.trim()) {
            Alert.alert('Error', 'El nombre de tratamiento es un campo obligatorio');
            return false;
        }
        if (selectedZona === '' || !selectedZona.trim()) {
            Alert.alert('Error', 'Seleccionar una zona es un campo obligatorio');
            return false;
        }
        if (selectedUsuario === '' || !selectedUsuario.trim()) {
            Alert.alert('Error', 'Seleccionar un usuario es un campo obligatorio');
            return false;
        }
        if (selectedInsumo === '' || !selectedInsumo.trim()) {
            Alert.alert('Error', 'Seleccionar un insumo es un campo obligatorio');
            return false;
        }
        if (fechaInicio === '' || !fechaInicio.trim()) {
            Alert.alert('Error', 'La fecha de inicio es un campo obligatorio');
            return false;
        }
        if (fechaFin === '' || !fechaFin.trim()) {
            Alert.alert('Error', 'La fecha final es un campo obligatorio');
            return false;
        }
        if (tiempo === '' || !tiempo.trim()) {
            Alert.alert('Error', 'El tiempo es un campo obligatorio');
            return false;
        }
        if (ordenTrabajo === null) {
            Alert.alert('Error', 'La orden de trabajo es un campo obligatorio');
            return false;
        }

        return true;
    };

    //Limpio los datos
    const clearData = () => {
        setIdentificacion("");
        setNombreTratamiento("");
        setSelectedZona("");
        setSelectedUsuario("");
        setFechaInicio("");
        setFechaFin("");
        setTiempo("");
        setOrdenTrabajo(null);
        setSelectedInsumo("");
        setSelectedObservacion("");
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Formulario de ingreso:</Text>
                    <View style={styles.formContainer}>
                        <MyText textValue="Identificación:" textStyle={styles.title2} />
                        <MyInputText
                            style={styles.input}
                            placeholder="Identificación"
                            onChangeText={handleIdentChange}
                            value={identificacion}
                        />
                        <MyText textValue="Nombre del tratamiento:" textStyle={styles.title2} />
                        <MyInputText
                            style={styles.input}
                            placeholder="Nombre de tratamiento"
                            onChangeText={handleNomTratChange}
                            value={nombreTratamiento}
                        />
                        <View>
                            <CustomPicker
                                label="Zonas"
                                selectedValue={selectedZona}
                                onValueChange={handleZonaChange}
                                items={zonas}
                            />
                        </View>
                        <CustomPicker
                            label="Usuarios"
                            selectedValue={selectedUsuario}
                            onValueChange={handleUsuarioChange}
                            items={usuarios}
                        />
                        <MyText textValue="Fecha de inicio:" textStyle={styles.title2} />
                        <MyInputText
                            style={styles.input}
                            placeholder="Fecha de inicio"
                            onChangeText={handleFechaIniChange}
                            value={fechaInicio}
                        />
                        <MyText textValue="Fecha de fin:" textStyle={styles.title2} />
                        <MyInputText
                            style={styles.input}
                            placeholder="Fecha de fin"
                            onChangeText={handleFechaFinChange}
                            value={fechaFin}
                        />
                        <MyText textValue="Horas de ejecución:" textStyle={styles.title2} />
                        <MyInputText
                            style={styles.input}
                            placeholder="Tiempo"
                            onChangeText={handleTiempoChange}
                            value={tiempo}
                        />
                        <MyText textValue="Orden de trabajo:" textStyle={styles.title2} />
                        <TouchableOpacity style={styles.imagePicker} onPress={handleFoto}>
                            {ordenTrabajo ? (
                                <Image source={{ uri: ordenTrabajo }} style={styles.selectedImage} />
                            ) : (
                                <Text style={styles.imagePickerText}>Seleccionar foto</Text>
                            )}
                        </TouchableOpacity>
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
    imagePicker: {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        backgroundColor: 'green',
    },
    imagePickerText: {
        marginTop: 2,
        marginBottom: 2,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    selectedImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
});

export default AddTratamiento;