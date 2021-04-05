import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { styles } from './css';
import Button from '../../../Components/Elements/Button/Button'
import Checkbox from '../../../Components/Elements/Checkbox/Checkbox';
import { loading } from '../../../Helpers/Functions'
import { blue } from '../../../Components/Elements/Color/Color';
import postSendInfoProject from '../../../Api/postSendInfoProject';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import SingleSelect from '../../../Components/Elements/SingleSelect/SingleSelect';
import SingleSelectProject from '../../../Components/Elements/SingleSelect/SingleSelectProject';
import getListEmailCanSend from '../../../Api/getListEmailCanSend';
import { getReduceProjectList } from '../../../Api/getProjectList';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class SendProjectInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            fromEmail: '',
            listProject: this.props.route.params.listProject,
            token: this.props.route.params.token,
            listEmailCanSend: this.props.route.params.listEmailCanSend,
            isInternetReachable: false,
            refreshScreen: false,
            requestOpenAppAgain: false,
            items: [],
            selectProject: {},
            selectEmail: {},
            chooseProject: false,
            chooseEmail: false,
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.returnEmailData = this.returnEmailData.bind(this);
        this.returnProjectData = this.returnProjectData.bind(this);
        this.setChecked = this.setChecked.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const items = [];
                if(this.state.listEmailCanSend) {
                    if(this.state.listEmailCanSend.length > 0) {
                        this.state.listEmailCanSend.map((email, key) => {
                            if(email.sent && email.sent < 100) {
                                items.push({
                                    name: email.email,
                                    id: email.id,
                                    type: 2,
                                    sent: email.sent
                                })
                            }
                            else {
                                items.push({
                                    name: email.email,
                                    id: email.id,
                                    type: email.sent ? 2 : 1,
                                    sent: email.sent ? email.sent : null
                                })
                            }
                        });  
                    }
                }   
                this.setState({ items: items })
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

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }

    returnEmailData(selectEmail) { 
        this.setState({ selectEmail })
    }

    returnProjectData(selectProject) { 
        this.setState({ 
            selectProject,
            chooseProject: true 
        })
    }

    async send() {
        this.setState({ loaded: false });
        if(Object.keys(this.state.selectEmail).length == 0) {
            this.setState({ loaded: true });
            Alert.alert('Thông báo', 'Vui lòng chọn email')
        }
        else if(Object.keys(this.state.selectProject).length == 0) {
            this.setState({ loaded: true });
            Alert.alert('Thông báo', 'Vui lòng chọn dự án')
        }
        else {
            var file_contract = 0;
            if(this.state.file_contract == true) {
                file_contract = 1;
            } else {
                file_contract = 0;
            }
            var file_design = 0;
            if(this.state.file_design == true) {
                file_design = 1;
            } else {
                file_design = 0;
            }
            var file_marketing = 0;
            if(this.state.file_marketing == true) {
                file_marketing = 1;
            } else {
                file_marketing = 0;
            }
            const res = await postSendInfoProject(
                this.state.token,
                this.state.selectProject.id,
                this.state.selectEmail.id,
                file_contract,
                file_design,
                file_marketing,
                this.state.selectEmail.type,
                this.props.route.params.customer.id
            );
            
            setTimeout(async() => { 
                this.setState({ loaded: true });
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.props.route.params.refreshList();
                        this.childEmail.refreshAfterCreate();
                        this.childProject.refreshAfterCreate();
                        Alert.alert(
                            'Thông báo', 
                            resJson.message, 
                            [
                                {text: 'OK', onPress: () => {
                                    this.props.route.params.navigation.goBack()
                                }}
                            ]
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
                    this.setState({ requestOpenAppAgain: true });
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }    
            }, 1000);
        } 
    }

    setChecked = (name, value) => {
        this.setState({ [name]: value }, () => {})
    }

    async refreshListEmail() {
        const items = [];
        const res = await getListEmailCanSend(this.state.token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                resJson.data.map((email, key) => {
                    if(resJson.data.length > 0) {
                        if(email.sent && email.sent < 100) {
                            items.push({
                                name: email.email,
                                id: email.id,
                                type: 2,
                                sent: email.sent
                            })
                        }
                        else {
                            items.push({
                                name: email.email,
                                id: email.id,
                                type: email.sent ? 2 : 1,
                                sent: email.sent ? email.sent : null
                            })
                        }
                    }
                });
                this.setState({ items });
            } 
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message)
            }
            else if(resJson.errors) {
                console.log(resJson)   
            }
            this.childEmail.refreshListItems(items);
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

    async refreshReduceProjectList() {
        const res = await getReduceProjectList(this.state.token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.childProject.refreshListItems(resJson.data.data);
                this.setState({ listProject: resJson.data.data });
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
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async onRefresh() {
        this.refreshListEmail();
        this.refreshReduceProjectList();
        this.setState({ refreshScreen: true });
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() {
        return (
            <View>
                { !this.state.loaded ? loading() : null }
                    <View style={ styles.container }>
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>   
                                    :
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefresh} />
                                    }
                                    style={{ width: width }}
                                >  
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={styles.firstInput}>
                                            <CustomInput
                                                label='Tên khách hàng'
                                                oldValue={this.props.route.params.customer.fullname}
                                                editable={false}
                                                setValue={this.setValue}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Email'
                                                oldValue={this.props.route.params.customer.email}
                                                editable={false}
                                                setValue={this.setValue}
                                                width={width/1.16 - 10}
                                                marginLeft={10}
                                            />
                                        </View>
                                        <View style={styles.picker}>
                                            <Text style={styles.label}>Chọn Email</Text>
                                            <SingleSelect
                                                selectText="Chọn email..."
                                                placeholder='Tìm email...'
                                                items={this.state.items}
                                                returnData={this.returnEmailData}
                                                onRef={ref => (this.childEmail = ref)}
                                            />
                                        </View>
                                        <View style={styles.picker}>
                                            <Text style={styles.label}>Chọn dự án</Text>
                                            <SingleSelectProject
                                                selectText="Chọn dự án..."
                                                placeholder='Tìm dự án...'
                                                items={this.state.listProject}
                                                returnData={this.returnProjectData}
                                                token={this.state.token}
                                                onRef={ref => (this.childProject = ref)}
                                            />
                                        </View>
                                        <View style={styles.checkboxWrapper}>
                                            { this.state.selectProject.data == null ||
                                                Object.keys(this.state.selectProject).length == 0 ||  
                                                    (Object.keys(this.state.selectProject).length > 0 &&
                                                        (!this.state.selectProject.data.file_contract || this.state.selectProject.data.file_contract.length == 0) && 
                                                            (!this.state.selectProject.data.file_design || this.state.selectProject.data.file_design == 0) &&
                                                                (!this.state.selectProject.data.file_marketing || this.state.selectProject.data.file_marketing == 0)) ? null : <Text style={styles.checkboxTitle}>Loại tài liệu gửi</Text>  }

                                            { this.state.selectProject.data == null ? null :
                                                Object.keys(this.state.selectProject).length > 0 && this.state.selectProject.data.file_contract ? 
                                                    this.state.selectProject.data.file_contract.length > 0 ?
                                                        <View style={styles.checkbox}>
                                                            <Checkbox
                                                                text='Tên dự án'
                                                                setChecked={this.setChecked}
                                                                name='file_contract'
                                                                checked={false}
                                                            />
                                                        </View> : null : null
                                            }
                                            
                                            { this.state.selectProject.data == null ? null : 
                                                Object.keys(this.state.selectProject).length > 0 && this.state.selectProject.data.file_design ? 
                                                    this.state.selectProject.data.file_design.length > 0 ?
                                                        <View style={styles.checkbox}>
                                                            <Checkbox
                                                                text='Bảng giá'
                                                                setChecked={this.setChecked}
                                                                name='file_design'
                                                                checked={false}
                                                            />
                                                        </View> : null : null
                                            }
                                            

                                            { this.state.selectProject.data == null ? null : 
                                                Object.keys(this.state.selectProject).length > 0 && this.state.selectProject.data.file_marketing ? 
                                                    this.state.selectProject.data.file_marketing.length > 0 ?
                                                        <View style={styles.checkbox}>
                                                            <Checkbox
                                                                text='Chính sách bán hàng'
                                                                setChecked={this.setChecked}
                                                                name='file_marketing'
                                                                checked={false}
                                                            />
                                                        </View> : null : null
                                            }
                                            
                                        </View>
                                        <View style={styles.button}>
                                            <Button
                                                label='Gửi tài liệu dự án cho khách hàng'
                                                color={blue}
                                                action={this.send}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>)
                                    :
                            <InternetConnecNotification/>
                        }
                    </View>
            </View>
        );
    }
}

