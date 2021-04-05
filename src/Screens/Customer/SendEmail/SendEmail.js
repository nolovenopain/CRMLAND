import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, RefreshControl } from 'react-native';
import { styles } from './css';
import Input from '../../../Components/Elements/Input/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../Components/Elements/Button/Button'
import { ScrollView } from 'react-native-gesture-handler';
import { loading } from '../../../Helpers/Functions';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../Components/Elements/Color/Color';
import DocumentPicker from 'react-native-document-picker';
import { checkPrefixEmailValidate } from '../../../Helpers/RegularExpression';
import postCreateEmailSender from '../../../Api/postCreateEmailSender';
import postSendEmail from '../../../Api/postSendEmail';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import postUpLoadManyFiles from '../../../Api/postUpLoadManyFiles';
import getEmailSender from '../../../Api/getEmailSender';
import SingleSelect from '../../../Components/Elements/SingleSelect/SingleSelect';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            files: [],
            fileSize: 0,
            modalVisible: false,
            domainTail: '@crmland.vn',
            emailSenderList: [],
            email_sender_id: '',
            items: [],
            token: this.props.route.params.token,
            isInternetReachable: false,
            refreshScreen:false,
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.createEmailSender = this.createEmailSender.bind(this);
        this.showModalAddEmail = this.showModalAddEmail.bind(this);
        this.returnEmailSenderData = this.returnEmailSenderData.bind(this);
        this.upload = this.upload.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getEmailSender(this.state.token);
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

    async upload() {
        try {
            const result = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            
            var fileSize = this.state.fileSize + result.size

            if(fileSize/(1024*1024) <= 25) {
                var newArray = [...this.state.files, result]
                this.setState({ 
                    files: newArray,
                    fileSize: fileSize
                }) 
            }
            else {
                Alert.alert('Error !!!', 'Tổng dung lượng file đính kèm vượt quá dung lượng cho phép')
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }

    delete = (file) => {
        var arrayFile = [...this.state.files];
        var index = -1;
        for(let i=0; i<arrayFile.length; i++) {
            if(arrayFile[i] == file) {
                index = i;
                break;
            }
        }
        var fileSize = arrayFile[index].size;
        if(index != -1) {
            arrayFile.splice(index, 1);
            this.setState({ 
                files: arrayFile, 
                fileSize: this.state.fileSize - fileSize
            })
        }
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }

    showModalAddEmail() {
        this.setState({ modalVisible: true })
    }

    async getEmailSender(token) {
        const res = await getEmailSender(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ emailSenderList: resJson.data.data }, () => {
                    const items = []
                    this.state.emailSenderList.map((sender, key) => {
                        items.push({
                            name: sender.email,
                            id: sender.id
                        })
                    });
                    this.setState({ items: items })
                    this.childEmail.refreshListItems(items);
                })
            }
            else if(resJson.code == 204) {
                console.log('Error!!!', resJson.message)
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

    async createEmailSender() {
        this.setState({ loaded: false })
        const check = checkPrefixEmailValidate(this.state.emailSender)
        if(check) {
            const res = await postCreateEmailSender(
                this.state.token, 
                this.state.nameSender, 
                this.state.emailSender
            );
            
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {   
                        this.getEmailSender(this.state.token);
                        this.childNameSender.clearOldInput();
                        this.childEmailSender.clearOldInput();
                        Alert.alert(
                            'Thông báo', 
                            resJson.message,
                            [
                                {text: 'Đồng ý', onPress: () => {
                                    this.setState({ modalVisible: false });
                                }}
                            ]
                        ); 
                    } 
                    else if(resJson.code == 204) {
                        console.log('Error!!!', resJson.message)
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
        else {
            this.setState({ loaded: true })
            Alert.alert('Error !!!', 'Sai định dạng email')
        } 
    }

    returnEmailSenderData(emailSender) {
        this.setState({ email_sender_id: emailSender.id })
    }

    async sendEmail() {
        this.setState({ loaded: false });
        if(this.state.email_sender_id == '' || this.state.email_sender_id == null) {
            this.setState({ loaded: true });
            Alert.alert('Thông báo', 'Vui lòng chọn email gửi')
        }
        else if(this.state.subject == undefined || this.state.subject == '') {
            this.setState({ loaded: true });
            Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề email')
        }
        else if(this.state.content == undefined || this.state.content == '') {
            this.setState({ loaded: true });
            Alert.alert('Thông báo', 'Vui lòng nhập nội dung email')
        }
        else {
            const file_id = [];
            if(this.state.files.length > 0) {
                const resUpLoadFile = await postUpLoadManyFiles(this.state.token, this.state.files);
                if(resUpLoadFile.status == 200) {
                    const resJsonUpLoadFile = await resUpLoadFile.json();
                    if(resJsonUpLoadFile.code == 200) { 
                        resJsonUpLoadFile.data.success.map((value, key) => { 
                            file_id.push(value.id)
                        })
                    }
                    else if(resJsonUpLoadFile.code == 204) {
                        Alert.alert('Error !!!', resJsonUpLoadFile.message)
                    }
                }
                else if(resUpLoadFile.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(resUpLoadFile.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }      
                
            }

            const customer_id = [this.props.route.params.customer.id];
            const resSendEmail = await postSendEmail(
                this.state.token,
                this.state.email_sender_id,
                this.props.route.params.user.email,
                customer_id,
                this.state.subject,
                this.state.content,
                file_id
            );
            
            setTimeout(async() => {
                this.setState({ loaded: true });
                if(resSendEmail.status == 200) {
                    const resJsonSendEmail = await resSendEmail.json();
                    if(resJsonSendEmail.code == 200) {
                        this.props.route.params.refreshList();
                        // this.childEmail.refreshAfterCreate();
                        // this.childTopic.clearOldInput();
                        // this.childContent.clearOldInput();
                        Alert.alert(
                            'Thông báo', 
                            resJsonSendEmail.message, 
                            [
                                {text: 'OK', onPress: () => {
                                    this.props.route.params.navigation.goBack()
                                }}
                            ]
                        ); 
                    } 
                    else if(resJsonSendEmail.code == 204) {
                        if(resJsonSendEmail.message.includes('<')) {
                            const index = resJsonSendEmail.message.indexOf('<');
                            Alert.alert('Error !!!', resJsonSendEmail.message.slice(0, index))
                        }
                        else {
                            Alert.alert('Error !!!', resJsonSendEmail.message)
                        } 
                    }
                    else if(resJsonSendEmail.errors) {
                        console.log(resJsonSendEmail)   
                    }
                }      
                else if(resSendEmail.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(resSendEmail.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }      
            }, 1000);  
        }
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async onRefresh() {
        this.setState({ refreshScreen: true });
        this.getEmailSender(this.state.token);
        this.props.route.params.refreshList();
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
                                        <Modal
                                            animationType="slide"
                                            visible={this.state.modalVisible}
                                            transparent={true}
                                        >
                                            <View style={styles.modal}>
                                                <View style={styles.modalView}>
                                                    <Text style={styles.title}>Tạo mới Email</Text>
                                                    <View style={styles.nameSender}>
                                                        <Input
                                                            label='Tên người gửi'
                                                            name='nameSender'
                                                            editable={true}
                                                            marginLeft={width/1.3}
                                                            setValue={this.setValue}
                                                            width={width/1.3}
                                                            length={45}
                                                            onRef={ref => (this.childNameSender = ref)}
                                                        />
                                                    </View>
                                                    <View style={styles.emailSenderWrapper}>
                                                        <View style={styles.emailSender}>
                                                            <Input
                                                                label='Email'
                                                                name='emailSender'
                                                                editable={true}
                                                                marginLeft={width/2}
                                                                setValue={this.setValue}
                                                                keyboardType='email-address'
                                                                width={width/2.2}
                                                                length={25}
                                                                onRef={ref => (this.childEmailSender = ref)}
                                                            />
                                                        </View>
                                                        <View style={styles.domainNameWrapper}>
                                                            <Text style={styles.domainName}>{this.state.domainTail}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.btnGroup}>
                                                        <View style={styles.createEmailWrapper}>
                                                            <TouchableOpacity
                                                                style={styles.createEmailBtn}
                                                                onPress={this.createEmailSender}
                                                            >
                                                                <Text style={styles.createEmailLabel}>Tạo email</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.cancelWrapper}>
                                                            <TouchableOpacity 
                                                                style={styles.cancelBtn}
                                                                onPress={() => this.setState({ modalVisible : false })}
                                                            >
                                                                <Text style={styles.cancelLabel}>Hủy</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                        <View style={styles.addEmailWrapper}>
                                            <TouchableOpacity 
                                                style={styles.addEmailBtn}
                                                onPress={this.showModalAddEmail}
                                            >
                                                <Text style={styles.addEmailLabel}>Thêm email</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.picker}>
                                            <Text style={styles.label}>Email gửi</Text>
                                            <SingleSelect
                                                selectText="Chọn email..."
                                                placeholder='Tìm email...'
                                                items={this.state.items}
                                                returnData={this.returnEmailSenderData}
                                                onRef={ref => (this.childEmail = ref)}
                                            />
                                        </View>
                                        <View style={styles.customInput}>
                                            <CustomInput
                                                label='Email nhận reply'
                                                editable={false}
                                                oldValue={this.props.route.params.user.email}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                                multiline={true}
                                            />
                                        </View>
                                        <View style={styles.customInput}>
                                            <CustomInput
                                                label='Gửi tới'
                                                editable={false}
                                                oldValue={this.props.route.params.customer.email}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                                multiline={true}
                                            />
                                        </View>
                                        <View style={styles.customInput}>
                                            <CustomInput
                                                label='Chủ đề'
                                                name='subject'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                required={true}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập chủ đề...'
                                                onRef={ref => (this.childTopic = ref)}
                                            />
                                        </View>
                                        <View style={styles.inputContent}>
                                            <CustomInput
                                                label='Nội dung'
                                                name='content'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                required={true}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                multiline={true}
                                                placeholder='Nhập nội dung...'
                                                onRef={ref => (this.childContent = ref)}
                                            />
                                        </View>
                                        <View style={styles.uploadFileWrapper}>
                                            <TouchableOpacity
                                                style={styles.uploadFile} 
                                                onPress={this.upload}
                                            >
                                                <Icon
                                                    style={styles.icon}
                                                    name='ios-attach'
                                                    size={20}
                                                    color='#999999'    
                                                />
                                            <Text style={styles.uploadText}>Click để tải lên file đính kèm <Text style={styles.red}>(Max 25MB)</Text></Text>
                                            </TouchableOpacity>
                                            <Text style={styles.total}>Total: {Math.round(this.state.fileSize/(1024*1024) * 100) / 100} MB</Text>
                                        </View>
                                        <View>
                                            {this.state.files.map((file, key) => {
                                                return (
                                                    <View style={styles.attachFile} key={key}>
                                                        <View style={styles.attachLeft}>
                                                            <Icon 
                                                                name={file.type == 'image/jpeg' ? 'ios-image' : 'ios-paper'}
                                                                color={file.type == 'image/jpeg' ? orange : blue}
                                                                size={18}
                                                            />
                                                            <Text 
                                                                style={styles.fileName}
                                                                numberOfLines={1}
                                                                ellipsizeMode='tail'
                                                            >
                                                                {file.name}
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity 
                                                            style={styles.deleteFile}
                                                            onPress={() => this.delete(file)}
                                                        >
                                                            <Icon
                                                                name='ios-trash'
                                                                color={orange}
                                                                size={25}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <View style={styles.sendBtn}>
                                            <Button
                                                label='Gửi email'
                                                color={blue}
                                                action={this.sendEmail}
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

