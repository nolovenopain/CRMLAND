import React, { Component } from 'react';
import { View } from 'react-native';

import Logo from './logo/logo';
import Content from './content/content';
import Footer from './footer/footer';
import ButtonIndex from '../../elements/button/button';

import {styles} from './css'


export default class UserPaner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Content/>
        <View style={styles.buttonGroup}>
            <ButtonIndex 
            color='#0476bc'
            label='Đăng nhập'
            />
            <ButtonIndex 
            color='#b9168c'
            label='Đăng ký'
            />
        </View>      
        <Footer/>
      </View>   
    );
  }
}
