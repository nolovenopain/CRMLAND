import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './css';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import moment from 'moment';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';

export default class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={styles.firstInput}>
                    <CustomInput
                        label='Danh xưng'
                        editable={false}
                        oldValue={this.props.customer.pronoun}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        fromNoti='true'
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Họ tên'
                        editable={false}
                        oldValue={this.props.customer.fullname}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        multiline={true}
                        fromNoti='true'
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Ngày sinh'
                        editable={false}
                        oldValue={this.props.customer.birthday}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        fromNoti='true'
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Địa chỉ'
                        editable={false}
                        oldValue={this.props.customer.address}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        multiline={true}
                        fromNoti='true'
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Điện thoại'
                        editable={false}
                        oldValue={this.props.customer.phone}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        fromNoti='true'
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Email'
                        editable={false}
                        oldValue={this.props.customer.email}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        multiline={true}
                        fromNoti='true'
                    />
                </View>
            </View>
        );
    }
}
