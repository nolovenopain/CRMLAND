import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {styles} from './css';

import SearchBar from '../../../elements/search_bar/search_bar'
import Header from './header/header'
import List from './list/list'

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.searchBar}>
            <SearchBar placeholder='Tìm kiếm khách hàng...'/>
        </View>
        <List/>
      </View>
    );
  }
}
