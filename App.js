import React, {createContext, useEffect} from 'react';
import Walktrought from './src/views/Walktrought/index';
import HomeScreen from './src/views/HomeScreen/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AppContext from './src/services/Context';
import * as Auth from './src/services/Auth';

const Stack = createNativeStackNavigator();

export default function App() {

  const [darkMode, setDarkMode] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [firstConnection, setFirstConnection] = React.useState(true);
  
  const appObject = {
    darkMode: darkMode,
    toggleDarkMode: () => setDarkMode(!darkMode),
    redditUser: null
  }

  useEffect(() => {
    Auth.checkUserFirstConnection().then(res => {
      console.log(res)
      setFirstConnection(!res);
      setIsLoaded(true);
    })
  }, [])

  return (
    <>
      { (isLoaded) ?
        <AppContext.Provider value={appObject}>
          <NavigationContainer>
            <Stack.Navigator initalRouteName={"Walktrought"}>
              {firstConnection &&
                <Stack.Screen name="Walktrought" component={Walktrought} options={{headerBackVisible: false, headerShown: false}}/>
              }
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerBackVisible: false, headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </AppContext.Provider>
        :
        <>
        </>
      }
    </>
  );
}
