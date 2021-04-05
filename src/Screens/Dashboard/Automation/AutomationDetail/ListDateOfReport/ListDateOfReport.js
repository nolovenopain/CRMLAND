import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../../Helpers/Functions';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { blue } from '../../../../../Components/Elements/Color/Color';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import getAutomationDetail from '../../../../../Api/getAutomationDetail';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

const ITEMS_PER_PAGE = 10;

export default class ListDateOfReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            itemLoading: false,
            handleLoadMore: false,
            token: this.props.route.params.token,
            dateOfReportList: this.props.route.params.statistic_date ? this.props.route.params.statistic_date : [],
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
                    data: this.state.dateOfReportList.slice(0,10),
                    handleLoadMore: true,
                    itemLoading: true,
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

    async getAutomationDetail() {
        const res = await getAutomationDetail(
            this.state.token,
            this.props.route.params.automation.id
        );
        if(res.status == 200) {
            const resJson = await res.json();
            this.setState({ 
                dateOfReportList: resJson.data.statistic_date,
                data: resJson.data.statistic_date, 
            })
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

    refresh() {
        this.getAutomationDetail();
    }
    
    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={() => this.props.route.params.navigation.navigate('ListCustomerOfAutomation', {
                        send_date: item.send_date,
                        navigation: this.props.route.params.navigation,
                        token: this.state.token,
                        automation: this.props.route.params.automation
                    })}
                >
                    <View style={styles.list}>
                        <View style={styles.date}>
                            <Text style={{fontWeight: 'bold', fontSize: 12}}>Báo cáo ngày: </Text>
                            <Text style={{fontSize: 12}}>
                                {moment(item.send_date).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                        <View style={styles.sendAmount}>
                            <Text style={{fontWeight: 'bold', fontSize: 12}}>Số lượng gửi: </Text>
                            <Text style={{fontSize: 12}}>{item.total_sent}</Text>
                        </View>
                        <View style={styles.reportDetail}>
                            <Text style={{fontSize: 12, color: blue}}>Chi tiết</Text>
                            <MaterialCommunityIcons
                                name='chevron-triple-right'
                                size={25}
                                color={blue}
                                style={{marginLeft: 10}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
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
    
        const newData = this.state.dateOfReportList.slice(start, end);
        this.setState({ 
            data: [...data, ...newData],
            page: page + 1 
        },  () => {
                if(this.state.data.length == this.state.dateOfReportList.length) {
                    this.setState({
                        itemLoading: false,
                        handleLoadMore: false
                    })
                }
            });        
    }

    scrollToTop() {
        if(this.state.dateOfReportList.length > 0) {
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
                            <View style={{ width: width, alignItems: 'center' }}>
                                {this.state.data.length > 0 ? 
                                    <View style={styles.dateOfReportList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.dateOfReportList}
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
                                    <Text style={styles.noHaveReport}>Chưa có báo cáo chiến dịch tự động</Text>
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
