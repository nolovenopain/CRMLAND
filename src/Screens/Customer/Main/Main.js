import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Alert, Text } from 'react-native';
import { loading, fetchToken } from '../../../Helpers/Functions';
import { styles } from './css';
import SearchBar from '../../../Components/Elements/SearchBar/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomerList from '../CustomerList/CustomerList';
import getCustomerList from '../../../Api/getCustomerList';
import postDeleteCustomer from '../../../Api/postDeleteCustomer';
import getTypeOfCustomer from '../../../Api/getTypeOfCustomer';
import getGroupOfCustomer from '../../../Api/getGroupOfCustomer';
import { getReduceProjectList } from '../../../Api/getProjectList';
import getSearchCustomer from '../../../Api/getSearchCustomer';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import getUserInfo from '../../../Api/getUserInfo';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import getListEmailCanSend from '../../../Api/getListEmailCanSend';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            customerList: [],
            page: 1,
            itemLoading: false,
            listType: [],
            listGroup: [],
            listProject: [],
            token: '',
            handleLoadMore: false,
            refresh: true,
            isInternetReachable: false,
            user: {},
            requestOpenAppAgain: false,
            listEmailCanSend: []
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                this.getUserInfo(token);
                this.getTypeOfCustomer(token);
                this.getGroupOfCustomer(token);
                this.getReduceProjectList(token);
                this.getListEmailCanSend(token);
                this.getCustomerList(
                    token, 
                    this.state.page, 
                );

                this.setState({
                    token, 
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

    async getCustomerList(token, page) { const r = getCustomerList(token, page); console.log(r)
        const res = await getCustomerList(
            token,
            page,
        ); console.log(res)
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayCustomerList = this.state.customerList.concat(resJson.data.data)
                if(arrayCustomerList.length == this.state.customerList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayCustomerList.length > this.state.customerList.length) {
                    this.setState({ customerList: arrayCustomerList })
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

    async getUserInfo(token) {
        const res = await getUserInfo(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ user: resJson.data });
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

    async getTypeOfCustomer(token) {
        const res = await getTypeOfCustomer(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listType: resJson.data.data });
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

    async getGroupOfCustomer(token) {
        const res = await getGroupOfCustomer(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listGroup: resJson.data.data });
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

    async getReduceProjectList(token) {
        const res = await getReduceProjectList(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listProject: resJson.data.data });
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

    async getListEmailCanSend(token) {
        const res = await getListEmailCanSend(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listEmailCanSend: resJson.data });
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

    async deleteCustomer(customerId) {
        const res = await postDeleteCustomer(
            this.state.token, 
            customerId
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                var customerList = this.state.customerList;
                customerList.map((value, key) => {
                    if(value.id == customerId) {
                        customerList.splice(key, 1);
                    }
                });
                this.setState({ customerList });
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

    async search(searchText) {
        if(searchText != '' && searchText != undefined) {
            const res = await getSearchCustomer(
                this.state.token,
                searchText
            );
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.setState({ 
                        customerList: resJson.data.data,
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
                <CustomerList
                    customer={item}
                    navigation={this.props.navigation}
                    listType={this.state.listType}
                    listGroup={this.state.listGroup}
                    listProject={this.state.listProject}
                    listEmailCanSend={this.state.listEmailCanSend}
                    deleteCustomer={this.deleteCustomer}
                    refreshList={this.refresh}
                    token={this.state.token}
                    user={this.state.user}
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
                this.getCustomerList(
                    this.state.token, 
                    this.state.page, 
                );  
            });       
    }

    refresh() {
        this.setState({ 
            customerList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true, 
        },  () => {
                this.getCustomerList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }
    
    scrollToTop() {
        if(this.state.customerList.length > 0) {
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
                                        placeholder='Tìm kiếm khách hàng...'
                                        search={this.search}
                                    />
                                </View>

                                {this.state.customerList.length > 0 ?
                                    <View style={styles.customerList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.customerList}
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
                                    <Text style={styles.noHaveCustomer}>Chưa có khách hàng</Text>
                                }
                                        
                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={() => this.props.navigation.navigate('CreateCustomer', {
                                        navigation: this.props.navigation,
                                        refreshList: this.refresh,
                                        token: this.state.token,
                                        listGroup: this.state.listGroup,
                                        listType: this.state.listType,
                                        listProject: this.state.listProject
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