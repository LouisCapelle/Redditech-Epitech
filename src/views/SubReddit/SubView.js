import React, { useRef, useContext, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, Image, ImageBackground} from 'react-native';
import BackButton from '../../components/BackButton';
import { getSubReddit } from '../../services/SubReddits';
import AppContext from '../../services/Context';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const HEADER_HEIGHT = 200;

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
            inputRange: [0, 0],
            outputRange: [0, -20],
            extrapolate: 'clamp'
        })

        const textHeight = offset.interpolate({
            inputRange: [0, 30],
            outputRange: [30, 0],
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
                    <ImageBackground source={{uri: subRedditInfo.banner_background_image}} style={{width: '100%', height: '100%'}} imageStyle={{opacity: .6, resizeMode: 'cover', borderBottomRightRadius: 10, borderBottomLeftRadius: 10}} >
                        <BackButton navigation={navigation} style={{marginTop: 50, marginLeft: 20}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Animated.Image source={{uri: (subRedditInfo.community_icon) ? subRedditInfo.community_icon : subRedditInfo.icon_img}} style={{height: imageSize, width: imageSize, borderRadius: 100, borderWidth: 3, marginLeft: 15, zIndex: 3, marginTop: imagePlace}}/>
                            <Animated.Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 24, color: (subRedditInfo.key_color) ? invertColor(subRedditInfo.key_color) : 'white', fontWeight: '500', marginTop: textPlace}}>
                                {subRedditInfo.display_name_prefixed}
                            </Animated.Text>
                        </View>
                        <Animated.Text style={{marginLeft: 5, fontSize: 15, color: (subRedditInfo.key_color) ? invertColor(subRedditInfo.key_color) : 'white', fontWeight: '300', marginTop: textPlace, marginLeft: 20, marginTop: 10, height: textHeight}}>
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
                        <View style={{flexDirection: 'row'}}>
                            <Animated.Image source={{uri: (subRedditInfo.community_icon) ? subRedditInfo.community_icon : subRedditInfo.icon_img}} style={{height: imageSize, width: imageSize, borderRadius: 100, borderWidth: 3, marginLeft: 15, zIndex: 3, marginTop: imagePlace}}/>
                            <Animated.Text style={{alignSelf: 'center', marginLeft: 5, fontSize: 24, color: (subRedditInfo.key_color) ? invertColor(subRedditInfo.key_color) : 'white', fontWeight: '500', marginTop: textPlace}}>
                                {subRedditInfo.display_name_prefixed}
                            </Animated.Text>
                        </View>
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
                    style={{ flex: 1, backgroundColor: 'white', zIndex: 1 }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: 220,
                        paddingHorizontal: 20,
                        zIndex: 1
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: offset } } }],
                        { useNativeDriver: false }
                )}>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee


                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
                    <Text>
                        geargae
                        getMySubRedditsgez
                        rgez
                        g
                        ezg
                        ege
                        ge
                        ge
                        gergergzergegegeg
                        ege
                        gergergzergegegegezgegezge
                        gergezgegegzegergezgezgezg
                        gerzgerzgezgegezge
                        gezgezgezgezgezgezrg
                        gezgzegzegezgegerg
                        egezgezgezgezgez
                        gzegezgezrgezgege
                        gezgezgezgezgezgezrgegezg
                        gegezgezgezgzegegze
                        gezgezgergezgergergergezrgege
                        gezgezgezrgezrgerzgee

                        
                    </Text>
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
  