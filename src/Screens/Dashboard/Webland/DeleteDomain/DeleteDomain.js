import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView } from 'react-native';
import { styles } from './css';
import ButtonIndex from '../../../../Components/Elements/Button/Button';
import { blue, orange } from '../../../../Components/Elements/Color/Color';
import { loading } from '../../../../Helpers/Functions';
import postDeleteDomain from '../../../../Api/postDeleteDomain';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class DeleteDomain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.delete = this.delete.bind(this);
        this.back = this.back.bind(this);
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

    back() {
        this.props.navigation.goBack()
    }

    delete() {
        Alert.alert(
            'Xóa domain',
            'Bạn có chắc chắn muốn xóa domain này',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: async () => {
                    this.setState({ loaded: false })
                    const res = await postDeleteDomain(
                        this.state.token,
                        this.props.route.params.domain.id
                    );
                    
                    setTimeout(async() => {
                        this.setState({ loaded: true })
                        if(res.status == 200) {
                            const resJson = await res.json();
                            if(resJson.code == 200) {
                                this.props.route.params.refreshList();
                                Alert.alert(
                                    'Thông báo',
                                    resJson.message,
                                    [
                                        {text: 'Đồng ý', onPress: () => { 
                                            this.props.route.params.navigation.navigate('Main');
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
                }},
            ],
            { cancelable: false }
          )
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null } 
                    <View style={styles.container}>
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>   
                                    :  
                                <View style={{alignItems: 'center'}}>
                                    <View style={styles.deleteLogo}>
                                        <Image 
                                            source={require('../../../../Assets/Image/delete.png')}
                                        />
                                    </View>
                                    <View style={styles.alert}>
                                        <Text style={styles.alertText}>Hãy cân nhắc! Việc xóa website sẽ làm mất toàn bộ dữ liệu mà không thể lấy lại được</Text>
                                    </View>            
                                    <View style={styles.input}>
                                        <CustomInput
                                            label='Website'
                                            editable={false}
                                            oldValue={this.props.route.params.domain.domain}
                                            hideshowText={false}
                                            width={width/1.16 - 10}
                                            marginLeft={10}
                                        />
                                    </View>
                                    <View style={styles.deleteButton}>
                                        <ButtonIndex 
                                            color={orange}
                                            label='XÓA WEBSITE'
                                            action={this.delete}
                                        />
                                    </View>
                                    <View style={styles.backButton}>
                                        <ButtonIndex 
                                            color={blue}
                                            label='QUAY LẠI'
                                            action={this.back}
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
