import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Button, Touchable, Switch, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { LottieViewConnection } from './Component/LottieViewConnection';
import { ViewConnection } from './Component/ViewConnection';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let pages = width * 2;

export default WalkTrought = () => {
    const offset = useSharedValue(0);
    const offsetLogo = useSharedValue(0);
    const offsetText = useSharedValue(0);
    const offsetConnection = useSharedValue(width);
    const offsetConnectionLogo = useSharedValue(width);
    const offsetConnectionButton = useSharedValue(width);
    const [page, setPage] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    var welcome = "Cette application vous permet de trouver des articles de reddit en fonction de vos préférences.\n"
    welcome += "C'est un projet Epitech du module AppDev qui a été réalisé par des étudiants de l'école."

    var access = "Pour accéder à notre application. Vous allez devoir autoriser nos services lorsque cela vous sera demandé.\n"
    access += "Notre application a besoin de se connecter aux services de reddit afin de pouvoir récupérer les informations."

    const animatedStyles = useAnimatedStyle(() => {
        return { transform: [{ translateX: offset.value }] };
    });

    const animatedStylesLogo = useAnimatedStyle(() => {
        return { transform: [{ translateX: offsetLogo.value }] };
    });

    const animatedStylesText = useAnimatedStyle(() => {
        return { transform: [{ translateX: offsetText.value }] };
    });

    const animatedStylesConnection = useAnimatedStyle(() => {
        return { transform: [{ translateX: offsetConnection.value }] };
    });

    const animatedStylesConnectionLogo = useAnimatedStyle(() => {
        return { transform: [{ translateX: offsetConnectionLogo.value }] };
    });

    const animatedStylesConnectionButton = useAnimatedStyle(() => {
        return { transform: [{ translateX: offsetConnectionButton.value }] };
    });

    function functionStyle() {
        if (page < 1) {
            offset.value = withSpring(offset.value - width, { damping: 20, stiffness: 90 })
            offsetLogo.value = withDelay(200, withSpring(offsetLogo.value - width, { damping: 20, stiffness: 90 }));
            offsetText.value = withDelay(250, withSpring(offsetText.value - width, { damping: 20, stiffness: 90 }));
            offsetConnection.value = withDelay(300, withSpring(offsetConnection.value - width, { damping: 20, stiffness: 90 }));
            offsetConnectionLogo.value = withDelay(350, withSpring(offsetConnectionLogo.value - width, { damping: 20, stiffness: 90 }));
            offsetConnectionButton.value = withDelay(300, withSpring(offsetConnectionButton.value - width, { damping: 20, stiffness: 90 }));
            setPage(page + 1);
        } else {
            offset.value = withSpring(offset.value + width, { damping: 20, stiffness: 90 })
            offsetLogo.value = withDelay(200, withSpring(offsetLogo.value + width, { damping: 20, stiffness: 90 }));
            offsetText.value = withDelay(250, withSpring(offsetText.value + width, { damping: 20, stiffness: 90 }));
            offsetConnection.value = withDelay(300, withSpring(offsetConnection.value + width, { damping: 20, stiffness: 90 }));
            offsetConnectionLogo.value = withDelay(350, withSpring(offsetConnectionLogo.value + width, { damping: 20, stiffness: 90 }));
            offsetConnectionButton.value = withDelay(400, withSpring(offsetConnectionButton.value + width, { damping: 20, stiffness: 90 }));
            setPage(page - 1);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[animatedStyles, styles.background]}>
                <LinearGradient
                    colors={[isEnabled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(106, 247, 135, 0.7)', 'transparent']}
                    style={styles.background}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 2, y: 1 }}
                />
            </Animated.View>
            <View style={styles.switch}>
                <Text style={[styles.darkMode, {color: isEnabled ? "white" : "black"}]}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <Animated.View style={[animatedStylesLogo, { marginTop: 50 }]}>
                <LottieViewConnection source={require('../../../assets/reddit.json')} width={100} height={200} />
            </Animated.View>
            <Animated.View style={[animatedStylesText]}>
                <ViewConnection Title={'Bienvenue sur ReddiTech'} description={welcome} width={width} isEnabled={isEnabled} />
            </Animated.View>
            <Animated.View style={[animatedStylesConnectionLogo, { position: 'absolute', top: 150 }]}>
                <LottieViewConnection source={require('../../../assets/connection.json')} width={100} height={100} />
            </Animated.View>
            <Animated.View style={[animatedStylesConnection, { position: 'absolute', top: 250 }]}>
                <ViewConnection Title={'Connexion'} description={access} width={width} isEnabled={isEnabled}/>
            </Animated.View>
            <Animated.View style={[animatedStylesConnectionButton, { position: 'absolute', top: 430, alignItems: 'center', width: width }]}>
                <TouchableOpacity style={[styles.connectionButton, { flexDirection: 'row' , backgroundColor: isEnabled ? "black": "white"}]} activeOpacity={.7}>
                    <Image source={require('../../../assets/reddit_button.png')} style={{ width: 20, height: 20 }} />
                    <Text style={{ fontWeight: '500', fontSize: 17, marginLeft: 5 , color: isEnabled ? "white": "black"}}>
                        Se connecter avec Reddit
                    </Text>
                </TouchableOpacity>
            </Animated.View>
            <View style={styles.bottomView}>
                <TouchableOpacity style={[styles.connectionButton, {backgroundColor: isEnabled ? "black" : "white"}]} onPress={() => functionStyle()} activeOpacity={.7}>
                    <Text style={{ fontWeight: '500', fontSize: 17 , color: isEnabled ? "white" : "black"}}>
                        {(page === 1) ? 'Précédent' : 'Suivant'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    connectionButton: {
        backgroundColor: 'white',
        width: '80%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 1,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        width: pages,
        height: height,
    },
    bottomView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    switch: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 10,
        justifyContent: "flex-start"
    },
    darkMode: {
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
    }
});