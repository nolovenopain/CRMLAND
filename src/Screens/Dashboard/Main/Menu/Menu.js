import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchToken } from '../../../../Helpers/Functions';
import getUserInfo from '../../../../Api/getUserInfo';
import NumberFormat from 'react-number-format';
import AsyncStorage from '@react-native-community/async-storage';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            token: '',
            noPrefixToken: ''         
        };
    }

    async componentDidMount() {
        this.props.onRef(this)
        const noPrefixToken = await AsyncStorage.getItem('token');
        const token = await fetchToken();
        this.getUserInfo(token);
        this.setState({ 
            token,
            noPrefixToken
        });
    };

    componentWillUnmount() {
        this.props.onRef(null)
    }

    async getUserInfo(token) {
        const res = await getUserInfo(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ user: resJson.data });
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
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    refreshScreen() {
        this.componentDidMount();
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground 
                    style={styles.menu}
                    source={require('../../../../Assets/Image/background.png')}
                >
                    <View style={styles.header}>
                        <View>
                            <Image
                                style={styles.avatar}
                                source={this.state.user.avatar != null ? { uri: 'https://crmland.vn' + this.state.user.avatar } : require('../../../../Assets/Image/no_avatar.png')}
                            />
                        </View>
                        <View style={styles.helloContent}>
                            <Text style={styles.hello}>Xin chào !</Text>
                            <Text style={styles.name}>{this.state.user && this.state.user.name ? this.state.user.name.toUpperCase() : ''}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.noti}
                            onPress={() => {
                                this.props.navigation.navigate('NotificationStackScreen', {
                                    screen: 'SystemNotificationsList',
                                    params: {
                                        token: this.state.token,
                                        navigation: this.props.navigation,
                                        getDashBoard: this.props.getDashBoard
                                    }
                                })
                            }}
                        >
                            <Icon
                                name='ios-notifications'
                                size={25}
                                color='#fff'
                            />
                            <View style={styles.count}>
                                <Text style={styles.countNumber}>{this.props.count}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topMenu}>
                        <View style={styles.topCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('ProjectStack')}
                            >
                                <Icon
                                    name='ios-business'
                                    color='#fff'
                                    size={25}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Dự án</Text>
                        </View>
                        <View style={styles.topCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('CustomerStack')}
                            >
                                <Icon
                                    name='ios-people'
                                    color='#fff'
                                    size={25}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Khách hàng</Text>
                        </View>
                        <View style={styles.topCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('MarketingStack')}
                            >
                                <Icon
                                    name='ios-megaphone'
                                    color='#fff'
                                    size={25}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Marketing</Text>
                        </View>
                        <View style={styles.topCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('AutomationStack')}
                            >
                                <Icon
                                    name='ios-cog'
                                    color='#fff'
                                    size={30}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Automation</Text>
                        </View>
                    </View>
                    
                    <View style={styles.bottomMenu}>
                        <View style={styles.bottomCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('WeblandStack', {
                                    screen: 'Main',
                                    params: {
                                        user: this.state.user
                                    }
                                })}    
                            >
                                <Icon
                                    name='ios-globe'
                                    color='#fff'
                                    size={25}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Webland</Text>
                        </View>
                        <View style={styles.bottomCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('UtilitiesStack')}    
                            >
                                <Icon
                                    name='ios-construct'
                                    color='#fff'
                                    size={25}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Tiện ích</Text>
                        </View>
                        <View style={styles.bottomCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('JobStack')}   
                            >
                                <Icon
                                    name='ios-calendar'
                                    color='#fff'
                                    size={25}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Nhắc việc</Text>
                        </View>
                        <View style={styles.bottomCircleWrapper}>
                            <TouchableOpacity 
                                style={styles.circle}
                                onPress={() => this.props.navigation.navigate('TicketStack')}       
                            >
                                <Icon
                                    name='ios-pricetags'
                                    color='#fff'
                                    size={25}
                                />  
                            </TouchableOpacity>
                            <Text style={styles.menuLabel}>Ticket hỗ trợ</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.topUpAccount}
                        onPress={() => this.props.navigation.navigate('TopUpAccount', {
                            noPrefixToken: this.state.noPrefixToken
                        })}
                    >
                        <View style={styles.moneyShow}>
                            <Icon
                                name='ios-cart'
                                color='#fff'
                                size={18}
                            />
                            <NumberFormat
                                value={this.state.user ? this.state.user.amount : 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' vnđ'}
                                renderText={value => <Text style={styles.money}>{value}</Text>}
                            /> 
                        </View>
                        <View style={styles.topUpShow}>
                            <Icon
                                name='ios-card'
                                color='#fff'
                                size={18}
                            />
                            <Text style={styles.topUp}>Nạp tài khoản</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>         
            </View>
        );
    }
}
