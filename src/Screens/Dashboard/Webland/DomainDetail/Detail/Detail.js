import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { styles } from './css';
import getWebsiteUsage from '../../../../../Api/getWebsiteUsage';
import AsyncStorage from '@react-native-community/async-storage';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            usage: {}
        };
    }

    async componentDidMount() {
        this.getWebsiteUsage();
    }

    async getWebsiteUsage() {
        const res = await getWebsiteUsage(this.props.domain.domain);
        if(res.status == 200) {
            const resJson = await res.json();
            if(Object.keys(resJson).length > 0) {
                this.setState({ usage: resJson })
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.props.checkRequestOpenAppAgain(true);
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        } 
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.detailWrapper}>

                    <View style={styles.content}>
                        <View style={styles.contentTextWrapper}>
                            <Text style={styles.contentText}>Lượt truy cập hiện hành</Text>
                        </View>
                        <View style={styles.contentAmountWrapper}>
                            <Text style={styles.contentAmount}>{this.state.usage.online}</Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.contentTextWrapper}>
                            <Text style={styles.contentText}>Số người truy cập hôm nay</Text>
                        </View>
                        <View style={styles.contentAmountWrapper}>
                            <Text style={styles.contentAmount}>{this.state.usage.today_visitor}</Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.contentTextWrapper}>
                            <Text style={styles.contentText}>Số người truy cập 7 ngày gần nhất</Text>
                        </View>
                        <View style={styles.contentAmountWrapper}>
                            <Text style={styles.contentAmount}>{this.state.usage.week_visitor}</Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.contentTextWrapper}>
                            <Text style={styles.contentText}>Số người truy cập 30 ngày gần nhất</Text>
                        </View>
                        <View style={styles.contentAmountWrapper}>
                            <Text style={styles.contentAmount}>{this.state.usage.mon_visitor}</Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.contentTextWrapper}>
                            <Text style={styles.contentText}>Tổng số người truy cập</Text>
                        </View>
                        <View style={styles.contentAmountWrapper}>
                            <Text style={styles.contentAmount}>{this.state.usage.total_visitor}</Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.contentTextWrapper}>
                            <Text style={styles.contentText}>Tổng số lượt truy cập</Text>
                        </View>
                        <View style={styles.contentAmountWrapper}>
                            <Text style={styles.contentAmount}>{this.state.usage.visit}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
