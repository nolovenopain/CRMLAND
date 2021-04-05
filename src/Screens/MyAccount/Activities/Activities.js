import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { loading } from '../../../Helpers/Functions';
import moment from 'moment';
import getActivitiesHistoryList from '../../../Api/getActivitiesHistoryList';
import NumberFormat from 'react-number-format';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            description: '',
            showFromDate: false,
            showToDate: false,
            fromDate: 'Từ ngày',
            fromDateValue: new Date(),
            toDate: 'Đến ngày',
            toDateValue: new Date(),
            token: this.props.route.params.token,
            listActivities: [],
            itemLoading: false,
            page: 1,
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
                this.getActivitiesHistoryList(
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

    async getActivitiesHistoryList(token, page) {
        const res = await getActivitiesHistoryList(
            token,
            page
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayActivitesList = this.state.listActivities.concat(resJson.data.data);
                if(arrayActivitesList.length == this.state.listActivities.length) {
                    this.setState({ 
                        itemLoading: false,
                        handleLoadMore: false, 
                    })
                }
                else if(arrayActivitesList.length > this.state.listActivities.length) {
                    this.setState({ listActivities: arrayActivitesList });
                }
            }
            else if (resJson.code == 204) {
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
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }  
    }

    renderRow = ({item}) => {
        // var description = item.description.split('<br>').join(' ')
        // description = description.split('...').join('')
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
                        value={item.money}
                        displayType={'text'}
                        thousandSeparator={true}
                        renderText={value => <Text style={styles.amountText}>{value}</Text>}
                    />
                </View>
                <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionText}>
                        {item.description.replace(/<br>/g, '\n')}
                    </Text>
                </View>           
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

    handleLoadMore = async() => {
        this.setState({ 
            page: this.state.page + 1, 
        },  () => { 
                this.getActivitiesHistoryList(
                    this.state.token, 
                    this.state.page,
                );
            }
        );
    }

    refresh() {
        this.setState({ 
            listActivities: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true 
        },  () => {
                this.getActivitiesHistoryList(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );
    }

    scrollToTop() {
        if(this.state.listActivities.length > 0) {
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
                                                label: 'Mô tả', 
                                                value: null,
                                                color: '#929caa'
                                            }}
                                            placeholderTextColor='#929caa'
                                            style={pickerItem}
                                            useNativeAndroidPickerStyle={false}
                                            onValueChange={(description) => this.setState({ description })}
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
                                                { label: 'Popular', value: '1' },
                                                { label: 'Dịch vụ không khả dụng', value: 'khongkhadung' },
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
                                        <View style={styles.description}>
                                            <Text style={styles.descriptionTextHeader}>MÔ TẢ</Text>
                                        </View>               
                                    </View>

                                    {this.state.listActivities.length > 0 ? 
                                        <View style={styles.listActivities}>
                                            <FlatList
                                                ref={(ref) => { this.flatListRef = ref; }}
                                                data={this.state.listActivities}
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
                                        <Text style={styles.noHaveActivities}>Chưa có lịch sử hoạt động</Text>
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
