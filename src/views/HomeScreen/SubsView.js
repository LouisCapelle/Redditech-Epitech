import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, useWindowDimensions } from 'react-native';
import { useContext } from 'react';
import Trendings from './Components/Trendings';
import { ScrollView } from 'react-native-gesture-handler';
import AppContext from '../../services/Context';
import { getMySubReddits } from '../../services/SubReddits';

export default SubsView = () => {
    const appContext = useContext(AppContext);
    const [subReddits, setSubReddits] = React.useState([]);

    React.useEffect(() => {
        getMySubReddits(appContext.redditApiToken).then(subReddits => {
            setSubReddits(subReddits.data.children);
        });
    }, []);

    renderSubReddit = (subReddit) => {
        return (
            <View style={{backgroundColor: 'white', width: '97%', alignSelf: 'center', marginTop: 10}}>
                <Text style={{margin : 10}}>{subReddit.data.display_name_prefixed}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
            <ScrollView style={{width: '100%'}}>
                <FlatList
                    data={subReddits}
                    renderItem={({item}) => renderSubReddit(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}