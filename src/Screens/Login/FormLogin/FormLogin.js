import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';

export default class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
        };
    }

    componentDidMount() {
        this.props.onRef ? this.props.onRef(this) : null
    }
    
    componentWillUnmount() {
        this.props.onRef ? this.props.onRef(null) : null
    }

    clearFormLogin() {
        this.childEmail.clearOldInput();
        this.childPassword.clearOldInput();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Đăng nhập</Text>
                </View>
                <View style={styles.input}>
                    <View style={styles.emailInput}>
                        <CustomInput
                            label='Địa chỉ email'
                            name='email'
                            editable={true}
                            setValue={this.props.setValue}
                            hideshowText={false}
                            required={true}
                            width={width/1.16 - 40}
                            marginLeft={10}
                            btnGroupWidth={30}
                            length={40}
                            keyboardType='email-address'
                            placeholder='Nhập email...'
                            onRef={ref => (this.childEmail = ref)}
                        />
                    </View>
                    <View style={styles.passwordInput}>
                        <CustomInput
                            type='Password'
                            label='Mật khẩu'
                            name='password'
                            editable={true}
                            setValue={this.props.setValue}
                            hideshowText={true}
                            required={true}
                            width={width/1.16 - 90}
                            marginLeft={10}
                            btnGroupWidth={70}
                            length={40}
                            placeholder='Nhập mật khẩu...'
                            onRef={ref => (this.childPassword = ref)}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
