import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native';
import BottomNavigation from './BottomNavigation';
import UserNavigation from './UserNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { loading } from '../Helpers/Functions';
import moment from 'moment'
import getRefreshToken from '../Api/getRefreshToken';
import TopUpAccount from '../Screens/TopUpAccount/TopUpAccount';
import firebase from 'react-native-firebase';
import * as FirebaseRouter from '../Navigators/FirebaseRouter';
import getCustomerDetail from '../Api/getCustomerDetail';
import getTypeOfCustomer from '../Api/getTypeOfCustomer';
import getGroupOfCustomer from '../Api/getGroupOfCustomer';
import { getReduceProjectList } from '../Api/getProjectList';
import { getReduceListCareHistory } from '../Api/getCareHistoryOfCustomer';
import getUserDashBoard from '../Api/getUserDashBoard';
import getReminderList from '../Api/getReminderList';

const RootStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function RootNavigation(navigation) { 
    const [isLoading, setIsLoading] = useState(true);
    const [checkToken, setCheckToken] = useState(false);

    async function checkTokenExpire() {
        var startTime = await AsyncStorage.getItem('startTime')
        startTime = moment(startTime, 'DD/MM/YYYY H:mm:ss').toDate()
        const token = await AsyncStorage.getItem('token');
        if(token == null || token == '') { console.log('token null')
            setCheckToken(false);
        }
        else {
            const refresh_token = await AsyncStorage.getItem('refresh_token');
            if(moment(new Date()).diff(startTime, 'days') == 6) {
                const res = await getRefreshToken(token, refresh_token);
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        await AsyncStorage.removeItem('startTime');
                        await AsyncStorage.setItem('startTime', new Date());
                        setCheckToken(true);               
                    } 
                    else if(resJson.code == 204) {
                        Alert.alert('Error !!!', resJson.message);
                    }
                }
                else if(res.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => setCheckToken(false));
                }
                else if(res.status == 500) {
                    setCheckToken(false);
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
                
            } 
            else if(moment(new Date()).diff(startTime, 'days') >= 7) {
                AsyncStorage
                    .clear()
                    .then(() => setCheckToken(false))   
            } 
            else {
                setCheckToken(true);
            }
        }
    }

    async function getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if(!fcmToken) { 
            fcmToken = await firebase.messaging().getToken();
            if(fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    async function checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if(enabled) {
            getToken();
        }
        else {
            requestPermission();
        }
    }

    async function requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            getToken()
        } catch(error) {
            console.log('permission rejected')
        }
    }

    async function navigateToCustomerDetail(notification) {
        const token = await AsyncStorage.getItem('token_type') + ' ' + await AsyncStorage.getItem('token'); 
        const index = notification.notification._data.url.indexOf('detail/');
        const customerId = notification.notification._data.url.slice(index + 7);
        var customer;
        var listType;
        var listGroup;
        var listProject;
        var listCareHistory;
        var listChannel;

        //get detail customer
        const resDetail = await getCustomerDetail(
            token,
            customerId 
        );
        if(resDetail.status == 200) {
            const resDetailJson = await resDetail.json(); 
            if(resDetailJson.code == 200) {
                customer = resDetailJson.data.customer;
            }
            else if(resDetailJson.code == 204) {
                console.log('Error !!!', resDetailJson.message);
            }
        }
        else if(resDetail.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(resDetail.status == 500) {
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }

        //get list type
        const resType = await getTypeOfCustomer(token);
        if(resType.status == 200) {
            const resTypeJson = await resType.json();
            if(resTypeJson.code == 200) {
                listType = resTypeJson.data.data;
            }
            else if(resTypeJson.code == 204) {
                console.log("Error !!!", resTypeJson.message);
            }
        }
        else if(resType.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(resType.status == 500) {
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }

        //get list group
        const resGroup = await getGroupOfCustomer(token);
        if(resGroup.status == 200) {
            const resGroupJson = await resGroup.json();
            if(resGroupJson.code == 200) {
                listGroup = resGroupJson.data.data;
            }
            else if(resGroupJson.code == 204) {
                console.log("Error !!!", resGroupJson.message);
            }
        }
        else if(resGroup.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(resGroup.status == 500) {
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }

        //get list project
        const resProject = await getReduceProjectList(token);
        if(resProject.status == 200) {
            const resProjectJson = await resProject.json();
            if(resProjectJson.code == 200) {
                listProject = resProjectJson.data.data;
            }
            else if(resProjectJson.code == 204) {
                console.log("Error !!!", resProjectJson.message);
            }
        }
        else if(resProject.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(resProject.status == 500) {
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }

        //get care history list
        const res = await getReduceListCareHistory(
            token, 
            customerId
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                listCareHistory = resJson.data.care_histories.data,
                listChannel = resJson.data.list_channel
            }
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message)
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true });
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }  

        FirebaseRouter.navigate('CustomerStack', { screen: 'CustomerDetailFromNoti', initial: false, params: {
            customer,
            token,
            listType,
            listGroup,
            listProject,
            navigation,
            listCareHistory,
            listChannel
        }});   
    }

    async function navigateToMarketingReport(notification) {
        const token = await AsyncStorage.getItem('token_type') + ' ' + await AsyncStorage.getItem('token'); 
        const index = notification.notification._data.url.indexOf('detail/');
        const campaignId = notification.notification._data.url.slice(index + 7);

        FirebaseRouter.navigate('MarketingStack', { screen: 'ListCustomerOfCampaignEmail', params: {
            campaignId,
            token,
        }});
    }

    async function navigateToCSKHScheduleList() {
        const token = await AsyncStorage.getItem('token_type') + ' ' + await AsyncStorage.getItem('token'); 

        const res = await getUserDashBoard(token);
        var listHistoryToday;
        if(res.status == 200) {
            const resJson = await res.json(); 
            if(resJson.code == 200) {
                listHistoryToday = resJson.data.listHistoryToday;
                FirebaseRouter.navigate('DashboardStack', { screen: 'CSKHScheduleList', params: {
                    token,
                    listHistoryToday
                }})
            }
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message)
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true });
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    async function navigateToJobReminderDetail(notification) {
        const token = await AsyncStorage.getItem('token_type') + ' ' + await AsyncStorage.getItem('token'); 

        const res = await getReminderList(token);
        var listReminders;
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                listReminders = resJson.data
            }
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message)
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true });
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }

        const data = JSON.parse(notification.notification._data.data);
        var dateObj = [];
        listReminders.map((value, key) => {
            if(moment(value.alarm_at).format('YYYY-MM-DD') == moment(data.alarm_at).format('YYYY-MM-DD')) {
                dateObj.push(value);
                FirebaseRouter.navigate('JobStack', { screen: 'JobList', params: { 
                    date: dateObj,
                }}) 
            }
        })    
    }

    async function navigateToTicketDetail(notification) {
        const token = await AsyncStorage.getItem('token_type') + ' ' + await AsyncStorage.getItem('token');

        const data = JSON.parse(notification.notification._data.data);
        navigation.navigation.push( 'BottomNavigation' , { screen: 'DashboardStack', params: { screen: 'TicketStack', params: { screen: 'TicketDetail', params: { 
            ticket: data,
            navigation: navigation.navigation,
            token: token,
        }}}})
    }

    async function createNotificationListener() {
        firebase.notifications().onNotification(notification => {
            notification.android.setChannelId('insider').setSound('default')
            notification.android.setAutoCancel(true)
            firebase.notifications().displayNotification(notification)
        });

        firebase.notifications().onNotificationOpened(async(notification) => {
            const token = await AsyncStorage.getItem('token');
            if(notification.notification._data.type && token != null) {
                if(notification.notification._data.type.includes('new_customer')) { 
                    navigateToCustomerDetail(notification);
                }
                else if(notification.notification._data.type.includes('marketing')) {
                    navigateToMarketingReport(notification);
                }
                else if(notification.notification._data.type.includes("care_customer")) {
                    navigateToCSKHScheduleList();
                }
                else if(notification.notification._data.type.includes("reminder")) {
                    navigateToJobReminderDetail(notification);
                }
                else if(notification.notification._data.type.includes("ticket")) {
                    navigateToTicketDetail(notification);
                }
            }
            else if(token == null){
                Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                AsyncStorage
                .clear()
                .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
            }
        });

        firebase.notifications().getInitialNotification().then(async(notification) => {
            if(notification) {
                const token = await AsyncStorage.getItem('token');
                if(notification.notification._data.type && token != null) {
                    if(notification.notification._data.type.includes('new_customer')) { 
                        navigateToCustomerDetail(notification);
                    }
                    else if(notification.notification._data.type.includes('marketing')) {
                        navigateToMarketingReport(notification);
                    }
                    else if(notification.notification._data.type.includes("care_customer")) {
                        navigateToCSKHScheduleList();
                    }
                    else if(notification.notification._data.type.includes("reminder")) {
                        navigateToJobReminderDetail(notification);
                    }
                    else if(notification.notification._data.type.includes("ticket")) {
                        navigateToTicketDetail(notification);
                    }
                }
                else if(token == null) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => FirebaseRouter.navigate('UserNavigation', {screen: 'Login'}))
                }
            }
        });
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); 
        checkTokenExpire();
        const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
        firebase.notifications().android.createChannel(channel);
        checkPermission();
        createNotificationListener();
    }, []);

    if(isLoading) {
        return loading();
    }

    return( 
        <RootStack.Navigator             
            initialRouteName = {checkToken ? 'BottomNavigation' : 'UserNavigation'}
        >
            <RootStack.Screen
                name='UserNavigation'
                component={ UserNavigation }
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name='BottomNavigation'
                component={ BottomNavigation }
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name='TopUpAccount'
                component={TopUpAccount}
                options={{
                    title: 'TOP UP ACCOUNT',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
        </RootStack.Navigator>
    );   
};

export default RootNavigation;