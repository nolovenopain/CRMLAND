import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './style';

export default class MainButton extends Component {
    render() {
        return (
            <View
                underlayColor="#2882D8"
                style={style.btn}                   
            >
                <Icon 
                    name="ios-people" 
                    size={35} 
                    color={this.props.focused ? '#f5e1be' : "#F8F8F8"}
                />
            </View>
        );
    }
}