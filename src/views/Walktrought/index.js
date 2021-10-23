import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Touchable, Switch, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { LottieViewConnection } from './Component/LottieViewConnection';
import { ViewConnection } from './Component/ViewConnection';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import styles from './index.styles';
import Button from '../../components/Button';
import AppContext from '../../services/Context';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import { storeApiToken, getUserConnected } from '../../services/Auth';

const width = Dimensions.get('window').width;

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default WalkTrought = () => {
    const offset = useSharedValue(0);
    const offsetLogo = useSharedValue(0);
    const offsetText = useSharedValue(0);
    const offsetConnection = useSharedValue(width);
    const offsetConnectionLogo = useSharedValue(width);
    const offsetConnectionButton = useSharedValue(width);
    const [page, setPage] = useState(0);
    const navigation = useNavigation();
    const appContext = React.useContext(AppContext);
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: 'PAOv6RYOaKePE4QSCdhKaQ',
            scopes: ['identity', 'mysubreddits', 'read'],
            redirectUri: makeRedirectUri({
                scheme: 'exp://t2-dfe.loucaplou.b-dev-501-bdx-5-1-redditech-maxime-demurger.exp.direct:80'
            }),
        },
        discovery
    );

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

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            storeApiToken(access_token);
            getUserConnected(access_token).then((user) => {
                appContext.setApiToken(access_token);
                appContext.setRedditUser(user);
                appContext.getUserSubreddits(access_token);
                navigation.navigate('TabBar')
            }).catch((error) => {
                console.log(error)
                appContext.setApiToken(null);
                appContext.setRedditUser(null);
            });
        }
    }, [response]);

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
            offsetConnectionButton.value = withDelay(300, withSpring(offsetConnectionButton.value + width, { damping: 20, stiffness: 90 }));
            setPage(page - 1);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[animatedStyles, styles.background]}>
                <LinearGradient
                    colors={[appContext.darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(106, 247, 135, 0.7)', 'transparent']}
                    style={styles.background}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 2, y: 1 }}
                />
            </Animated.View>
            <DarkModeSwitcher />
            <Animated.View style={[animatedStylesLogo, { marginTop: 50 }]}>
                <LottieViewConnection source={require('../../../assets/reddit.json')} width={100} height={200} />
            </Animated.View>
            <Animated.View style={[animatedStylesText]}>
                <ViewConnection Title={'Bienvenue sur ReddiTech'} description={welcome} width={width} isEnabled={appContext.darkMode} />
            </Animated.View>
            <Animated.View style={[animatedStylesConnectionLogo, { position: 'absolute', top: 150 }]}>
                <LottieViewConnection source={require('../../../assets/connection.json')} width={100} height={100} />
            </Animated.View>
            <Animated.View style={[animatedStylesConnection, { position: 'absolute', top: 250 }]}>
                <ViewConnection Title={'Connexion'} description={access} width={width} isEnabled={appContext.darkMode}/>
            </Animated.View>
            <Animated.View style={[animatedStylesConnectionButton, { position: 'absolute', top: 430, alignItems: 'center', width: width }]}>
                <Button text="Se connecter avec Reddit" imageSource={require('../../../assets/reddit_button.png')} onPress={() => promptAsync()} disabled={!request}/>
            </Animated.View>
            <View style={styles.bottomView}>
                <Button text={(page === 1) ? 'Précédent' : 'Suivant'} onPress={() => functionStyle()}/>
            </View>
        </SafeAreaView>
    )
}