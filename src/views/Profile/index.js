import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import styles from './styles/index.styles';
import InformationsView from './Components/Informations';
import { removeApiToken } from '../../services/Auth';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

export default Profile = () => {
    const appContext = useContext(AppContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: appContext.darkMode ? "#15202b" : "#F6F6F6", height: '100%' }}>
            <DarkModeSwitcher />
            <ScrollView>
                {(appContext.redditUser !== null) ?
                    <>
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
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                            <Button text="Disconnect" onPress={() => {removeApiToken(); navigation.navigate("OnBoard")}}/>
                        </View>
                    </>
                    :
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <Button text="Disconnect" onPress={() => {removeApiToken(); navigation.navigate("OnBoard")}}/>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}