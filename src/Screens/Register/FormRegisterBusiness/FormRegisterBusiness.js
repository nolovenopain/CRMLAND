import React, { Component } from "react";
import { View } from "react-native";
import { styles } from "./css";
import CustomInput from "../../../Components/Elements/CustomInput/CustomInput";
import { width } from '../../../Components/Elements/Dimensions/Dimensions';

export default class FormRegisterBusiness extends Component {
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

    clearFromBusiness() {
        this.childCompanyName.clearOldInput();
        this.childCompanyEmail.clearOldInput();
        this.childCompanyPhone.clearOldInput();
        this.childCompanyTaxCode.clearOldInput();
        this.childCompanyAddress.clearOldInput();
        this.childCompanyPassword.clearOldInput();
        this.childCompanyConfirmPassword.clearOldInput();
    }

    render() {
        return (
            <View style={styles.formInput}>
                <View style={styles.input}>
                    <CustomInput
                        label='Tên công ty'
                        name='company_name'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        required={true}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        placeholder='Nhập tên công ty...'
                        onRef={ref => (this.childCompanyName = ref)}
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Mã số thuế'
                        name='company_tax_code'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        required={true}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        placeholder='Nhập mã số thuế...'
                        onRef={ref => (this.childCompanyTaxCode = ref)}
                    /> 
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Địa chỉ liên hệ'
                        name='company_address'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        required={true}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        keyboardType='email-address'
                        placeholder='Nhập địa chỉ...'
                        onRef={ref => (this.childCompanyAddress = ref)}
                    /> 
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Điện thoại liên hệ'
                        name='company_phone'
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
                        onRef={ref => (this.childCompanyPhone = ref)}
                    /> 
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Địa chỉ email'
                        name='company_email'
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
                        onRef={ref => (this.childCompanyEmail = ref)}
                    /> 
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Mật khẩu'
                        name='company_password'
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
                        onRef={ref => (this.childCompanyPassword = ref)}
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Nhập lại mật khẩu'
                        name='company_password_confirmation'
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
                        onRef={ref => (this.childCompanyConfirmPassword = ref)}
                    /> 
                </View>
            </View>
        );
    }
}
