import React, { useRef, useContext, useState } from 'react';
import {View, TouchableOpacity, Text, Animated, ScrollView, Image, FlatList} from 'react-native';
import { getSubReddit, getSubRedditPosts } from '../../services/SubReddits';
import AppContext from '../../services/Context';
import { SafeAreaProvider, SafeAreaView,} from 'react-native-safe-area-context';
import AnimatedHeader from './Components/AnimatedHeader';
import PostCell from '../../components/PostCell';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

export default SubView = ({route, navigation, props}) => {

    const subReddit = route.params.subReddit;
    const appContext = useContext(AppContext);
    const offset = useRef(new Animated.Value(0)).current;
    const [subRedditInfo, setSubRedditInfo] = useState({});
    const [subRedditPosts, setSubRedditPosts] = useState([]);
    const [imageSelected, setImageSelected] = React.useState('');
    const [imageOpened, setImageOpened] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        getSubReddit(appContext.redditApiToken, subReddit.data.display_name)
        .then((data) => {
            setSubRedditInfo(data.data)
        })
        getSubRedditPosts(appContext.redditApiToken, subReddit.data.display_name)
        .then((data) => {
            setSubRedditPosts(data.data.children)
            setIsLoaded(true)
        })
    }, [])

    const MyLoader = (props) => (
        <ContentLoader 
            speed={.5}
            width="97%"
            height="100%"
            viewBox="0 30 500 200"
            backgroundColor={appContext.darkMode ? '#15202b' : "#ececec"}
            foregroundColor="#ececec"
            {...props}
        >
            <Circle cx="17" cy="32" r="15" /> 
            <Rect x="42" y="28" rx="2" ry="2" width="100%" height="10" /> 
            <Rect x="-4" y="54" rx="2" ry="2" width="100%" height="100%"/>
        </ContentLoader>
    )
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, backgroundColor: '#15202b'}} forceInset={{ top: 'always' }}>
                <AnimatedHeader redditInfo={subRedditInfo} route={route} navigation={navigation} offset={offset}/>
                <ScrollView
                    style={{ flex: 1, backgroundColor: '#15202b', zIndex: 1 }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: 230,
                        zIndex: 1
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: offset } } }],
                        { useNativeDriver: false }
                )}>
                   { !isLoaded ?
                        <FlatList
                            data={[{}, {}, {}, {}, {}, {}]}
                            renderItem={({item}) => {
                                return (
                                    <View style={{height: 210, backgroundColor: appContext.darkMode ? 'black' : 'white', alignSelf: 'center', width: '100%', marginTop: 10, width: '97%', borderRadius: 4}}>
                                        <MyLoader style={{alignSelf: 'center', width: '97%', top: -5}}/>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%', marginTop: 5}}
                        />
                        :
                        <FlatList
                            data={subRedditPosts}
                            renderItem={({item}) => PostCell(appContext, item, imageOpened, imageSelected, setImageOpened, setImageSelected)}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%'}}
                        />
                    }
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
  