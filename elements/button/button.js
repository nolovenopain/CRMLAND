import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {styles} from './css'

export default class ButtonIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const colorStyles = StyleSheet.create ({
      buttonColor: {
        backgroundColor: this.props.color
      }
    });    
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.buttonWrapped, colorStyles.buttonColor]}
          onPress={() => {}}
        >
            <Text style={styles.buttonText}>{this.props.label}</Text>
        </TouchableOpacity>       
        <Text></Text>
      </View>
    );
  }
}



