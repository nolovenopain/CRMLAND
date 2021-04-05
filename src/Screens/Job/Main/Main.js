import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import { styles } from './css';
import { loading, fetchToken } from '../../../Helpers/Functions';
import moment from 'moment';
import { blue } from '../../../Components/Elements/Color/Color';
import getReminderList from '../../../Api/getReminderList';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 1 ','Tháng 2 ','Tháng 3 ','Tháng 4 ','Tháng 5 ','Tháng 6 ','Tháng 7 ','Tháng 8 ','Tháng 9 ','Tháng 10 ','Tháng 11 ','Tháng 12 '],
    monthNamesShort: ['Th 1.','Th 2.','Th 3.','Th 4.','Th 5.','Th 6.','Th 7.','Th 8.','Th 9.','Th 10.','Th 11.','Th 12.'],
    dayNames: ['Chủ Nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
    dayNamesShort: ['CN.','T2.','T3.','T4.','T5.','T6.','T7.'],
    today: 'Hôm nay'
  };
LocaleConfig.defaultLocale = 'vi';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: '',
            listReminders: [],
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refreshList = this.refreshList.bind(this);
        this.refreshScreen = this.refreshScreen.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                this.getReminderList(token);
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

    async getReminderList(token) {
        const res = await getReminderList(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    listReminders: resJson.data,
                }, () => {
                    const markedDate = [];
                    this.state.listReminders.map((value, key) => {
                        markedDate.push(moment(value.alarm_at).format('YYYY-MM-DD'))
                    })
                    var obj = markedDate.reduce((c, v) => Object.assign(c, {[v]: { selected: true, marked: true, startingDay: true, color: 'green', endingDay: true }}), {});
                    this.setState({ markedDate: obj })
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
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true });
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    goToDetailReminder = (date) => {
        const dateReminder = date.dateString;
        var dateObj = [];
        this.state.listReminders.map((value, key) => {
            if(moment(value.alarm_at).format('YYYY-MM-DD') == dateReminder) {
                dateObj.push(value);
                this.props.navigation.navigate('JobList', { 
                    date: dateObj,
                    mainDate: date,
                    refreshList: this.refreshList
                }) 
            }
        })   
    }
    
    refreshList(date) {
        this.componentDidMount();
        this.goToDetailReminder(date); 
    }

    refreshScreen() {
        this.componentDidMount();
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
                                <CalendarList
                                    // minDate={new Date()}
                                    markedDates={this.state.markedDate}
                                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                                    onVisibleMonthsChange={(months) => {}}
                                    // Max amount of months allowed to scroll to the past. Default = 50
                                    pastScrollRange={50}
                                    // Max amount of months allowed to scroll to the future. Default = 50
                                    futureScrollRange={50}
                                    // Enable or disable scrolling of calendar list
                                    scrollEnabled={true}
                                    // Enable or disable vertical scroll indicator. Default = false
                                    showScrollIndicator={true}
                                    theme={{
                                        selectedDayBackgroundColor: blue,
                                    }}
                                    onDayPress={(date) => this.goToDetailReminder(date)}
                                />
                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={() => this.props.navigation.navigate('CreateJobReminder', {
                                        navigation: this.props.navigation,
                                        refreshScreen: this.refreshScreen,
                                        token: this.state.token,
                                    })}
                                >
                                    <Icon
                                        name='ios-add'
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
