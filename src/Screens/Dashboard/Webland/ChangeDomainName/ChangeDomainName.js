import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { styles } from './css';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import ButtonIndex from '../../../../Components/Elements/Button/Button';
import { blue, orange } from '../../../../Components/Elements/Color/Color';
import getCheckDomainNameAvailable from '../../../../Api/getCheckDomainNameAvailable';
import { loading } from '../../../../Helpers/Functions';
import postChangeDomainName from '../../../../Api/postChangeDomainName';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class EditDomain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            loaded: false,
            disabled: true,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.onCheck = this.onCheck.bind(this);
        this.changeDomainName = this.changeDomainName.bind(this);
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

    async onCheck() {
        this.setState({ loaded: false })
        if(this.state.domain == undefined || this.state.domain == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập tên miền mới')
        } else {
            const res = await getCheckDomainNameAvailable(
                this.state.token, 
                this.state.domain
            );
            
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.setState({ disabled: false })
                        Alert.alert('Thông báo', resJson.message);
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

    async changeDomainName() {
        this.setState({ loaded: false })
        const res = await postChangeDomainName(
            this.state.token,
            this.props.route.params.domain.id,
            this.state.domain
        );
        
        setTimeout(async() => {
            this.setState({ loaded: true })
            if(res.status == 200) {
                const resJson = await res.json();
                console.log(resJson)
                if(resJson.code == 200) {
                    this.setState({ disabled: false })
                    this.props.route.params.refreshList();
                    this.childDomain.clearOldInput();
                    Alert.alert(
                        'Thông báo',
                        resJson.message,
                        [
                            {text: 'Đồng ý', onPress: () => {
                                this.props.route.params.navigation.push('Main');
                            }}
                        ],
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
                                    <View style={styles.input}>
                                        <CustomInput
                                            label='Website'
                                            editable={false}
                                            oldValue={this.props.route.params.domain.domain}
                                            width={width/1.16 - 10}
                                            marginLeft={10}
                                        />
                                    </View>
                                    <View style={styles.newDomainInput}>
                                        <CustomInput
                                            label='Tên miền mới'
                                            editable={true}
                                            name='domain'
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            placeholder='Nhập tên miền mới...'
                                            onRef={ref => (this.childDomain = ref)}
                                        />
                                    </View>
                                    <View style={styles.btnCheck}>
                                        <ButtonIndex 
                                            color={orange}
                                            label='KIỂM TRA TÊN MIỀN MỚI'
                                            action={this.onCheck}
                                        />
                                    </View>
                                    <View style={styles.btnChange}>
                                        <ButtonIndex 
                                            color={blue}
                                            label='ĐỔI TÊN MIỀN CHO TÔI'
                                            action={this.changeDomainName}
                                            disabled={this.state.disabled}
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
