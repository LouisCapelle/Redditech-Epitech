import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import styles from './styles/index.styles';

export default Profile = () => {

    const appContext = useContext(AppContext);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");

    console.log(appContext.redditUser)

    return (
        <SafeAreaView style={{ backgroundColor: appContext.darkMode ? "grey" : "white", height: '100%' }}>
            <DarkModeSwitcher />
            <ScrollView>
                <View>
                    <View style={{width: 200, height: 200, alignSelf: 'center', justifyContent: 'center', borderRadius: 200, borderWidth: 5, borderColor: 'lightgreen'}}>
                        <Image source={{uri: appContext.redditUser.snoovatar_img}} style={[styles.imageProfile]} />
                    </View>
                    <View style={{ alignSelf: 'center', paddingTop: 15 }}>
                        <Text style={[styles.textUser, {color: (appContext.darkMode) ? "white" : "black" }]}> {(appContext.redditUser.name.length > 0) ? appContext.redditUser.name : "Utilisateur Reddit"} </Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 15, fontWeight: '300'}}>Friends</Text>
                        <Text style={{fontSize: 25}}>{appContext.redditUser.num_friends}</Text>
                    </View>
                    <View style={{alignItems: 'center', marginLeft: 15}}>
                        <Text style={{fontSize: 15, fontWeight: '300'}}>Friends</Text>
                        <Text style={{fontSize: 25}}>{appContext.redditUser.num_friends}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

