import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './HomeScreen/index.js';
import Profile from './Profile/index.js';

const Tabs = AnimatedTabBarNavigator();

const TabBarIcon = props => {
    return (
        <View>
            <Icon
                name={props.name}
                size={props.size ? props.size : 24}
                color={props.tintColor}
            />
            {props.isBadge &&
                <View style={{ backgroundColor: 'red', borderRadius: 100, height: 10, width: 10, left: -4, position: 'absolute', top: -4 }} />
            }
        </View>
    )
}

export default (props) => {
    const appContext = useContext(AppContext);

    return (
        <Tabs.Navigator initialRouteName="Home" tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: appContext.darkMode ? "black" : "grey",
            activeBackgroundColor: "#fa4505",
            style: {
                borderTopWidth: 1,
                borderTopColor: 'black',
            },
        }} appearance={{ tabBarBackground: appContext.darkMode ? 'grey' : 'white', topPadding: 10, bottomPadding: 5, dotCornerRadius: 17}} onN>
            <Tabs.Screen name="Accueil" component={HomeScreen} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="home"
                        />
                    ),
                }}
            />
            <Tabs.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="user"
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
}