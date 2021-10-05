import React from 'react';
import Walktrought from './src/views/Walktrought/index';
import HomeScreen from './src/views/HomeScreen/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName={"Walktrought"}>
        <Stack.Screen name="Walktrought" component={Walktrought} options={{headerBackVisible: false, headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerBackVisible: false, headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
