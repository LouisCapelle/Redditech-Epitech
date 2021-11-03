import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, useWindowDimensions, Image, InteractionManager, TextInput} from 'react-native';
import { useContext } from 'react';
import AppContext from '../../services/Context';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { searchRequest} from '../../services/SubReddits'


export default SubsView = ({route, navigation, props}) => {
    const appContext = useContext(AppContext);
    const [isFocused, setIsFocused] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            appContext.getUserSubreddits(appContext.redditApiToken);
        });
        return unsubscribe;
    }, []);

    const Header = () => {
        return (
            <View style={{width: '90%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between'}}>
                <Image source={require('../../../assets/reddit_button.png')} style={{height: 35, width: 35, alignSelf: 'center', marginRight: 15}}/>
                <View style={styles.view}>
                    <TextInput style={[styles.textField, {color: (appContext.darkMode) ? "white" : "black", width: '100%'}]} placeholder={'Rechercher'} onChangeText={(text) => onTextChange(text)}/>
                    <AntDesign name={"search1"} size={18} color={'black'} style={[styles.icon]}/>
                </View>
                <Ionicons name="settings-outline" size={35} color={appContext.darkMode ? "white" : 'black'} style={{marginLeft: 10}}/>
            </View>
        );
    }

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
                    <AntDesign name="arrowright" size={20} color="white" style={{justifyContent: 'flex-end', marginRight: 15}}/>
                </View>
            </TouchableOpacity>
        );
    }

    const renderSearch = (subreddit) => {
        console.log(subreddit);
        return (
            <TouchableOpacity style={{backgroundColor: appContext.darkMode ? 'black' : 'white', width: '97%', alignSelf: 'center', marginTop: 10, borderRadius: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} activeOpacity={.7} onPress={() => navigation.navigate('SubView', {subReddit: subreddit})}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5}}>
                    { subreddit.icon_img !== "" &&
                        <Image style={{width: 40, height: 40, borderRadius: 100, marginLeft: 8}} source={{uri: subreddit.icon_img}}/>
                    }
                    <Text style={{margin : 10, color: appContext.darkMode ? 'white' : 'black'}}>r/{subreddit.name}</Text>
                </View>
                <View>
                    <AntDesign name="arrowright" size={20} color="white" style={{justifyContent: 'flex-end', marginRight: 15}}/>
                </View>
            </TouchableOpacity>
        )
    }

    const onTextChange = (text) => {
        if (text.length > 0) {
            searchRequest(text, appContext.redditApiToken).then((res) => {
                setSearchData(res)
            });
        } else {
            setSearchData([]);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "#15202b" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
            <Header/>
            { (searchData.length === 0) ?
                <FlatList
                    data={appContext.userSubreddits}
                    renderItem={({item}) => renderSubReddit(item)}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%'}}
                />
                :
                <FlatList
                    data={searchData}
                    renderItem={(item) => renderSearch(item)}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%'}}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    textField: {
        padding: 10,
        paddingLeft: 35,
        backgroundColor: '#D3D3D3',
        borderRadius: 8,
        flex :1
    },
    icon: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        top: 9.5,
        left: 10,
        bottom: 10
    }
})