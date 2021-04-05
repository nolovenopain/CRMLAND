import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, Alert, Modal } from 'react-native';
import { loading } from '../../../Helpers/Functions';
import { styles } from './css';
import ImagePicker from 'react-native-image-crop-picker';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import ButtonIndex from '../../../Components/Elements/Button/Button';
import { blue } from '../../../Components/Elements/Color/Color';
import { postUpdateUserInfoPersonal, postUpdateUserInfoBusiness } from '../../../Api/postUpdateUserInfo';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import { checkPhoneValidate } from '../../../Helpers/RegularExpression';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
import AsyncStorage from '@react-native-community/async-storage';

export default class AccountInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            avatar: null,
            token: this.props.route.params.token,
            uploadAvatar: null,
            isInternetReachable: false,
            changeAvatar: false,
            requestOpenAppAgain: false,
            modalPickerVisible: false,
        };
        this._isMounted = false;
        this.update = this.update.bind(this);
        this.showModalPicker = this.showModalPicker.bind(this);
        this.hideModalPicker = this.hideModalPicker.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.pickPhotoFromLibrary = this.pickPhotoFromLibrary.bind(this);
    }

    async componentDidMount() {
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

    showModalPicker() {
        this.setState({ modalPickerVisible: true });
    }

    hideModalPicker() {
        this.setState({ modalPickerVisible: false });
    }

    takePhoto() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.3
        }).then(image => {
                let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                image.filename = path.split("/").pop();
                this.setState({ 
                    avatar: image.path, 
                    uploadAvatar: image,
                    changeAvatar: true,
                    modalPickerVisible: false
                }) 
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    pickPhotoFromLibrary() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.3
        }).then(image => {
            if(!image.mime) {
                Alert.alert('Error !!!', 'Ảnh vừa chọn không đúng định dạng. Vui lòng chọn ảnh khác !!!')
            } 
            else {
                let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                image.filename = path.split("/").pop();
                this.setState({ 
                    avatar: image.path, 
                    uploadAvatar: image,
                    changeAvatar: true,
                    modalPickerVisible: false
                }) 
            }
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }

    async update() {
        this.setState({ loaded: false })
        if(this.state.uploadAvatar != null && !this.state.uploadAvatar.mime) {
            this.setState({ loaded: true })
            Alert.alert('Error !!!', 'Ảnh không đúng định dạng. Vui lòng chọn ảnh khác !!!')
        }
        else if(this.state.phone && !checkPhoneValidate(this.state.phone)) {
            this.setState({ loaded: true })
            Alert.alert('Error !!!', 'Số điện thoại không đúng')
        }
        else if(this.state.phone == '') {
            this.setState({ loaded: true })
            Alert.alert('Error !!!', 'Không được để trống số điện thoại')
        }
        else {
            var res;
            if(this.props.route.params.user.type == 0) {
                res = await postUpdateUserInfoPersonal(
                    this.state.token,
                    this.state.name == undefined ? (this.props.route.params.user.name != null ?  this.props.route.params.user.name : '') : this.state.name,
                    this.state.phone == undefined ? this.props.route.params.user.phone : this.state.phone,
                    this.state.address == undefined ? (this.props.route.params.user.address != null ? this.props.route.params.user.address : '') : this.state.address,
                    this.state.uploadAvatar,
                );
            }
            else {
                res = await postUpdateUserInfoBusiness(
                    this.state.token,
                    this.state.name == undefined ? (this.props.route.params.user.name != null ?  this.props.route.params.user.name : '') : this.state.name,
                    this.state.phone == undefined ? this.props.route.params.user.phone : this.state.phone,
                    this.state.address == undefined ? (this.props.route.params.user.address != null ? this.props.route.params.user.address : '') : this.state.address,
                    this.state.uploadAvatar,
                    this.state.company_buyer == undefined ? (this.props.route.params.user.company.buyer != null ?  this.props.route.params.user.company.buyer : '') : this.state.company_buyer,
                    this.state.company_name == undefined ? (this.props.route.params.user.company.name != null ? this.props.route.params.user.company.name : '') : this.state.company_name,
                    this.state.company_tax_code == undefined ? (this.props.route.params.user.company.tax_code != null ? this.props.route.params.user.company.tax_code : '') : this.state.company_tax_code,
                    this.state.company_address == undefined ? (this.props.route.params.user.company.address != null ? this.props.route.params.user.company.address : '') : this.state.company_address,
                    this.state.company_phone == undefined ? (this.props.route.params.user.company.phone != null ? this.props.route.params.user.company.phone : '') : this.state.company_phone,
                    this.state.company_represent_person == undefined ? (this.props.route.params.user.company.represent_person ? this.props.route.params.user.company.represent_person : '') : this.state.company_represent_person,
                    this.state.company_position == undefined ? (this.props.route.params.user.company.position ? this.props.route.params.user.company.position : '') : this.state.company_position
                );
            }
            
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.props.route.params.refreshUserInfo();
                        Alert.alert(
                            'Thông báo', 
                            resJson.message,
                            [
                                {text: 'OK', onPress: () => this.props.route.params.navigation.goBack()}
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
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
            }, 1000);
        } 
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
                                <View>
                                    <Modal
                                        visible={this.state.modalPickerVisible}
                                        transparent={true}
                                        animationType='slide'
                                    >   
                                        <View style={styles.modalBackground}>
                                            <View style={styles.modalPicker}>
                                                <View style={styles.imgPicker}>
                                                    <TouchableOpacity 
                                                        style={styles.takePhoto}
                                                        onPress={this.takePhoto}
                                                    >
                                                        <Text>Chụp ảnh</Text>
                                                    </TouchableOpacity>
                                                    <View style={styles.underlinePicker}></View>
                                                    <TouchableOpacity 
                                                        style={styles.libraryPhoto}
                                                        onPress={this.pickPhotoFromLibrary}
                                                    >
                                                        <Text>Chọn ảnh từ thư viện</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity 
                                                    style={styles.cancel}
                                                    onPress={this.hideModalPicker}
                                                >
                                                    <Text>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>

                                    <ImageBackground 
                                        style={styles.header}
                                        source={require('../../../Assets/Image/background.png')}
                                    >
                                        <TouchableOpacity 
                                            style={styles.avatar}
                                            onPress={this.showModalPicker}
                                        >   
                                            <Image 
                                                source={!this.state.changeAvatar ? 
                                                        (this.props.route.params.user.avatar != null ? { uri: 'https://crmland.vn' + this.props.route.params.user.avatar } : require('../../../Assets/Image/no_avatar.png')) 
                                                            : {uri: this.state.avatar}} 
                                                style={styles.avatarImage}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.fullname}>
                                            {this.props.route.params.user.name.toUpperCase()}
                                        </Text>
                                    </ImageBackground>

                                    <View style={styles.basicInfo}>
                                        <View style={styles.title}>
                                            <Text style={styles.titleText}>Thông tin cơ bản</Text>
                                        </View>
                                        
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Tên hiển thị'
                                                name='name'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.name}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập tên...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Email'
                                                editable={false}
                                                oldValue={this.props.route.params.user.email}
                                                width={width/1.16 - 20}
                                                marginLeft={10}
                                                multiline={true}
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Điện thoại'
                                                name='phone'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.phone}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                required={true}
                                                keyboardType='numeric'
                                                placeholder='Nhập số điện thoại...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Địa chỉ'
                                                name='address'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.address != null ? this.props.route.params.user.address : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                multiline={true}
                                                keyboardType='email-address'
                                                placeholder='Nhập địa chỉ...'
                                            />
                                        </View>
                                    </View>

                                    {this.props.route.params.user.type == 0 ? 
                                        null :
                                    <View style={styles.otherInfo}>
                                        <View style={styles.title}>
                                            <Text style={styles.titleText}>Thông tin xuất hóa đơn</Text>
                                        </View>

                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Người mua hàng'
                                                name='company_buyer'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.company != null ? this.props.route.params.user.company.buyer : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập tên người mua hàng...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Tên công ty'
                                                name='company_name'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.company != null ? this.props.route.params.user.company.name : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập tên công ty...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Mã số thuế'
                                                name='company_tax_code'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.company != null ? this.props.route.params.user.company.tax_code : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập mã số thuế...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Địa chỉ'
                                                name='company_address'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.company != null ? this.props.route.params.user.company.address : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                multiline={true}
                                                keyboardType='email-address'
                                                placeholder='Nhập địa chỉ...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Điện thoại liên hệ'
                                                name='company_phone'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.company != null ? this.props.route.params.user.company.phone : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                keyboardType='numeric'
                                                placeholder='Nhập số điện thoại...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Người đại diện'
                                                name='company_represent_person'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.company != null ? this.props.route.params.user.company.represent_person : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập người đại diện...'
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Chức vụ'
                                                name='company_position'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.user.company != null ? this.props.route.params.user.company.position : ''}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập chức vụ...'
                                            />
                                        </View>
                                    </View> }            
                                    
                                    <View style={styles.update}>
                                        <ButtonIndex
                                            label='CẬP NHẬT THAY ĐỔI'
                                            color={blue}
                                            action={this.update}
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