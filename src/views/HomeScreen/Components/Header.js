import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextField from '../../../components/TextField';

export default Header = () => {

    return (
        <View style={{width: '90%', flexDirection: 'row', alignSelf: 'center'}}>
            <Image source={require('../../../../assets/reddit_button.png')} style={{height: 35, width: 35, alignSelf: 'center', marginRight: 15}}></Image>
            <TextField iconName="search1" iconSize={18} iconColor="black" placeHolder="Rechercher" width={'100%'}/>
            <Ionicons name="settings-outline" size={35} color="black" style={{marginLeft: 10}}/>
        </View>
    );
}