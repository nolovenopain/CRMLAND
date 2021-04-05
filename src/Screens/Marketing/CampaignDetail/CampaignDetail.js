import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './css';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import { loading } from '../../../Helpers/Functions';
import moment from 'moment';
import ButtonIndex from '../../../Components/Elements/Button/Button';
import { orange } from '../../../Components/Elements/Color/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';

export default class MarketingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false
        };
        this._isMounted = false;
        this.navigateToCustomerList = this.navigateToCustomerList.bind(this);
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

    navigateToCustomerList() {
        if(this.props.route.params.campaign.type == 1) {
            this.props.route.params.navigation.navigate('ListCustomerOfCampaignSMS', {
                token: this.state.token,
                campaign: this.props.route.params.campaign
            });
        }
        else if(this.props.route.params.campaign.type == 2) {
            this.props.route.params.navigation.navigate('ListCustomerOfCampaignEmail', {
                token: this.state.token,
                campaignId: this.props.route.params.campaign.id
            });
        }
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                <View style={styles.container}>
                    {this.state.isInternetReachable ?
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.firstInfo}>
                                <CustomInput
                                    label='Tên chiến dịch'
                                    oldValue={this.props.route.params.campaign.name}
                                    editable={false}
                                    multiline={true}
                                    width={width/1.16 - 20}
                                    marginLeft={10}
                                />
                            </View>
                            <View style={styles.info}>
                                <CustomInput
                                    label='Gửi từ'
                                    oldValue={ this.props.route.params.campaign.type == 1 ? 
                                        (this.props.route.params.campaign.brandname.name ? this.props.route.params.campaign.brandname.name : '') :
                                        (this.props.route.params.campaign.email_sender != null ? this.props.route.params.campaign.email_sender.email : '')
                                    }
                                    editable={false}
                                    multiline={ this.props.route.params.campaign.type == 1 ? false : true}
                                    width={width/1.16 - 20}
                                    marginLeft={10}
                                />
                            </View>
                            <View style={styles.info}>
                                <CustomInput
                                    label='Ngày tạo'
                                    oldValue={ moment(this.props.route.params.campaign.created_at).format("DD/MM/YYYY") + " - " + 
                                                 moment(this.props.route.params.campaign.created_at).format("LTS") }
                                    editable={false}
                                    width={width/1.16 - 20}
                                    marginLeft={10}
                                />
                            </View>
                            <View style={styles.info}>
                                <CustomInput
                                    label='Ngày gửi'
                                    oldValue={ moment(this.props.route.params.campaign.schedule_time).format("DD/MM/YYYY") + " - " + 
                                                 moment(this.props.route.params.campaign.schedule_time).format("LTS") }
                                    editable={false}
                                    width={width/1.16 - 20}
                                    marginLeft={10}
                                />
                            </View>
                            {/* <View style={styles.info}>
                                <CustomInput
                                    label='Hoàn thành'
                                    oldValue={ moment(this.props.route.params.campaign.schedule_time).format("DD/MM/YYYY") + " - " + 
                                                 moment(this.props.route.params.campaign.schedule_time).format("LTS") }
                                    editable={false}
                                    width={width/1.16 - 20}
                                    marginLeft={10}
                                />
                            </View> */}
                            {this.props.route.params.campaign.status == 4 ? 
                                <View style={styles.navigateToCustomerList}>
                                    <ButtonIndex
                                        color={orange}
                                        label='DANH SÁCH KHÁCH HÀNG'
                                        action={this.navigateToCustomerList}
                                    />
                                    <View style={styles.iconNavigate}>
                                        <Icon
                                            name='chevron-triple-right'
                                            size={30}
                                            color='#fff'
                                        />
                                    </View>
                                </View> : null
                            } 
                        </View>
                            :
                        <InternetConnecNotification/>
                    }
                </View>
            </ScrollView>
        );
    }
}
