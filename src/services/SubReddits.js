import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const getMySubReddits = (apiToken) => {
    console.log(apiToken)
    return fetch('https://oauth.reddit.com/subreddits/mine/subscriber', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}