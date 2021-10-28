import React, { createContext, useEffect } from 'react';
import Walktrought from './src/views/Walktrought/index';
import TabBar from './src/views/TabBar';
import HomeScreen from './src/views/HomeScreen/index';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppContext from './src/services/Context';
import * as Auth from './src/services/Auth';
import { getApiToken, getUserConnected } from './src/services/Auth';
import { getMySubReddits } from './src/services/SubReddits';
import SubView from './src/views/SubReddit/SubView';

const Stack = createStackNavigator();

export default function App() {

  const [darkMode, setDarkMode] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [redditApiToken, setRedditApiToken] = React.useState(null);
  const [redditUser, setRedditUser] = React.useState(null);
  const [userSubreddits, setUserSubreddits] = React.useState([]);

  const appObject = {
    darkMode: darkMode,
    toggleDarkMode: () => setDarkMode(!darkMode),
    redditUser: redditUser,
    redditApiToken: redditApiToken,
    setApiToken: (token) => setRedditApiToken(token),
    setRedditUser: (user) => setRedditUser(user),
    userSubreddits: userSubreddits,
    getUserSubreddits: (redditApiToken) => getMySubReddits(redditApiToken).then((subReddits) => {
      setUserSubreddits(subReddits.data.children);
    }),
  }

  useEffect(() => {
    getApiToken().then((apiToken) => {
      setRedditApiToken(apiToken);
      appObject.getUserSubreddits(apiToken);
      getUserConnected(apiToken).then((user) => {
        setRedditUser(user);
        setIsLoaded(true);
      }).catch((error) => {
        setRedditApiToken(null);
        setRedditUser(null);
        setIsLoaded(true);
      });
    })
  }, [])

  return (
    <>
      {(isLoaded) ?
        <AppContext.Provider value={appObject}>
          <NavigationContainer>
            <Stack.Navigator>
              { (!redditApiToken) &&
                <Stack.Screen name="Walktrought" component={Walktrought} options={{ headerBackVisible: false, headerShown: false }} />
              }
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
              <Stack.Screen name="SubView" component={SubView} options={{ headerBackVisible: true, headerShown: false }} />
              <Stack.Screen name="OnBoard" component={Walktrought} options={{ headerBackVisible: false, headerShown: false, gestureEnabled: false}} />
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
