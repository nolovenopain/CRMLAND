import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Alert, Text } from 'react-native';
import { getEmailSMTPFullList } from '../../../../Api/getEmailSMTPList';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import Icon from 'react-native-vector-icons/Ionicons';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';
import { blue, orange } from '../../../../Components/Elements/Color/Color';
import postDeleteEmailSMTP from '../../../../Api/postDeleteEmailSMTP';

export default class EmailSMTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            page: 1,
            emailSMTPList: [],
            itemLoading: false,
            handleLoadMore: false,
            token: this.props.route.params.token,
            refresh: true,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getEmailSMTPFullList();

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

    async getEmailSMTPFullList() {
        const res = await getEmailSMTPFullList(
            this.state.token,
            this.state.page,
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayEmailSMTPList = this.state.emailSMTPList.concat(resJson.data.data)
                if(arrayEmailSMTPList.length == this.state.emailSMTPList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayEmailSMTPList.length > this.state.emailSMTPList.length) {
                    this.setState({ emailSMTPList: arrayEmailSMTPList })
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
            .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <View style={styles.left}>
                    <Text 
                        style={styles.textHostName}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {item.name}
                    </Text>
                </View>
                <View style={styles.center}>
                    <Text style={styles.text}>{item.type}</Text>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity 
                        style={styles.detail}
                        onPress={() => this.props.route.params.navigation.navigate('SMTPDetail', {
                            navigation: this.props.route.params.navigation,
                            token: this.state.token,
                            emailSMTP: item, 
                            refreshList: this.refresh
                        })}    
                    >
                        <Icon
                            name='ios-information-circle'
                            size={20}
                            color={blue}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.delete}
                        onPress={() => this.delete(item)}
                    >
                        <Icon
                            name='ios-trash'
                            size={20}
                            color={orange}
                        />
                    </TouchableOpacity>
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
                this.getEmailSMTPFullList(
                    this.state.token, 
                    this.state.page, 
                );  
            }); 
    }

    refresh() {
        this.setState({ 
            emailSMTPList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  () => {
                this.getEmailSMTPFullList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    scrollToTop() {
        if(this.state.emailSMTPList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        }      
    }

    delete = async(emailSMTP) => {
        Alert.alert(
            'Thông báo',
            'Bạn có thực sự muốn xóa email này ?',
            [
                {text: 'Hủy', style: 'cancel'},
                {text: 'Xóa', onPress: async() => {
                    this.setState({ loaded: false })
                    const res = await postDeleteEmailSMTP(
                        this.state.token,
                        emailSMTP.id
                    );

                    setTimeout(async() =>{
                        this.setState({ loaded: true });
                        if(res.status == 200) {
                            const resJson = await res.json();
                            if(resJson.code == 200) {
                                this.refresh();
                            }
                            else if(resJson.code == 204) {
                                console.log("Error !!!", resJson.message);
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
                    }, 1000)
                }}
            ],
            {cancelable: true}
        )
       
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

                                <View style={styles.titleWrapper}>
                                    <View style={styles.left}>
                                        <Text style={styles.label}>TÊN MÁY CHỦ</Text>
                                    </View>
                                    <View style={styles.center}>
                                        <Text style={styles.label}>KIỂU GỬI</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.label}>TÙY CHỌN</Text>
                                    </View>
                                </View>

                                {this.state.emailSMTPList.length > 0 ?
                                    <View style={styles.emailSMTPList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.emailSMTPList}
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
                                    <Text style={styles.noHaveEmailSMTP}>Chưa có máy chủ gửi email</Text>
                                }
                                        
                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={() => this.props.navigation.navigate('CreateEmailSMTP', {
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
