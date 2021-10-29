import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, useWindowDimensions, Image } from 'react-native';
import { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import AppContext from '../../services/Context';
import { useNavigation } from '@react-navigation/native';

export default SubsView = () => {
    const appContext = useContext(AppContext);

    const navigation = useNavigation();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            appContext.getUserSubreddits(appContext.redditApiToken);
        });
        return unsubscribe;
    }, [navigation])

    const renderSubReddit = (subReddit) => {
        return (
            <TouchableOpacity style={{backgroundColor: appContext.darkMode ? 'black' : 'white', width: '97%', alignSelf: 'center', marginTop: 10, borderRadius: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} activeOpacity={.7} onPress={() => navigation.navigate('SubView', {subReddit: subReddit})}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5}}>
                    { subReddit.data.community_icon !== "" &&
                        <Image style={{width: 40, height: 40, borderRadius: 100, marginLeft: 8}} source={{uri: subReddit.data.community_icon}}/>
                    }
                    <Text style={{margin : 10, color: appContext.darkMode ? 'white' : 'black'}}>{subReddit.data.display_name_prefixed}</Text>
                </View>
                <View>
                    <AntDesign name="arrowright" size={20} color="black" style={{justifyContent: 'flex-end', marginRight: 15}}/>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "#15202b" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
            <FlatList
                data={appContext.userSubreddits}
                renderItem={({item}) => renderSubReddit(item)}
                keyExtractor={(item, index) => index.toString()}
                style={{width: '100%'}}
            />
        </SafeAreaView>
    );
}