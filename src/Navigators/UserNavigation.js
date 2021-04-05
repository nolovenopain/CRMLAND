import React from 'react';

import Login from '../Screens/Login/Login';
import UserPanel from '../Screens/UserPanel/UserPanel';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import Register from '../Screens/Register/Register';
import { createStackNavigator } from '@react-navigation/stack';
import NoVerifyEmail from '../Screens/NoVerifyEmail/NoVerifyEmail';

const UserStack = createStackNavigator();

function UserNavigation() {
    return (
        <UserStack.Navigator
            initialRouteName='UserPanel'
            headerMode='none'
        >
            <UserStack.Screen 
                name='UserPanel' 
                component={UserPanel}
                option={{
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <UserStack.Screen 
                name='Login' 
                component={Login}
                option={{
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <UserStack.Screen 
                name='Register' 
                component={Register}
                option={{
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }} 
            />
            <UserStack.Screen 
                name='ForgotPassword' 
                component={ForgotPassword}
                option={{
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }} 
            />
            <UserStack.Screen 
                name='NoVerifyEmail' 
                component={NoVerifyEmail}
                option={{
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        </UserStack.Navigator>          
    );
}

export default UserNavigation;
