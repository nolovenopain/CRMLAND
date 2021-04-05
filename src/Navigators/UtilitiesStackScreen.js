import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Utilities from '../Screens/Dashboard/Utilities/Utilities';
import ContactForm from '../Screens/Dashboard/Utilities/ContactForm/ContactForm';
import ContactButton from '../Screens/Dashboard/Utilities/ContactButton/ContactButton';
import ComingSoon from '../Screens/ComingSoon/ComingSoon';
import BrandName from '../Screens/Dashboard/Utilities/BrandName/BrandName';
import CreateBrandName from '../Screens/Dashboard/Utilities/BrandName/CreateBrandName/CreateBrandName';
import CreateEmailSMTP from '../Screens/Dashboard/Utilities/EmailSMTP/CreateEmailSMTP/CreateEmailSMTP';
import SMTPDetail from '../Screens/Dashboard/Utilities/EmailSMTP/SMTPDetail/SMTPDetail';
import EmailSMTP from '../Screens/Dashboard/Utilities/EmailSMTP/EmailSMTP';

const UtilitiesStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function UtilitiesStackScreen() {
    return (
        <UtilitiesStack.Navigator
            initialRouteName='Utilities'
        >
            <UtilitiesStack.Screen 
                name='Utilities' 
                component={Utilities}
                options={{
                    title: 'CÔNG CỤ TIỆN ÍCH',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <UtilitiesStack.Screen 
                name='ContactForm' 
                component={ContactForm}
                options={{
                    title: 'DANH SÁCH POPUP',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <UtilitiesStack.Screen 
                name='ContactButton' 
                component={ContactButton}
                options={{
                    title: 'DANH SÁCH NÚT LIÊN HỆ',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <UtilitiesStack.Screen 
                name='ComingSoon' 
                component={ComingSoon}
                options={{
                    title: 'COMING SOON',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            <UtilitiesStack.Screen 
                name='BrandName' 
                component={BrandName}
                options={{
                    title: 'DANH SÁCH BRAND NAME',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <UtilitiesStack.Screen 
                name='CreateBrandName' 
                component={CreateBrandName}
                options={{
                    title: 'TẠO BRAND NAME',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <UtilitiesStack.Screen 
                name='EmailSMTP' 
                component={EmailSMTP}
                options={{
                    title: 'DANH SÁCH MÁY CHỦ GỬI EMAIL',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <UtilitiesStack.Screen 
                name='CreateEmailSMTP' 
                component={CreateEmailSMTP}
                options={{
                    title: 'THÊM MỚI MÁY CHỦ GỬI EMAIL',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <UtilitiesStack.Screen 
                name='SMTPDetail' 
                component={SMTPDetail}
                options={{
                    title: 'CẬP NHẬT MÁY CHỦ GỬI EMAIL',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        </UtilitiesStack.Navigator>          
    );
}

export default UtilitiesStackScreen;
