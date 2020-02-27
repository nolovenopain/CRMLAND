import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {styles} from './css'

import Input from '../../../elements/input/input';

export default class FormRegisterBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleUnderline}>
          <Text style={styles.title}>Tài khoản doanh nghiệp</Text>
        </View>
        <View style={styles.formInput}>
          <View style={styles.input}>
            <Input
              hideshowText={false} 
              label='Tên công ty'
              required={true}/>
          </View>
          <View style={styles.input}>
            <Input 
              hideshowText={false}
              label='Mã số thuế'
              required={false}/> 
          </View>
          <View style={styles.input}>
            <Input 
              hideshowText={false}
              label='Địa chỉ email'
              required={true}/> 
          </View>
          <View style={styles.input}>
            <Input 
              hideshowText={true}
              label='Mật khẩu'
              required={true}/>  
          </View>
          <View>
            <Input 
              hideshowText={true}
              label='Nhập lại mật khẩu'
              required={true}/> 
          </View>          
        </View>         
      </View>   
    );
  }
}
