import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import styles from './styles/index.styles';

export default Profile = () => {

    const appContext = useContext(AppContext);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");

    return (
        <SafeAreaView style={{ backgroundColor: appContext.darkMode ? "grey" : "white", height: '100%' }}>
            <DarkModeSwitcher />
            <ScrollView>
                <View>
                    <View style={[styles.imageView]}>
                        <Image source={require('../../../assets/user.png')} style={[styles.imageProfile]} />
                    </View>
                    <View style={{ alignSelf: 'center', paddingTop: 15 }}>
                        <Text style={[styles.textUser, {color: (appContext.darkMode) ? "white" : "black" }]}> {(appContext.redditUser.name.length > 0) ? appContext.redditUser.name : "Utilisateur Reddit"} </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

