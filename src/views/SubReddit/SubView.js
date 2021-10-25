import React, { useRef, useContext, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, Image, ImageBackground, FlatList} from 'react-native';
import BackButton from '../../components/BackButton';
import { getSubReddit, getSubRedditPosts } from '../../services/SubReddits';
import AppContext from '../../services/Context';
import { SafeAreaProvider, SafeAreaView,} from 'react-native-safe-area-context';
import AnimatedHeader from './Components/AnimatedHeader';
import {Modal} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import ImageViewer from 'react-native-image-zoom-viewer';

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
            console.log(data)
            setSubRedditInfo(data.data)
        })
        getSubRedditPosts(appContext.redditApiToken, subReddit.data.display_name)
        .then((data) => {
            console.log(data)
            setSubRedditPosts(data.data.children)
        })
    }, [])

    const renderPost = (post) => {
        return (
            <View style={{backgroundColor: appContext.darkMode ? '#e0e0e0' : 'white', width: '97%', alignSelf: 'center', marginTop: 10, borderRadius: 5}} activeOpacity={.7}>
                <View style={{flexDirection: 'row', marginLeft: 5, alignItems: 'center', marginTop: 5}}>
                    <Image style={{height: 20, width: 20, borderRadius: 100, marginLeft: 5, marginRight: 5}} source={{uri: "https://styles.redditmedia.com/t5_363lq/styles/communityIcon_6dbeqwa749641.png?width=256&s=7003c96a63b6e4e95a81bf63f25bc59f71617538"}}/>
                    <Text style={{fontSize: 10, fontWeight: '600', color: 'gray'}}>{post.data.subreddit_name_prefixed}</Text>
                </View>
                <View style={{marginLeft: 5}}>
                    <Text style={{fontSize: 15, fontWeight: '600', marginLeft: 5, marginTop: 5, marginBottom: 5}}>{post.data.title}</Text>
                </View>
                <View style={{width: '95%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginLeft: 5}}>
                    <Text style={{textAlignVertical: 'center', fontWeight: '300'}}>{post.data.selftext}</Text>
                </View>
                { (typeof post.data.preview !== 'undefined' && typeof post.data.preview.images[0] !== 'undefined' && typeof post.data.preview.images[0].variants !== 'undefined' && Object.keys(post.data.preview.images[0].variants).length === 0) &&
                    <TouchableOpacity activeOpacity={.7} onPress={() => {
                        setImageSelected(post.data.preview.images[0].resolutions[post.data.preview.images[0].resolutions.length - 1].url);
                        setImageOpened(true);
                    }}>
                        <Image style={{height: 250, width: '97%', alignSelf: 'center', borderRadius: 5}} source={{uri: post.data.preview.images[0].resolutions[post.data.preview.images[0].resolutions.length - 1].url}} />
                    </TouchableOpacity>
                }
                { (typeof post.data.preview !== 'undefined' && typeof post.data.preview.images[0] !== 'undefined' && typeof post.data.preview.images[0].variants !== 'undefined' && typeof post.data.preview.images[0].variants.gif !== 'undefined') &&
                    <TouchableOpacity activeOpacity={.7}>
                        <Image style={{height: 250, width: '97%', alignSelf: 'center'}} source={{uri: post.data.preview.images[0].variants.gif.resolutions[post.data.preview.images[0].variants.gif.resolutions.length - 1].url}} />
                    </TouchableOpacity>
                }
                <Modal visible={imageOpened} transparent={true}>
                    <ImageViewer imageUrls={[{
                            url: imageSelected,
                        }]}
                        onCancel={() => setImageOpened(false)}
                        enableSwipeDown
                    />
                </Modal>
                <View style={{marginLeft: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity>
                            <Entypo name="arrow-up" size={35} color="black" />
                        </TouchableOpacity>
                        <Text>{post.data.ups}</Text>
                        <TouchableOpacity>
                            <Entypo name="arrow-down" size={35} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{marginLeft: 5, flexDirection: 'row'}}>
                        <FontAwesome5 name="comment-alt" size={18} color="black" />
                        <Text> {post.data.num_comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 5, flexDirection: 'row', marginRight: 5}}>
                        <FontAwesome5 name="share-alt" size={18} color="black" />
                        <Text> Share </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
                <AnimatedHeader redditInfo={subRedditInfo} route={route} navigation={navigation} offset={offset}/>
                <ScrollView
                    style={{ flex: 1, backgroundColor: '#f6f6f6', zIndex: 1 }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: 250,
                        paddingHorizontal: 20,
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
                        renderItem={({item}) => renderPost(item)}
                        keyExtractor={(item, index) => index.toString()}
                        style={{width: '100%'}}
                    /> 
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
  