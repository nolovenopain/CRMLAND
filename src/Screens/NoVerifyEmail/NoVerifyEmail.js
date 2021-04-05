import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { styles } from './css';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { loading } from '../../Helpers/Functions';
import { blue } from '../../Components/Elements/Color/Color';
import ButtonIndex from '../../Components/Elements/Button/Button';
import getResendEmailVerify from '../../Api/getResendEmailVerify';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../RequestOpenAppAgain/RequestOpenAppAgain';

export default class NoVerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.sendEmailVerify = this.sendEmailVerify.bind(this);
    }

    async componentDidMount() { 
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

    async sendEmailVerify() {
        this.setState({ loaded: false });
        const res = await getResendEmailVerify(this.props.route.params.token);
        
        setTimeout(async() => {
            this.setState({ loaded: true });
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {  
                    Alert.alert('Thông báo', resJson.message);
                }
                else if(resJson.code == 204) {
                    Alert.alert('Error !!!', resJson.message);
                }
            }
            else if(res.status == 401) {
                Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                AsyncStorage
                .clear()
                .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
            }
            else if(res.status == 500) {
                this.setState({ requestOpenAppAgain: true });
                Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
            } 
        }, 1000)
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        (this.state.requestOpenAppAgain ? 
                            <View style={{ marginTop: -70 }}>
                                <RequestOpenAppAgain/>  
                            </View>   
                                :  
                            <View style={styles.container}>
                                <Image
                                    style={styles.image}
                                    source={require('../../Assets/Image/no_verify_email.png')}
                                    resizeMode='contain'
                                />
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Kích hoạt tài khoản</Text>
                                </View>
                                <View style={styles.contentWrapper}>
                                    <Text style={styles.content}>Tài khoản của bạn chưa được xác thực địa chỉ email. Vui lòng truy cập hòm email của bạn để hoàn tất quá trình đăng ký. {"\n\n"}
                                    Nếu bạn chưa nhận được email, vui lòng click vào link bên dưới</Text>
                                </View>
                                <View style={styles.buttonWrapper}>
                                    <ButtonIndex
                                        color={blue}
                                        label='GỬI LẠI EMAIL KÍCH HOẠT TÀI KHOẢN'
                                        action={this.sendEmailVerify}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.back}>Quay lại trang {" "}</Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.route.params.navigation.push('Login')}
                                    >
                                        <Text style={{ color: blue }}>đăng nhập !!!</Text>
                                    </TouchableOpacity>
                                </View>                     
                            </View>)
                            :
                        <InternetConnecNotification/>
                    }
            </ScrollView>
        );
    }
}
