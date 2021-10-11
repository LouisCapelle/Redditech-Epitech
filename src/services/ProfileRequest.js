
import * as Storage from './storage';
import Constant from '../../constants';

export const getMyProfile = async () => {
    let token = await Storage.getToken();
    if (token) {
        return fetch(Constant.api_url + 'api/category', {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json', 
            Authorization: 'Bearer ' + token,
        })}).then((response) => response.json())
    }
}