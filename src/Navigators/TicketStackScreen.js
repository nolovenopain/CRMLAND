import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Ticket from '../Screens/Dashboard/Ticket/Ticket';
import TicketDetail from '../Screens/Dashboard/Ticket/TicketDetail/TicketDetail';
import CreateTicket from '../Screens/Dashboard/Ticket/CreateTicket/CreateTicket';
import { HeaderBackButton } from '@react-navigation/stack'

const TicketStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function TicketStackScreen(props) { console.log(props.route.params)
    return (
        <TicketStack.Navigator
            initialRouteName='Ticket'
        >
            <TicketStack.Screen 
                name='Ticket' 
                component={Ticket}
                options={{
                    title: 'TICKET HỖ TRỢ',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                }}
            />
            {props.route.params != undefined ? 
                <TicketStack.Screen 
                    name='TicketDetail' 
                    component={TicketDetail}
                    options={{
                        title: 'CHI TIẾT TICKET',
                        headerTitleStyle: style.title,
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <HeaderBackButton
                            onPress={() => {
                                props.navigation.goBack();
                            }}
                            /> 
                        ),
                    }}
                />
                :
                <TicketStack.Screen 
                    name='TicketDetail' 
                    component={TicketDetail}
                    options={{
                        title: 'CHI TIẾT TICKET',
                        headerTitleStyle: style.title,
                        headerTitleAlign: 'center',
                    }}
                />
            }
            
            <TicketStack.Screen 
                name='CreateTicket' 
                component={CreateTicket}
                options={{
                    title: 'TẠO TICKET HỖ TRỢ',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        </TicketStack.Navigator>          
    );
}

export default TicketStackScreen;
