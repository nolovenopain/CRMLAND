import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Screens/Dashboard/Main/Main';
import ProjectStackScreen from './ProjectStackScreen';
import WeblandStackScreen from './WeblandStackScreen';
import AutomationStackScreen from './AutomationStackScreen';
import UtilitiesStackScreen from './UtilitiesStackScreen';
import TicketStackScreen from './TicketStackScreen';
import CSKHScheduleList from '../Screens/Dashboard/Main/CSKHSchedule/CSKHScheduleList/CSKHScheduleList';
import NotificationStackScreen from './NotificationStackScreen';

const DashboardStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function DashboardStackScreen() {
    return (
        <DashboardStack.Navigator
            initialRouteName='Main'
        >
            <DashboardStack.Screen 
                name='Main' 
                component={Main}
                options={{
                    headerShown: false,
                }}
            />
            <DashboardStack.Screen 
                name='CSKHScheduleList' 
                component={CSKHScheduleList}
                options={{
                    title: 'LỊCH CHĂM SÓC KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <DashboardStack.Screen 
                name='NotificationStackScreen' 
                component={NotificationStackScreen}
                options={{
                    headerShown: false,
                }}
            />
            <DashboardStack.Screen
                name='WeblandStack' 
                component={WeblandStackScreen}
                options={{
                    headerShown: false,
                }}
            /> 
            <DashboardStack.Screen
                name='ProjectStack' 
                component={ProjectStackScreen}
                options={{
                    headerShown: false,
                }}
            />
            <DashboardStack.Screen
                name='AutomationStack' 
                component={AutomationStackScreen}
                options={{
                    headerShown: false,
                }}
            /> 
            <DashboardStack.Screen
                name='UtilitiesStack' 
                component={UtilitiesStackScreen}
                options={{
                    headerShown: false,
                }}
            />   
            <DashboardStack.Screen
                name='TicketStack' 
                component={TicketStackScreen}
                options={{
                    headerShown: false,
                }}
            />   
        </DashboardStack.Navigator>          
    );
}

export default DashboardStackScreen;
