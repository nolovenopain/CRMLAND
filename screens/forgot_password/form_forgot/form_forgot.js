import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import Input from '../../../elements/input/input';

export default class FormForgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Quên mật khẩu </Text>
        <Input 
          label='Nhập email của bạn'
          hideshowText={false}/>
      </View>
    );
  }
}
