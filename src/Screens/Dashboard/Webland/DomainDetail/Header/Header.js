import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import moment from 'moment';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <View style={styles.bundle}>
                        <Text style={styles.bundleText}>
                            {this.props.domain.item ? this.props.domain.item.name : ''}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentHeader}>{this.props.domain.domain}</Text>
                        <View style={styles.createAndExpDate}>
                            <Text style={styles.createDate}>
                                <Text style={styles.bold}>Ngày tạo: </Text>{moment(this.props.domain.created_at).format("DD/MM/YYYY")}</Text>
                            <Text style={styles.expDate}>
                                <Text style={styles.bold}>Hết hạn: </Text>
                                    {this.props.domain.expired_at != null ? moment(this.props.domain.expired_at).format("DD/MM/YYYY") : 'Vô thời hạn' }
                                </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
