import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './css';
import ButtonIndex from '../../../Components/Elements/Button/Button';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { loading } from '../../../Helpers/Functions';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { blue } from '../../../Components/Elements/Color/Color';
import postCreateReminder from '../../../Api/postCreateReminder';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class CreateJobReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            showCalendar: false,
            date: new Date(),
            showClock: false,
            time: new Date().getTime(),
            isInternetReachable: false,
            title: '',
            content: '',
            token: this.props.route.params.token,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.create = this.create.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
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

    async create() {
        this.setState({ loaded: false })
        if(this.state.title == undefined || this.state.title == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng điền tiêu đề')
        } 
        else if (this.state.content == undefined || this.state.content == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng điền nội dung')
        }
        else {
            const dateTime = moment(this.state.date).format('YYYY-MM-DD') + moment(this.state.time).format('H:mm');
            const res = await postCreateReminder(
                this.state.token,
                this.state.title,
                dateTime,
                this.state.content
            );
            
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.props.route.params.refreshScreen();
                        this.setState({
                            date: new Date(),
                            time: new Date().getTime()
                        })
                        Alert.alert(
                            'Thông báo', 
                            resJson.message + "\n\n" +
                            'Bạn có muốn quay lại trang lịch nhắc nhở công việc ?',
                            [
                                {text: 'Không', style: 'cancel', onPress: () => {
                                    this.childTitle.clearOldInput();
                                    this.childContent.clearOldInput();
                                }},
                                {text: 'Đồng ý', onPress: () => {
                                    this.props.navigation.goBack();
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
                    .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(res.status == 500) {
                    this.setState({ requestOpenAppAgain: true });
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
            }, 1000); 
        }   
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>    
                                    :
                                <View>
                                    <View style={styles.title}>
                                        <CustomInput
                                            label='Tiêu đề'
                                            name='title'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            placeholder='Nhập tiêu đề...'
                                            onRef={ref => (this.childTitle = ref)}
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
                                                        size={25}
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
                                            label='Mô tả'
                                            name='content'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            multiline={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            placeholder='Nhập mô tả...'
                                            onRef={ref => (this.childContent = ref)}
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
                    </View>
            </ScrollView>
        );
    }
}
