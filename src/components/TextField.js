import React, { useContext } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import AppContext from '../services/Context';
import { AntDesign } from '@expo/vector-icons'; 
import { withDelay } from 'react-native-reanimated';

export default TextField = ({iconColor, iconSize, iconStyle, iconName, placeHolder, width, ...props}) => {

    const appContext = useContext(AppContext);

    return (
        <View style={styles.view}>
            <TextInput {...props} style={[styles.textField, {color: (appContext.darkMode) ? "white" : "black", width: (width) ? width : '80%'}]} placeholder={placeHolder}/>
            { (iconName) &&
                <AntDesign name={iconName} size={iconSize} color={iconColor} style={[styles.icon]}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    textField: {
        padding: 10,
        paddingLeft: 35,
        backgroundColor: '#D3D3D3',
        borderRadius: 8,
        flex :1
    },
    icon: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        top: 9.5,
        left: 10,
        bottom: 10
    }
})