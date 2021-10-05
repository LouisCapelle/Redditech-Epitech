import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default Button = ({isLoading, imageSource, imageStyle, darkMode, text, ...props}) => {

    return (
        <TouchableOpacity {...props} style={[styles.button, {backgroundColor: (darkMode) ? "black" : "white"}]}>
            { (imageSource) &&
                <Image source={imageSource} style={[styles.image, (imageStyle) && imageStyle]}/>
            }
            <Text style={[styles.text, {color: (darkMode) ? "white" : "black"}]}> {text} </Text>
            { (isLoading) &&
                <ActivityIndicator size="small" color={(darkMode) ? "white" : "black"}/>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
        width: '80%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 1,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    text: {
        fontSize: 17,
        fontWeight: '500',
    },
    image : {
        width: 20,
        height: 20,
    }
})