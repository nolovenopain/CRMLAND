import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Automation from '../Screens/Dashboard/Automation/Automation';
import AutomationDetail from '../Screens/Dashboard/Automation/AutomationDetail/AutomationDetail';
import ListCustomerOfAutomation from '../Screens/Dashboard/Automation/AutomationDetail/ListCustomerOfAutomation/ListCustomerOfAutomation';
import ListDateOfReport from '../Screens/Dashboard/Automation/AutomationDetail/ListDateOfReport/ListDateOfReport';

const AutomationStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function AutomationStackScreen() {
    return (
        <AutomationStack.Navigator
            initialRouteName='Automation'
        >
            <AutomationStack.Screen 
                name='Automation' 
                component={Automation}
                options={{
                    title: 'CHĂM SÓC TỰ ĐỘNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <AutomationStack.Screen 
                name='AutomationDetail' 
                component={AutomationDetail}
                options={{
                    title: 'CHI TIẾT CHĂM SÓC TỰ ĐỘNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <AutomationStack.Screen 
                name='ListDateOfReport' 
                component={ListDateOfReport}
                options={{
                    title: 'DANH SÁCH BÁO CÁO',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <AutomationStack.Screen 
                name='ListCustomerOfAutomation' 
                component={ListCustomerOfAutomation}
                options={{
                    title: 'KHÁCH HÀNG CHĂM SÓC TỰ ĐỘNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        </AutomationStack.Navigator>          
    );
}

export default AutomationStackScreen;
