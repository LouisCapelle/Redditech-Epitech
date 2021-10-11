import {createContext} from 'react';

const appObject = {
    darkMode: false,
    redditUser: null,
    redditApiToken: null,
}

export default AppContext = createContext(appObject);