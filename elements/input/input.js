import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import {Icon} from 'react-native-vector-icons/Ionicons'

import {styles} from './css';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
        input: '',
        showPass: true,
        icon: 'ios-eye',
    };
  }

  // showPass() {
  //   this.setState({
  //     showPass: !this.showPass
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <View style={styles.required}>
            <Text style={styles.label}>{this.props.label}</Text>
            <Text style={styles.requiredColor}>{this.props.required == true? '*' : ''}</Text>
          </View>         
            <TextInput
                style={styles.input}
                placeholder='Enter here...'
                secureTextEntry={this.props.hideshowText}
                onChangeText={(input) => this.setState({input})}
                value={this.state.input}    
            />
            {/* <TouchableOpacity
                style={styles.btnEye}
                onPress={() => {this.showPass()}}
            >
                <Icon name={this.state.icon}
                    size={26} color='silver' />
            </TouchableOpacity> */}
        </View>    
      </View>
    );
  }
}
