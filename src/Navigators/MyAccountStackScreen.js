import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Screens/MyAccount/Main/Main';
import PaymentHistory from '../Screens/MyAccount/PaymentHistory/PaymentHistory';
import ChangePassword from '../Screens/MyAccount/ChangePassword/ChangePassword';
import Activities from '../Screens/MyAccount/Activities/Activities';
import NotificationSettings from '../Screens/MyAccount/NotificationSettings/NotificationSettings';
import AccountInformation from '../Screens/MyAccount/AccountInformation/AccountInformation';

const MyAccountStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function MyAccountStackScreen() {
    return (
        <MyAccountStack.Navigator
            initialRouteName='Main'
        >
            <MyAccountStack.Screen 
                name='Main' 
                component={Main}
                options={{
                    title: 'THÔNG TIN THÀNH VIÊN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <MyAccountStack.Screen 
                name='AccountInformation' 
                component={AccountInformation}
                options={{
                    title: 'THÔNG TIN TÀI KHOẢN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
            <MyAccountStack.Screen 
                name='ChangePassword' 
                component={ChangePassword}
                options={{
                    title: 'ĐỔI MẬT KHẨU',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    } 
                }}
            />
            <MyAccountStack.Screen 
                name='PaymentHistory' 
                component={PaymentHistory}
                options={{
                    title: 'LỊCH SỬ THANH TOÁN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }  
                }}
            />
            <MyAccountStack.Screen 
                name='Activities' 
                component={Activities}
                options={{
                    title: 'NHẬT KÝ HOẠT ĐỘNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }   
                }}
            />
            <MyAccountStack.Screen 
                name='NotificationSettings' 
                component={NotificationSettings}
                options={{
                    title: 'CÀI ĐẶT THÔNG BÁO',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
        </MyAccountStack.Navigator>          
    );
}

export default MyAccountStackScreen;
