import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Header from './header/header';
import FormRegisterBusiness from './form_register_business/form_register_business';
import FormRegisterPersonal from './form_register_personal/form_register_personal';
import Footer from './footer/footer';
import ButtonIndex from '../../elements/button/button';
import Checkbox from '../../elements/checkbox/checkbox';

import {styles} from './css'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        <ScrollView>
        <View style={styles.container}>
            <Header/>
            <View style={styles.tabNavigator}>
                <FormRegisterPersonal/>
                <FormRegisterBusiness/>
            </View>
            <View style={styles.checkbox}>
              <Checkbox/>
            </View>
            <View style={styles.buttonWrapper}>
                <ButtonIndex
                    color='#0476bc'
                    label='Đăng ký'
                />
                <Footer/>    
            </View>       
        </View>  
        </ScrollView>
       
    );
  }
}
