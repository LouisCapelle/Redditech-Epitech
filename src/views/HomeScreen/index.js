import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import TextComponent from '../../components/TextComponent';
import { useContext } from 'react';

export default HomeScreen = () => {
    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "white", height: "100%"}}>
            <TextComponent text={"HomeScreen"}/>
        </SafeAreaView>
    );
}