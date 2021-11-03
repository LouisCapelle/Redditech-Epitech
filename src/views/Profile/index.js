import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import styles from './styles/index.styles';
import InformationsView from './Components/Informations';
import { removeApiToken, updateUserPreferences } from '../../services/Auth';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Switcher from '../../components/Switcher';
import { getUserPreferences } from '../../services/Auth';

export default Profile = () => {
    const appContext = useContext(AppContext);
    const navigation = useNavigation();
    const [allowPMS, setAllowPMS] = React.useState(false);
    const [enable_followers, setEnableFollowers] = React.useState(false);
    const [email_chat_request, setEmailChatRequest] = React.useState(false);
    const [email_private_message, setEmailPrivateMessage] = React.useState(false);
    const [hide_ads, setHideAds] = React.useState(false);
    const [ignore_suggested_sort, setIgnoreSuggestedSort] = React.useState(false);

    React.useEffect(() => {
        getUserPreferences(appContext.redditApiToken).then((res) => {
            setAllowPMS((res.accept_pms === "everyone") ? true : false);
            setEnableFollowers(res.enable_followers);
            setEmailChatRequest(res.email_chat_request);
            setEmailPrivateMessage(res.email_private_message);
        });
    }, [])

    const onToggleChange = () => {
        const object = {
            accept_pms: allowPMS ? "everyone" : "none",
            enable_followers: enable_followers,
            email_chat_request: email_chat_request,
            email_private_message: email_private_message,
            hide_ads: hide_ads,
            ignore_suggested_sort: ignore_suggested_sort
        }

        updateUserPreferences(appContext.redditApiToken, object)
    }

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
                        <View>
                            <Switcher text={'Allow private messages'} value={allowPMS} onValueChange={(value) => {setAllowPMS(value); onToggleChange()}}/>
                            <Switcher text={'Allow people to follow you'} value={enable_followers} onValueChange={(value) => {setEnableFollowers(value); onToggleChange()}} />
                            <Switcher text={'Enable chat requests'} value={email_chat_request} onValueChange={(value) => {setEmailChatRequest(value); onToggleChange()}}/>
                            <Switcher text={'Enable email messages'} value={email_private_message} onValueChange={(value) => {setEmailPrivateMessage(value); onToggleChange()}}/>
                            <Switcher text={'Hide revelants ads'} value={hide_ads} onValueChange={(value) => {setHideAds(value); onToggleChange()}}/>
                            <Switcher text={'Ignore suggested sort'} value={ignore_suggested_sort} onValueChange={(value) => {setIgnoreSuggestedSort(value); onToggleChange()}}/>
                        </View>
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