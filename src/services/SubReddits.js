import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const getMySubReddits = (apiToken) => {
    console.log(apiToken)
    return fetch('https://oauth.reddit.com/subreddits/mine/subscriber.json?raw_json=1', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export const getPosts = (apiToken) => {
    return fetch('https://oauth.reddit.com/hot.json?raw_json=1', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export const getPostsBest = (apiToken) => {
    return fetch('https://oauth.reddit.com/best.json?raw_json=1', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export const getSubReddit = (apiToken, subreddit_name) => {
    console.log(apiToken)
    return fetch('https://oauth.reddit.com/r/' + subreddit_name + '/about.json?raw_json=1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiToken
        }
    }).then((response) => response.json())
}

export const getSubRedditPosts = (apiToken, subreddit_name) => {
    console.log(apiToken)
    return fetch('https://oauth.reddit.com/r/' + subreddit_name + '.json?raw_json=1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiToken
        }
    }).then((response) => response.json())
}
