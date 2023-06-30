import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import DatabaseConnection from '../../database/db-connection';

const db = DatabaseConnection.getConnection();

const MapaTratamientos = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [zonas, setZonas] = useState([]);

  const requestForegroundPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const currentPosition = await getCurrentPositionAsync();
      console.log('Current position', currentPosition);
      setLocation(currentPosition);
    } else {
      Alert.alert(
        'Los permisos de localización son obligatorios. Por favor, vuelva a intentar.'
      );
    }
  };

  useEffect(() => {
    requestForegroundPermission().then(() =>
      console.log('Requesting permissions')
    );
  }, []);

  useEffect(() => {
    const watchLocation = async () => {
      await watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        newLocation => {
          setLocation(newLocation);
          if (mapRef.current) {
            mapRef.current.animateCamera({
              center: {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
              },
            });
          }
        }
      );
    };

    watchLocation().then(() => console.log('### Watching location ###'));
  }, []);

  useEffect(() => {
    fetchZonas();
  }, []);

  const fetchZonas = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT lugar, latitud, longitud FROM zonas',
        [],
        (_, { rows }) => {
          const zonasList = [];
          for (let i = 0; i < rows.length; i++) {
            const zona = {
              lugar: rows.item(i).lugar,
              latitud: parseFloat(rows.item(i).latitud),
              longitud: parseFloat(rows.item(i).longitud),
            };
            zonasList.push(zona);
          }
          setZonas(zonasList);
        }
      );
    });
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: -32.5228,
          longitude: -55.7658,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
      >
        {zonas.map((zona, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: zona.latitud,
              longitude: zona.longitud,
            }}
            title={zona.lugar}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapaTratamientos;
