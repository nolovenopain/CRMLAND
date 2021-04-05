import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import Logo from './Logo/Logo';
import FormForgot from './FormForgot/FormForgot';
import Footer from './Footer/Footer';
import ButtonIndex from '../../Components/Elements/Button/Button';
import { loading } from '../../Helpers/Functions';
import { styles } from './css'
import postResetPassword from '../../Api/postResetPassword';
import { blue } from '../../Components/Elements/Color/Color';
import NetInfo from "@react-native-community/netinfo";
import { checkEmailValidate } from '../../Helpers/RegularExpression'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            email: '',
            isInternetReachable: false
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
        });
        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({loaded: true});
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async onSubmit() {
        this.setState({ loaded: false });
        if(!this.state.isInternetReachable) {
            this.setState({ loaded: true });
            Alert.alert('Không có kết nối internet', 'Vui lòng kiểm tra kết nối và thử lại')
        }
        else {
            const { email } = this.state;
            if(email == '') {
                Alert.alert('Error !!!', 'Email không được để trống')
            } 
            else if(!checkEmailValidate(email)) {
                Alert.alert('Error !!!', 'Email không đúng')
            }
            else {
                const res = await postResetPassword(email);

                setTimeout(async() => { 
                    this.setState({ loaded: true });
                    if(res.status == 200) {
                        const resJson = await res.json();
                        if(resJson.code == 200) {
                            this.childForgot.clearEmail();
                            Alert.alert('Thông báo', resJson.message); 
                        } 
                        else if(resJson.code == 204) {
                            Alert.alert('Error !!!', resJson.message)
                        }
                        else if(resJson.errors) {
                            console.log(resJson)   
                        }
                    }      
                    else if(res.status == 500) {
                        this.setState({ requestOpenAppAgain: true })
                        Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                    }
                }, 1000);
            }
        } 
    }

    setValue = (name, value) => {
        this.setState({ [name] : value }, () => {})
    }
    
    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <Logo/>
                    </View>
                    <View style={styles.form}>
                        <FormForgot 
                            setValue={this.setValue}
                            onRef={ref => (this.childForgot = ref)}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <ButtonIndex 
                            style={styles.button}
                            color={blue}
                            label='GỬI LINK THAY ĐỔI MẬT KHẨU QUA EMAIL'
                            action={this.onSubmit}
                        />
                        <View style={styles.footer}>
                            <Footer navigation={this.props.navigation}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
