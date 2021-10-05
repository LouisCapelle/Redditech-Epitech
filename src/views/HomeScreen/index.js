import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import TextComponent from '../../components/TextComponent';
import { useContext } from 'react';

export default HomeScreen = () => {
    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "white", height: '100%', width: '100%', alignItems: 'center'}}>
            <TextField iconName="search1" iconSize={18} iconColor="black" placeHolder="Rechercher" />
        </SafeAreaView>
    );
}