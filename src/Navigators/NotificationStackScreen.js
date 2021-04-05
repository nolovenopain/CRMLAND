import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import SystemNotificationsList from '../Screens/Dashboard/Main/SystemNotificationsDashboard/SystemNotificationsList/SystemNotificationsList';
import NotiDetail from '../Screens/Dashboard/Main/SystemNotificationsDashboard/SystemNotificationsList/NotiDetail/NotiDetail';

const NotificationStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function NotificationStackScreen() {
    return (
        <NotificationStack.Navigator
            initialRouteName='SystemNotificationsList'
        >
            <NotificationStack.Screen 
                name='SystemNotificationsList' 
                component={SystemNotificationsList}
                options={{
                    title: 'DANH SÁCH THÔNG BÁO HỆ THỐNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <NotificationStack.Screen 
                name='NotiDetail' 
                component={NotiDetail}
                options={{
                    title: 'NỘI DUNG THÔNG BÁO',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        </NotificationStack.Navigator>          
    );
}

export default NotificationStackScreen;
