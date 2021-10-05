import AsyncStorage from '@react-native-async-storage/async-storage';

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