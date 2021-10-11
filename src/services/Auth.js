import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

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

export const storeApiToken = async (apiToken) => {
    return SecureStore.setItemAsync("redditApiToken", apiToken);
}

export const getApiToken = async () => {
    return SecureStore.getItemAsync("redditApiToken");
}