import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useContext } from 'react';
import AppContext from '../../services/Context';
import { getPosts } from '../../services/SubReddits';
import PostCell from '../../components/PostCell';

export default PopularView = () => {
    const appContext = useContext(AppContext);
    const [posts, setPosts] = React.useState([]);
    const [imageSelected, setImageSelected] = React.useState('');
    const [imageOpened, setImageOpened] = React.useState(false);

    React.useEffect(() => {
        getPosts(appContext.redditApiToken).then((data) => {
            setPosts(data.data.children)
        })
    }, []);

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "#15202b" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
            <FlatList
                data={posts}
                renderItem={({item}) => PostCell(appContext, item, imageOpened, imageSelected, setImageOpened, setImageSelected)}
                keyExtractor={(item, index) => index.toString()}
                style={{width: '100%'}}
            />
        </SafeAreaView>
    );
}
