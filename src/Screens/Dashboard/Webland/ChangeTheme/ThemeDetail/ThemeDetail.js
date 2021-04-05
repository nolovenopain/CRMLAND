import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Linking, Alert } from 'react-native';
import { styles } from './css';
import{ loading } from "../../../../../Helpers/Functions";
import ButtonIndex from '../../../../../Components/Elements/Button/Button';
import { blue } from '../../../../../Components/Elements/Color/Color';
import postChangeTheme from '../../../../../Api/postChangeTheme';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class ThemeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.changeTheme = this.changeTheme.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
        });

        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async changeTheme() {
        this.setState({ loaded: false })
        const res = await postChangeTheme(
            this.state.token,
            this.props.route.params.domain.id,
            this.props.route.params.theme.id
        );
        
        setTimeout(async() => {
            this.setState({ loaded: true })
            if(res.status == 200) {
                const resJson = await res.json();
                if(resJson.code == 200) {
                    this.props.route.params.refresh();
                    this.props.route.params.refreshList();
                    Alert.alert(
                        'Thông báo',
                        resJson.message,
                        [
                            {text: 'Đồng ý', onPress: () => {
                                this.props.route.params.navigation.goBack();
                            }}
                        ],
                    );
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
                this.setState({ requestOpenAppAgain: true })
                Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
            }  
        }, 1000);
    }

    seeDemo() {
        Linking.openURL('tel:')
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        (this.state.requestOpenAppAgain ? 
                            <View style={{ marginTop: -70 }}>
                                <RequestOpenAppAgain/>  
                            </View>
                                : 
                            <View style={styles.background}>
                                <View style={styles.content}>
                                    <Text style={styles.title}>{this.props.route.params.theme.display_name}</Text>
                                    <Text style={styles.code}>Mã theme: #{this.props.route.params.theme.name}</Text>
                                </View>
                                <Image
                                    style={styles.image}
                                    source={{ uri: 'https://crmland.vn' + this.props.route.params.theme.image_url }}
                                />
                                <View>
                                    <ButtonIndex
                                        label='ĐỔI GIAO DIỆN'
                                        color={blue}
                                        action={this.changeTheme}
                                    />
                                </View>
                            </View>)
                            :
                        <InternetConnecNotification/>
                    }
                </View>
            </ScrollView>
        );
    }
}
