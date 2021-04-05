import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import { getFullListCareHistoryOfCustomer } from '../../../../Api/getCareHistoryOfCustomer';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            careHistoryList: [],
            page: 1,
            itemLoading: false,
            refresh: true,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getFullListCareHistoryOfCustomer(
                    this.state.token, 
                    this.state.page,  
                    this.props.route.params.customer.id
                );

                this.setState({ 
                    itemLoading: true, 
                    handleLoadMore: true,
                    refresh: false,
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

    async getFullListCareHistoryOfCustomer(token, page, customerId) {
        const res = await getFullListCareHistoryOfCustomer(
            token,
            page,
            customerId
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                 const arrayCareHistoryList = this.state.careHistoryList.concat(resJson.data.care_histories.data); 
                if(arrayCareHistoryList.length == this.state.careHistoryList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayCareHistoryList.length > this.state.careHistoryList) {
                    this.setState({ careHistoryList: arrayCareHistoryList })
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
            .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    renderRow = ({item}) => {
        return(
            <View style={styles.historyItem}>
                <View style={styles.history}>
                    <View style={styles.historyTime}>
                        <Text style={styles.time}>{moment(item.next_time).format('H:mm')}</Text>
                        <Text style={styles.day}>{moment(item.next_time).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.historyNote}>
                        <Text style={styles.channel}>
                            {
                                Object.entries(this.props.route.params.listChannel).map(([key, channel]) => { 
                                    if(key == item.channel_id) {
                                        return channel;
                                    }
                                })
                            }
                        </Text>
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
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
        this.setState({ 
            page: this.state.page + 1, 
        },  () => {
                this.getFullListCareHistoryOfCustomer(
                    this.state.token, 
                    this.state.page, 
                    this.props.route.params.customer.id
                );  
            }
        );
    }

    refresh() {
        this.setState({ 
            careHistoryList: [],
            page: 1,
            itemLoading: true,
            handleLoadMore: true 
        },  () => {
                this.getFullListCareHistoryOfCustomer(
                    this.state.token, 
                    this.state.page, 
                    this.props.route.params.customer.id
                );
        });
    }

    scrollToTop() {
        if(this.state.careHistoryList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    render() {
        return (
            <View style={styles.container} >
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        (this.state.requestOpenAppAgain ? 
                            <View style={{ marginTop: -70 }}>
                                <RequestOpenAppAgain/>  
                            </View>
                                : 
                            <View style={styles.body}>
                                {this.state.careHistoryList.length > 0 ?
                                    <View style={styles.careHistoryList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.careHistoryList}
                                            refreshing={this.state.refresh}
                                            onRefresh={this.refresh}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                            disableVirtualization={true}
                                        /> 
                                    </View> : 
                                    <Text style={styles.noHaveCareHistory}>Chưa có lịch sử chăm sóc khách hàng</Text>
                                } 
                                
                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={() => this.props.navigation.navigate('CreateCareHistory', {
                                        navigation: this.props.navigation,
                                        refreshList: this.refresh,
                                        token: this.state.token,
                                        listChannel: this.props.route.params.listChannel,
                                        customer: this.props.route.params.customer,
                                        refreshReduceCareHistoryList: this.props.route.params.refreshReduceCareHistoryList
                                    })}
                                >
                                    <Icon
                                        name='ios-add'
                                        size={35}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
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
