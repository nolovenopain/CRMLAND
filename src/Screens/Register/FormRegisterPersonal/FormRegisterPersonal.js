import React, { Component } from 'react';
import { View } from 'react-native';
import {styles} from './css'
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import CustomInput from "../../../Components/Elements/CustomInput/CustomInput";

export default class FormRegisterPersonal extends Component {
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

    clearFromPersonal() {
        this.childName.clearOldInput();
        this.childEmail.clearOldInput();
        this.childPhone.clearOldInput();
        this.childPassword.clearOldInput();
        this.childConfirmPassword.clearOldInput();
    }
    
    render() {
        return (
        <View style={styles.container}>      
            <View style={styles.formInput}>
                <View style={styles.input}>
                    <CustomInput
                        label='Họ và tên bạn'
                        name='name'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        required={true}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        placeholder='Nhập họ tên...'
                        onRef={ref => (this.childName = ref)}
                    />  
                </View>
                <View style={styles.input}>
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
                <View style={styles.input}>
                    <CustomInput
                        label='Điện thoại liên hệ'
                        name='phone'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        required={true}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        keyboardType='numeric'
                        placeholder='Nhập số điện thoại liên hệ...'
                        onRef={ref => (this.childPhone = ref)}
                    />   
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Mật khẩu'
                        name='password'
                        type='Password'
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
                <View style={styles.input}>
                    <CustomInput
                        label='Nhập lại mật khẩu'
                        name='password_confirmation'
                        type='Password'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={true}
                        required={true}
                        width={width/1.16 - 90}
                        marginLeft={10}
                        btnGroupWidth={70}
                        length={40}
                        placeholder='Nhập lại mật khẩu...'
                        onRef={ref => (this.childConfirmPassword = ref)}
                    />   
                </View>          
            </View>         
        </View>   
        );
    }
}
