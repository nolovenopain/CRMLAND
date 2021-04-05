import React, { Component } from "react";
import { View, ScrollView, Alert } from "react-native";
import Header from "./Header/Header";
import FormRegister from "./FormRegister/FormRegister";
import Footer from "./Footer/Footer";
import ButtonIndex from "../../Components/Elements/Button/Button";
import Checkbox from "../../Components/Elements/Checkbox/Checkbox";
import { loading } from "../../Helpers/Functions";
import { styles } from "./css";
import { postRegisterPersonal, postRegisterBussiness } from "../../Api/postRegister";
import { blue } from '../../Components/Elements/Color/Color';
import NetInfo from "@react-native-community/netinfo";
import { checkEmailValidate, checkPhoneValidate } from '../../Helpers/RegularExpression';;
 
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            name: '',
            company_name: '',
            email: '',
            company_email: '',
            phone: '',
            company_phone: '',
            company_tax_code: '',
            company_address: '',
            password: '',
            company_password: '',
            password_confirmation: '',
            company_password_confirmation: '',
            type: '0',
            agree: false,
            isInternetReachable: false,
            requestOpenAppAgain: false,
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
            this._isMounted && this.setState({ loaded: true });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async onSubmit() {
        if(!this.state.isInternetReachable) {
            Alert.alert('Không có kết nối internet', 'Vui lòng kiểm tra kết nối và thử lại')
        }
        else {
            const { name,
                    company_name,
                    email,
                    company_email,
                    phone,
                    company_phone,
                    company_tax_code,
                    company_address,
                    password,
                    company_password,
                    password_confirmation,
                    company_password_confirmation,
                    type,
                    agree } = this.state

            let checkValidate = []
                //check name personal
                if(type == '0' && name == '') {
                    Alert.alert('Thông báo', 'Họ tên không được để trống')
                    checkValidate.push(false)
                }
                else { 
                    checkValidate.push(true)
                }

                //check name business
                if(company_name == '' && type == '1') { 
                    Alert.alert('Thông báo', 'Tên công ty không được để trống')
                    checkValidate.push(false)
                }
                else { 
                    checkValidate.push(true)
                }

                //check email
                if(email == '' && company_email == '') {
                    Alert.alert('Thông báo', 'Email không được để trống')
                    checkValidate.push(false)
                } else if((!checkEmailValidate(email) && type == 0) || (!checkEmailValidate(company_email) && type == 1)) {
                    Alert.alert('Thông báo', 'Email không đúng')
                    checkValidate.push(false)
                }
                else { 
                    checkValidate.push(true)
                }

                //check phone
                if(phone == '' && company_phone == '') {
                    Alert.alert('Thông báo', 'Số điện thoại không được để trống')
                    checkValidate.push(false)
                } else if((!checkPhoneValidate(phone) && type == 0) || (!checkPhoneValidate(company_phone) && type == 1)) {
                    Alert.alert('Thông báo', 'Số điện thoại không đúng')
                    checkValidate.push(false)
                }
                else { 
                    checkValidate.push(true)
                }

                //check Tax Code
                if(company_tax_code == '' && type == '1') {
                    Alert.alert('Thông báo', 'Mã số thuế không đúng')
                    checkValidate.push(false)
                }

                //check password vs password confirm
                if(password == '' && company_password == '') {
                    Alert.alert('Thông báo', 'Mật khẩu không được để trống')
                    checkValidate.push(false)
                } else { 
                    checkValidate.push(true)
                }

                if(password_confirmation == '' && company_password_confirmation == '') {
                    Alert.alert('Thông báo', 'Mật khẩu xác nhận không được để trống')
                    checkValidate.push(false)
                } else { 
                    checkValidate.push(true)
                }

                if(password != password_confirmation || company_password != company_password_confirmation) {
                    Alert.alert('Thông báo', 'Mật khẩu và xác nhận mật khẩu không giống nhau')
                    checkValidate.push(false)
                } else { 
                    checkValidate.push(true)
                }

                if(agree == false) {
                    Alert.alert('Thông báo', 'Hãy đồng ý với điều khoản dịch vụ')
                    checkValidate.push(false)
                } else { 
                    checkValidate.push(true)
                }

                let tmp = true;
                for(let i=0; i<checkValidate.length ; i++) {
                    if(checkValidate[i] == false) {
                        tmp = false;
                        break;
                    }      
                }

                if(tmp == true) {
                    this.setState({ loaded : false });

                    var res = null;
                    if(type == 0) {
                        res = await postRegisterPersonal(
                            name,
                            email,
                            phone,
                            password,
                            password_confirmation,
                            type,
                            agree
                        );
                    }
                    else {
                        res = await postRegisterBussiness(
                            company_name,
                            company_email,
                            company_phone,
                            company_tax_code,
                            company_address,
                            company_password,
                            company_password_confirmation,
                            type,
                            agree
                        );
                    }
                    this.setState({ loaded : true })
                    if(res.status == 200) {
                        const resJson = await res.json();
                        if(resJson.code == 200) {
                            this.childForm.clearForm();
                            Alert.alert('Thông báo', resJson.message);
                        }
                        else if(resJson.code == 204) {
                            Alert.alert('Error !!!', resJson.message);
                        }
                        else if(resJson.errors) {
                            Object.entries(response.errors).map(([key, error]) => {
                                error.map((value, key) => {
                                    Alert.alert('Thông báo', value);
                                })
                            })
                        }
                    }
                    else if(res.status == 422) {
                        const resJson = await res.json();
                        if(resJson.errors.email) {
                            resJson.errors.email.map((value, key) => {
                                Alert.alert('Error !!!', value)
                            }) 
                        }
                        if(resJson.errors.phone) {
                            resJson.errors.phone.map((value, key) => {
                                Alert.alert('Error !!!', value)
                            }) 
                        }
                        if(resJson.errors.company_email) {
                            resJson.errors.company_email.map((value, key) => {
                                Alert.alert('Error !!!', value)
                            }) 
                        }
                        if(resJson.errors.company_phone) {
                            resJson.errors.company_phone.map((value, key) => {
                                Alert.alert('Error !!!', value)
                            }) 
                        }
                    }
                    else if(res.status == 500) {
                        this.setState({ requestOpenAppAgain: true });
                        Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                    }    
                }
        }
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    setType = (type) => {
        this.setState({type: type}, () => {})
    }

    setChecked = (name, agree) => {
        this.setState({[name] : agree}, () => {})
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Header />
                        </View>
                        <View style={styles.tabNavigator}>
                            <FormRegister 
                                setValue={this.setValue}
                                setType={this.setType}
                                type={this.state.type}
                                onRef={ref => (this.childForm = ref)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Checkbox 
                                text="Tôi đồng ý với" 
                                textLink="Điều khoản dịch vụ"
                                setChecked={this.setChecked}
                                name='agree'
                                checked={false}
                            />
                        </View>
                        <ButtonIndex 
                            color={blue} 
                            label="ĐĂNG KÝ"
                            action={this.onSubmit} 
                        />
                        <View style={styles.footer}>
                            <Footer 
                                navigation={this.props.navigation} 
                            />
                        </View>
                    </View>
            </ScrollView>
        );
    }
}
