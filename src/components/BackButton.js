import React, { useContext } from 'react';
import {TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default BackButton = ({size, color, navigation, ...props}) => {

    return (
        <TouchableOpacity style={{marginLeft: 15, marginTop: 10}} activeOpacity={0} {...props}>
            <AntDesign name="arrowleft" size={(size) ? size : 33} color={(color) ? color : "black"} onPress={() => navigation.goBack()}/>
        </TouchableOpacity>
    )
}