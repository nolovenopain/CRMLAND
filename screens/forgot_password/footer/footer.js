import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.backToLogin}> Quay lại trang, <Text style={styles.blue}>Đăng nhập</Text> </Text>
      </View>
    );
  }
}
