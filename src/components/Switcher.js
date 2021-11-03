import React, {useContext} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import AppContext from '../services/Context';

export default Switcher = ({text, ...props}) => {
    const appContext = React.useContext(AppContext);
    
    return (
        <View style={styles.switch}>
            <Text style={[styles.darkMode, {color: appContext.darkMode ? "white" : "black"}]}>{text}</Text>
            <Switch
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    switch: {
        flexDirection: 'row',
        marginRight: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    darkMode: {
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
    }
})