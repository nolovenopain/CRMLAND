import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { styles } from './css';
import ButtonIndex from '../../../../Components/Elements/Button/Button';
import { blue } from '../../../../Components/Elements/Color/Color';
import { loading } from '../../../../Helpers/Functions';
import postWebsiteRenewable from '../../../../Api/postWebsiteRenewable';
import getExtensionPackage from '../../../../Api/getExtensionPackage';
import NumberFormat from 'react-number-format';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import SingleSelect from '../../../../Components/Elements/SingleSelect/SingleSelect';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class PremiumExtension extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packages: [],
            showPrice: false,
            price: '',
            loaded: false,
            token: this.props.route.params.token,
            package_id: '',
            isInternetReachable: false,
            refreshScreen: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.returnPackageData = this.returnPackageData.bind(this);
        this.extension = this.extension.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getExtensionPackage();
            }
        });
 
        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    async getExtensionPackage() {
        const res = await getExtensionPackage(
            this.state.token, 
            this.props.route.params.domain.id
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.childPackage.refreshListItems(resJson.data.extensions);
                this.setState({ packages: resJson.data.extensions });
            } 
            else if(resJson.code == 204) {
                if(resJson.message.includes('Vui lòng cập nhật số điện thoại')) {
                    Alert.alert('Error !!!', 'Vui lòng cập nhật số điện thoại trước khi gia hạn')
                }
                else {
                    console.log('Error !!!', resJson.message)
                }
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
    }
    returnPackageData(selectPackage) {
        this.state.packages.map((pack, key) => {
            if(pack.id == selectPackage.id) {
                this.setState({ 
                    showPrice: true,
                    price: pack.price,
                    package_id: selectPackage.id 
                })
            }
        })
    }

    async extension() {
        this.setState({ loaded: false })
        const res = await postWebsiteRenewable (
            this.state.token,
            this.props.route.params.domain.id,
            this.state.package_id
        );
        
        setTimeout(async() => {
            this.setState({ loaded: true })
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.props.route.params.refreshList();
                    this.childPackage.refreshAfterCreate();
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
    
    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async onRefresh() {
        this.getExtensionPackage();
        this.setState({ refreshScreen: true });
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() {  
        return (
            <View>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>   
                                    : 
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefresh} />
                                    }
                                    style={{ width: width }}
                                >  
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={styles.firstInput}>
                                            <CustomInput
                                                label='Website'
                                                editable={false}
                                                oldValue={this.props.route.params.domain.domain}
                                                width={width/1.16 - 10}
                                                marginLeft={10}
                                                multiline={true}
                                            />
                                        </View>
                                        <View style={styles.secondInput}>
                                            <CustomInput
                                                label='Gói dịch vụ đang sử dụng'
                                                editable={false}
                                                oldValue={this.props.route.params.domain.item.name}
                                                width={width/1.16 - 10}
                                                marginLeft={10}
                                            />
                                        </View>
                                        <View style={styles.picker}>
                                            <Text style={styles.packageLabel}>Nâng cấp gói</Text>
                                            <SingleSelect
                                                selectText="Chọn gói..."
                                                placeholder='Tìm gói...'
                                                items={this.state.packages}
                                                returnData={this.returnPackageData}
                                                onRef={ref => (this.childPackage = ref)}
                                            />
                                        </View>
                                        {this.state.showPrice ? 
                                            <View style={styles.hidePicker}>
                                                <Text style={styles.costLabel}>Chi phí</Text>
                                                <NumberFormat
                                                    value={this.state.showPrice ? this.state.price : 0}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' vnđ'}
                                                    renderText={value => <Text style={styles.cost}>{value}</Text>}
                                                /> 
                                            </View> : null
                                        } 
                                        
                                        <View style={styles.buttonChange}>
                                            <ButtonIndex 
                                                color={blue}
                                                label='ĐỔI GÓI DỊCH VỤ'
                                                action={this.extension}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>)
                                    :
                            <InternetConnecNotification/>
                        }
                    </View>
            </View>
        );
    }
}
