import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { styles } from './css';

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.logo}
          source={require('../../../image/forgot_password.png')}
        />
      </View>
    );
  }
}
