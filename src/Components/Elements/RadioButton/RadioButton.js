import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './css';

export default class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
        <TouchableOpacity 
            style={styles.circle}
            onPress={() => this.props.onPress()}
        >
            {this.props.checked ? <View style={styles.circleChecked}/> : <View/>}
        </TouchableOpacity>
    );
  }
}
