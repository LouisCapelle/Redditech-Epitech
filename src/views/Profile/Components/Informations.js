import React from 'react';
import { View, Text } from 'react-native';
import { useContext } from 'react';
import styles from '../styles/index.styles';


export default InformationsView = () => {
    const appContext = useContext(AppContext);

    return (
        <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{alignItems: 'center', marginRight: 15}}>
                <Text style={{fontSize: 15, fontWeight: '300', color: (appContext.darkMode) ? "white" : "black" }}>Friends</Text>
                <Text style={{fontSize: 25, color: (appContext.darkMode) ? "white" : "black" }}>{appContext.redditUser.num_friends}</Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View style={{alignItems: 'center', marginLeft: 15, marginRight: 15}}>
                <Text style={{fontSize: 15, fontWeight: '300', color: (appContext.darkMode) ? "white" : "black" }}>Karma</Text>
                <Text style={{fontSize: 25, color: (appContext.darkMode) ? "white" : "black" }}>{appContext.redditUser.total_karma}</Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View style={{alignItems: 'center', marginLeft: 15}}>
                <Text style={{fontSize: 15, fontWeight: '300', color: (appContext.darkMode) ? "white" : "black" }}>Subscribers</Text>
                <Text style={{fontSize: 25, color: (appContext.darkMode) ? "white" : "black" }}>{appContext.redditUser.subreddit.subscribers}</Text>
            </View>
        </View>
    );
}