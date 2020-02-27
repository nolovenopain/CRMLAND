import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons/FontAwesome5'

import {styles} from './css';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.circle}>
                <Text style={styles.text}>Anh</Text>
            </View>
            <View style={styles.nameAndPhone}>
                <FontAwesome5 name={'comments'}/>
                <Text style={styles.name}>Nguyễn Huy Tuân</Text>
                <Text style={styles.phone}>0968 16 88 00</Text>
            </View>
            <View style={styles.dropdown}>
                
            </View>  
        </View>
        <View style={styles.bottom}>
            <Text style={styles.firstConfig}>Gọi</Text>
            <Text style={styles.otherConfig}>Tin nhắn</Text>
            <Text style={styles.otherConfig}>Email</Text>
            <Text style={styles.otherConfig}>Gửi tài liệu</Text>
            <Text style={styles.otherConfig}>Chi tiết</Text>
        </View>
      </View>
    );
  }
}
