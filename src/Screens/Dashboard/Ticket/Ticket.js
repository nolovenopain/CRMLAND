import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import{ loading, fetchToken } from '../../../Helpers/Functions';
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import getTicketList from '../../../Api/getTicketList';
import TicketList from "./TicketList/TicketList";
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            ticketList: [],
            page: 1,
            itemLoading: false,
            token: '',
            list_status: {},
            list_type: {},
            refresh: true,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                this.getTicketList(
                    token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true,
                    handleLoadMore: true,
                    token,
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

    async getTicketList(token, page) {
        const res = await getTicketList(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    list_status: resJson.data.list_status,
                    list_type: resJson.data.list_type,
                });
                const arrayTicketList = this.state.ticketList.concat(resJson.data.data);
                if(arrayTicketList.length == this.state.ticketList.length) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayTicketList.length > this.state.ticketList.length) {
                    this.setState({ ticketList: arrayTicketList })
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

    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <TicketList 
                    ticket={item}
                    navigation={this.props.navigation}
                    token={this.state.token}
                    list_status={this.state.list_status}
                    list_type={this.state.list_type}
                    refresh={this.refresh}    
                />
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
                this.getTicketList(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );         
    }

    refresh() {
        this.setState({ 
            ticketList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true 
        }, () => {
                this.getTicketList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    scrollToTop() {
        if(this.state.ticketList.length > 0) {
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
                            <View style={{ alignItems: 'center', width: width }}>
                                {this.state.ticketList.length > 0 ?
                                    <View style={styles.ticketList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.ticketList}
                                            refreshing={this.state.refresh}
                                            onRefresh={this.refresh}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                            disableVirtualization={true}
                                        /> 
                                    </View> 
                                        :
                                    <Text style={styles.noHaveTicket}>Chưa có ticket</Text>
                                }

                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={() => this.props.navigation.navigate('CreateTicket', {
                                        token: this.state.token,
                                        navigation: this.props.navigation,
                                        refresh: this.refresh,
                                        list_type: this.state.list_type
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
