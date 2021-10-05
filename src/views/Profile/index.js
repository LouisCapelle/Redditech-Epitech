import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import styles from './styles/index.styles';

export default Profile = () => {

    const appContext = useContext(AppContext);
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");

    return (
        <SafeAreaView style={{ backgroundColor: appContext.darkMode ? "grey" : "white", height: '100%' }}>
            <DarkModeSwitcher />
            <ScrollView>
                <View>
                    <View style={[styles.imageView]}>
                        <Image source={require('../../../assets/user.png')} style={[styles.imageProfile]} />
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 15 }}>
                        <Text style={[styles.textUser, {color: (appContext.darkMode) ? "white" : "black" }]}> {(firstname.length > 0) ? firstname : "Utilisateur"} </Text>
                        <Text style={[styles.textUser, {color: (appContext.darkMode) ? "white" : "black"}]}> {(lastname.length > 0) ? lastname : "Spirit"}  </Text>
                    </View>
                    <Text style={[styles.textEmail, {color: (appContext.darkMode) ? "white" : "black"}]}>{(email.length > 0) ? email : "email@email.com"}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

