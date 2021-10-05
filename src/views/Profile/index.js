import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useContext } from 'react';
import TextField from '../../components/TextField';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';

export default Profile = () => {

    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "white"}}>
            <TextField text={"Profile"}/>
            <DarkModeSwitcher />
        </SafeAreaView>  
    );
}