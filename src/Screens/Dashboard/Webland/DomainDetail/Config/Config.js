import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import postChangeStatusSuspend from '../../../../../Api/postChangeStatusSuspend';
import AsyncStorage from '@react-native-community/async-storage';

export default class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: this.props.domain.status == 2 ? false : this.props.domain.status == 3 ? true : null,
            token: this.props.token,
        };
    }

    async suspend() {
        this.setState({ loaded: false })
        const res = await postChangeStatusSuspend(
            this.state.token,
            this.props.domain.id,
            'suspend'
        );
        
        setTimeout(async() => {
            this.setState({ loaded: true })      
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.props.refreshList();
                    Alert.alert('Thông báo', resJson.message);  
                } 
                else if(resJson.code == 204) {
                    Alert.alert('Error!!!', resJson.message)
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
                this.props.checkRequestOpenAppAgain(true);
                Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
            }  
        }, 1000);
    }

    async active() {
        this.setState({ loaded: false })
        const res = await postChangeStatusSuspend(
            this.state.token,
            this.props.domain.id,
            'active'
        );
        
        setTimeout(async() => {
            this.setState({ loaded: true })  
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.props.refreshList();
                    Alert.alert('Thông báo', resJson.message);
                } 
                else if(resJson.code == 204) {
                    Alert.alert('Error !!!', resJson.message)
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
                this.props.checkRequestOpenAppAgain(true);
                Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
            }      
        }, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.configWrapper}>
                    {this.props.domain.status == 2 ?
                        <View style={styles.config}>
                            <TouchableOpacity 
                                style={styles.iconLeftWrapper}
                                onPress={() =>
                                    this.props.navigation.navigate('ChangeTheme', {
                                        domain: this.props.domain,
                                        token: this.state.token,
                                        navigation: this.props.navigation,
                                        refreshList: this.props.refreshList
                                    }) 
                                }
                            >
                                <Icon
                                    style={styles.icon}
                                    name='ios-copy'
                                    size={20}
                                    color='#fff'
                                />
                                <Text style={styles.label}>Đổi giao diện</Text>
                            </TouchableOpacity>
                        </View> : null
                    }

                    {this.props.domain.status == 2 ?
                        <View style={styles.config}>
                            <TouchableOpacity 
                                style={styles.iconCenterWrapper}
                                onPress={() => 
                                    this.props.navigation.navigate('ChangeDomainName', {
                                        domain: this.props.domain,
                                        token: this.state.token,
                                        navigation: this.props.navigation,
                                        refreshList: this.props.refreshList
                                    }) 
                                }
                            >
                                <Icon
                                    style={styles.icon}
                                    name='ios-globe-outline'
                                    size={20}
                                    color='#fff'
                                />
                                <Text style={styles.label}>Đổi tên miền</Text>
                            </TouchableOpacity>
                        </View> : null
                    }

                    {this.props.domain.item != null && this.props.domain.item.name !== 'Free' ?
                        <View style={styles.config}>
                            <TouchableOpacity 
                                style={styles.iconCenterWrapper}
                                onPress={() =>
                                    this.props.navigation.navigate('PremiumExtension', {
                                        domain: this.props.domain,
                                        token: this.state.token,
                                        navigation: this.props.navigation,
                                        refreshList: this.props.refreshList
                                    })
                                }
                            >
                                <Icon
                                    style={styles.icon}
                                    name='ios-sync'
                                    size={20}
                                    color='#fff'
                                />
                                <Text style={styles.label}>Gia hạn</Text>
                            </TouchableOpacity>
                        </View> : null
                    }

                    {this.props.domain.status == 2 ?
                        <View style={styles.config}>
                            <TouchableOpacity 
                                style={styles.iconRightWrapper}
                                onPress={() => {
                                        this.props.navigation.navigate('BackupData', {
                                            domain: this.props.domain,
                                            token: this.state.token,
                                            refreshList: this.props.refreshList
                                        }) 
                                    }}
                            >
                                <Icon
                                    style={styles.icon}
                                    name='ios-server'
                                    size={20}
                                    color='#fff'
                                />
                                <Text style={styles.label}>Backup dữ liệu</Text>
                            </TouchableOpacity>
                        </View> : null
                    }

                    {/* <View style={styles.center}>
                        <TouchableOpacity 
                            style={styles.iconCenterWrapper}
                            onPress={() => this.setState({ pause: !this.state.pause })}
                        >
                            {!this.state.pause ?
                                (this.props.user.type == 0 && this.props.domain.status == 2 ?
                                    <TouchableOpacity 
                                        style={styles.pause}
                                        onPress={ 
                                            this.suspend.bind(this)
                                        }
                                    >
                                        <Icon
                                            style={styles.iconCenter}
                                            name='ios-pause'
                                            size={20}
                                            color='#fff'
                                        />
                                        <Text style={styles.label}>Tạm dừng</Text>
                                    </TouchableOpacity> : null)
                                        :
                                (this.props.user.type == 0 && this.props.domain.status == 3 ?
                                    <TouchableOpacity 
                                        style={styles.play}
                                        onPress={ 
                                            this.active.bind(this)
                                        }
                                    >
                                        <Icon
                                            style={styles.iconCenter}
                                            name='ios-play'
                                            size={20}
                                            color='#fff'
                                        />
                                        <Text style={styles.label}>Tiếp tục</Text>
                                    </TouchableOpacity> : null)
                            }
                                
                        </TouchableOpacity>
                    </View> */}
                    
                    {/* {this.props.user.type == 0 ?
                        <View style={styles.right}>
                            <TouchableOpacity 
                                style={styles.iconRightWrapper}
                                onPress={() => 
                                    this.props.navigation.navigate('DeleteDomain', {
                                        domain: this.props.domain,
                                        token: this.state.token,
                                        navigation: this.props.navigation,
                                        refreshList: this.props.refreshList
                                    })
                                }
                            >
                                <Icon
                                    style={styles.iconRight}
                                    name='ios-trash'
                                    size={20}
                                    color='#fff'
                                />
                                <Text style={styles.label}>Xóa</Text>
                            </TouchableOpacity>
                        </View> : null
                    } */}
                </View>
            </View>
        );
    }
}
