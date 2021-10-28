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

export const subcribeAction = (apiToken, subreddit_name, action) => {
    var details = {
        'sr': subreddit_name,
        'action': action,
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch('https://oauth.reddit.com/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + apiToken
        },
        body: formBody
    }).then((response) => response.text())
}