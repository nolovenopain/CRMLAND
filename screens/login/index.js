import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Logo from './logo/logo';
import FormLogin from './form_login/form_login';
import Footer from './footer/footer';
import ButtonIndex from '../../elements/button/button';

import {styles} from './css'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const loginColor = '#0476bc';
    const loginLabel = 'Đăng nhập';
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo/>
          <FormLogin/>
          <View style={styles.buttonWrapper}>
            <ButtonIndex style={styles.button}
                color={loginColor}
                label={loginLabel}
            />
            <Footer/>    
          </View>
        </View>
      </ScrollView>             
    );
  }
}
