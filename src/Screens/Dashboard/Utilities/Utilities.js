import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import{ loading, fetchToken } from '../../../Helpers/Functions';
import { styles } from './css';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { blue } from '../../../Components/Elements/Color/Color';

export default class Utilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: '',
            isInternetReachable: false
        };
        this._isMounted = false;
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                this.setState({ token });
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

    render() {
        return (
            <View style={styles.container}>
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ? 
                        <View style={styles.menu}>
                            <TouchableOpacity 
                                style={styles.firstRow}
                                onPress={() => this.props.navigation.navigate('ContactForm', {
                                    token: this.state.token,
                                    navigation: this.props.navigation,
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-layers'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>FORM KHÁCH HÀNG</Text>
                                    <Text style={styles.bottomRowText}>Theo dõi và cấu hình form thông tin khách hàng</Text>
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.row}
                                onPress={() => this.props.navigation.navigate('ContactButton', {
                                    token: this.state.token,
                                    navigation: this.props.navigation,
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-cube'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>NÚT CHỨC NĂNG BĐS</Text>
                                    <Text style={styles.bottomRowText}>Cấu hình các nút (button) trên website của bạn</Text>
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.row}
                                onPress={() => this.props.navigation.navigate('ComingSoon', {
                                    token: this.state.token,
                                    navigation: this.props.navigation,
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-logo-google'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>ĐỒNG BỘ QUẢNG CÁO GOOGLE ADWORDS</Text>
                                    <Text style={styles.bottomRowText}>Đồng bộ dữ liệu quảng cáo google adwords lên CRMLAND</Text>
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.row}
                                onPress={() => this.props.navigation.navigate('ComingSoon', {
                                    token: this.state.token,
                                    navigation: this.props.navigation,
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-logo-facebook'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>ĐỒNG BỘ QUẢNG CÁO FACEBOOK</Text>
                                    <Text style={styles.bottomRowText}>Đồng bộ dữ liệu quảng cáo facebook lên CRMLAND</Text>
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.row}
                                onPress={() => this.props.navigation.navigate('BrandName',{
                                    token: this.state.token,
                                    navigation: this.props.navigation,
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-bookmarks'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>BRANDNAME SMS</Text>
                                    <Text style={styles.bottomRowText}>Khởi tạo Brandname SMS cho riêng bạn</Text>
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.row}
                                onPress={() => this.props.navigation.navigate('EmailSMTP',{
                                    token: this.state.token,
                                    navigation: this.props.navigation,
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-mail'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>CẤU HÌNH SMTP</Text>
                                    <Text style={styles.bottomRowText}>Tích hợp email của bạn để sử dụng trên CRMLAND</Text>
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                            :
                    <InternetConnecNotification/>
                }  
            </View>
        );
    }
}
