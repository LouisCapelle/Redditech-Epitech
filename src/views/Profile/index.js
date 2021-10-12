import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import styles from './styles/index.styles';
import InformationsView from './Components/Informations';

export default Profile = () => {

    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={{ backgroundColor: appContext.darkMode ? "grey" : "white", height: '100%' }}>
            <DarkModeSwitcher />
            <ScrollView>
                <View>
                    <View style={{width: 200, height: 200, alignSelf: 'center', justifyContent: 'center', borderRadius: 200, borderWidth: 5, borderColor: 'lightgreen'}}>
                        <Image source={{uri: appContext.redditUser.snoovatar_img}} style={[styles.imageProfile]} />
                    </View>
                    <View style={{ alignSelf: 'center', paddingTop: 15 }}>
                        <Text style={[styles.textUser, {color: (appContext.darkMode) ? "white" : "black" }]}> {(appContext.redditUser.subreddit.display_name_prefixed.length > 0) ? appContext.redditUser.subreddit.display_name_prefixed : "Utilisateur Reddit"} </Text>
                    </View>
                    <Text style={{textAlign: 'center', fontWeight: '300', marginTop: 5, color: (appContext.darkMode) ? "white" : "black"}}> {appContext.redditUser.subreddit.public_description}</Text>
                </View>
                <InformationsView/>
            </ScrollView>
        </SafeAreaView>
    );
}

