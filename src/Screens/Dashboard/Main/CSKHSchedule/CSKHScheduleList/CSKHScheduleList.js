import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import{ loading } from "../../../../../Helpers/Functions";
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import getUserDashBoard from '../../../../../Api/getUserDashBoard';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

const list_chanel = {
    '1' : 'Gọi điện',
    '2' : 'Gặp tư vấn trực tiếp',
    '3' : 'Nhắn tin',
    '4' : 'Gửi email',
    '5' : 'Tương tác social'
}

const ITEMS_PER_PAGE = 10;

export default class CSKHScheduleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            CSKHScheduleList: this.props.route.params.listHistoryToday,
            page: 1,
            token: this.props.route.params.token,
            isInternetReachable: false,
            data: [],
            refresh: true,
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.setState({ 
                    refresh: false,
                    data: this.state.CSKHScheduleList.slice(0,10)
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
    
    renderRow = ({item}) => { 
        return(
            <View style={styles.item}>
                <View style={styles.row}>
                    <View style={styles.statusCircle}></View>
                    <View style={styles.content}>
                        <Text style={styles.topContent}>
                            {Object.entries(list_chanel).map(([key, channel]) => {
                                if(item.channel_id == key) {
                                    return channel;
                                }
                            })}
                        </Text>
                        <Text style={styles.bottomContent}>
                            {(item.pronoun != null ? item.pronoun : '') + ' ' + (item.fullname != null ? item.fullname.toUpperCase() : '')}
                        </Text>
                    </View>
                    <View style={styles.timeDate}>
                        <Text style={styles.time}>
                            {moment(item.next_time).format('H:mm')}
                        </Text>
                        <Text style={styles.date}>Hôm nay</Text>
                    </View>
                </View>
            </View>
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
        const { page, data } = this.state;
        const start = page * ITEMS_PER_PAGE;
        const end = (page + 1) * ITEMS_PER_PAGE;
    
        const newData = this.state.CSKHScheduleList.slice(start, end);
        this.setState({ 
            data: [...data, ...newData],
            page: page + 1 
        },  () => {
                if(this.state.data.length == this.state.CSKHScheduleList.length) {
                    this.setState({
                        itemLoading: false,
                        handleLoadMore: false
                    })
                }
            });        
    }

    scrollToTop() {
        if(this.state.CSKHScheduleList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    async getCSKHScheduleList() {
        const res = await getUserDashBoard(this.state.token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    listHistoryToday: resJson.data.listHistoryToday,
                    data: resJson.data.listHistoryToday.slice(0,10)
                });
            }
            else if(resJson.code == 204) {
                resJson.message ? Alert.alert("Error !!!", resJson.message) : null;   
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

    refresh() {
        this.getCSKHScheduleList();
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
                            <View style={{ alignItems: 'center', width: width }}>
                                {this.state.CSKHScheduleList.length > 0 ?
                                    <View style={styles.CSKHScheduleList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.CSKHScheduleList}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            refreshing={this.state.refresh}
                                            onRefresh={this.refresh}
                                            onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                            disableVirtualization={true}
                                        />
                                    </View> 
                                        :
                                    <Text style={styles.noHaveCSKH}>Chưa có lịch CSKH</Text>
                                }
                                    
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
                            </View>)
                                :
                        <InternetConnecNotification/>
                    }
            </View>
        );
    }
}
