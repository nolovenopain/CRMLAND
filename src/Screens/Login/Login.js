import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import Logo from './Logo/Logo';
import FormLogin from './FormLogin/FormLogin';
import Footer from './Footer/Footer';
import ButtonIndex from '../../Components/Elements/Button/Button';
import { loading, showError } from '../../Helpers/Functions';
import { styles } from './css'
import * as actions from '../../Actions/index';
import { connect } from 'react-redux';
import postLogin from '../../Api/postLogin';
import { blue } from '../../Components/Elements/Color/Color';
import getUserInfo from '../../Api/getUserInfo';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import postRegisterTokenDevice from '../../Api/postRegisterTokenDevice';
import firebase from 'react-native-firebase';
import NetInfo from "@react-native-community/netinfo";
import { checkEmailValidate } from '../../Helpers/RegularExpression';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            password: '',
            email: '',
            isInternetReachable: false,
            loadedData: false
        };
        this._isMounted = false;
        this.login = this.login.bind(this);
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
        this.setState({ [name]: value }, () => {})
    }

    async login() {
        this.setState({ loaded: false })
        if(!this.state.isInternetReachable) {
            this.setState({ loaded: true })
            Alert.alert('Không có kết nối internet', 'Vui lòng kiểm tra kết nối và thử lại')
        }
        else { 
            const { email, password } = this.state;
            if (email == '' || password == ''){
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Email hoặc mật khẩu không được để trống');
            } 
            else if(!checkEmailValidate(email)) {
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Email không đúng');
            }
            else {
                const resLogin = await postLogin(email, password);

                setTimeout(async() => {
                    this.setState({ loaded: true })
                    if(resLogin.status == 200) {
                        const responseLogin = await resLogin.json();
                        if(responseLogin.code == 200) {
                            
                            const token = responseLogin.data.token_type + ' ' + responseLogin.data.access_token;
    
                            const resUserInfo = await getUserInfo(token);
                                if(resUserInfo.status == 200) {
                                    this.setState({ loadedData: true })
                                    const responseUserInfo = await resUserInfo.json();
                                    if(responseUserInfo.code == 200) {
                                        if(responseUserInfo.data.email_verified_at == null) {
                                            this.props.navigation.navigate('NoVerifyEmail', {
                                                navigation: this.props.navigation,
                                                token
                                            });
                                        } 
                                        else {
                                            let fcmToken = await AsyncStorage.getItem('fcmToken');
                                            if(!fcmToken) {
                                                fcmToken = await firebase.messaging().getToken();
                                                if(fcmToken) {
                                                    await AsyncStorage.setItem('fcmToken', fcmToken);
                                                }
                                            }
                                            await AsyncStorage.setItem('token', responseLogin.data.access_token);
                                            await AsyncStorage.setItem('token_type', responseLogin.data.token_type);
                                            await AsyncStorage.setItem('refresh_token', responseLogin.data.refresh_token);
                                            await AsyncStorage.setItem('startTime', moment(new Date()).format('DD/MM/YYYY H:mm:ss'));
                                            await postRegisterTokenDevice(token, fcmToken);
                                            this.props.navigation.push('BottomNavigation');   
                                        }
                                        this.childFormLogin.clearFormLogin();   
                                    }
                                    else if(responseUserInfo.code == 204) {
                                        console.log('Error !!!', responseUserInfo.message)
                                    }
                                }
                                else if(resUserInfo.status == 500){
                                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng đăng nhập lại !!!');
                                }    
                        }
                        else if(responseLogin.code == 204 && responseLogin.data == null) {
                            Alert.alert('Error !!!', responseLogin.message);
                        }   
                    }
                    else if(resLogin.status == 500){
                        Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng đăng nhập lại !!!');
                    }  
                }, 2000) 
            }
        }
        // this.props.postLoginThunk(email, password);
    }

    UNSAFE_componentWillReceiveProps() {
        const { token } = this.props.user;
        if (token) {
            this.setState({
                email: '',
                password: ''
            }, () => {
                this.props.navigation.navigate('Home');
            });
        }
    }

    render() {
        const { loadError, loadedData } = this.props.app;
        if (loadError) {
            return showError();
        }
        const { token } = this.props.user;
        if (token) {
                this.props.navigation.navigate('Home');
        }

        return (
            <ScrollView>
                { (!this.state.loaded || loadedData) ? loading() : null }
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <Logo />
                    </View>
                    <View style={styles.form}>
                        <FormLogin 
                            setValue={this.setValue} 
                            onRef={ref => (this.childFormLogin = ref)}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <View style={styles.button}>
                            <ButtonIndex
                                color={blue}
                                label='ĐĂNG NHẬP'
                                action={this.login}
                            />
                        </View>
                        <View style={styles.footer}>
                            <Footer
                                navigation={this.props.navigation}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    app: state.app
});

export default connect(mapStateToProps, actions)(Login);
