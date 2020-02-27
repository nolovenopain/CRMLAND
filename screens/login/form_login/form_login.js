import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import Input from '../../../elements/input/input';

export default class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Đăng nhập </Text>
        <View style={styles.account}>
          <Input 
            label='Email'
            hideshowText={false}/>
        </View>       
          <Input 
            label='Mật khẩu'
            hideshowText={true}/>
      </View>
    );
  }
}
