import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Logo from './logo/logo';
import FormForgot from './form_forgot/form_forgot';
import Footer from './footer/footer';
import ButtonIndex from '../../elements/button/button';

import {styles} from './css'


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo/>
          <FormForgot/>
          <View style={styles.buttonWrapper}>
            <ButtonIndex style={styles.button}
                color='#0476bc'
                label='Gửi link thay đổi mật khẩu qua email'
            />
            <Footer/>    
          </View>             
        </View> 
      </ScrollView>
        
    );
  }
}
