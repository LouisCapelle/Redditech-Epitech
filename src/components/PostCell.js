import React from 'react';
import { View, Text, Image, Modal} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';

export default PostCell = (appContext, post, imageOpened, imageSelected, setImageOpened, setImageSelected) => {
    return (
        <View style={{backgroundColor: appContext.darkMode ? 'black' : 'white', width: '97%', alignSelf: 'center', marginTop: 10, borderRadius: 5}} activeOpacity={.7}>
            <View style={{flexDirection: 'row', marginLeft: 5, alignItems: 'center', marginTop: 5}}>
                <Image style={{height: 20, width: 20, borderRadius: 100, marginLeft: 5, marginRight: 5}} source={{uri: "https://styles.redditmedia.com/t5_363lq/styles/communityIcon_6dbeqwa749641.png?width=256&s=7003c96a63b6e4e95a81bf63f25bc59f71617538"}}/>
                <Text style={{fontSize: 10, fontWeight: '600', color: 'gray'}}>{post.data.subreddit_name_prefixed}</Text>
            </View>
            <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 15, fontWeight: '600', marginLeft: 5, marginTop: 5, marginBottom: 5, color: appContext.darkMode ? 'white' : 'black'}}>{post.data.title}</Text>
            </View>
            <View style={{width: '95%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', marginLeft: 5}}>
                <Text style={{textAlignVertical: 'center', fontWeight: '300', color: appContext.darkMode ? 'white' : 'black'}}>{post.data.selftext}</Text>
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
                        <Entypo name="arrow-up" size={35} color={appContext.darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <Text>{post.data.ups}</Text>
                    <TouchableOpacity>
                        <Entypo name="arrow-down" size={35} color={appContext.darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{marginLeft: 5, flexDirection: 'row'}}>
                    <FontAwesome5 name="comment-alt" size={18} color={appContext.darkMode ? 'white' : 'black'} />
                    <Text style={{color: appContext.darkMode ? 'white' : 'black'}}> {post.data.num_comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 5, flexDirection: 'row', marginRight: 5}}>
                    <FontAwesome5 name="share-alt" size={18} color={appContext.darkMode ? 'white' : 'black'} />
                    <Text style={{color: appContext.darkMode ? 'white' : 'black'}}> Share </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}