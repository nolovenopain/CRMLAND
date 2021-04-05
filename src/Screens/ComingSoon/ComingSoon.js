import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css'

export default class ComingSoon extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Coming Soon ... </Text>
            </View>
        );
    }
}
