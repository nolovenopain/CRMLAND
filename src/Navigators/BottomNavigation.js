import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerStackScreen from './CustomerStackScreen';
import MainButton from '../Components/Elements/MainButton/MainButton';
import MyAccountStackScreen from './MyAccountStackScreen';
import DashboardStackScreen from './DashboardStackScreen';
import MarketingStackScreen from './MarketingStackScreen';
import JobStackSreen from './JobStackSreen';

const Tab = createBottomTabNavigator();

function BottomNavigation(navigation) {
    return (
        <Tab.Navigator
            initialRouteName= "DashboardStack" 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == 'MarketingStack') {
                        iconName = focused ? 'ios-megaphone' : 'ios-megaphone';
                    } else if (route.name == 'DashboardStack') {
                        iconName = focused ? 'ios-home' : 'ios-home';
                    } else if (route.name == 'JobStack') {
                        iconName = focused ? 'ios-briefcase' : 'ios-briefcase';
                    } else if (route.name == 'MyAccountStack') {
                        iconName = focused ? 'ios-person' : 'ios-person';
                    } else if (route.name == 'CustomerStack') {
                        return (
                            <MainButton navigation={navigation} focused={focused}/>
                        )
                    }
                    return  <Icon name={iconName} size={size} color={color} />         
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                style: { height: 55 },
                labelStyle: { fontSize: 10, marginBottom: 5 },
                keyboardHidesTabBar: true
            }}
            lazy={false}
        >
            <Tab.Screen name="DashboardStack" component={DashboardStackScreen} options={{ title: 'Trang chủ' }}/>
            <Tab.Screen name="MarketingStack" component={MarketingStackScreen} options={{ title: 'Marketing' }}/>
            <Tab.Screen name="CustomerStack" component={CustomerStackScreen} options={{ title: '' }} />
            <Tab.Screen name="JobStack" component={JobStackSreen} options={{ title: 'Công việc' }} />
            <Tab.Screen name="MyAccountStack" component={MyAccountStackScreen} options={{ title: 'Tài khoản' }} />
        </Tab.Navigator>
    );
}

export default BottomNavigation;