import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './css';

export default class RequestOpenAppAgain extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={ require('../../Assets/Image/refresh.png') }
                    resizeMode='contain'
                    style={{ width: 100, height: 100, marginBottom: 20 }}
                />
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Có lỗi xảy ra !!!</Text>
                <Text style={{ fontSize: 17 }}>Vui lòng khởi động lại App</Text>
            </View>
        );
    }
}
