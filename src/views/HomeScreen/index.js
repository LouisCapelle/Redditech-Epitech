import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import { useContext } from 'react';

export default HomeScreen = () => {
    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "white", height: '100%', width: '100%', alignItems: 'center'}}>
            <Header/>
        </SafeAreaView>
    );
}