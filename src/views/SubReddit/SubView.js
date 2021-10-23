import React, { useRef, useContext, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, Image, ImageBackground, useWindowDimensions} from 'react-native';
import BackButton from '../../components/BackButton';
import { getSubReddit } from '../../services/SubReddits';
import AppContext from '../../services/Context';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import { JoinButton } from '../../components/Button';
import AnimatedHeader from './Components/AnimatedHeader';

export default SubView = ({route, navigation, props}) => {

    const subReddit = route.params.subReddit;
    const appContext = useContext(AppContext);
    const offset = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const [subRedditInfo, setSubRedditInfo] = useState({});

    React.useEffect(() => {
        getSubReddit(appContext.redditApiToken, subReddit.data.display_name)
        .then((data) => {
            console.log(data)
            setSubRedditInfo(data.data)
        })
    }, [])

    
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
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
});
  