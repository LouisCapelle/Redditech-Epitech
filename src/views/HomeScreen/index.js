import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, useWindowDimensions, Image } from 'react-native';
import { useContext } from 'react';
import Trendings from './Components/Trendings';
import { ScrollView } from 'react-native-gesture-handler';
import AppContext from '../../services/Context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SubsView from './SubsView';
import PopularView from './PopularView';
import BestView from './BestView';
import { Ionicons } from '@expo/vector-icons';
import TextField from '../../components/TextField';

const renderScene = SceneMap({
    bestview: BestView,
    popview: PopularView,
    new: PopularView,
    subs: SubsView,
});

export default HomeScreen = () => {
    const appContext = useContext(AppContext);
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'bestview', title: 'Best' },
        { key: 'popview', title: 'Popular' },
        { key: 'new', title: 'New' },
        { key: 'subs', title: 'Subs' },
    ]);

    const Header = () => {
        const myRefCurrent = () => {
            setIndex(3)
        }
    
        return (
            <View style={{width: '90%', flexDirection: 'row', alignSelf: 'center'}}>
                <Image source={require('../../../assets/reddit_button.png')} style={{height: 35, width: 35, alignSelf: 'center', marginRight: 15}}></Image>
                <TextField onFocus={() => setIndex(3)} iconName="search1" iconSize={18} iconColor="black" placeHolder="Rechercher" width={'100%'} />
                <Ionicons name="settings-outline" size={35} color="black" style={{marginLeft: 10}}/>
            </View>
        );
    }

    renderTabBar = (props) => (
        <TabBar {...props}  
            style={{backgroundColor: appContext.darkMode ? "gray" : "white", height: 40}} 
            renderLabel={({ route, focused, color }) => (
                <Text style={{color: appContext.darkMode ? "white" : "black", fontWeight: '500', fontSize: 14, top: -3}}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{backgroundColor: '#fa4505', width: 60}}
            indicatorContainerStyle={{marginLeft: (layout.width / (routes.length * 3) - 13)}}
        />
    );

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "#F6F6F6", height: '100%', width: '100%'}}>
            <Header />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{marginTop: 10}}
                renderTabBar={(props) => renderTabBar(props)}
            />
        </SafeAreaView>
    );
}