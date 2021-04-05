import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Project from '../Screens/Dashboard/Project/Project';
import CreateProject from '../Screens/Dashboard/Project/CreateProject/CreateProject';
import ProjectDetail from '../Screens/Dashboard/Project/ProjectDetail/ProjectDetail';

const ProjectStack = createStackNavigator();

const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3d3e40'
    }
})

function ProjectStackScreen() {
    return (
        <ProjectStack.Navigator
            initialRouteName='Project'
        >
            <ProjectStack.Screen 
                name='Project' 
                component={Project}
                options={{
                    title: 'DANH SÁCH DỰ ÁN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center', 
                }}
            />
            <ProjectStack.Screen 
                name='ProjectDetail' 
                component={ProjectDetail}
                options={{
                    title: 'CHI TIẾT DỰ ÁN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',     
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            />
            <ProjectStack.Screen 
                name='CreateProject' 
                component={CreateProject}
                options={{
                    title: 'THÊM MỚI DỰ ÁN',
                    headerTitleStyle: style.title,
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: '#fff'
                    }     
                }}
            />    
        </ProjectStack.Navigator>          
    );
}

export default ProjectStackScreen;
