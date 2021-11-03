import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';
import AppContext from './Context';

const setUserFirstConnection = async () => {
    try {
        await AsyncStorage.setItem('userFirstConnection', 'false');
    } catch (error) {
        console.log(error)
    }
}

export const checkUserFirstConnection = async () => {
    let value = await AsyncStorage.getItem('userFirstConnection')
    await setUserFirstConnection();
    if (value === null)
        return true
    return value;
}

export const getUserConnected = (apiToken) => {
    return fetch('https://oauth.reddit.com/api/v1/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export const getUserPreferences = async (apiToken) => {
    return fetch('https://oauth.reddit.com/api/v1/me/prefs', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
}

export const updateUserPreferences = async (apiToken, preferences) => {
    return fetch('https://oauth.reddit.com/api/v1/me/prefs', {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferences)
    }).then((response) => response.json())
}

export const storeApiToken = async (apiToken) => {
    SecureStore.setItemAsync("redditApiToken", apiToken);
}

export const getApiToken = async () => {
    return SecureStore.getItemAsync("redditApiToken");
}

export const removeApiToken = async () => {
    return SecureStore.deleteItemAsync("redditApiToken");
}