import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {styles} from './css';

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
            <Text style={styles.title}> Danh sách khách hàng </Text>
        </View>
      </View>
    );
  }
}
