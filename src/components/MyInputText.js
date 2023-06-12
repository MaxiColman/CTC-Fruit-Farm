import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const MyInputText = ({
    maxLength = 40,
    minLength = 0,
    onChangeText = () => console.log("change text"),
    placeholder = "placeholder",
    keyboardType = "default",
    secureTextEntry = false,
    returnKeyType = "done",
    numberOfLines = 1,
    mutiline = false,
    onSubmitEditing = () => console.log("submit editing"),
    blurOnSubmit = false,
    value = "",
    defaultValue = "",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        maxLength={maxLength}
        minLength={minLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        mutiline={mutiline}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        value={value}
        defaultValue={defaultValue}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    padding: 10
  },
  input: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    height: 55,
    borderWidth: 2,
    borderColor: 'black',
    paddingLeft: 10,
    color: 'black',
    borderRadius: 10,
    textAlign: 'left',
    fontWeight: 'bold', 
  }  
});


export default MyInputText;
