import React, { useContext } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, SafeAreaView} from 'react-native';
import BackButton from '../../components/BackButton';
import AppContext from '../../services/Context';

export default SubView = ({route, navigation, props}) => {

    const appContext = useContext(AppContext)
    
    return (
        <View>
            <BackButton navigation={navigation}/>
        </View>
    )
}