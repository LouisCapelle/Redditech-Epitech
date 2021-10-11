import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default Trendings = () => {

    return (
        <View style={{width: '100%', flexDirection: 'row', backgroundColor: 'white', height: 100, marginTop: 20}}>
            <Text style={{fontWeight: '700', color: '#6666FF', fontSize: 12, marginLeft: 7, marginTop: 7}}> Trending Today </Text>
        </View>
    );
}