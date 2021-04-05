import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../../Helpers/Functions';
import getListCustomerAutomation from '../../../../../Api/getListCustomerAutomation';
import { blue } from '../../../../../Components/Elements/Color/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

const ITEMS_PER_PAGE = 15;

export default class ListCustomerOfAutomation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            itemLoading: false,
            statusColor: blue,
            token: this.props.route.params.token,
            listCustomerOfAutomation: [],
            isInternetReachable: false,
            requestOpenAppAgain: false,
            data: [],
            handleLoadMore: false,
            page: 1
        };
        this._isMounted = false;
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getListCustomerAutomation(
                    this.state.token, 
                    this.props.route.params.automation.id,
                    this.props.route.params.send_date
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

    async getListCustomerAutomation(token, automationId, sendDate) {
        const res = await getListCustomerAutomation(
            token, 
            automationId,
            sendDate 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    listCustomerOfAutomation: resJson.data.list_diary, 
                    data: resJson.data.list_diary.slice(0,15)
                });
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
            <View style={styles.rowCustomer}>
                <View style={styles.customer}>
                    <Text style={styles.customerText}>{item.customer != null ? item.customer.fullname : ''}</Text>
                </View>
                <View style={styles.contact}>
                    <Text style={styles.contactText}>
                        {this.props.route.params.automation.type == 1 ? item.phone : item.email}
                    </Text>
                </View>
                <View style={styles.cost}>
                    <Text style={[styles.costText, { color : this.state.statusColor, fontWeight: 'bold'}]}>
                        {item.price + ' vnđ'}
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
        const { page, data } = this.state;
        const start = page * ITEMS_PER_PAGE;
        const end = (page + 1) * ITEMS_PER_PAGE;
    
        const newData = this.state.listCustomerOfAutomation.slice(start, end);
        this.setState({ 
            data: [...data, ...newData],
            page: page + 1 
        },  () => {
                if(this.state.data.length == this.state.listCustomerOfAutomation.length) {
                    this.setState({
                        itemLoading: false,
                        handleLoadMore: false
                    })
                }
            });        
    }

    scrollToTop() {
        if(this.state.listCustomerOfAutomation.length > 0) {
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
                                    <View style={styles.customer}>
                                        <Text style={styles.title}>Khách hàng</Text>
                                    </View>
                                    <View style={styles.contactTitle}>
                                        <Text style={styles.contactTitleText}>Điện thoại/Email</Text>
                                    </View>
                                    <View style={styles.cost}>
                                        <Text style={styles.title}>Chi phí</Text>
                                    </View>
                                </View>

                                {this.state.data.length > 0 ?
                                    <View style={styles.listCustomerOfAutomation}>
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
