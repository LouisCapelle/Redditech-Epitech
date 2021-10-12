import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, useWindowDimensions } from 'react-native';
import Header from './Components/Header';
import { useContext } from 'react';
import Trendings from './Components/Trendings';
import { ScrollView } from 'react-native-gesture-handler';
import AppContext from '../../services/Context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SubsView from './SubsView';
import PopularView from './PopularView';

const SecondRoute = (appContext) => {
    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "#F6F6F6", height: '100%', width: '100%', alignItems: 'center'}}>
            <ScrollView style={{width: '100%'}}>
                <Trendings/>
                <Trendings/>
            </ScrollView>
        </SafeAreaView>
    );
}

const renderScene = SceneMap({
    first: SecondRoute,
    popview: PopularView,
    subs: SubsView
});

export default HomeScreen = () => {
    const appContext = useContext(AppContext);
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'News' },
        { key: 'popview', title: 'Popular' },
        { key: 'subs', title: 'Subs' },
    ]);

    renderTabBar = (props) => (
        <TabBar {...props}  
            style={{backgroundColor: appContext.darkMode ? "gray" : "white", height: 40}} 
            renderLabel={({ route, focused, color }) => (
                <Text style={{color: appContext.darkMode ? "white" : "black", fontWeight: '500', fontSize: 14, top: -3}}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{backgroundColor: '#fa4505', width: 60}}
            indicatorContainerStyle={{marginLeft: (layout.width / (routes.length * 3) - 8)}}
        />
    );

    return (
        <SafeAreaView style={{backgroundColor: appContext.darkMode ? "grey" : "#F6F6F6", height: '100%', width: '100%'}}>
            <Header/>
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