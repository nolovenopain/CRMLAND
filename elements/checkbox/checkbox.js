import React, { Component } from 'react';
import { View, Text, CheckBox } from 'react-native';
import { styles } from './css';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.checkboxWrapper}>
          <CheckBox style={styles.checkbox}/>
          <Text style={styles.checkboxText}> Tôi đồng ý với <Text style={styles.blue}>Điều khoản dịch vụ</Text> </Text>
        </View>
      </View>
    );
  }
}
