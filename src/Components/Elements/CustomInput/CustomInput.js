import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./css";

export default class CustomInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWithDots: this.props.oldValue ? (this.props.oldValue.length > this.props.length &&  !this.props.multiline ? this.props.oldValue.substr(0,this.props.length) + '...' : this.props.oldValue) : '',
            showPass: this.props.hideshowText,
            close: false,
            isFocused: false,
            input: this.props.oldValue ? this.props.oldValue : '',
            placeholder: this.props.placeholder,
            count: 0,
        };
    }

    componentDidMount() {
        this.props.onRef ? this.props.onRef(this) : null
    }
    
    componentWillUnmount() {
        this.props.onRef ? this.props.onRef(null) : null
    }

    showPass() {
        this.setState({
            showPass: !this.state.showPass
        })
    }

    handleFocus = () => 
        this.setState({ 
            isFocused: true, 
            inputWithDots: this.state.input,
        });

    handleBlur = () =>
        {   
            this.setState({ 
                isFocused: false,
                inputWithDots: this.state.input.length > this.props.length && !this.props.multiline ? this.state.input.substr(0,this.props.length) + '...' : this.state.input 
            });
        }
    
    reRender() {
        this.setState({
            inputWithDots: this.props.oldValue ? (this.props.oldValue.length > this.props.length &&  !this.props.multiline ? this.props.oldValue.substr(0,this.props.length) + '...' : this.props.oldValue) : '',
            input: this.props.oldValue ? this.props.oldValue : '',
        })
    }    
    
    clearOldInput() {
        this.textInput.clear();
        this.setState({ 
            inputWithDots: '', 
            input: '' 
        });
        this.props.setValue(this.props.name, '');
    }

    render() {
        const labelStyle = {
            left: 0,
            fontSize: 12,
            color: '#929caa',
            marginBottom: 10
        };

        return (
            <View style={styles.container}>
                <Text style={labelStyle}>
                    {this.props.label} <Text style={styles.required}> {this.props.required ? '*' : null}</Text>
                </Text>
                <View style={styles.input}>
                    {/* <View style={styles.icon}>
                        <Icon
                            name={this.props.iconName}
                            size={22}
                            color='gray'
                        />
                    </View>     */}
                    <TextInput
                        style={[
                            styles.inputText, 
                            this.props.multiline ? {minHeight: 50, paddingTop: 10, paddingBottom: 10} : {height: 40}, 
                            {
                                width: this.props.width, 
                                marginLeft: this.props.marginLeft
                            }
                        ]}
                        secureTextEntry={this.state.showPass}
                        onChangeText={(input) => {
                            this.props.setValue(this.props.name, input);
                            this.setState({ 
                                input, 
                                inputWithDots: input 
                            });
                        }}
                        placeholder={this.state.inputWithDots == '' ? this.state.placeholder : ''}
                        value={!this.props.fromNoti ? this.state.inputWithDots : this.props.oldValue}
                        autoCapitalize='none'
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        editable={this.props.editable}
                        multiline={this.props.multiline ? true : false}
                        textAlignVertical={this.props.multiline ? 'top' : 'center'}
                        keyboardType={this.props.keyboardType}
                        ref={input => { this.textInput = input }}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                    />
                    <View style={[styles.btnGroup, {width: this.props.btnGroupWidth}]}>
                        {(this.state.inputWithDots != '' && 
                            this.state.inputWithDots != null && 
                                this.state.inputWithDots != undefined && 
                                    this.props.editable == true && 
                                        this.props.marginLeft) ? 
                            ( <TouchableOpacity
                                style={styles.btnDelete}
                                onPress={() => {
                                    this.setState({ 
                                        inputWithDots: '', 
                                        input: '', 
                                    }),
                                    this.props.setValue(this.props.name, '')
                                }}
                            >
                                <Icon
                                    name='ios-close-circle'
                                    size={18}
                                    color='silver'
                                />
                            </TouchableOpacity> ) : null
                        }
                        {this.props.type == 'Password' ? 
                            ( <TouchableOpacity
                                style={styles.btnEye}
                                onPress={() => this.showPass()}
                            >
                                <Icon name={this.state.showPass ? 'ios-eye' : 'ios-eye-off'}
                                    size={23} color='silver' />
                            </TouchableOpacity> ) : null
                        }
                    </View>
                </View>
            </View>
        );
    }
}
