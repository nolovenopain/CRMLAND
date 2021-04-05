import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, Switch, Alert } from 'react-native';
import{ loading } from '../../../../Helpers/Functions';
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import getPopupList  from '../../../../Api/getPopupList';
import { orange } from '../../../../Components/Elements/Color/Color';
import moment from 'moment';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import postDeleteLinkPopup from '../../../../Api/postDeleteLinkPopup';
import postDeletePopup from '../../../../Api/postDeletePopup';
import postActivePopup from '../../../../Api/postActivePopup';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            popupList: [],
            page: 1,
            itemLoading: false,
            token: this.props.route.params.token,
            refresh: true,
            active: [],
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
                this.getPopupList(
                    this.state.token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true, 
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

    async getPopupList(token, page) {
        const res = await getPopupList(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayPopupList = this.state.popupList.concat(resJson.data.data)
                if(arrayPopupList.length == this.state.popupList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    });
                }
                else if(arrayPopupList.length > this.state.popupList.length) {
                    this.setState({ popupList: arrayPopupList })
                };
                var active = [];
                arrayPopupList.map((value, key) => {
                    value.link_show.map((link, index) => {
                        if(link.active == 1) {
                            active.push({
                                id: link.id,
                                value: true
                            })
                        }
                        else {
                            active.push({
                                id: link.id,
                                value: false
                            })
                        }
                    })
                });
                this.setState({ active });
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

    deletePopup = (popupId) => {
        Alert.alert(
            'Xóa Popup',
            'Bạn có muốn xóa popup này ?',
            [
                {text: 'Hủy', style: 'cancel'},
                {text: 'Xóa', onPress: async() => {
                    this.setState({ loaded: false })
                    const res = await postDeletePopup(
                        this.state.token,
                        popupId
                    );
                    
                    setTimeout(async() => {
                        this.setState({ loaded: true }) 
                        if(res.status == 200) {
                            const resJson = await res.json();
                            if(resJson.code == 200) {
                                this.refresh();
                                Alert.alert('Thông báo', resJson.message)
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
                            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
                        }
                        else if(res.status == 500) {
                            this.setState({ requestOpenAppAgain: true })
                            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                        }
                    }, 1000);
                }}
            ],
            {cancelable: true}
        )       
    }

    deleteLink = (popupId) => {
        Alert.alert(
            'Xóa Link Popup',
            'Bạn có muốn xóa link của popup này ?',
            [
                {text: 'Hủy', style: 'cancel'},
                {text: 'Xóa', onPress: async() => {
                    this.setState({ loaded: false })
                    const res = await postDeleteLinkPopup(
                        this.state.token,
                        popupId
                    );
 
                    setTimeout(async() => {
                        this.setState({ loaded: true })
                        if(res.status == 200) {
                            const resJson = await res.json();
                            if(resJson.code == 200) {
                                this.refresh();
                                Alert.alert('Thông báo', resJson.message)
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
                            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
                        }
                        else if(res.status == 500) {
                            this.setState({ requestOpenAppAgain: true })
                            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                        }
                    }, 2000);
                }}
            ],
            {cancelable: true}
        )       
    }

    turnOnOff = async (switchValue, popupLinkId) => {
        this.setState({ loaded: false })
        var activeArr = this.state.active;
        activeArr.map((item, key) => {
            if(popupLinkId == item.id) {
                activeArr[key].value = switchValue
            }
        })
        this.setState({ active: activeArr })
        
        var active = switchValue == true ? 1 : 0;
        const type = 2;
        const res = await postActivePopup(
            this.state.token,
            popupLinkId,
            type,
            active
        );
        
        setTimeout(async() => {
            this.setState({ loaded: true }) 
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.refresh();
                    Alert.alert('Thông báo', resJson.message)
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
                .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
            }
            else if(res.status == 500) {
                this.setState({ requestOpenAppAgain: true })
                Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
            }
        }, 2000);
    }

    renderRow = ({item, index}) => {
        return(
            <View style={styles.item}>
                <View style={styles.list}>
                    <View style={styles.header}>
                        <View style={styles.iconWrapper}>
                            <View style={styles.bundle}>
                                <Icon
                                    name='ios-folder-open'
                                    color='#fff'
                                    size={25}
                                />
                            </View>
                        </View>
                        <View style={styles.content}>
                            <Text 
                                style={styles.popupName}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            > 
                                {item.title} 
                            </Text>
                            <View style={styles.contentBottom}>
                                <Text style={styles.createDate}>
                                <Text style={styles.bold}>Ngày tạo:</Text> {moment(item.created_at).format('DD/MM/YYYY')} </Text>
                                <TouchableOpacity 
                                    style={styles.delete}
                                    onPress={() => this.deletePopup(item.id)}
                                >
                                    <Icon
                                        name='ios-trash'
                                        size={18}
                                        color={orange}
                                    />
                                    <Text style={styles.deleteLabel}>Xóa form </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.rowTitle}>
                        <View style={{ width: width/(1.16*3) }}>
                            <Text style={styles.text}><Text style={styles.bold2}>Xem: </Text>{item.views}</Text>
                        </View>
                        <View style={{ width: width/(1.16*3), alignItems: 'center' }}>
                            <Text style={styles.text}><Text style={styles.bold2}>Data: </Text>{item.total_contact}</Text>
                        </View>
                        <View style={{ width: width/(1.16*3), alignItems: 'flex-end' }}>
                            <Text style={styles.text}><Text style={styles.bold2}>CTR % : </Text>
                                {item.views == 0 ? 0 : Math.round(item.total_contact / item.views * 100)*100/100} %</Text>
                        </View>  
                    </View>

                    <View style={styles.linkAndAction}>
                        <View style={styles.linkTitle}>
                            <Text style={styles.bold3}>Link</Text>
                        </View>
                        <Text style={styles.bold3}>Hành động</Text>
                    </View>

                    {item.link_show.length > 0 ?
                        item.link_show.map((link_show, key) => {
                            return(
                                <View style={styles.linkRow} key={key}>
                                    <View style={styles.link}>
                                        <Text style={styles.linkText}>
                                            {link_show.full_link}
                                        </Text>
                                    </View>
                                    <View style={styles.btnGroup}>
                                        <TouchableOpacity 
                                            style={styles.deleteIcon}
                                            onPress={() => this.deleteLink(link_show.id)}
                                        >
                                            <Icon
                                                name='ios-trash'
                                                size={18}
                                                color={orange}
                                            />
                                            <Text style={styles.deleteLabel}>Xóa link </Text>
                                        </TouchableOpacity>
                                        
                                        {this.state.active.map((item, key) => { 
                                            if(item.id == link_show.id) { 
                                                return <Switch
                                                            key={key}
                                                            style={styles.switch}
                                                            value={item.value}
                                                            onValueChange={(switchValue) => this.turnOnOff(switchValue, link_show.id)}
                                                        />
                                            }
                                        })}
                                                                                
                                    </View>
                                </View>
                            ) 
                        }) : null
                    }
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
                this.getPopupList(
                    this.state.token, 
                    this.state.page, 
                );
            });        
    }

    refresh() {
        this.setState({ 
            popupList: [],
            page: 1,
            active: [],
            itemLoading: true, 
            handleLoadMore: true,
        },  () => {
                this.getPopupList(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    scrollToTop() {
        if(this.state.popupList.length > 0) {
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
                            <View style={{ alignItems: 'center', width: width }}>
                                {this.state.popupList.length > 0 ? 
                                    <View style={styles.popupList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.popupList}
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
                                    <Text style={styles.noHavePopup}>Chưa có form liên hệ</Text>
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
