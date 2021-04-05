import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { loading } from '../../../../../Helpers/Functions';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../../../../../Components/Elements/Color/Color';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomInput from '../../../../../Components/Elements/CustomInput/CustomInput';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import ButtonIndex from '../../../../../Components/Elements/Button/Button';
import postCreateCareHistory from '../../../../../Api/postCreateCareHistory';
import SingleSelect from '../../../../../Components/Elements/SingleSelect/SingleSelect';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class CreateCareHistory extends Component {
  constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
            channel_id: '',
            showCalendar: false,
            date: new Date(),
            showClock: false,
            time: new Date().getTime(),
            listChannel: [],
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.returnChannelData = this.returnChannelData.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.create = this.create.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                var listChannel = [];
                Object.entries(this.props.route.params.listChannel).map(([key, value]) => {
                    listChannel.push({
                        id: key,
                        name: value
                    })
                })
                this.setState({ listChannel })
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

    onChangeDate(event, selectedDate) {
        this.setState({ 
            date: selectedDate,
            showCalendar: false
        })
    };

    onChangeTime(event, selectedTime) {
        this.setState({ 
            time: selectedTime,
            showClock: false
        })
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }

    returnChannelData(channel) {
        if(Object.keys(channel).length > 0) {
            this.setState({ channel_id: channel.id })
        }
        else {
            this.setState({ channel_id: this.state.listChannel[0].id })
        }
    }

    async create() {
        this.setState({ loaded: false })
        if (this.state.description == undefined || this.state.description == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng điền ghi chú')
        }
        else {
            const dateTime = moment(this.state.date).format('YYYY-MM-DD') + moment(this.state.time).format('H:mm');
            const res = await postCreateCareHistory(
                this.state.token,
                this.props.route.params.customer.id,
                dateTime,
                this.state.channel_id == '' ? '1' : this.state.channel_id,
                this.state.description
            );
            
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.props.route.params.refreshList();
                        this.props.route.params.refreshReduceCareHistoryList();
                        
                        this.setState({
                            date: new Date(),
                            time: new Date().getTime()
                        })
                        Alert.alert(
                            'Thông báo', 
                            resJson.message + "\n\n" +
                            'Bạn có muốn quay lại trang lịch sử chăm sóc ?',
                            [
                                {text: 'Không', style: 'cancel', onPress: () => {
                                    this.childChannel.refreshAfterCreate();
                                    this.childNote.clearOldInput();
                                }},
                                {text: 'Đồng ý', onPress: () => {
                                    this.props.route.params.navigation.goBack();
                                }}
                            ],
                            {cancelable: true}
                        )
                    } 
                    else if(resJson.code == 204) {
                        Alert.alert('Error !!!', resJson.message)
                    }
                    else if(resJson.errors) {
                        console.log(resJson)   
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
            }, 2000); 
        }
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        (this.state.requestOpenAppAgain ? 
                            <View style={{ marginTop: -70 }}>
                                <RequestOpenAppAgain/>  
                            </View>   
                                :
                            <View style={styles.container}>
                                <View style={styles.channel}>
                                    <Text style={styles.label}>Kênh chăm sóc</Text>
                                    <SingleSelect
                                        selectText={this.state.listChannel[0].name}
                                        placeholder='Tìm kênh...'
                                        items={this.state.listChannel}
                                        returnData={this.returnChannelData}
                                        onRef={ref => (this.childChannel = ref)}
                                    />
                                </View>

                                <View style={styles.dateTimePickerWrapper}>
                                    <View style={styles.datePickerWrapper}>
                                        <View style={styles.dateLabelWrapper}>
                                            <Text style={styles.label}>Ngày:</Text>
                                        </View>
                                        <View style={styles.datePicker}>
                                            <View style={styles.dateShow}>
                                                <Text style={styles.date}>{moment(this.state.date).format("DD/MM/YYYY")}</Text>
                                            </View>
                                            <TouchableOpacity 
                                                style={styles.calendarIcon}
                                                onPress={() => this.setState({ showCalendar: true })}
                                            >
                                                <Icon
                                                    name='ios-calendar'
                                                    color='#fff'
                                                    size={30}
                                                />
                                            </TouchableOpacity>
                                                {this.state.showCalendar ?
                                                    <DateTimePicker
                                                        testID="dateTimePicker"
                                                        minimumDate={new Date()}
                                                        timeZoneOffsetInMinutes={0}
                                                        value={this.state.date}
                                                        mode='date'
                                                        is24Hour={true}
                                                        display="default"
                                                        onChange={this.onChangeDate}
                                                    /> : null
                                                }
                                        </View>
                                    </View>

                                    <View style={styles.timePickerWrapper}>
                                        <View style={styles.timeLabelWrapper}>
                                            <Text style={styles.label}>Giờ:</Text>
                                        </View>
                                        <View style={styles.timePicker}>
                                            <View style={styles.timeShow}>
                                                <Text style={styles.time}>
                                                    {moment(this.state.time).format('H:mm')}
                                                </Text>
                                            </View>
                                            <TouchableOpacity 
                                                style={styles.iconTime}
                                                onPress={() => this.setState({ showClock: true })}
                                            >
                                                <Icon 
                                                    name='ios-time'
                                                    size={28}
                                                    color='#fff'
                                                />
                                            </TouchableOpacity>
                                            {this.state.showClock ?
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    timeZoneOffsetInMinutes={0}
                                                    value={this.state.time}
                                                    mode='time'
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={this.onChangeTime}
                                                /> : null
                                            }
                                        </View>
                                    </View> 
                                </View>

                                <View style={styles.description}>
                                    <CustomInput
                                        label='Ghi chú'
                                        name='description'
                                        editable={true}
                                        setValue={this.setValue}
                                        hideshowText={false}
                                        multiline={true}
                                        required={true}
                                        width={width/1.16 - 40}
                                        marginLeft={10}
                                        btnGroupWidth={30}
                                        length={40}
                                        placeholder='Nhập ghi chú...'
                                        onRef={ref => (this.childNote = ref)}
                                    />
                                </View>

                                <View style={styles.createBtn}>
                                    <ButtonIndex 
                                        label='THÊM MỚI'
                                        color={blue}
                                        action={this.create}
                                    />
                                </View>
                            </View>)
                            :
                        <InternetConnecNotification/>
                    }
            </ScrollView>
        );
    }
}
