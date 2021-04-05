import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Alert, Text } from 'react-native';
import getSearchBrandName from '../../../../Api/getSearchBrandName';
import getBrandNameList from '../../../../Api/getBrandNameList';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import SearchBar from '../../../../Components/Elements/SearchBar/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

const list_status = {
    '0' : 'Đang yêu cầu',
    '1' : 'Đang xử lý',
    '2' : 'Từ chối',
    '3' : 'Thành công'
} 

export default class BrandName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            page: 1,
            brandNameList: [],
            itemLoading: false,
            handleLoadMore: false,
            token: this.props.route.params.token,
            refresh: true,
            isInternetReachable: false,
            requestOpenAppAgain: false,
            files: [],
            fileSize: 0
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getBrandNameList(
                    this.state.token, 
                    this.state.page, 
                );

                this.setState({ 
                    handleLoadMore: true,
                    itemLoading: true,
                    refresh: false
                });
            }
        });

        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true });
        }, 2000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getBrandNameList(token, page) {
        const res = await getBrandNameList(
            token,
            page,
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayBrandNameList = this.state.brandNameList.concat(resJson.data.data)
                if(arrayBrandNameList.length == this.state.brandNameList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayBrandNameList.length > this.state.brandNameList.length) {
                    this.setState({ brandNameList: arrayBrandNameList })
                }
            }
            else if(resJson.code == 204) {
                console.log("Error !!!", resJson.message);
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
            const res = await getSearchBrandName(
                this.state.token,
                searchText
            );
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.setState({ 
                        brandNameList: resJson.data.data,
                        itemLoading: false,
                        handleLoadMore: false
                    });
                }
                else if(resJson.code == 204) {
                   Alert.alert('Error !!!', resJson.message) 
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

    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <View style={styles.left}>
                    <Text style={styles.text}>{item.id}</Text>
                </View>
                <View style={styles.center}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.textStatus}>
                        {Object.entries(list_status).map(([key, value]) => {
                            if(item.status == key) {
                                return value;
                            }
                        })}
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

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        },  () => {
                this.getBrandNameList(
                    this.state.token, 
                    this.state.page, 
                );  
            }); 
    }

    refresh() {
        this.setState({ 
            brandNameList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  () => {
                this.getBrandNameList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    scrollToTop() {
        if(this.state.brandNameList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        }      
    }

    render() {
        return (
            <View style={styles.container} >
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        (this.state.requestOpenAppAgain ? 
                            <View style={{ marginTop: -70 }}>
                                <RequestOpenAppAgain/>  
                            </View>
                                : 
                            <View style={{ alignItems: 'center', width: width }}>
                                <View style={styles.searchBar}>
                                    <SearchBar 
                                        placeholder='Tìm kiếm brand name...'
                                        search={this.search}
                                    />
                                </View>

                                <View style={styles.titleWrapper}>
                                    <View style={styles.left}>
                                        <Text style={styles.label}>#</Text>
                                    </View>
                                    <View style={styles.center}>
                                        <Text style={styles.label}>BRANDNAME</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.label}>TRẠNG THÁI</Text>
                                    </View>
                                </View>

                                {this.state.brandNameList.length > 0 ?
                                    <View style={styles.brandNameList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.brandNameList}
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
                                    <Text style={styles.noHaveBrandName}>Chưa có brand name</Text>
                                }
                                        
                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={() => this.props.navigation.navigate('CreateBrandName', {
                                        navigation: this.props.navigation,
                                        refreshList: this.refresh,
                                        token: this.state.token,
                                    })}
                                >
                                    <Icon
                                        name='ios-add'
                                        size={35}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
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
