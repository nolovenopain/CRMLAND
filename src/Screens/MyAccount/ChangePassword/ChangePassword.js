import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './css';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import ButtonIndex from '../../../Components/Elements/Button/Button';
import { blue } from '../../../Components/Elements/Color/Color';
import { loading } from '../../../Helpers/Functions';
import postChangePassword from '../../../Api/postChangePassword';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
        });

        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
        }

    async changePassword() {
        this.setState({ loaded: false })
        if(!this.state.current_password || this.state.current_password == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu hiện tại')
        }
        else if(!this.state.password || this.state.password == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu mới')
        }
        else if(!this.state.password_confirmation || this.state.password_confirmation == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu xác nhận')
        }
        else {
            const res = await postChangePassword(
                this.state.token,
                this.state.current_password,
                this.state.password,
                this.state.password_confirmation
            );
            setTimeout(async() => {
                this.setState({ loaded: true }) 
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.childOldPassword.clearOldInput();
                        this.childNewPassword.clearOldInput();
                        this.childConfirmPassword.clearOldInput();
                        this.props.route.params.refreshUserInfo();
                        Alert.alert(
                            'Thông báo',
                            resJson.message,
                            [
                                {text: 'OK', onPress: () => {this.props.route.params.navigation.goBack()}}
                            ]   
                        );
                    } 
                    else if(resJson.code == 204) {
                        Alert.alert('Error !!!', resJson.message)
                    }
                    else if(resJson.errors) {
                        resJson.errors.password.map((value, key) => {
                            Alert.alert('Error !!!', value)
                        })   
                    }
                } 
                else if(res.status == 422) {
                    const resJson = await res.json();
                    resJson.errors.password.map((value, key) => {
                        Alert.alert('Error !!!', value)
                    })   
                }    
                else if(res.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(res.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
            }, 1000);
        }
    }
        
    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        {this.state.isInternetReachable ? 
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>   
                                    : 
                                <View>
                                    <View style={styles.oldPassword}>
                                        <CustomInput
                                            label='Mật khẩu cũ'
                                            name='current_password'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={true}
                                            required={true}
                                            width={width/1.16 - 90}
                                            marginLeft={10}
                                            btnGroupWidth={70}
                                            length={40}
                                            placeholder='Nhập mật khẩu cũ...'
                                            type='Password'
                                            onRef={ref => (this.childOldPassword = ref)}
                                        />
                                    </View>
                                    <View style={styles.newPassword}>
                                        <CustomInput
                                            label='Mật khẩu mới'
                                            name='password'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={true}
                                            required={true}
                                            width={width/1.16 - 90}
                                            marginLeft={10}
                                            btnGroupWidth={70}
                                            length={40}
                                            placeholder='Nhập mật khẩu mới...'
                                            type='Password'
                                            onRef={ref => (this.childNewPassword = ref)}
                                        />
                                    </View>
                                    <View style={styles.confirmPassword}>
                                        <CustomInput
                                            label='Nhập lại mật khẩu mới'
                                            name='password_confirmation'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={true}
                                            required={true}
                                            width={width/1.16 - 90}
                                            marginLeft={10}
                                            btnGroupWidth={70}
                                            length={40}
                                            placeholder='Nhập lại mật khẩu mới...'
                                            type='Password'
                                            onRef={ref => (this.childConfirmPassword = ref)}
                                        />
                                    </View>
                                    <View style={styles.button}>
                                        <ButtonIndex
                                            color={blue}
                                            label='ĐỔI MẬT KHẨU'
                                            action={this.changePassword}
                                        />
                                    </View>
                                </View>)
                                :
                            <InternetConnecNotification/>
                        }
                    </View>
            </ScrollView>
        );
    }
}
