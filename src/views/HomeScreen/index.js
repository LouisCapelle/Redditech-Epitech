import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import TextField from '../../components/TextField';
import { useContext } from 'react';

export default HomeScreen = () => {
    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "white"}}>
            <TextField text={"HomeScreen"}/>
        </SafeAreaView>
    );
}