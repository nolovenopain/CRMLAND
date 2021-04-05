import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import{ loading } from '../../../../Helpers/Functions';
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import getBackupList from '../../../../Api/getBackupList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import postCreateBackup from '../../../../Api/postCreateBackup';
import postDeleteBackup from '../../../../Api/postDeleteBackup';
import postRestoreWebsite from '../../../../Api/postRestoreWebsite';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class BackupData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            backupList: [],
            data: [],
            page: 1,
            token: this.props.route.params.token,
            refresh: true,
            handleLoadMore: false,
            itemLoading: false,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
        this.restore = this.restore.bind(this);
        this.create = this.create.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getBackupList(
                    this.state.token, 
                    this.props.route.params.domain.id, 
                );
                this.setState({ 
                    refresh: false,
                    itemLoading: true,
                    handleLoadMore: true 
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

    async getBackupList(token, page) {
        const res = await getBackupList(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    backupList: resJson.data,
                    data: resJson.data.slice(0,15)
                });
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

    delete = async (item) => {
        const res = await postDeleteBackup(
            this.state.token, 
            this.props.route.params.domain.id,
            item
        );
        this.setState({ loaded: false })
        setTimeout(async() => {
            this.setState({ loaded: true })
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.refresh();
                    this.props.route.params.refreshList();
                    Alert.alert('Thông báo', resJson.message);
                } 
                else if(resJson.code == 204) {
                    console.log('Error !!!', resJson.message)
                }
                else if(resJson.errors) {
                    console.log(resJson)   
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
        }, 2000); 
    }

    async create() {
        this.setState({ loaded: false })
        const res = await postCreateBackup(
            this.state.token, 
            this.props.route.params.domain.id
        );
       
        setTimeout(async() => {
            this.setState({ loaded: true })
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.refresh();
                    this.props.route.params.refreshList();
                    Alert.alert('Thông báo', resJson.message);
                } 
                else if(resJson.code == 204) {
                    console.log('Error !!!', resJson.message)
                }
                else if(resJson.errors) {
                    console.log(resJson)   
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
        }, 1000);
    }

    async restore() {
        this.setState({ loaded: false })
        const res = await postRestoreWebsite(
            this.state.token, 
            this.props.route.params.domainId
        );
        
        setTimeout(async() => {
            this.setState({ loaded: true })
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.refresh();
                    this.props.route.params.refreshList();
                    Alert.alert('Thông báo', resJson.message);
                } 
                else if(resJson.code == 204) {
                    console.log('Error !!!', resJson.message)
                }
                else if(resJson.errors) {
                    console.log(resJson)   
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
        }, 1000);
    }

    renderRow = ({item}) => {
        return(
            <View style={styles.list}>
                <View style={styles.icon}>
                    <Icon
                        name='ios-server'
                        color='gray'
                        size={30}
                        style={styles.iconBackup}
                    />
                </View>
                <View style={styles.title}>
                    <Text 
                        style={styles.backupName}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {item}
                    </Text>
                </View>
                <View style={styles.btnGroups}>
                    <TouchableOpacity 
                        style={styles.backup}
                        onPress={this.restore}
                    >
                        <MaterialCommunityIcons
                            name='backup-restore'
                            color='#fff'
                            size={12}
                        />
                        <Text style={styles.backupText}>Phục hồi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.delete}
                        onPress={() => this.delete(item)}
                    >
                        <Icon
                            name='ios-trash'
                            color='#fff'
                            size={15}
                        />
                        <Text style={styles.deleteText}>Xóa</Text>
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
        const { page, data } = this.state;
        const start = page * ITEMS_PER_PAGE;
        const end = (page + 1) * ITEMS_PER_PAGE;

        const newData = this.state.backupList.slice(start, end);
        this.setState({ 
            data: [...data, ...newData],
            page: page + 1 
        });       
    }

    scrollToTop() {
        if(this.state.backupList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    refresh() {
        this.setState({ 
            backupList: [],
            page: 1,
            itemLoading: true,
            handleLoadMore: true, 
        }, async () => {
            this.getBackupList(
                this.state.token, 
                this.props.route.params.domain.id,
            );
        });
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
                            <View style={{ alignItems: 'center', width: width }}>
                                {this.state.data.length > 0 ? 
                                    <View style={styles.backupList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.data}
                                            refreshing={this.state.refresh}
                                            onRefresh={this.refresh}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            disableVirtualization={true}
                                        />
                                    </View>
                                        :
                                    <Text style={styles.noHaveBackup}>Chưa có list back up dữ liệu</Text>
                                }

                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={this.create}
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
