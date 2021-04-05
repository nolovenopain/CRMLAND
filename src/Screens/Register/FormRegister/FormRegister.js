import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from './css'
import FormRegisterPersonal from '../FormRegisterPersonal/FormRegisterPersonal';
import FormRegisterBusiness from '../FormRegisterBusiness/FormRegisterBusiness';

export default class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTab: true,
            titlePersonalActive: true,
            titleBusinessActive: false
        };
    }

    componentDidMount() {
        this.props.onRef ? this.props.onRef(this) : null
    }
    
    componentWillUnmount() {
        this.props.onRef ? this.props.onRef(null) : null
    }

    formRegisterPersonal() {
        this.setState({ 
            showTab: true,
            titlePersonalActive: true,
            titleBusinessActive: false
        })
        this.props.setType('0');
    }

    formRegisterBusiness() {
        this.setState({ 
            showTab: false,
            titlePersonalActive: false,
            titleBusinessActive: true
        })
        this.props.setType('1');
    }

    clearForm() {
        this.state.titlePersonalActive ? this.childFormPersonal.clearFromPersonal() : this.childFormBusiness.clearFromBusiness();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tab}>
                    <TouchableOpacity 
                        style={this.state.titlePersonalActive ? styles.titlePersonalActive : styles.titlePersonalInActive}
                        onPress={() => this.formRegisterPersonal()}
                        >
                        <Text style={this.state.titlePersonalActive ? styles.titleActive : styles.titleInActive}>Tài khoản cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.state.titleBusinessActive ? styles.titleBusinessActive : styles.titleBusinessInActive}
                        onPress={() => this.formRegisterBusiness()}
                        >
                        <Text style={this.state.titleBusinessActive ? styles.titleActive : styles.titleInActive}>Tài khoản doanh nghiệp</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.form}>
                {this.state.showTab ? 
                    <FormRegisterPersonal 
                        setValue={this.props.setValue}
                        type={this.props.type}
                        checkName={this.props.checkName}
                        checkEmail={this.props.checkEmail}
                        checkPhone={this.props.checkPhone}
                        checkTaxCode={this.props.checkTaxCode}
                        onRef={ref => (this.childFormPersonal = ref)}   
                    /> 
                        : <FormRegisterBusiness 
                            setValue={this.props.setValue}
                            type={this.props.type}
                            checkName={this.props.checkName}
                            checkEmail={this.props.checkEmail}
                            checkPhone={this.props.checkPhone} 
                            checkTaxCode={this.props.checkTaxCode}
                            onRef={ref => (this.childFormBusiness = ref)}   
                          />}
                </View>
            </View>   
        );
    }
}
