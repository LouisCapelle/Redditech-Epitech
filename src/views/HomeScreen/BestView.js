import React from 'react';
import { View, Text, Image, SafeAreaView, FlatList, Modal, Touchable } from 'react-native';
import { useContext } from 'react';
import AppContext from '../../services/Context';
import { getPosts, getPostsBest } from '../../services/SubReddits';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import ImageViewer from 'react-native-image-zoom-viewer';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

export default BestView = () => {
    const appContext = useContext(AppContext);
    const [posts, setPosts] = React.useState([]);
    const [imageSelected, setImageSelected] = React.useState('');
    const [imageOpened, setImageOpened] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        getPostsBest(appContext.redditApiToken).then((data) => {
            setPosts(data.data.children)
            setIsLoaded(true);
        })
    }, []);


    const MyLoader = (props) => (
        <ContentLoader 
            speed={.5}
            width="97%"
            height="100%"
            viewBox="0 30 500 200"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <Circle cx="17" cy="32" r="15" /> 
            <Rect x="42" y="28" rx="2" ry="2" width="100%" height="10" /> 
            <Rect x="-4" y="54" rx="2" ry="2" width="100%" height="100%"/>
        </ContentLoader>
    )

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
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
            { !isLoaded ?
                <FlatList
                    data={[{}, {}, {}, {}, {}, {}]}
                    renderItem={({item}) => {
                        return (
                            <View style={{height: 210, backgroundColor: 'white', alignSelf: 'center', width: '100%', marginTop: 10, width: '97%', borderRadius: 4}}>
                                <MyLoader style={{alignSelf: 'center', width: '97%', top: -5}}/>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%', marginTop: 5}}
                />
                :
                <FlatList
                    data={posts}
                    renderItem={({item}) => renderPost(item)}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%'}}
                />
            }
        </SafeAreaView>
    );
}
