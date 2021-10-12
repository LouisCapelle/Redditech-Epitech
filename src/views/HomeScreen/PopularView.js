import React from 'react';
import { View, Text, Image, SafeAreaView, FlatList, useWindowDimensions } from 'react-native';
import { useContext } from 'react';
import AppContext from '../../services/Context';
import { getPosts } from '../../services/SubReddits';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default PopularView = () => {
    const appContext = useContext(AppContext);
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        getPosts(appContext.redditApiToken).then((data) => {
            setPosts(data.data.children)
        })
    }, []);

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
                <View style={{marginLeft: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
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
                        <Text> {post.data.num_comments} </Text>
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
            <FlatList
                data={posts}
                renderItem={({item}) => renderPost(item)}
                keyExtractor={(item, index) => index.toString()}
                style={{width: '100%'}}
            />
        </SafeAreaView>
    );
}
