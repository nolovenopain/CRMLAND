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
        <Text> Quên mật khẩu? <Text style={styles.blue}>Lấy lại mật khẩu</Text></Text>
      </View>
    );
  }
}
