import React, { useContext } from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';
import AppContext from '../services/Context';

export default Button = ({isLoading, imageSource, imageStyle, darkMode, text, ...props}) => {

    const appContext = useContext(AppContext);

    return (
        <TouchableOpacity {...props} style={[styles.button, {backgroundColor: (appContext.darkMode) ? "black" : "white"}]} activeOpacity={.7}>
            { (imageSource) &&
                <Image source={imageSource} style={[styles.image, (imageStyle) && imageStyle]}/>
            }
            <Text style={[styles.text, {color: (appContext.darkMode) ? "white" : "black"}]}> {text} </Text>
            { (isLoading) &&
                <ActivityIndicator size="small" color={(appContext.darkMode) ? "white" : "black"}/>
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