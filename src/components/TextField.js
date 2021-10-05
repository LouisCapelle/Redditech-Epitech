import React, { useContext } from 'react';
import {Text, StyleSheet} from 'react-native';
import AppContext from '../services/Context';

export default TextField = ({text, ...props}) => {

    const appContext = useContext(AppContext);

    return (
        <Text {...props} style={[{color: (appContext.darkMode) ? "white" : "black"}]}>{text}</Text>
    )
}