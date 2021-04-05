import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Screens/Dashboard/Webland/Main/Main';
import DomainDetail from '../Screens/Dashboard/Webland/DomainDetail/DomainDetail';
import DeleteDomain from '../Screens/Dashboard/Webland/DeleteDomain/DeleteDomain';
import ChangeDomainName from '../Screens/Dashboard/Webland/ChangeDomainName/ChangeDomainName';
import PremiumExtension from '../Screens/Dashboard/Webland/PremiumExtension/PremiumExtension';
import BackupData from '../Screens/Dashboard/Webland/BackupData/BackupData';
import ChangeTheme from '../Screens/Dashboard/Webland/ChangeTheme/ChangeTheme';
import ThemeDetail from '../Screens/Dashboard/Webland/ChangeTheme/ThemeDetail/ThemeDetail';
import ThemeCategory1 from '../Screens/Dashboard/Webland/ChangeTheme/ThemeCategory1/ThemeCategory1';
import ThemeCategory2 from '../Screens/Dashboard/Webland/ChangeTheme/ThemeCategory2/ThemeCategory2';

const WeblandStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function WeblandStackScreen() {
    return (
        <WeblandStack.Navigator
            initialRouteName= "Main"
        >
            <WeblandStack.Screen
                name="Main"
                component={Main}                                     
                options={{
                    title: 'DANH SÁCH WEBSITE',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
            <WeblandStack.Screen
                name="DomainDetail"
                component={DomainDetail}
                options={{
                    title: 'CHI TIẾT WEBSITE',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    } 
                }}
            />
            <WeblandStack.Screen
                name="ChangeTheme"
                component={ChangeTheme}
                options={{
                    title: 'DANH SÁCH GIAO DIỆN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <WeblandStack.Screen
                name="ThemeCategory1"
                component={ThemeCategory1}
                options={{
                    title: 'WEBSITE DỰ ÁN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <WeblandStack.Screen
                name="ThemeCategory2"
                component={ThemeCategory2}
                options={{
                    title: 'WEBSITE ĐA DỰ ÁN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <WeblandStack.Screen
                name="ThemeDetail"
                component={ThemeDetail}
                options={{
                    title: 'CHI TIẾT GIAO DIỆN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }  
                }}
            />
            <WeblandStack.Screen
                name="ChangeDomainName"
                component={ChangeDomainName}
                options={{
                    title: 'ĐỔI TÊN MIỀN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    } 
                }}
            />
            <WeblandStack.Screen
                name="PremiumExtension"
                component={PremiumExtension}
                options={{
                    title: 'NÂNG CẤP - GIA HẠN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }   
                }}
            />
            <WeblandStack.Screen
                name="DeleteDomain"
                component={DeleteDomain}
                options={{
                    title: 'XÓA WEBSITE',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }  
                }}
            />
            <WeblandStack.Screen
                name="BackupData"
                component={BackupData}
                options={{
                    title: 'DANH SÁCH PHIÊN BẢN PHỤC HỒI',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
        </WeblandStack.Navigator>
    );
}

export default WeblandStackScreen;
