import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Screens/Job/Main/Main';
import JobList from '../Screens/Job/JobList/JobList';
import CreateJobReminder from '../Screens/Job/CreateJobReminder/CreateJobReminder';

const JobStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
});

function JobStackSreen(navigation) {
    return (
        <JobStack.Navigator
            initialRouteName= "Main"
        >
            <JobStack.Screen
                name="Main"
                component={Main}                                     
                options={{
                    title: 'NHẮC NHỞ CÔNG VIỆC',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
            <JobStack.Screen
                name="JobList"
                component={JobList}                                     
                options={{
                    title: 'DANH SÁCH CÔNG VIỆC',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
            <JobStack.Screen
                name="CreateJobReminder"
                component={CreateJobReminder}                                     
                options={{
                    title: 'THÊM MỚI CÔNG VIỆC',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    } 
                }}
            />
        </JobStack.Navigator>
    );
}

export default JobStackSreen;
