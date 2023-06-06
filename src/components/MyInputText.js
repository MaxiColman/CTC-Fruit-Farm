import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const MyInputText = ({
    onChangeText = () => console.log("change text"),
    placeholder = "placeholder",
    placeholderTextColor = "gray",
    keyboardType = "default",
    numberOfLines = 1,
    blurOnSubmit = false,
    value = "",
    defaultValue = "",
}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                keyboardType={keyboardType}
                numberOfLines={numberOfLines}
                blurOnSubmit={blurOnSubmit}
                value={value}
                defaultValue={defaultValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        padding: 10,
    },
    input: {
        color: "black",

    },
})

export default MyInputText