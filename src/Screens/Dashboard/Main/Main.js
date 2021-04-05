import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, Alert } from 'react-native';
import { styles } from './css';
import { loading, fetchToken } from '../../../Helpers/Functions';
import CSKHSchedule from './CSKHSchedule/CSKHSchedule';
import SystemNotifications from './SystemNotificationsDashboard/SystemNotificationsDashboard';
import TicketDashBoard from './TicketDashboard/TicketDashboard';
import CustomerChart from './CustomerChart/CustomerChart';
import Menu from './Menu/Menu';
import getUserDashBoard from '../../../Api/getUserDashBoard';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import getNotiUnread from '../../../Api/getNotiUnread';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: '',
            listHistoryToday: [],
            listTicket: [],
            listNotification: [],
            listContactOnProject: [],
            isInternetReachable: false,
            count: 0,
            refreshScreen: false,
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.getDashBoard = this.getDashBoard.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                this.getDashBoard(token);
                this.setState({ token });
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

    async getDashBoard(token) {
        const resUserDashBoard = await getUserDashBoard(token);
        const resNotiUnread = await getNotiUnread(token);
        if(resUserDashBoard.status == 200 && resNotiUnread.status == 200) {
            const resJsonUserDashboard = await resUserDashBoard.json();
            const resJsonNotiUnread = await resNotiUnread.json();
            if(resJsonUserDashboard.code == 200 && resJsonNotiUnread.code == 200) {
                this.setState({ 
                    listHistoryToday: resJsonUserDashboard.data.listHistoryToday,
                    listTicket: resJsonUserDashboard.data.listTicket,
                    listNotification: resJsonUserDashboard.data.listNotification,
                    listContactOnProject: resJsonUserDashboard.data.listContactOnProject,
                    count: resJsonNotiUnread.data.total,
                });
            }
            else if(resJsonUserDashboard.code == 204) {
                resJsonUserDashboard.message ? Alert.alert("Error !!!", resJsonUserDashboard.message) : null;   
            }
            else if(resJsonNotiUnread.code == 204) {
                resJsonNotiUnread.message ? Alert.alert("Error !!!", resJsonNotiUnread.message) : null;
            }
        }
        else if(resUserDashBoard.status == 401 || resNotiUnread.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(resUserDashBoard.status == 500 || resNotiUnread.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh() {
        this.setState({ refreshScreen: true });
        this.childMenu.refreshScreen();
        this.childCSKH.refreshScreen();
        this.childNoti.refreshScreen();
        this.childChart.refreshScreen();
        this.childTicket.refreshScreen();
        this.getDashBoard(this.state.token);
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() {
        return ( 
            <View>
                {!this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -50 }}>
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
                                        {/* MENU */}
                                        <Menu 
                                            navigation={this.props.navigation}
                                            getDashBoard={this.getDashBoard}
                                            count={this.state.count}
                                            onRef={ref => (this.childMenu = ref)}
                                        />

                                        {/* CSKH */}
                                        <CSKHSchedule 
                                            navigation={this.props.navigation}
                                            listHistoryToday={this.state.listHistoryToday}
                                            onRef={ref => (this.childCSKH = ref)}
                                        />

                                        {/* THÔNG BÁO HỆ THỐNG */}
                                        <SystemNotifications 
                                            navigation={this.props.navigation}
                                            listNotification={this.state.listNotification}
                                            getDashBoard={this.getDashBoard}
                                            onRef={ref => (this.childNoti = ref)}
                                        />

                                        {/*BIỂU ĐỒ KHÁCH HÀNG */}
                                        <CustomerChart 
                                            listContactOnProject={this.state.listContactOnProject}
                                            onRef={ref => (this.childChart = ref)}
                                        />

                                        {/* TICKET */}
                                        <TicketDashBoard 
                                            navigation={this.props.navigation}
                                            listTicket={this.state.listTicket}
                                            onRef={ref => (this.childTicket = ref)}
                                        />           
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
