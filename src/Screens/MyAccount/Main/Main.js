import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Share, RefreshControl, Alert } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../../../Components/Elements/Color/Color';
import AsyncStorage from '@react-native-community/async-storage';
import { loading, fetchToken } from '../../../Helpers/Functions';
import getUserInfo from '../../../Api/getUserInfo';
import NumberFormat from 'react-number-format';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import postLogOut from '../../../Api/postLogOut';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { StackActions } from '@react-navigation/native';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: '',
            user: {},
            isInternetReachable: false,
            noPrefixToken: '',
            refreshScreen: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.refreshUserInfo = this.refreshUserInfo.bind(this);
        this.onShare = this.onShare.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                const noPrefixToken = await AsyncStorage.getItem('token');
                this.getUserInfo(token)

                this.setState({ 
                    token,
                    noPrefixToken 
                });
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

    async getUserInfo(token) {
        const res =  await getUserInfo(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ user: resJson.data })
            }
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message)
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    async refreshUserInfo() { 
        this.getUserInfo(this.state.token);
    }

    async onShare() {
        try {
            const result = await Share.share({
                message:
                'CRM LAND, giải pháp quản trị khách hàng chuyên nghiệp cho bất động sản ! Hãy trải nghiệm cùng chúng tôi : http://crmland.vn/',
            });
        
            if (result.action == Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action == Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    async logout() {
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        const res = await postLogOut(
            this.state.token, 
            fcmToken
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                AsyncStorage
                .clear()
                .then(() => { this.props.navigation.navigate('UserNavigation')})
            }
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message)
            }
        } 
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async onRefresh() {
        this.getUserInfo(this.state.token);
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
                                        <View style={styles.hello}>
                                            <Text style={styles.helloText}>
                                                XIN CHÀO ! {this.state.user != null && this.state.user.name != undefined ? this.state.user.name.toUpperCase() : null}
                                            </Text>
                                            <TouchableOpacity 
                                                style={styles.balance}
                                                onPress={() => this.props.navigation.navigate('TopUpAccount', {
                                                    noPrefixToken: this.state.noPrefixToken
                                                })}
                                            >
                                                <Icon
                                                    style={styles.cart}
                                                    name='ios-cart'
                                                    color='#fff'
                                                    size={15}
                                                />
                                                <NumberFormat
                                                    value={this.state.user != null ? this.state.user.amount : 0}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' vnđ'}
                                                    renderText={value => <Text style={styles.money}>{value}</Text>}
                                                /> 
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity 
                                            style={styles.configs}
                                            onPress={() => this.props.navigation.navigate('AccountInformation', {
                                                user: this.state.user,
                                                token: this.state.token,
                                                navigation: this.props.navigation,
                                                refreshUserInfo: this.refreshUserInfo
                                            })}
                                        >   
                                            <View style={styles.iconWrapper}>
                                                <Icon
                                                    name='ios-person'
                                                    color={blue}
                                                    size={35}
                                                />
                                            </View>
                                            <View style={styles.configText}>
                                                <Text style={styles.topConfigText}>THÔNG TIN TÀI KHOẢN</Text>
                                                <Text style={styles.bottomConfigText}>Xem và chỉnh sửa các thông tin tài khoản của bạn</Text>
                                            </View>
                                            <View style={styles.forwardArrowWrapper}>
                                                <Icon
                                                    style={styles.forwardArrow}
                                                    name='ios-chevron-forward'
                                                    size={25}
                                                    color='#686868'
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.configs}
                                            onPress={() => this.props.navigation.navigate('ChangePassword', {
                                                token: this.state.token,
                                                navigation: this.props.navigation,
                                                refreshUserInfo: this.refreshUserInfo
                                            })}
                                        >
                                            <View style={styles.iconWrapper}>
                                                <Icon
                                                    style={styles.changePassword}
                                                    name='ios-lock-closed'
                                                    color={blue}
                                                    size={35}
                                                />
                                            </View>
                                            <View style={styles.configText}>
                                                <Text style={styles.topConfigText}>ĐỔI MẬT KHẨU</Text>
                                                <Text style={styles.bottomConfigText}>Thay đổi mật khẩu đăng nhập hệ thống</Text>
                                            </View>
                                            <View style={styles.forwardArrowWrapper}>
                                                <Icon
                                                    style={styles.forwardArrow}
                                                    name='ios-chevron-forward'
                                                    size={25}
                                                    color='#686868'
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.configs}
                                            onPress={() => this.props.navigation.navigate('PaymentHistory', {
                                                token: this.state.token
                                            })}
                                        >
                                            <View style={styles.iconWrapper}>
                                                <Icon
                                                    style={styles.historyPayment}
                                                    name='ios-card'
                                                    color={blue}
                                                    size={35}
                                                />
                                            </View>
                                            <View style={styles.configText}>
                                                <Text style={styles.topConfigText}>LỊCH SỬ THANH TOÁN</Text>
                                                <Text style={styles.bottomConfigText}>Thông tin lịch sử thanh toán nạp tiền hệ thống</Text>
                                            </View>
                                            <View style={styles.forwardArrowWrapper}>
                                                <Icon
                                                    style={styles.forwardArrow}
                                                    name='ios-chevron-forward'
                                                    size={25}
                                                    color='#686868'
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.configs}
                                            onPress={() => this.props.navigation.navigate('Activities', {
                                                token: this.state.token
                                            })}
                                        >
                                            <View style={styles.iconWrapper}>
                                                <Icon
                                                    style={styles.historyPayment}
                                                    name='ios-rocket'
                                                    color={blue}
                                                    size={35}
                                                />
                                            </View>
                                            <View style={styles.configText}>
                                                <Text style={styles.topConfigText}>NHẬT KÝ HOẠT ĐỘNG</Text>
                                                <Text style={styles.bottomConfigText}>Lịch sử chi tiêu tài khoản trên hệ thống</Text>
                                            </View>
                                            <View style={styles.forwardArrowWrapper}>
                                                <Icon
                                                    style={styles.forwardArrow}
                                                    name='ios-chevron-forward'
                                                    size={25}
                                                    color='#686868'
                                                />
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={styles.configTitle}>CẤU HÌNH ỨNG DỤNG</Text>

                                        <TouchableOpacity 
                                            style={styles.configs}
                                            onPress={() => this.props.navigation.navigate('NotificationSettings', {
                                                token: this.state.token,
                                                navigation: this.props.navigation,
                                                user: this.state.user,
                                                refreshUserInfo: this.refreshUserInfo
                                            })}
                                        >
                                            <View style={styles.iconWrapper}>
                                                <Icon
                                                    style={styles.notiConfig}
                                                    name='ios-notifications'
                                                    color={blue}
                                                    size={35}
                                                />  
                                            </View>
                                            <View style={styles.configText}>
                                                <Text style={styles.topConfigText}>CẤU HÌNH THÔNG BÁO</Text>
                                                <Text style={styles.bottomConfigText}>Thay đổi các cài đặt thông báo cho ứng dụng</Text>
                                            </View>
                                            <View style={styles.forwardArrowWrapper}>
                                                <Icon
                                                    style={styles.forwardArrow}
                                                    name='ios-chevron-forward'
                                                    size={25}
                                                    color='#686868'
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity 
                                            style={styles.configs}
                                            onPress={this.onShare}
                                        >
                                            <View style={styles.iconWrapper}>
                                                <Icon
                                                    style={styles.historyPayment}
                                                    name='ios-share-social'
                                                    color={blue}
                                                    size={35}
                                                />
                                            </View>
                                            <View style={styles.configText}>
                                                <Text style={styles.topConfigText}>GIỚI THIỆU BẠN BÈ</Text>
                                                <Text style={styles.bottomConfigText}>Chia sẻ ứng dụng này cho bạn bè của bạn</Text>
                                            </View>
                                            <View style={styles.forwardArrowWrapper}>
                                                <Icon
                                                    style={styles.forwardArrow}
                                                    name='ios-chevron-forward'
                                                    size={25}
                                                    color='#686868'
                                                />
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity 
                                            style={styles.logOut}
                                            onPress={this.logout}
                                        >
                                            <Icon
                                                style={styles.iconLogOut}
                                                name='ios-power'
                                                size={27}
                                                color='#fff'
                                            />
                                            <Text style={styles.logOutLabel}>ĐĂNG XUẤT</Text>
                                        </TouchableOpacity>
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
