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
import PostCell from '../../components/PostCell';

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

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "#15202b" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
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
                    renderItem={({item}) => PostCell(appContext, item, imageOpened, imageSelected, setImageOpened, setImageSelected)}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%'}}
                />
            }
        </SafeAreaView>
    );
}
