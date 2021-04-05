import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Screens/Marketing/Main/Main';
import CampaignDetail from '../Screens/Marketing/CampaignDetail/CampaignDetail';
import ListCustomerOfCampaignSMS from '../Screens/Marketing/CampaignDetail/ListCustomerOfCampaignSMS/ListCustomerOfCampaignSMS';
import ListCustomerOfCampaignEmail from '../Screens/Marketing/CampaignDetail/ListCustomerOfCampaignEmail/ListCustomerOfCampaignEmail';

const MarketingStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function MarketingStackScreen() { 
    return (
        <MarketingStack.Navigator
            initialRouteName='Main'
        >
            <MarketingStack.Screen 
                name='Main' 
                component={Main}
                options={{
                    title: 'CHIẾN DỊCH MARKETING',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <MarketingStack.Screen 
                name='CampaignDetail' 
                component={CampaignDetail}
                options={{
                    title: 'CHI TIẾT CHIẾN DỊCH',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <MarketingStack.Screen 
                name='ListCustomerOfCampaignSMS' 
                component={ListCustomerOfCampaignSMS}
                options={{
                    title: 'KHÁCH HÀNG CỦA CHIẾN DỊCH',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <MarketingStack.Screen 
                name='ListCustomerOfCampaignEmail' 
                component={ListCustomerOfCampaignEmail}
                options={{
                    title: 'KHÁCH HÀNG CỦA CHIẾN DỊCH',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        </MarketingStack.Navigator>          
    );
}

export default MarketingStackScreen;
