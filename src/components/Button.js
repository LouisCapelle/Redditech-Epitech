import React, { useContext } from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';
import AppContext from '../services/Context';
import { AntDesign } from '@expo/vector-icons'; 

export default Button = ({isLoading, imageSource, imageStyle, text, ...props}) => {

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

export const JoinButton = ({isLoading, imageSource, imageStyle, text, isSubscribed, ...props}) => {
    
    const appContext = useContext(AppContext);

    return (
        <TouchableOpacity style={[styles.join, {backgroundColor: (isSubscribed) ? 'white' : '#fa4505'}]} activeOpacity={.5} {...props}>
            {(!isSubscribed) && 
                <AntDesign name="plus" size={15} color="white" />
            }
            <Text style={{color: (isSubscribed) ? 'black' : 'white'}}>{(isSubscribed) ? 'Joined' : 'Join'}</Text>
        </TouchableOpacity>
    );
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
    },
    join: {
        borderRadius: 100,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 1,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        flexDirection: 'row',
        width: '20%',
        marginRight: 20,
    }
})

{/* <TouchableOpacity style={{backgroundColor: '#fa4505', borderRadius: 100, width: '20%', height: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 20}} activeOpacity={.5}>
                                <AntDesign name="plus" size={15} color="white" />
                                <Text style={{color: 'white'}}> Join </Text>
                            </TouchableOpacity> */}