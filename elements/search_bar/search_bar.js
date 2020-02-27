import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import {styles} from './css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder={this.props.placeholder}
              onChangeText={(input) => this.setState({input})}
              value={this.state.input}    
            />
        </View>
      </View>
    );
  }
}
