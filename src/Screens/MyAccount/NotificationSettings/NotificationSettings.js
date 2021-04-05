import React, { Component } from 'react';
import { View, Text, ScrollView, Switch, Alert, RefreshControl } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../../../Components/Elements/Color/Color';
import { loading } from '../../../Helpers/Functions';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import postConfigNotification from '../../../Api/postConfigNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
import getUserInfo from '../../../Api/getUserInfo';
import { width } from '../../../Components/Elements/Dimensions/Dimensions/';

export default class NotificationSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCustomerOnApp: false,
            newCustomerOnEmail: false,
            newCustomerOnSMS: false,
            careCustomerOnApp: false,
            careCustomerOnEmail: false,
            careCustomerOnSMS: false,
            reminderOnApp: false,
            reminderOnEmail: false,
            reminderOnSMS: false,
            marketingOnApp: false,
            marketingOnEmail: false,
            marketingOnSMS: false,
            loaded: false,
            isInternetReachable: false,
            token: this.props.route.params.token,   
            requestOpenAppAgain: false,
            refreshScreen: false,
            user: this.props.route.params.user     
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
        });
        
        var newCustomerOnApp, newCustomerOnEmail, newCustomerOnSMS, careCustomerOnApp, careCustomerOnEmail, careCustomerOnSMS,
            reminderOnApp, reminderOnEmail, reminderOnSMS, marketingOnApp, marketingOnEmail, marketingOnSMS;
            
        if(this.state.user.data == null) {
            newCustomerOnApp = false,
            newCustomerOnEmail = false,
            newCustomerOnSMS = false,
            careCustomerOnApp = false,
            careCustomerOnEmail = false,
            careCustomerOnSMS = false,
            reminderOnApp = false,
            reminderOnEmail = false,
            reminderOnSMS = false,
            marketingOnApp = false,
            marketingOnEmail = false,
            marketingOnSMS = false
        } else {
            //check new_customer
            if(this.state.user.data.config_notification.new_customer && this.state.user.data.config_notification) { 
                if(this.state.user.data.config_notification.new_customer.on_app) {
                    if(this.state.user.data.config_notification.new_customer.on_app == 1) {
                        newCustomerOnApp = true
                    } else {
                        newCustomerOnApp = false
                    }
                } else {
                    newCustomerOnApp = false
                }

                if(this.state.user.data.config_notification.new_customer.on_email) {
                    if(this.state.user.data.config_notification.new_customer.on_email == 1) {
                        newCustomerOnEmail = true
                    } else {
                        newCustomerOnEmail = false
                    }
                } else {
                    newCustomerOnEmail = false
                }
    
                if(this.state.user.data.config_notification.new_customer.on_sms) {
                    if(this.state.user.data.config_notification.new_customer.on_sms == 1) {
                        newCustomerOnSMS = true
                    } else {
                        newCustomerOnSMS = false
                    }
                } else {
                    newCustomerOnSMS = false
                }
            }
            else{
                newCustomerOnApp = false,
                newCustomerOnEmail = false,
                newCustomerOnSMS = false
            }

            //check care_customer
            if(this.state.user.data.config_notification.care_customer && this.state.user.data.config_notification) {
                if(this.state.user.data.config_notification.care_customer.on_app) {
                    if(this.state.user.data.config_notification.care_customer.on_app == 1) {
                        careCustomerOnApp = true
                    } else {
                        careCustomerOnApp = false
                    } 
                } else {
                    careCustomerOnApp = false
                }

                if(this.state.user.data.config_notification.care_customer.on_email) {
                    if(this.state.user.data.config_notification.care_customer.on_email == 1) {
                        careCustomerOnEmail = true
                    } else {
                        careCustomerOnEmail = false
                    }
                } else {
                    careCustomerOnEmail = false
                }
    
                if(this.state.user.data.config_notification.care_customer.on_sms) {
                    if(this.state.user.data.config_notification.care_customer.on_sms == 1) {
                        careCustomerOnSMS = true
                    } else {
                        careCustomerOnSMS = false
                    }
                } else {
                    careCustomerOnSMS = false
                }
            }
            else {
                careCustomerOnApp = false,
                careCustomerOnEmail = false,
                careCustomerOnSMS = false
            }

            //check reminder
            if(this.state.user.data.config_notification.reminder && this.state.user.data.config_notification) {
                if(this.state.user.data.config_notification.reminder.on_app) {
                    if(this.state.user.data.config_notification.reminder.on_app == 1) {
                        reminderOnApp = true
                    } else {
                        reminderOnApp = false
                    }
                } else {
                    reminderOnApp = false
                }

                if(this.state.user.data.config_notification.reminder.on_email) {
                    if(this.state.user.data.config_notification.reminder.on_email == 1) {
                        reminderOnEmail = true
                    } else {
                        reminderOnEmail = false
                    }
                } else {
                    reminderOnEmail = false
                }
    
                if(this.state.user.data.config_notification.reminder.on_sms) {
                    if(this.state.user.data.config_notification.reminder.on_sms == 1) {
                        reminderOnSMS = true
                    } else {
                        reminderOnSMS = false
                    }
                } else {
                    reminderOnSMS = false
                }
            }
            else {
                reminderOnApp = false,
                reminderOnEmail = false,
                reminderOnSMS = false
            }

            //check marketing
            if(this.state.user.data.config_notification.marketing && this.state.user.data.config_notification) {
                if(this.state.user.data.config_notification.marketing.on_app) {
                    if(this.state.user.data.config_notification.marketing.on_app == 1) {
                        marketingOnApp = true
                    } else {
                        marketingOnApp = false
                    }
                } else {
                    marketingOnApp = false
                }

                if(this.state.user.data.config_notification.marketing.on_email) {
                    if(this.state.user.data.config_notification.marketing.on_email == 1) {
                        marketingOnEmail = true
                    } else {
                        marketingOnEmail = false
                    }
                } else {
                    marketingOnEmail = false
                }
    
                if(this.state.user.data.config_notification.marketing.on_sms) {
                    if(this.state.user.data.config_notification.marketing.on_sms == 1) {
                        marketingOnSMS = true
                    } else {
                        marketingOnSMS = false
                    }
                } else {
                    marketingOnSMS = false
                }
            }
            else {
                marketingOnApp = false,
                marketingOnEmail = false,
                marketingOnSMS = false
            }
        }

        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ 
                loaded: true,
                newCustomerOnApp,
                newCustomerOnEmail,
                newCustomerOnSMS,
                careCustomerOnApp,
                careCustomerOnEmail,
                careCustomerOnSMS,
                reminderOnApp,
                reminderOnEmail,
                reminderOnSMS,
                marketingOnApp,
                marketingOnEmail,
                marketingOnSMS 
            });
        }, 1000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    turnOnOff = (name, value) => {
        this.setState({ loaded: false })

        var bool;
        
        this.setState({ [name]: value }, async() => {
            
            if(value) {
                bool = 1;
            }
            else {
                bool = 0;
            }

            const res = await postConfigNotification(
                this.state.token,
                name,
                bool
            );

            setTimeout(async() => {
                this.setState({ loaded: true }) 
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.props.route.params.refreshUserInfo(this.state.token);
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
                    .then(() => this.props.route.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(res.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
            }, 1000);
        })
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async getUserInfo() {
        const res =  await getUserInfo(this.state.token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ user: resJson.data }, () => this.componentDidMount())
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

    async onRefresh() {
        this.getUserInfo();
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
                                        {/* new customer  */}
                                        <View style={styles.settingWrapper}>
                                            <View style={styles.setting}>
                                                <Icon
                                                    style={styles.notiSetting}
                                                    name='ios-notifications'
                                                    color={blue}
                                                    size={35}
                                                />
                                                <View style={styles.settingText}>
                                                    <Text style={styles.topSettingText}>{'Gửi thông báo khi có khách mới'.toUpperCase()}</Text>
                                                    <Text style={styles.bottomSettingText}>(Hệ thống sẽ gửi thông báo ngay lập tức cho bạn khi có khách hàng mới điểm thông tin vào các form đăng ký tư vấn trên website của bạn. Tùy chọn nãy sẽ giúp bạn không bỏ lỡ bất kỳ khách hàng nào.)</Text>
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Mobile App</Text>
                                                    <Text style={styles.switchLabelBottom}>(Tùy chọn này miễn phí)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.newCustomerOnApp ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.newCustomerOnApp}
                                                        onValueChange={(newCustomerOnApp) => this.turnOnOff('newCustomerOnApp', newCustomerOnApp)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Email</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 30đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.newCustomerOnEmail ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.newCustomerOnEmail}
                                                        onValueChange={(newCustomerOnEmail) => this.turnOnOff('newCustomerOnEmail', newCustomerOnEmail)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua SMS</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 850đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.newCustomerOnSMS ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.newCustomerOnSMS}
                                                        onValueChange={(newCustomerOnSMS) => this.turnOnOff('newCustomerOnSMS', newCustomerOnSMS)}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        {/* care customer  */}
                                        <View style={styles.settingWrapper}>
                                            <View style={styles.setting}>
                                                <Icon
                                                    style={styles.notiSetting}
                                                    name='ios-notifications'
                                                    color={blue}
                                                    size={35}
                                                />
                                                <View style={styles.settingText}>
                                                    <Text style={styles.topSettingText}>{'Nhắc lịch chăm sóc khách hàng'.toUpperCase()}</Text>
                                                    <Text style={styles.bottomSettingText}>(Hệ thống sẽ gửi thông báo ngay cho bạn lịch chăm sóc khách hàng (VD: 15 phút nữa bạn có cuộc hẹn với khách hàng ABC). Tùy chọn nãy sẽ giúp bạn không bỏ lỡ bất kỳ công việc nào.)</Text>
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Mobile App</Text>
                                                    <Text style={styles.switchLabelBottom}>(Tùy chọn này miễn phí)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.careCustomerOnApp ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.careCustomerOnApp}
                                                        onValueChange={(careCustomerOnApp) => this.turnOnOff('careCustomerOnApp', careCustomerOnApp)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Email</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 30đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.careCustomerOnEmail ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.careCustomerOnEmail}
                                                        onValueChange={(careCustomerOnEmail) => this.turnOnOff('careCustomerOnEmail', careCustomerOnEmail)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua SMS</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 850đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.careCustomerOnSMS ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.careCustomerOnSMS}
                                                        onValueChange={(careCustomerOnSMS) => this.turnOnOff('careCustomerOnSMS', careCustomerOnSMS)}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        {/* reminder  */}
                                        <View style={styles.settingWrapper}>
                                            <View style={styles.setting}>
                                                <Icon
                                                    style={styles.notiSetting}
                                                    name='ios-notifications'
                                                    color={blue}
                                                    size={35}
                                                />
                                                <View style={styles.settingText}>
                                                    <Text style={styles.topSettingText}>{'Nhắc nhở công việc đến hạn'.toUpperCase()}</Text>
                                                    <Text style={styles.bottomSettingText}>(Hệ thống sẽ gửi thông báo cho bạn khi có 1 công việc được cài đặt trong phần mềm đến hạn (VD: 15 phút nữa bạn có cuộc họp với Mr ABC). Tùy chọn nãy sẽ giúp bạn không bỏ lỡ bất kỳ công việc nào.)</Text>
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Mobile App</Text>
                                                    <Text style={styles.switchLabelBottom}>(Tùy chọn này miễn phí)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.reminderOnApp ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.reminderOnApp}
                                                        onValueChange={(reminderOnApp) => this.turnOnOff('reminderOnApp', reminderOnApp)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Email</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 30đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.reminderOnEmail ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.reminderOnEmail}
                                                        onValueChange={(reminderOnEmail) => this.turnOnOff('reminderOnEmail', reminderOnEmail)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua SMS</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 850đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.reminderOnSMS ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.reminderOnSMS}
                                                        onValueChange={(reminderOnSMS) => this.turnOnOff('reminderOnSMS', reminderOnSMS)}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        {/* marketing  */}
                                        <View style={styles.settingWrapper}>
                                            <View style={styles.setting}>
                                                <Icon
                                                    style={styles.notiSetting}
                                                    name='ios-notifications'
                                                    color={blue}
                                                    size={35}
                                                />
                                                <View style={styles.settingText}>
                                                    <Text style={styles.topSettingText}>{'Thông báo chiến dịch Email Marketing'.toUpperCase()}</Text>
                                                    <Text style={styles.bottomSettingText}>(Hệ thống sẽ gửi thông báo cho bạn khi có chiến dịch email marketing của bạn đã hoàn thành.)</Text>
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Mobile App</Text>
                                                    <Text style={styles.switchLabelBottom}>(Tùy chọn này miễn phí)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.marketingOnApp ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.marketingOnApp}
                                                        onValueChange={(marketingOnApp) => this.turnOnOff('marketingOnApp', marketingOnApp)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua Email</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 30đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.marketingOnEmail ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.marketingOnEmail}
                                                        onValueChange={(marketingOnEmail) => this.turnOnOff('marketingOnEmail', marketingOnEmail)}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.switchLabelWrapper}>
                                                    <Text style={styles.switchLabelTop}>Thông báo qua SMS</Text>
                                                    <Text style={styles.switchLabelBottom}>(chi phí 850đ/1 thông báo)</Text>
                                                </View>
                                                <View style={styles.onOff}>
                                                    <Text style={styles.onOffText}>{this.state.marketingOnSMS ? 'On' : 'Off'}</Text>
                                                    <Switch
                                                        style={styles.switch}
                                                        value={this.state.marketingOnSMS}
                                                        onValueChange={(marketingOnSMS) => this.turnOnOff('marketingOnSMS', marketingOnSMS)}
                                                    />
                                                </View>
                                            </View>
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
