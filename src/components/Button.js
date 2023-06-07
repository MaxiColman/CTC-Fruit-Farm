import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ title = 'Button', btnColor = 'red', btnIcon = 'star', onPress = () => console.log('click') }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: btnColor }]} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Icon style={styles.icon} name={btnIcon} size={40} color="white" />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  icon: {
    paddingBottom: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    padding: 8,
    marginBottom: 5,
  },
});

export default Button;
