import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, Alert } from "react-native";
import DomainList from "../DomainList/DomainList";
import { styles } from "./css";
import{ loading, fetchToken } from "../../../../Helpers/Functions";
import Icon from 'react-native-vector-icons/Ionicons';
import getDomainList from '../../../../Api/getDomainList';
import SearchBar from '../../../../Components/Elements/SearchBar/SearchBar';
import getSearchDomain from '../../../../Api/getSearchDomain';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            domainList: [],
            page: 1,
            itemLoading: false,
            token: '',
            handleLoadMore: false,
            refresh: true,
            isInternetReachable: false,
            list_status: {},
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
                this.getDomainList(
                    token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true,
                    token,
                    handleLoadMore: true,
                    refresh: false, 
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

    async getDomainList(token, page) {
        const res = await getDomainList(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ list_status: resJson.data.list_status });
                const arrayDomainList = this.state.domainList.concat(resJson.data.data)
                if(arrayDomainList.length == this.state.domainList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayDomainList.length > this.state.domainList.length) {
                    this.setState({ domainList: arrayDomainList })
                };
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
            const res = await getSearchDomain(
                this.state.token,
                searchText
            );
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.setState({ 
                        domainList: resJson.data.data,
                        itemLoading: false,
                        handleLoadMore: false
                    });
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
            this.refresh()
        }
    }

    refresh() {
        this.setState({ 
            domainList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  () => {
                this.getDomainList(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );
    }

    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <DomainList 
                    list_status={this.state.list_status}
                    domain={item}
                    navigation={this.props.navigation}
                    token={this.state.token}
                    refreshList={this.refresh} 
                    user={this.props.route.params.user}       
                />
            </View>
        )
    }

    renderFooter = () => {
        return( 
            this.state.itemLoading && this.state.domainList.length > 7 && this.state.handleLoadMore ? 
            <View style={styles.itemLoader}>
                <ActivityIndicator size='large'/>
            </View> : null
        )
    }

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
            itemLoading: true 
        },  () => {
                this.getDomainList(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );        
    }

    scrollToTop() {
        if(this.state.domainList.length > 0) {
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
                                        placeholder='Tìm kiếm domain...'
                                        search={this.search}
                                    />
                                </View>

                                {this.state.domainList.length > 0 ? 
                                    <View style={styles.domainList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref }}
                                            data={this.state.domainList}
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
                                    <Text style={styles.noHaveDomain}>Chưa có trang web</Text>
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
