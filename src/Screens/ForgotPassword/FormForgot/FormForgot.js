import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

export default class FormForgot extends Component {
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

    clearEmail() {
        this.childEmail.clearOldInput();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Quên mật khẩu </Text>
                <View style={styles.input}>
                    <View style={styles.emailInput}>
                        <CustomInput
                            label='Nhập email'
                            name='email'
                            editable={true}
                            setValue={this.props.setValue}
                            hideshowText={false}
                            required={true}
                            width={width/1.16 - 40}
                            marginLeft={10}
                            btnGroupWidth={30}
                            length={40}
                            placeholder='Nhập email của bạn...'
                            keyboardType='email-address'
                            onRef={ref => (this.childEmail = ref)}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
