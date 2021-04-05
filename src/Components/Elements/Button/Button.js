import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { styles } from './css'

export default class ButtonIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const colorStyles = StyleSheet.create({
            buttonColor: {
                backgroundColor: this.props.color
            }
        });
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.buttonWrapped, colorStyles.buttonColor]}
                    onPress={this.props.action}
                    disabled={this.props.disabled}
                >
                    <Text style={styles.buttonText}>{this.props.label}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
