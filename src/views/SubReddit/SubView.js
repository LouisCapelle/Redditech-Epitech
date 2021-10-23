import React, { useRef, useContext, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, Image, ImageBackground} from 'react-native';
import BackButton from '../../components/BackButton';
import { getSubReddit } from '../../services/SubReddits';
import AppContext from '../../services/Context';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 

const HEADER_HEIGHT = 230;

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

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

    const AnimatedHeader = () => {
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
                                <Animated.Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 24, color: 'black', fontWeight: '500', marginTop: textPlace}}>
                                    {subRedditInfo.display_name_prefixed}
                                </Animated.Text>
                            </View>
                            <TouchableOpacity style={{backgroundColor: '#fa4505', borderRadius: 100, width: '20%', height: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 20}} activeOpacity={.5}>
                                <AntDesign name="plus" size={15} color="white" />
                                <Text style={{color: 'white'}}> Join </Text>
                            </TouchableOpacity>
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
                                <Animated.Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 24, color: 'black', fontWeight: '500', marginTop: textPlace}}>
                                    {subRedditInfo.display_name_prefixed}
                                </Animated.Text>
                            </View>
                            <TouchableOpacity style={{backgroundColor: '#fa4505', borderRadius: 100, width: '20%', height: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 20}} activeOpacity={.5}>
                                <AntDesign name="plus" size={15} color="white" />
                                <Text style={{color: 'white'}}> Join </Text>
                            </TouchableOpacity>
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
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
                <AnimatedHeader></AnimatedHeader>
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
                  <View style={{backgroundColor: '#f6f6f6'}}>
                      <Text> Test test</Text>
                  </View>
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
  