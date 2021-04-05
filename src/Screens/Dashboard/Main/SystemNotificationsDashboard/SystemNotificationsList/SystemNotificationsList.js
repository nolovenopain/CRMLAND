import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, Image } from 'react-native';
import{ loading } from "../../../../../Helpers/Functions";
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import getSystemNotificationsList  from '../../../../../Api/getSystemNotificationsList';
import moment from 'moment/min/moment-with-locales';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import postChangeStatusNoti from '../../../../../Api/postChangeStatusNoti';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

moment.locale('vi')

export default class SystemNotificationsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            systemNotificationsList: [],
            page: 1,
            itemLoading: false,
            token: this.props.route.params.token,
            refresh: true,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getSystemNotificationsList(
                    this.state.token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true,
                    handleLoadMore: true,
                    refresh: false 
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

    async getSystemNotificationsList(token, page) {
        const res = await getSystemNotificationsList(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayNotiList = this.state.systemNotificationsList.concat(resJson.data.data)
                if(arrayNotiList.length == this.state.systemNotificationsList.length) { 
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayNotiList.length > this.state.systemNotificationsList.length) {
                    this.setState({ systemNotificationsList: arrayNotiList })
                }
            }
            else if(resJson.code == 204) {
                Alert.alert("Error !!!", resJson.message);
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

    changeStatusNoti = async (noti, time) => {
        const res = await postChangeStatusNoti(
            this.state.token,
            noti.id
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.refresh();
                this.props.route.params.getDashBoard(this.state.token);
            }
            
            this.props.route.params.navigation.navigate('NotiDetail', {
                noti,
                time
            });
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
    }

    renderRow = ({item}) => {
        return(
            <TouchableOpacity 
                style={styles.item}
                onPress={() => this.changeStatusNoti(
                    item, 
                    moment.utc(item.updated_at).local().startOf('seconds').fromNow()
                )}
            >
                <View style={styles.row}>
                    <View style={[styles.statusCircle, {backgroundColor: item.read_at == null ? '#2e89ff' : null}]}></View>
                    <View style={styles.content}>
                        <Text 
                            style={styles.topContent}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.data.title}
                        </Text>
                        <Text 
                            style={styles.bottomContent}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.data.message}
                        </Text>
                    </View>
                    <View style={styles.timeDate}>
                        <Text style={styles.time}>
                            {moment.utc(item.updated_at).local().startOf('seconds').fromNow()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderFooter = () => {
        return( 
            <View style={styles.itemLoader}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        },  () => {
                this.getSystemNotificationsList(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );        
    }

    refresh() {
        this.setState({ 
            systemNotificationsList: [],
            page: 1,
            itemLoading: true,
            handleLoadMore: true 
        },  () => {
                this.getSystemNotificationsList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    scrollToTop() {
        if(this.state.systemNotificationsList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    render() {
        return (      
            <View style={styles.container}>
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        (this.state.requestOpenAppAgain ?
                            <View style={{ marginTop: -70 }}>
                                <RequestOpenAppAgain/>  
                            </View> 
                                : 
                            <View>
                                {this.state.systemNotificationsList.length > 0 ?
                                    <View style={styles.systemNotificationsList}> 
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.systemNotificationsList}
                                            refreshing={this.state.refresh}
                                            onRefresh={this.refresh}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                            disableVirtualization={true}
                                        /> 
                                        <TouchableOpacity
                                            style={styles.scrollToTop}
                                            onPress={() => this.scrollToTop()}
                                        >
                                            <Icon
                                                name='ios-chevron-up'
                                                size={35}
                                                color='#fff'
                                            />
                                        </TouchableOpacity>
                                    </View> 
                                        :
                                    <View style={styles.noNoti}>
                                        <Image style={styles.bellImage}
                                            source={require('../../../../../Assets/Image/noti_bell.png')}
                                        />
                                        <Text style={styles.fistText}>Không có thông báo nào !</Text>
                                        <Text style={styles.secondText}>Xin chào! Hiện tại hệ thống không tìm thấy thông báo nào cho bạn</Text>
                                    </View>
                                }
                            </View>)
                        :
                        <InternetConnecNotification/>
                    }
            </View>
        );
    }
}
