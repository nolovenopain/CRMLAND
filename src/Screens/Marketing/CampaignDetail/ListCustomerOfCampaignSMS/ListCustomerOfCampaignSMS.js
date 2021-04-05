import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import { getListCustomerSMSOfCampaign } from '../../../../Api/getListCustomerOfCampaign';
import { blue } from '../../../../Components/Elements/Color/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

const ITEMS_PER_PAGE = 15;

export default class ListCustomerOfCampaignSMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listCustomerOfCampaign: [],
            data: [],
            page: 1,
            itemLoading: false,
            statusColor: blue,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false,
            handleLoadMore: false
        };
        this._isMounted = false;
    }

    async componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getListCustomerSMSOfCampaign(
                    this.state.token, 
                    this.props.route.params.campaign.id
                );
                this.setState({ 
                    itemLoading: true,
                    handleLoadMore: true 
                }) 
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

    async getListCustomerSMSOfCampaign(token, campaignId) {
        const res = await getListCustomerSMSOfCampaign(
            token, 
            campaignId
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    listCustomerOfCampaign: resJson.data, 
                    data: resJson.data.slice(0,15)
                });
            }
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message)
            }
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
            <View style={styles.row}>
                <View style={styles.phone}>
                    <Text style={styles.content}>{item.Phone}</Text>
                </View>
                <View style={styles.telco}>
                    <Text style={styles.content}>{item.Telco}</Text>
                </View>
                <View style={styles.sendTime}>
                    <Text style={[styles.content, { color : this.state.statusColor }]}>
                        {moment(item.SendingTime).format('H:mm - DD/MM/YYYY')}
                    </Text>
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
        if(this.state.handleLoadMore) {
            const { page, data } = this.state;
            const start = page * ITEMS_PER_PAGE;
            const end = (page + 1) * ITEMS_PER_PAGE;
    
            const newData = this.state.listCustomerOfCampaign.slice(start, end);
            this.setState({ 
                data: [...data, ...newData],
                page: page + 1 
            },  () => {
                    if(this.state.data.length == this.state.listCustomerOfCampaign.length) {
                        this.setState({
                            itemLoading: false,
                            handleLoadMore: false
                        })
                    }
                }
            );    
        }     
    }

    scrollToTop() {
        if(this.state.listCustomerOfCampaign.length > 0) {
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
                            <View style={styles.listReceive}>
                                <View style={styles.rowTitle}>
                                    <View style={styles.phone}>
                                        <Text style={styles.title}>Số điện thoại</Text>
                                    </View>
                                    <View style={styles.telco}>
                                        <Text style={styles.title}>Nhà mạng</Text>
                                    </View>
                                    <View style={styles.sendTime}>
                                        <Text style={styles.title}>Thời gian gửi</Text>
                                    </View>
                                </View>

                                {this.state.data.length > 0 ?
                                    <View style={styles.listCustomerOfCampaign}> 
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.data}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                            disableVirtualization={true}
                                        /> 
                                    </View>
                                        :
                                    <Text style={styles.noHaveCustomer}>Chưa có báo cáo chiến dịch</Text>
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
