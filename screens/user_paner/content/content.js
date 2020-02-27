import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { styles } from './css';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>
            Chào mừng bạn đến với <Text style={{ color:'#0476bc' }}>CRMLAND</Text>, nền tảng quản trị khách hàng và công việc 
            chuyên nghiệp hàng đầu {"\n"} cho bất động sản {"\n"}
            Để bắt đầu sử dụng phần mềm, vui lòng đăng nhập tài khoản của bạn.
        </Text>
      </View>
    );
  }
}
