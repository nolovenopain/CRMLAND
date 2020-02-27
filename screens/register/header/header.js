import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import {styles} from './css'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Image style={styles.logo}
                source={require('../../../image/logo_img.png')} 
            />
            <Text style={styles.title}>Đăng ký tài khoản</Text>
        </View>
      </View>   
    );
  }
}
