import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, Alert } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import moment from 'moment';
import ButtonIndex from '../../../../Components/Elements/Button/Button';
import { orange } from '../../../../Components/Elements/Color/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import getAutomationDetail from '../../../../Api/getAutomationDetail';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class AutomationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
            statistic_date: [],
            kind: '',
            requestOpenAppAgain: false,
            refreshScreen: false
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.navigateToCustomerList = this.navigateToCustomerList.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getAutomationDetail();
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
            this.setState({ statistic_date: resJson.data.statistic_date })
            Object.entries(resJson.data.list_kind).map(([key, kind]) => { 
                if(key == this.props.route.params.automation.kind) {
                    this.setState({ kind }, () => this.childCampaginType.reRender())
                }
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

    navigateToCustomerList() {
        this.props.route.params.navigation.navigate('ListDateOfReport', {
            token: this.state.token,
            statistic_date: this.state.statistic_date,
            navigation: this.props.route.params.navigation,
            automation: this.props.route.params.automation,
        })
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async onRefresh() {
        this.setState({ refreshScreen: true });
        this.getAutomationDetail();
        this.props.route.params.refresh();
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() {
        return (
            <View>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
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
                                        <View style={styles.firstInfo}>
                                            <CustomInput
                                                label='Tên chiến dịch'
                                                oldValue={this.props.route.params.automation.name}
                                                editable={false}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                            />
                                        </View>
                                        <View style={styles.info}>
                                            <CustomInput
                                                label='Loại chiến dịch'
                                                oldValue={this.state.kind}
                                                editable={false}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                                onRef={ref => (this.childCampaginType = ref)}
                                            />
                                        </View>
                                        <View style={styles.info}>
                                            <CustomInput
                                                label='Kênh gửi'
                                                oldValue={this.props.route.params.automation.type == 1 ? 'SMS' : this.props.route.params.automation.type == 2 ? 'Email' : null}
                                                editable={false}
                                                multiline={true}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                            />
                                        </View>
                                        <View style={styles.info}>
                                            <CustomInput
                                                label='Gửi từ'
                                                oldValue={this.props.route.params.automation.type == 1 ?
                                                    (this.props.route.params.automation.brandname.name ? this.props.route.params.automation.brandname.name : '') : 
                                                    (this.props.route.params.automation.email_sender != null ? this.props.route.params.automation.email_sender.email : '')
                                                }
                                                editable={false}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                            />
                                        </View>
                                        <View style={styles.info}>
                                            <CustomInput
                                                label='Ngày tạo'
                                                oldValue={ moment(this.props.route.params.automation.created_at).format("H:mm") + " - " + 
                                                            moment(this.props.route.params.automation.created_at).format("DD/MM/YYYY") }
                                                editable={false}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                            />
                                        </View>
                                        <View style={styles.navigateToCustomerList}>
                                            <ButtonIndex
                                                color={orange}
                                                label='DANH SÁCH BÁO CÁO'
                                                action={this.navigateToCustomerList}
                                            />
                                            <View style={styles.iconNavigate}>
                                                <Icon
                                                    name='chevron-triple-right'
                                                    size={30}
                                                    color='#fff'
                                                />
                                            </View>
                                        </View>
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
