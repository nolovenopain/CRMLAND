import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import{ loading, fetchToken } from '../../../Helpers/Functions';
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import getAutomationList from '../../../Api/getAutomationList';
import AutomationList from "./AutomationList/AutomationList";
import SearchBar from '../../../Components/Elements/SearchBar/SearchBar';
import getSearchAutomation from '../../../Api/getSearchAutomation';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class Automation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            automationList: [],
            page: 1,
            itemLoading: false,
            token: '',
            handleLoadMore: false,
            refresh: true,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                this.getAutomationList(
                    token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true,
                    token,
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

    async getAutomationList(token, page) {
        const res = await getAutomationList(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayAutomationList = this.state.automationList.concat(resJson.data.data)
                if(arrayAutomationList.length == this.state.automationList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayAutomationList.length > this.state.automationList.length) {
                    this.setState({ automationList: arrayAutomationList })
                }
            }
            else if(resJson.code == 204) {
                Alert.alert("Error !!!", resJson.message);
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    async search(searchText) {
        if(searchText != '' && searchText != undefined) {
            const res = await getSearchAutomation(
                this.state.token,
                searchText
            )
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.setState({ 
                        automationList: resJson.data.data,
                        itemLoading: false,
                        handleLoadMore: false
                    })
                }
                else if(resJson.code == 204) {
                    Alert.alert("Error !!!", resJson.message);
                }
            }
            else if(res.status == 401) {
                Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                AsyncStorage
                .clear()
                .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
            }
            else if(res.status == 500) {
                this.setState({ requestOpenAppAgain: true })
                Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
            }  
        }
        else {
            this.refresh();
        }
    }

    refresh() {
        this.setState({ 
            automationList: [],
            page: 1,
            itemLoading: true,
            handleLoadMore: true,
        }, () => {
                this.getAutomationList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <AutomationList 
                    automation={item}
                    navigation={this.props.navigation} 
                    token={this.state.token}
                    refresh={this.refresh}       
                />
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

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        },  () => { 
                this.getAutomationList(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );      
    }

    scrollToTop() {
        if(this.state.automationList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
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
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.searchBar}>
                                    <SearchBar 
                                        placeholder='Tìm kiếm dự án...'
                                        search={this.search}
                                    />
                                </View>

                                {this.state.automationList.length > 0 ?
                                    <View style={styles.automationList}> 
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.automationList}
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
                                    <Text style={styles.noHaveAutomation}>Chưa có chiến dịch tự động</Text>
                                }
                                
                                <TouchableOpacity
                                    style={styles.scrollToTop}
                                    onPress={() => this.scrollToTop()}
                                >
                                    <Icon
                                        name='ios-chevron-up'
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
