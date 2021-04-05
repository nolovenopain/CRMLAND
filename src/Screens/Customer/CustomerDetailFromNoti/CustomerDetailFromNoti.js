import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import Classification from './Classification/Classification';
import AppendInfo from './AppendInfo/AppendInfo';
import { loading } from '../../../Helpers/Functions';
import { blue } from '../../../Components/Elements/Color/Color';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

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

export default class CustomerDetailFromNoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
        };
        this._isMounted = false;
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

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    <View style={ styles.container }>
                        {this.state.isInternetReachable ?  
                            <View>
                                <View style={styles.customerInfo}>
                                    <CustomerInfo
                                        customer={this.props.route.params.customer}
                                    />
                                </View>

                                <View style={styles.separate}></View>

                                <View style={styles.historyWrapper}>
                                    <View style={styles.historyHeader}>
                                        <Text style={styles.historyTitle}>Lịch sử chăm sóc</Text>
                                    </View>

                                    { this.props.route.params.listCareHistory.length > 0 ? 
                                        this.props.route.params.listCareHistory.map((value, key) => {
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
                                                                    Object.keys(this.props.route.params.listChannel).length > 0 ? 
                                                                        Object.entries(this.props.route.params.listChannel).map(([key, channel]) => { 
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
                                        onPress={() => this.props.navigation.navigate('HistoryFromNoti', {
                                            customer: this.props.route.params.customer,
                                            listChannel: this.props.route.params.listChannel,
                                            token: this.state.token,
                                            navigation: this.props.navigation,
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
                                            token={this.state.token}
                                        />
                                    </View>
                                    
                                    <View style={styles.separate}></View>

                                    {/* <View style={styles.appendInfo}>
                                        <AppendInfo/>
                                    </View> */}
                                </View>
                                :
                            <InternetConnecNotification/>
                        }
                    </View>
            </ScrollView>
        );
    }
}
