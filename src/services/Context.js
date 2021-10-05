import {createContext} from 'react';

const appObject = {
    darkMode: false,
    redditUser: null
}

export default AppContext = createContext(appObject);