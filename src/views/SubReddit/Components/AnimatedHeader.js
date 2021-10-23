import React, { useRef, useContext, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, Image, ImageBackground, useWindowDimensions} from 'react-native';
import BackButton from '../../../components/BackButton';
import { getSubReddit } from '../../../services/SubReddits';
import AppContext from '../../../services/Context';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import { JoinButton } from '../../../components/Button';

const HEADER_HEIGHT = 230;

export default AnimatedHeader = ({redditInfo, route, navigation, offset}) => {
    const insets = useSafeAreaInsets();
    const subRedditInfo = redditInfo;

    const headerHeight = offset.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, insets.top + 70],
        extrapolate: 'clamp'
    });

    const imageSize = offset.interpolate({
        inputRange: [0, 80],
        outputRange: [80, 50],
        extrapolate: 'clamp'
    })

    const imagePlace = offset.interpolate({
        inputRange: [0, 15],
        outputRange: [15, 5],
        extrapolate: 'clamp'
    })

    const textPlace = offset.interpolate({
        inputRange: [0, 10],
        outputRange: [10, 5],
        extrapolate: 'clamp'
    })

    const textHeight = offset.interpolate({
        inputRange: [0, 70],
        outputRange: [70, 0],
        extrapolate: 'clamp'
    })

    const UsersHeight = offset.interpolate({
        inputRange: [0, 20],
        outputRange: [20, 0],
        extrapolate: 'clamp'
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                height: headerHeight,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: 'white'
            }}
        >
            {(subRedditInfo.banner_background_image) ?
                <ImageBackground source={{uri: subRedditInfo.banner_background_image}} style={{width: '100%', height: '100%'}} imageStyle={{opacity: .2, resizeMode: 'cover'}} >
                    <BackButton navigation={navigation} style={{marginTop: 50, marginLeft: 20}}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Animated.Image source={{uri: (subRedditInfo.community_icon) ? subRedditInfo.community_icon : subRedditInfo.icon_img}} style={{height: imageSize, width: imageSize, borderRadius: 100, borderWidth: 3, marginLeft: 15, zIndex: 3, marginTop: imagePlace}}/>
                            <Animated.Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 20, color: 'black', fontWeight: '700', marginTop: textPlace}}>
                                {subRedditInfo.display_name_prefixed}
                            </Animated.Text>
                        </View>
                        <JoinButton style={{width: '20%', marginRight: 20}}isSubscribed={subRedditInfo.user_is_subscriber}/>
                    </View>
                    <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center'}}>
                        <Animated.Text style={{fontSize: 12, color: 'black', fontWeight: '200', marginTop: textPlace, justifyContent: 'center', alignSelf: 'center', height: UsersHeight, color: 'black', }}>
                            {subRedditInfo.subscribers} members - {subRedditInfo.active_user_count} users active
                        </Animated.Text>
                    </View>
                    <Animated.Text style={{fontSize: 12, color: 'black', fontWeight: '400', marginTop: textPlace, height: textHeight, width: '90%', justifyContent: 'center', alignSelf: 'center'}}>
                        {subRedditInfo.public_description}
                    </Animated.Text>
                </ImageBackground>
                :
                <>
                    <LinearGradient
                        colors={[(subRedditInfo.key_color) ? subRedditInfo.key_color : 'lightblue', 'white']}
                        style={[styles.background, {height: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}
                    />
                    <BackButton navigation={navigation} style={{marginTop: 50, marginLeft: 20}}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Animated.Image source={{uri: (subRedditInfo.community_icon) ? subRedditInfo.community_icon : subRedditInfo.icon_img}} style={{height: imageSize, width: imageSize, borderRadius: 100, borderWidth: 3, marginLeft: 15, zIndex: 3, marginTop: imagePlace}}/>
                            <Animated.Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 20, color: 'black', fontWeight: '700', marginTop: textPlace}}>
                                {subRedditInfo.display_name_prefixed}
                            </Animated.Text>
                        </View>
                        <JoinButton style={{width: '20%', marginRight: 20}}isSubscribed={subRedditInfo.user_is_subscriber}/>
                    </View>
                    <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center'}}>
                        <Animated.Text style={{fontSize: 12, color: 'black', fontWeight: '200', marginTop: textPlace, justifyContent: 'center', alignSelf: 'center', height: UsersHeight, color: 'black', }}>
                            {subRedditInfo.subscribers} members - {subRedditInfo.active_user_count} users active
                        </Animated.Text>
                    </View>
                    <Animated.Text style={{fontSize: 12, color: 'black', fontWeight: '300', marginTop: textPlace, height: textHeight, width: '90%', justifyContent: 'center', alignSelf: 'center'}}>
                        {subRedditInfo.public_description}
                    </Animated.Text>
                </>
            }
            
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
});