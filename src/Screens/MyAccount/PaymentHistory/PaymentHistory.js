import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './css';
import ButtonIndex from '../../../Components/Elements/Button/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { orange } from '../../../Components/Elements/Color/Color';
import DateTimePicker from '@react-native-community/datetimepicker';
import { loading } from '../../../Helpers/Functions';
import moment from 'moment';
import getPaymentHistoryList from '../../../Api/getPaymentHistoryList';
import NumberFormat from 'react-number-format';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
 
export default class PaymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            payment: '',
            showFromDate: false,
            showToDate: false,
            fromDate: 'Từ ngày',
            fromDateValue: new Date(),
            toDate: 'Đến ngày',
            toDateValue: new Date(),
            token: this.props.route.params.token,
            page: 1,
            listPayment: [],
            itemLoading: false,
            listTypeOfPayment: [],
            refresh: true,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
            this._isMounted = false;
            this.refresh = this.refresh.bind(this);
    }

    async componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getPaymentHistoryList(
                    this.state.token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true,
                    handleLoadMore: true,
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

    async getPaymentHistoryList(token, page) {
        const res = await getPaymentHistoryList(
            token,
            page
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listTypeOfPayment: resJson.data.list_payment });
                const arrayPaymentList = this.state.listPayment.concat(resJson.data.data);
                if(arrayPaymentList.length == this.state.listPayment.length) {
                    this.setState({ 
                        itemLoading: false,
                        handleLoadMore: false, 
                    })
                }
                else if(arrayPaymentList.length > this.state.listPayment.length) {
                    this.setState({ listPayment: arrayPaymentList });
                }
            }
            else if (resJson.code == 204) {
                console.log('Error!!!', resJson.message)
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
        if(item.status == 2) {
            return(
                <View style={styles.tableRow}>
                    <View style={styles.number}>
                        <Text style={styles.numberText}>{item.id}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>
                            {moment(item.created_at).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                    <View style={styles.amount}>
                        <NumberFormat
                            value={item.total_money}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={value => <Text style={styles.amountText}>{value}</Text>}
                        />
                    </View>
                    <View style={styles.channel}>
                        <Text style={styles.channelText}>
                            {Object.entries(this.state.listTypeOfPayment).map(([key, type]) => {
                                if(item.option_payment == key) {
                                    return type.title
                                }
                            })}
                        </Text>
                    </View>           
                </View>       
            )
        }
    }

    renderFooter = () => {
        return( 
            <View style={styles.itemLoader}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        },  () => { 
                this.getPaymentHistoryList(
                    this.state.token, 
                    this.state.page,
                );
            }
        );
    }

    refresh() {
        this.setState({ 
            listPayment: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true
        },  () => {
                this.getPaymentHistoryList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    scrollToTop() {
        if(this.state.listPayment.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    onChangeFromDate(event, selectedDate) {
        this.setState({ 
            fromDate: moment(selectedDate).format("DD/MM/YYYY"),
            fromDateValue: selectedDate,
            showFromDate: false
        })
    };

    onChangeToDate(event, selectedDate) {
        this.setState({ 
            toDate: moment(selectedDate).format("DD/MM/YYYY"),
            toDateValue: selectedDate,
            showToDate: false
        })
    };

    search() {
        
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
                                {/* <View style={styles.filter}>
                                    <View style={styles.keyword}>
                                        <TextInput
                                            style={styles.keywordInput}
                                            placeholder='Từ khóa (vd: Số tiền, Số HĐ,...)'
                                        />
                                    </View>

                                    <View style={styles.fromTo}>
                                        <View style={styles.from}>
                                            <View style={styles.fromPicker}>
                                                <View style={styles.showDate}>
                                                    <Text style={styles.fromDate}>{this.state.fromDate}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.iconDatePicker}
                                                    onPress={() => this.setState({ showFromDate: true })}
                                                >
                                                    <Icon
                                                        name='ios-calendar'
                                                        color='gray'
                                                        size={22}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {this.state.showFromDate ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                timeZoneOffsetInMinutes={0}
                                                value={this.state.fromDateValue}
                                                mode='date'
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onChangeFromDate.bind(this)}
                                            /> : null
                                        }

                                        <View style={styles.to}>
                                            <View style={styles.toPicker}>
                                                <View style={styles.showDate}>
                                                    <Text style={styles.toDate}>{this.state.toDate}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.iconDatePicker}
                                                    onPress={() => this.setState({ showToDate: true })}
                                                >
                                                    <Icon
                                                        name='ios-calendar'
                                                        color='gray'
                                                        size={22}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {this.state.showToDate ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                timeZoneOffsetInMinutes={0}
                                                value={this.state.toDateValue}
                                                mode='date'
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onChangeToDate.bind(this)}
                                            /> : null
                                        }
                                    </View>
                                    <View style={styles.picker}>
                                        <RNPickerSelect
                                            placeholder={{ 
                                                label: 'Thanh toán qua', 
                                                value: null,
                                                color: '#929caa'
                                            }}
                                            placeholderTextColor='#929caa'
                                            style={pickerItem}
                                            useNativeAndroidPickerStyle={false}
                                            onValueChange={(payment) => this.setState({ payment })}
                                            Icon={() => {
                                                return(
                                                    <Icon
                                                        name='ios-arrow-down'
                                                        size={16}
                                                        color='#686868'
                                                    />
                                                )
                                            }}
                                            items={[
                                                { label: 'Nạp bằng thẻ điện thoại', value: 'napthe' },
                                                { label: 'Chuyển khoản', value: 'chuyenkhoan' },
                                                { label: 'Internet Banking', value: 'internetbanking' },
                                            ]}
                                        />
                                    </View> 
                                        
                                    <View style={styles.btnSearch}>
                                        <ButtonIndex 
                                            color={orange}
                                            label='TÌM KIẾM'
                                            action={this.search.bind(this)}
                                        />
                                    </View>
                                </View> */}
                                <View style={styles.table}>
                                    <View style={styles.tableHeader}>
                                        <View style={styles.number}>
                                            <Text style={styles.numberTextHeader}>SỐ HĐ</Text>
                                        </View>
                                        <View style={styles.date}>
                                            <Text style={styles.dateTextHeader}>NGÀY</Text>
                                        </View>
                                        <View style={styles.amount}>
                                            <Text style={styles.amountTextHeader}>THANH TOÁN</Text>
                                        </View>
                                        <View style={styles.channelHeader}>
                                            <Text style={styles.channelTextHeader}>KÊNH</Text>
                                        </View>               
                                    </View>

                                    {this.state.listPayment.length > 0 ?
                                        <View style={styles.listPayment}>
                                            <FlatList
                                                ref={(ref) => { this.flatListRef = ref; }}
                                                data={this.state.listPayment}
                                                refreshing={this.state.refresh}
                                                onRefresh={this.refresh}
                                                renderItem={this.renderRow}
                                                keyExtractor={(item, index) => index.toString()}
                                                onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                                onEndReachedThreshold={0.1}
                                                ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                                disableVirtualization={true}
                                            />
                                        </View> 
                                            :
                                        <Text style={styles.noHavePayment}>Chưa có lịch sử thanh toán</Text>
                                    }                 
                                </View>

                                <TouchableOpacity
                                    style={styles.scrollToTop}
                                    onPress={() => this.scrollToTop()}
                                >
                                    <Icon
                                        name='ios-chevron-up'
                                        size={30}
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

const pickerItem = StyleSheet.create({
    inputAndroid: {
        fontSize: 10,
        height: 36,
        borderRadius: 10,
        paddingLeft: 20,
    },
    iconContainer: {
        top: 10,
        right: 15
    }
})
