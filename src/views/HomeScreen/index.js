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
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: 'PAOv6RYOaKePE4QSCdhKaQ',
            scopes: ['any'],
            redirectUri: makeRedirectUri({
                scheme: 'exp://t2-dfe.loucaplou.b-dev-501-bdx-5-1-redditech-maxime-demurger.exp.direct:80'
            }),
        },
        discovery
    );
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