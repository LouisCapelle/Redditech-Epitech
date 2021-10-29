import React, { useRef, useContext, useState } from 'react';
import {View, TouchableOpacity, Text, Animated, ScrollView, Image, FlatList} from 'react-native';
import { getSubReddit, getSubRedditPosts } from '../../services/SubReddits';
import AppContext from '../../services/Context';
import { SafeAreaProvider, SafeAreaView,} from 'react-native-safe-area-context';
import AnimatedHeader from './Components/AnimatedHeader';
import PostCell from '../../components/PostCell';

export default SubView = ({route, navigation, props}) => {

    const subReddit = route.params.subReddit;
    const appContext = useContext(AppContext);
    const offset = useRef(new Animated.Value(0)).current;
    const [subRedditInfo, setSubRedditInfo] = useState({});
    const [subRedditPosts, setSubRedditPosts] = useState([]);
    const [imageSelected, setImageSelected] = React.useState('');
    const [imageOpened, setImageOpened] = React.useState(false);

    React.useEffect(() => {
        getSubReddit(appContext.redditApiToken, subReddit.data.display_name)
        .then((data) => {
            setSubRedditInfo(data.data)
        })
        getSubRedditPosts(appContext.redditApiToken, subReddit.data.display_name)
        .then((data) => {
            setSubRedditPosts(data.data.children)
        })
    }, [])
    
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
                   <FlatList
                        data={subRedditPosts}
                        renderItem={({item}) => PostCell(appContext, item, imageOpened, imageSelected, setImageOpened, setImageSelected)}
                        keyExtractor={(item, index) => index.toString()}
                        style={{width: '100%'}}
                    /> 
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
  