import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from './css';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../../Components/Elements/Color/Color';
import ButtonIndex from '../../../../../Components/Elements/Button/Button';
import { loading } from '../../../../../Helpers/Functions';
import postCreateEmailSMTP from '../../../../../Api/postCreateEmailSMTP';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import CustomInput from '../../../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class CreateEmailSMTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host: 'smtp.gmail.com',
            smtp_port: '587',
            smtp_protocol: 'tls',
            token: this.props.route.params.token,
            loaded: false,
            isInternetReachable: false,
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
        });

        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ 
                loaded: true, 
            });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { });
    }

    async save() {
        this.setState({ loaded: false })
        if(!this.state.name || this.state.name == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập tên')
        }
        else if(this.state.smtp_protocol == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập smtp server')
        }
        else if(!this.state.smtp_username || this.state.smtp_username == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập username')
        }
        else if(!this.state.smtp_password || this.state.smtp_password == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu')
        }
        else if(this.state.smtp_port == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập port')
        }
        else if(this.state.host == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập tsl/ssl')
        }
        else {
            var type;
            if(this.state.host == 'smtp.gmail.com') {
                type = 'smtp';
            }
            const res = await postCreateEmailSMTP(
                this.state.token, 
                this.state.name, 
                this.state.host, 
                this.state.smtp_username,
                this.state.smtp_password,
                this.state.stmpPort,
                this.state.smtpProtocol,
                type
            );
            
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.props.route.params.refreshList()
                        this.childName.clearOldInput();
                        this.childSMTPUserName.clearOldInput();
                        this.childSMTPPassword.clearOldInput();
                        Alert.alert(
                            'Thông báo', 
                            resJson.message,
                            [
                                {text: 'Đồng ý', onPress: () => this.props.route.params.navigation.goBack()}
                            ]
                        );
                    } 
                    else if(resJson.code == 204) {
                        Alert.alert('Error !!!', resJson.message)
                    }
                    else if(resJson.errors) {
                        console.log(resJson)   
                    }
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

    cancel() {
        this.props.route.params.navigation.goBack();
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
                                    <View style={styles.firstInput}>
                                        <CustomInput
                                            label='Tên'
                                            name='name'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            required={true}
                                            placeholder='Nhập tên...'
                                            onRef={ref => (this.childName = ref)}
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <CustomInput
                                            label='SMTP server'
                                            name='host'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            oldValue={this.state.host}
                                            placeholder='Nhập SMTP server...'
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <CustomInput
                                            label='SMTP username'
                                            name='smtp_username'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            placeholder='Nhập SMTP user name...'
                                            onRef={ref => (this.childSMTPUserName = ref)}
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <CustomInput
                                            label='SMTP password'
                                            name='smtp_password'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            placeholder='Nhập mật khẩu SMTP...'
                                            onRef={ref => (this.childSMTPPassword = ref)}
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <CustomInput
                                            label='SMTP port'
                                            name='smtp_port'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            oldValue={this.state.stmpPort}
                                            placeholder='Nhập port SMTP...'
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <CustomInput
                                            label='TLS/SSL'
                                            name='smtp_protocol'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            oldValue={this.state.smtpProtocol}
                                            placeholder='Nhập TLS/SSL...'
                                        />
                                    </View>

                                    <View style={styles.saveBtn}>
                                        <ButtonIndex 
                                            label='LƯU'
                                            color={blue}
                                            action={this.save}
                                        />
                                    </View>
                                    <View style={styles.cancelBtn}>
                                        <ButtonIndex 
                                            label='HỦY'
                                            color={orange}
                                            action={this.cancel}
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
