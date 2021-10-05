import React, { createContext, useEffect } from 'react';
import Walktrought from './src/views/Walktrought/index';
import TabBar from './src/views/TabBar';
import HomeScreen from './src/views/HomeScreen/index';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppContext from './src/services/Context';
import * as Auth from './src/services/Auth';

const Stack = createStackNavigator();

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
      {(isLoaded) ?
        <AppContext.Provider value={appObject}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Walktrought" component={Walktrought} options={{ headerBackVisible: false, headerShown: false }} />
              <Stack.Screen name="TabBar" component={TabBar} options={{
                gestureEnabled: false, gestureDirection: 'vertical', headerShown: false, cardStyleInterpolator: ({ current, layouts }) => {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateY: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.height, 0],
                          }),
                        },
                      ],
                    },
                  };
                }
              }} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerBackVisible: false, headerShown: false }} />
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
