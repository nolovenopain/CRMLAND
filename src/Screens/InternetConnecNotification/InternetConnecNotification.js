import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './css';

export default class InternetConnecNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.noConnection}>
                <MaterialCommunityIcons
                    name='wifi-off'
                    color='silver'
                    size={150}
                />
                <Text style={styles.title}>Không có kết nối Internet</Text>
                <Text style={styles.advise}>Hãy thử các bước sau để kết nối lại:</Text>
                <View style={styles.step}>
                <MaterialCommunityIcons
                    name='checkbox-marked-circle-outline'
                    color='silver'
                    size={25}
                />
                <Text style={styles.stepText}>Kiểm tra môđem và bộ định tuyến</Text>
                </View>
                <View style={styles.step}>
                    <MaterialCommunityIcons
                        name='checkbox-marked-circle-outline'
                        color='silver'
                        size={25}
                    />
                    <Text style={styles.stepText}>Kết nối lại Wi-Fi hoặc bật lại 3G/4G</Text>
                </View>
            </View>
        );
    }
}
