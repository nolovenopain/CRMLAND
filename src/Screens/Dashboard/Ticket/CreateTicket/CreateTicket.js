import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TouchableWithoutFeedback, Modal } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import ButtonIndex from '../../../../Components/Elements/Button/Button';
import { blue, orange } from '../../../../Components/Elements/Color/Color';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import postCreateTicket from '../../../../Api/postCreateTicket';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import SingleSelect from '../../../../Components/Elements/SingleSelect/SingleSelect';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class TicketDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            ticketType: '',
            images: [],
            fileSize: 0,
            token: this.props.route.params.token,
            type: [],
            imageUri: '',
            modalShowImageVisible: false,
            modalPickerVisible: false,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.returnTicketTypeData = this.returnTicketTypeData.bind(this);
        this.hideModalImage = this.hideModalImage.bind(this);
        this.create = this.create.bind(this);
        this.cancel = this.cancel.bind(this);
        this.showModalPicker = this.showModalPicker.bind(this);
        this.hideModalPicker = this.hideModalPicker.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.pickPhotoFromLibrary = this.pickPhotoFromLibrary.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const items = [];
                Object.entries(this.props.route.params.list_type).map(([key, type]) => {
                    items.push({
                        name: type,
                        id: key
                    })
                })
                this.setState({ type: items });
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

    showModalImage(image) {
        this.setState({ 
            modalShowImageVisible: true, 
            imageUri: image.path 
        });
    }

    hideModalImage() {
        this.setState({ modalShowImageVisible: false });
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
            if((image.size + this.state.fileSize)/(1024*1024) > 10) {
                Alert.alert('Error !!!', 'Tổng dung lượng ảnh đính kèm vượt quá dung lượng cho phép')
            }
            else {
                let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                image.filename = path.split("/").pop();
                this.setState({ 
                    images: [...this.state.images,image], 
                    fileSize: this.state.fileSize + image.size,
                    modalPickerVisible: false
                }) 
            } 
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    pickPhotoFromLibrary() {
        ImagePicker.openPicker({
            mediaType: 'photo',
            multiple: true,
            compressImageQuality: 0.3
        }).then(images => {
            var checkType = true;
            images.map((value, key) => { 
                if(!value.mime) {
                    checkType = false;
                }
            });
            if(!checkType) {
                Alert.alert('Error !!!', 'Ảnh vừa chọn không đúng định dạng. Vui lòng chọn ảnh khác !!!')
            } 
            else {
                var fileSize = 0;
                images.map((value, key) => {
                    fileSize = fileSize + value.size
                })
                if((fileSize + this.state.fileSize)/(1024*1024) > 10) {
                    Alert.alert('Error !!!', 'Tổng dung lượng ảnh đính kèm vượt quá dung lượng cho phép')
                } 
                else {
                    images.map((image, key) => { 
                        let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                        image.filename = path.split("/").pop();
                    })
                    this.setState({ 
                        images: [...this.state.images,...images], 
                        fileSize: this.state.fileSize + fileSize,
                        modalPickerVisible: false
                    }) 
                } 
            }
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    deleteImage = (image) => { 
        var arrayImage = [...this.state.images];
        var index = -1;
        for(let i=0; i<arrayImage.length; i++) {
            if(arrayImage[i] == image) {
                index = i;
                break;
            }
        }
        var fileSize = arrayImage[index].size;
        if(index != -1) {
            arrayImage.splice(index, 1);
            this.setState({ 
                images: arrayImage, 
                fileSize: this.state.fileSize - fileSize
            })
        }
    }

    async create() {
        this.setState({ loaded: false })
        if(this.state.title == undefined || this.state.title == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề')
        }  
        else {
            var ticketType;
            if(this.state.ticketType == '') {
                ticketType = '1';
            }
            else {
                ticketType = this.state.ticketType
            }
            const res = await postCreateTicket(
                this.state.token,
                this.state.title,
                ticketType,
                this.state.content ? this.state.content : null,
                this.state.images
            );
            console.log(res)
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json(); 
                    if(resJson.code == 200) {
                        this.props.route.params.refresh();
                        Alert.alert(
                            'Thông báo',
                            resJson.message + "\n\n" +
                            'Bạn có muốn quay lại trang danh sách ticket ?',
                            [
                                {text: 'Không', style: 'cancel', onPress: () => {
                                    this.childTitle.clearOldInput();
                                    this.childContent.clearOldInput();
                                    this.childTypeOfTicket.refreshAfterCreate();
                                }},
                                {text: 'Đồng ý', onPress: () => {
                                    this.props.route.params.navigation.goBack();
                                }}
                            ],
                            {cancelable: true}
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

    cancel() {
        this.props.route.params.navigation.goBack()
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }
    
    returnTicketTypeData(selectType) {
        if(Object.keys(selectType).length > 0) {
            this.setState({ ticketType: selectType.id })
        }
        else {
            this.setState({ selectText: '' })
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
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.header}>
                                        <View style={styles.input}>
                                            <CustomInput
                                                label='Tiêu đề Ticket'
                                                name='title'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                required={true}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập tiêu đề ticket...'
                                                onRef={ref => (this.childTitle = ref)}
                                            />
                                        </View>
                                        <View style={styles.picker}>
                                            <Text style={styles.pickerLabel}>Loại Ticket</Text>
                                            <SingleSelect
                                                selectText={this.state.type[0].name}
                                                placeholder='Tìm loại ticket...'
                                                items={this.state.type}
                                                returnData={this.returnTicketTypeData}
                                                onRef={ref => (this.childTypeOfTicket = ref)}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.description}>
                                        <CustomInput
                                            label='Nội dung Ticket'
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
                                            placeholder='Nhập nội dung ticket...'
                                            onRef={ref => (this.childContent = ref)}
                                        />
                                    </View>

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
                                    
                                    <View style={styles.attach}>
                                        <View style={styles.attachTextWrapper}>
                                            <Text style={styles.attachText}>Đính kèm hình ảnh <Text style={styles.red}> (Max 10MB)</Text></Text>
                                        </View>
                                        <View style={styles.totalWrapper}>
                                            <Text style={styles.total}>Total: {Math.round(this.state.fileSize/(1024*1024) * 100) / 100} MB</Text>
                                        </View>
                                    </View>
                                    <View style={styles.upload}> 
                                        <TouchableOpacity 
                                            style={styles.uploadIcon}
                                            onPress={this.showModalPicker}
                                        >
                                            <Icon
                                                name='ios-cloud-upload'
                                                color={blue}
                                                size={35}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.uploadText}>Click để chọn ảnh</Text>

                                        <View style={styles.underline}></View>

                                        <View style={styles.listFileUpLoad}>
                                            {this.state.images.map((image, key) => {
                                                return  <View key={key}>
                                                            <Modal
                                                                visible={this.state.modalShowImageVisible}
                                                                transparent={true}
                                                            >
                                                                <TouchableWithoutFeedback onPressOut={this.hideModalImage}>   
                                                                    <View style={styles.modal}>
                                                                        <Image source={{ uri: this.state.imageUri }} style={styles.fullImage}/>
                                                                    </View>  
                                                                </TouchableWithoutFeedback>
                                                            </Modal>
                                                            <View style={styles.attachFile}>
                                                                <TouchableOpacity 
                                                                    style={styles.attachLeft}
                                                                    onPress={() => this.showModalImage(image)}
                                                                >   
                                                                    <View style={styles.imgIcon}>
                                                                        <Icon 
                                                                            name='ios-image'
                                                                            color={orange}
                                                                            size={18}
                                                                        />
                                                                    </View>
                                                                    <View style={styles.imgName}>
                                                                        <Text 
                                                                            style={styles.fileName}
                                                                            numberOfLines={1}
                                                                            ellipsizeMode='tail'
                                                                        >
                                                                            {image.filename}
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                <View style={styles.deleteFile}>
                                                                    <TouchableOpacity onPress={() => this.deleteImage(image)}>
                                                                        <Icon
                                                                            name='ios-trash'
                                                                            color={orange}
                                                                            size={20}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View >
                                                            </View>
                                                        </View>
                                                    }
                                                )
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.sendBtn}>
                                        <ButtonIndex 
                                            color={blue}
                                            label='TẠO TICKET'
                                            action={this.create}
                                        />
                                    </View>
                                    <View style={styles.cancelBtn}>
                                        <ButtonIndex 
                                            color={orange}
                                            label='HỦY BỎ'
                                            action={this.cancel}
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
