import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({title = 'Button', btnColor = 'red', btnIcon = 'star', onPress = () => console.log('click')}) => {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: btnColor}]} onPress={onPress}>
            <View style={styles.container}>
                <Icon style={styles.icon} name={btnIcon} size={40} color="white" />
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
        color: 'blue',
        padding: 10,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
    },
    text: {
        color: 'white',
    },
    icon: {
        paddingBottom: 5,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
})

export default Button