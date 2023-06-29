import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginTop: 100,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 35,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default CustomPicker;

