import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './css';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import Classification from './Classification/Classification';
import AppendInfo from './AppendInfo/AppendInfo';
import { loading } from '../../../Helpers/Functions';
import { blue } from '../../../Components/Elements/Color/Color';
import { getReduceListCareHistory } from '../../../Api/getCareHistoryOfCustomer';
import moment from 'moment';
import ButtonIndex from '../../../Components/Elements/Button/Button';
import postUpdateCustomer from '../../../Api/postUpdateCustomer';
import { checkPhoneValidate, checkEmailValidate } from '../../../Helpers/RegularExpression';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
import getCustomerDetail from '../../../Api/getCustomerDetail';

const pronoun = [
    { name: 'Anh', id: '1' },
    { name: 'Em', id: '2' },
    { name: 'Chị', id: '3' },
    { name: 'Cô', id: '4' },
    { name: 'Chú', id: '5' },
    { name: 'Bác', id: '6' },
    { name: 'Ông', id: '7' },
    { name: 'Bà', id: '8' },
]

export default class CustomerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listCareHistory: [],
            listChannel: {},
            projects_id: null,
            groups_id: null,
            token: this.props.route.params.token,
            selectPronoun: {},
            selectSource: {},
            selectType: {},
            birthday: null,
            isInternetReachable: false,
            oldPronoun: {},
            requestOpenAppAgain: false,
            customer: {}
        };
        this._isMounted = false;
        this.returnPronounData = this.returnPronounData.bind(this);
        this.refreshReduceCareHistoryList = this.refreshReduceCareHistoryList.bind(this);
        this.checkRequestOpenApp = this.checkRequestOpenApp.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() { 
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getCareHistoryInfo();
                this.getCustomerDetail(this.props.route.params.customer.id)
                pronoun.map((item, key) => {
                    if(item.name == this.props.route.params.customer.pronoun) {
                        this.setState({ oldPronoun: item })
                    }
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

    async getCustomerDetail(customerId) {
        const res = await getCustomerDetail(
            this.state.token,
            customerId
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const projects_id = [];
                if(resJson.data.customer.project.length > 0) {
                    resJson.data.customer.project.map((project, key) => {  
                        projects_id.push(project.id)  
                    });
                }
                const groups_id = [];
                if(resJson.data.customer.group.length > 0) {
                    resJson.data.customer.group.map((group, key) => { 
                        groups_id.push(group.id)  
                    });
                }
                this.setState({
                    customer: resJson.data.customer,
                    projects_id,
                    groups_id,
                })
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

    async getCareHistoryInfo() {
        const res = await getReduceListCareHistory(
            this.state.token, 
            this.props.route.params.customer.id
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    listCareHistory: resJson.data.care_histories.data,
                    listChannel: resJson.data.list_channel,
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

    returnPronounData(selectPronoun) {
        this.setState({ selectPronoun })
    }

    returnDataInfo = (name, value) => {
        this.setState({ [name]: value }, () => {})
    }

    returnDataClassification = (selectProjects, selectType, selectGroups, selectSource) => { 
        const projects_id = [];
        selectProjects.map((project, key) => {  
            projects_id.push(project.id)  
        });
        
        const groups_id = [];
        selectGroups.map((group, key) => { 
            groups_id.push(group.id)  
        });
        this.setState({
            projects_id,
            selectType,
            groups_id,
            selectSource
        })
    }

    returnBirthday = (birthday) => {
        this.setState({ birthday: moment(birthday).format('DD-MM-YYYY') });
    }

    async update() {
        this.setState({ loaded: false })
        const selectPronoun = Object.keys(this.state.selectPronoun).length > 0 ? 
            this.state.selectPronoun.id : (Object.keys(this.state.oldPronoun).length > 0 ? this.state.oldPronoun.id : pronoun[0].id);
        const selectSource = Object.keys(this.state.selectSource).length > 0 ? this.state.selectSource.id : this.props.route.params.customer.source_id;
        const selectType = Object.keys(this.state.selectType).length > 0 ? this.state.selectType.id : this.props.route.params.customer.type_id;
        this.state.fullname = this.state.fullname ? this.state.fullname : this.props.route.params.customer.fullname;
        this.state.birthday = this.state.birthday != 'Invalid Date' ? this.state.birthday : this.props.route.params.customer.birthday;
        this.state.address = this.state.address ? this.state.address : this.props.route.params.customer.address;
        this.state.phone = this.state.phone ? this.state.phone : this.props.route.params.customer.phone;
        this.state.email = this.state.email ? this.state.email : this.props.route.params.customer.email;

        if(this.state.phone == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại khách hàng');
        }
        else { 
            if (checkPhoneValidate(this.state.phone) == false) {
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Số điện thoại của bạn không đúng định dạng!');
            }
            else if (checkEmailValidate(this.state.email) == false && this.state.email != '' && this.state.email != undefined) {
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Email của bạn không đúng định dạng!');
            }
            else { 
                const res = await postUpdateCustomer(
                    this.state.token, 
                    selectPronoun, 
                    this.state.fullname, 
                    this.state.birthday, 
                    this.state.address, 
                    this.state.phone, 
                    this.state.email,
                    this.state.projects_id, 
                    selectType, 
                    this.state.groups_id,
                    selectSource, 
                    this.props.route.params.customer.id
                );

                setTimeout(async() => {
                    this.setState({ loaded: true })
                    if(res.status == 200) {
                        const resJson = await res.json();
                        if(resJson.code == 200) {
                            this.props.route.params.refreshList ? this.props.route.params.refreshList() : null;
                            Alert.alert(
                                'Thông báo',
                                resJson.message + "\n\n" +
                                'Bạn có muốn quay lại trang danh sách khách hàng ?',
                                [
                                    {text: 'Không', style: 'cancel'},
                                    {text: 'Đồng ý', onPress: () => {
                                        this.props.navigation.goBack('Main');
                                    }}
                                ],
                                {cancelable: true}
                            );
                        } 
                        else if(resJson.code == 204) {
                            console.log('Error!!!', resJson.message)
                        }
                        else if(resJson.errors) {
                            if(resJson.errors.phone) {
                                Alert.alert('Error !!!', resJson.errors.phone.toString());
                            }
                            if(resJson.errors.email) {
                                Alert.alert('Error !!!', resJson.errors.email.toString());
                            }  
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
                }, 1000);
            }
        } 
    }

    refreshReduceCareHistoryList() {
        this.getCareHistoryInfo();
    }

    checkRequestOpenApp(requestOpenAppAgain) {
        this.setState({ requestOpenAppAgain });
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    <View style={ styles.container }>
                        {this.state.isInternetReachable ? 
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>   
                                    : 
                                <View>
                                    <View style={styles.customerInfo}>
                                        <CustomerInfo
                                            customer={this.props.route.params.customer}
                                            setValue={this.returnDataInfo}
                                            returnPronounData={this.returnPronounData}
                                            returnBirthday={this.returnBirthday}
                                        />
                                    </View>

                                    <View style={styles.separate}></View>

                                    <View style={styles.historyWrapper}>
                                        <View style={styles.historyHeader}>
                                            <Text style={styles.historyTitle}>Lịch sử chăm sóc</Text>
                                        </View>

                                        { this.state.listCareHistory.length > 0 ? 
                                            this.state.listCareHistory.map((value, key) => {
                                                if(key < 5) {
                                                    return (
                                                        <View style={styles.history} key={key}>
                                                            <View style={styles.historyTime}>
                                                                <Text style={styles.time}>
                                                                    {moment(value.next_time).format('H:mm')}
                                                                </Text>
                                                                <Text style={styles.day}>
                                                                    {moment(value.next_time).format('DD/MM/YYYY')}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.historyNote}>
                                                                <Text 
                                                                    style={styles.channel}
                                                                    numberOfLines={1}
                                                                    ellipsizeMode='tail'
                                                                >
                                                                    { 
                                                                    Object.keys(this.state.listChannel).length > 0 ? 
                                                                        Object.entries(this.state.listChannel).map(([key, channel]) => { 
                                                                            if(key == value.channel_id) {
                                                                                return channel;
                                                                            }
                                                                        }) : null
                                                                    }
                                                                </Text>
                                                                <Text 
                                                                    style={styles.description}
                                                                    numberOfLines={1}
                                                                    ellipsizeMode='tail'
                                                                >
                                                                    {value.description}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                } else {
                                                    return;
                                                }  
                                            }) 
                                            :
                                            <Text style={styles.noHaveCareHistory}>Chưa có lịch sử chăm sóc</Text> 
                                        }
                                        
                                        <TouchableOpacity 
                                            style={styles.historyFooter}
                                            onPress={() => this.props.navigation.navigate('History', {
                                                customer: this.state.customer,
                                                listChannel: this.state.listChannel,
                                                token: this.state.token,
                                                navigation: this.props.navigation,
                                                refreshReduceCareHistoryList: this.refreshReduceCareHistoryList
                                            })}
                                        >
                                            <Text style={styles.seeMore}>Xem thêm</Text>
                                            <View style={styles.arrowdown}>
                                                <Icon 
                                                    name='chevron-triple-right'
                                                    size={18}
                                                    color={blue}  
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        
                                    </View>

                                    <View style={styles.separate}></View>

                                    <View style={styles.classification}>
                                        <Classification 
                                            navigation={this.props.navigation}
                                            listType={this.props.route.params.listType}
                                            listGroup={this.props.route.params.listGroup}
                                            listProject={this.props.route.params.listProject}
                                            customer={this.props.route.params.customer}
                                            returnDataClassification={this.returnDataClassification}
                                            token={this.state.token}
                                            checkRequestOpenApp={this.checkRequestOpenApp}
                                        />
                                    </View>
                                    
                                    <View style={styles.separate}></View>

                                    {/* <View style={styles.appendInfo}>
                                        <AppendInfo/>
                                    </View> */}
                                    <View style={styles.updateBtn}>
                                        <ButtonIndex 
                                            label='CẬP NHẬT'
                                            color={blue}
                                            action={this.update}
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
