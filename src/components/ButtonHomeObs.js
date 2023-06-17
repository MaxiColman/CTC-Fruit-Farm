import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonHomeObs = ({ title = 'Button', btnColor = 'red', btnIcon = 'star', onPress = () => console.log('click') }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: btnColor }]} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Icon style={styles.icon} name={btnIcon} size={50} color="white" />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 25,
    marginBottom: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  icon: {
    paddingBottom: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    padding: 4,
    marginBottom: 5,
  },
});

export default ButtonHomeObs;