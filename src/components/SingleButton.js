import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const SingleButton = ({title = 'Button', btnColor = 'red', onPress = () => console.log('click')}) => {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: btnColor}]} onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        color: 'blue',
        padding: 10,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
        marginBottom: 20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold', 
    },
})

export default SingleButton