import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../Screens/Splash/Splash';
import RootNavigation from '../Navigators/RootNavigation';
import { navigationRef } from '../Navigators/FirebaseRouter';

const InitialStack = createStackNavigator();

function InitialNavigation() {
    return(
        <NavigationContainer ref={navigationRef}>
            <InitialStack.Navigator
                initialRouteName='Splash'
            >
                <InitialStack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <InitialStack.Screen
                    name='RootNavigation'
                    component={RootNavigation}
                    options={{ headerShown: false }}
                />
            </InitialStack.Navigator>
        </NavigationContainer>
    )
}

export default InitialNavigation;