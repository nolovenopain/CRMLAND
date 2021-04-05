import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Screens/Customer/Main/Main';
import CreateCustomer from '../Screens/Customer/CreateCustomer/CreateCustomer';
import CustomerDetail from '../Screens/Customer/CustomerDetail/CustomerDetail';
import SendEmail from '../Screens/Customer/SendEmail/SendEmail';
import SendProjectInformation from '../Screens/Customer/SendProjectInformation/SendProjectInformation';
import EditCustomer from '../Screens/Customer/EditCustomer/EditCustomer';
import { width, height } from '../Components/Elements/Dimensions/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import History from '../Screens/Customer/CustomerDetail/History/History';
import HistoryFromNoti from '../Screens/Customer/CustomerDetailFromNoti/History/HistoryFromNoti';
import CreateCareHistory from '../Screens/Customer/CustomerDetail/History/CreateCareHistory/CreateCareHistory';
import CustomerDetailFromNoti from '../Screens/Customer/CustomerDetailFromNoti/CustomerDetailFromNoti';

const CustomerStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function CustomerStackScreen() {
    return (
        <CustomerStack.Navigator
            initialRouteName='Main'
        >
            <CustomerStack.Screen
                name="Main"
                component={Main}
                options={{
                    title: 'DANH SÁCH KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: { backgroundColor: '#FFFFFF' },
                    
            // Filter header bar         
                    // headerRight: () => (
                    //     <TouchableOpacity
                    //         style={{ width: width/6.5, alignItems: 'center' }}
                    //     >
                    //         <Icon 
                    //             name='ios-options'
                    //             color='#686868'
                    //             size={23}
                    //         />
                    //     </TouchableOpacity>                      
                    // ),
                }}
            />
            <CustomerStack.Screen
                name="CreateCustomer"
                component={CreateCustomer}
                options={{
                    title: 'THÊM MỚI KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <CustomerStack.Screen
                name="CustomerDetail"
                component={CustomerDetail}
                options={{
                    title: 'CHI TIẾT KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center' 
                }}
            />
            <CustomerStack.Screen
                name="CustomerDetailFromNoti"
                component={CustomerDetailFromNoti}
                options={{
                    title: 'CHI TIẾT KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center' 
                }}
            />
            <CustomerStack.Screen
                name="History"
                component={History}
                options={{
                    title: 'LỊCH SỬ CHĂM SÓC KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center' 
                }}
            />
            <CustomerStack.Screen
                name="HistoryFromNoti"
                component={HistoryFromNoti}
                options={{
                    title: 'LỊCH SỬ CHĂM SÓC KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center' 
                }}
            />         
            <CustomerStack.Screen
                name="EditCustomer"
                component={EditCustomer}
                options={{
                    title: 'CHỈNH SỬA KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    } 
                }}
            />
            <CustomerStack.Screen
                name="SendProjectInformation"
                component={SendProjectInformation}
                options={{
                    title: 'GỬI TÀI LIỆU DỰ ÁN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }  
                }}
            />
            <CustomerStack.Screen
                name="SendEmail"
                component={SendEmail}
                options={{
                    title: 'GỬI EMAIL CHO KHÁCH HÀNG',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }  
                }}
            />
            <CustomerStack.Screen
                name="CreateCareHistory"
                component={CreateCareHistory}
                options={{
                    title: 'THÊM MỚI LỊCH SỬ CHĂM SÓC',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    } 
                }}
            />        
        </CustomerStack.Navigator>
    );
}

export default CustomerStackScreen;
