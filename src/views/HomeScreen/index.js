import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import { useContext } from 'react';
import Trendings from './Components/Trendings';
import { ScrollView } from 'react-native-gesture-handler';

export default HomeScreen = () => {
    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
            <Header/>
            <ScrollView style={{width: '100%'}}>
                <Trendings/>
                <Trendings/>
                <Trendings/>
                <Trendings/>
                <Trendings/>
                <Trendings/>
            </ScrollView>
        </SafeAreaView>
    );
}