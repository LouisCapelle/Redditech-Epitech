import React, {useContext} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import AppContext from '../services/Context';

export default DarkModeSwitcher = () => {
    const appContext = React.useContext(AppContext);
    
    return (
        <View style={styles.switch}>
            <Text style={[styles.darkMode, {color: appContext.darkMode ? "white" : "black"}]}>Dark Mode</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={appContext.darkMode ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => appContext.toggleDarkMode()}
                value={appContext.darkMode}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    switch: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 10,
        justifyContent: "flex-start"
    },
    darkMode: {
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
    }
})