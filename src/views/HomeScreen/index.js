import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import TextComponent from '../../components/TextComponent';
import { useContext } from 'react';
import Trendings from './Components/Trendings';
import { ScrollView } from 'react-native-gesture-handler';
import AppContext from '../../services/Context';

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