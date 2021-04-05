import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, RefreshControl, TouchableWithoutFeedback, Modal } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import ButtonIndex from '../../../../Components/Elements/Button/Button';
import { blue } from '../../../../Components/Elements/Color/Color';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment/min/moment-with-locales';
import HTML from 'react-native-render-html';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import postCommentTicket from '../../../../Api/postCommentTicket';
import getTicketDetail from '../../../../Api/getTicketDetail';
import Checkbox from '../../../../Components/Elements/Checkbox/Checkbox';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';
import { orange } from '../../../../Components/Elements/Color/Color';

moment.locale('vi')

export default class TicketDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            images: [],
            fileSize: 0,
            token: this.props.route.params.token,
            comments: [],
            imageOldAttachedUri: '',
            imageOldCommentdUri: '',
            imageNewCommentdUri: '',
            modalOldAttachedVisible: false,
            modalOldCommentVisible: false,
            modalNewCommentVisible:false,
            isInternetReachable: false,
            refreshScreen: false,
            requestOpenAppAgain: false,
            modalPickerVisible: false  
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.hideOldAttachedModal = this.hideOldAttachedModal.bind(this);
        this.hideOldCommentImgModal = this.hideOldCommentImgModal.bind(this);
        this.hideNewCommentImgModal = this.hideNewCommentImgModal.bind(this);
        this.comment = this.comment.bind(this);
        this.setChecked = this.setChecked.bind(this);
        this.showModalPicker = this.showModalPicker.bind(this);
        this.hideModalPicker = this.hideModalPicker.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.pickPhotoFromLibrary = this.pickPhotoFromLibrary.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getDetail();
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

    showModalPicker() {
        this.setState({ modalPickerVisible: true });
    }

    hideModalPicker() {
        this.setState({ modalPickerVisible: false });
    }

    showOldAttachedModal(uri) {
        this.setState({ 
            modalOldAttachedVisible: true,
            imageOldAttachedUri: uri 
        })
    }

    hideOldAttachedModal() {
        this.setState({ modalOldAttachedVisible: false })
    }

    showOldCommentImgModal(uri) {
        this.setState({ 
            modalOldCommentVisible: true,
            imageOldCommentdUri: uri 
        })
    }

    hideOldCommentImgModal() {
        this.setState({ modalOldCommentVisible: false })
    }

    showNewCommentImgModal(image) {
        this.setState({ 
            modalNewCommentVisible: true,
            imageNewCommentdUri: image.path 
        })
    }

    hideNewCommentImgModal() {
        this.setState({ modalNewCommentVisible: false })
    }

    async getDetail() {
        const res = await getTicketDetail(
            this.state.token,
            this.props.route.params.ticket.id    
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ comments: resJson.data.comments })
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
    }

    async comment() {
        this.setState({ loaded: false })
        var closed = '';
        if(this.state.closed == true) {
            closed = 'on'
        }
        else if(this.state.closed == false) {
            closed = 'off'
        }

        if(this.state.content == undefined || this.state.content == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Nội dung không được bỏ trống')
        } else {
            const res = await postCommentTicket(
                this.state.token,
                this.props.route.params.ticket.id,
                this.state.content,
                this.state.images,
                closed
            );
            
            setTimeout(async() => {
                this.setState({ loaded: true })
                if(res.status == 200) {
                    const resJson = await res.json();
                    if(resJson.code == 200) {
                        this.props.route.params.refresh ? this.props.route.params.refresh() : null;
                        this.childContent.clearOldInput();
                        Alert.alert(
                            'Thông báo',
                            resJson.message + "\n\n" +
                            'Bạn có muốn quay lại trang danh sách ticket ?',
                            [
                                {text: 'Không', style: 'cancel', onPress: () => {
                                    this.getDetail();
                                }},
                                {text: 'Đồng ý', onPress: () => {
                                    this.getDetail();
                                    this.props.navigation.goBack();
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
                    .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(res.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }      
            }, 1000);
        }  
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
            })
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

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => {})
    }

    setChecked = (name, value) => {
        this.setState({ [name]: value }, () => {})
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async onRefresh() {
        this.setState({ refreshScreen: true });
        this.getDetail();
        this.props.route.params.refresh ? this.props.route.params.refresh() : null;
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() {
        var listImg = [];
        this.props.route.params.ticket.data != null ? listImg = this.props.route.params.ticket.data.file : null;
        return (
            <View>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
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
                                        <View style={styles.header}>
                                            <View style={styles.name}>
                                                <Text style={styles.ticketName}>{this.props.route.params.ticket.title}</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <CustomInput
                                                    label='Ngày gửi'
                                                    editable={false}
                                                    oldValue={
                                                        moment(this.props.route.params.ticket.created_at).format("H:mm") + ' - ' +
                                                        moment(this.props.route.params.ticket.created_at).format("DD/MM/YYYY")
                                                    }
                                                    width={width/1.16 - 10}
                                                    marginLeft={10}
                                                />
                                            </View>
                                            <View style={styles.info}>
                                                <CustomInput
                                                    label='Cập nhật cuối cùng'
                                                    editable={false}
                                                    oldValue={
                                                        moment(this.props.route.params.ticket.updated_at).format("H:mm") + ' - ' +
                                                        moment(this.props.route.params.ticket.updated_at).format("DD/MM/YYYY")
                                                    }
                                                    width={width/1.16 - 10}
                                                    marginLeft={10}
                                                />
                                            </View>
                                            <View style={styles.info}>
                                                <Text style={styles.label}>Nội dung yêu cầu</Text>
                                                <View style={styles.oldContent}>
                                                    <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10 }}>
                                                        <HTML
                                                            html={
                                                                this.props.route.params.ticket.content != null && this.props.route.params.ticket.content != 'null' ? this.props.route.params.ticket.content : '<p></p>'
                                                            } 
                                                            imagesMaxWidth={width/1.16}
                                                            tagsStyles={{p: {fontSize: 11, lineHeight: 20}, body: { fontSize: 11 }}}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.imgAttached}>
                                                <View style={styles.imgAttachedLabel}>
                                                    <Icon
                                                        name='ios-attach'
                                                        size={20}
                                                        color='#929caa'
                                                    />
                                                    <Text style={styles.label}>Tệp tin đính kèm</Text>
                                                </View>

                                                <View style={styles.showImg}>
                                                    {listImg.length > 0 ?
                                                        listImg.map((value, key) => {   
                                                            return (
                                                                <TouchableWithoutFeedback 
                                                                    onPress={() => this.showOldAttachedModal(value)}
                                                                    key={key}
                                                                >
                                                                    <View>
                                                                        <Modal
                                                                            visible={this.state.modalOldAttachedVisible}
                                                                            transparent={true}
                                                                        >
                                                                            <TouchableWithoutFeedback onPressOut={this.hideOldAttachedModal}>   
                                                                                <View style={styles.modal}>
                                                                                    <Image source={{ uri: 'http://crmland.vn' + this.state.imageOldAttachedUri }} style={styles.fullImage}/>
                                                                                </View>  
                                                                            </TouchableWithoutFeedback>
                                                                        </Modal>
                                                                        <View style={styles.showImgAttachedWrapper}>
                                                                            <Icon
                                                                                name='ios-image'
                                                                                size={30}
                                                                                color={orange} 
                                                                            />
                                                                            <View style={styles.attImgNameWrapper}>
                                                                                <Text style={styles.attImgName}>{value.slice(15)}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableWithoutFeedback>  
                                                            )   
                                                        }): null
                                                    } 
                                                </View>

                                            </View>
                                        </View>

                                        {this.state.comments.length > 0 ?
                                            this.state.comments.map((value, key) => {
                                                return(
                                                    <View style={styles.comment} key={key}>
                                                        <View style={styles.commentTitle}>
                                                            <Text style={styles.title}><Text style={styles.bold}>{value.creator.name}</Text>  đã trả lời - <Text style={{ color: blue }}>{moment.utc(value.created_at).local().startOf('seconds').fromNow()}</Text></Text>
                                                        </View>
                                                        <View style={styles.commentContent}>
                                                            <Text style={styles.content}>{value.content}</Text>
                                                        </View>
                                                        
                                                        <View style={styles.attachFile}>
                                                            {value.data != null ?
                                                                value.data.file.map((image, key) => {
                                                                    return <TouchableWithoutFeedback 
                                                                                onPress={() => this.showOldCommentImgModal(image)}
                                                                                key={key}
                                                                            >
                                                                                <View>
                                                                                    <Modal
                                                                                        visible={this.state.modalOldCommentVisible}
                                                                                        transparent={true}
                                                                                    >
                                                                                        <TouchableWithoutFeedback onPressOut={this.hideOldCommentImgModal}>   
                                                                                            <View style={styles.modal}>
                                                                                                <Image source={{ uri: 'http://crmland.vn' + this.state.imageOldCommentdUri }} style={styles.fullImage}/>
                                                                                            </View>  
                                                                                        </TouchableWithoutFeedback>
                                                                                    </Modal>

                                                                                    <View style={styles.showImgAttachedWrapper}>
                                                                                        <Icon
                                                                                            name='ios-image'
                                                                                            size={30}
                                                                                            color={orange} 
                                                                                        />
                                                                                        <View style={styles.attImgNameWrapper}>
                                                                                            <Text style={styles.attImgName}>{image.slice(15)}</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableWithoutFeedback> 
                                                                }) : null
                                                            }                                           
                                                        </View>
                                                    </View>
                                                )
                                            }) : null
                                        }            
                                        
                                        <View style={styles.reply}>
                                            <View style={styles.replyContent}>
                                                <Text style={[styles.title, styles.bold, styles.replyTitle]}>Phản hồi Ticket hỗ trợ</Text>
                                                <CustomInput
                                                    label='Nội dung trả lời'
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
                                                    <Text style={styles.total}>Total: {Math.round(this.state.fileSize/(1024*1024) * 100) / 100}MB</Text>
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
                                                        size={30}
                                                    />
                                                </TouchableOpacity>
                                                <Text style={styles.uploadText}>Click để chọn ảnh</Text>

                                                <View style={styles.underline}></View>
                                                
                                                <View style={styles.listFileUpLoad}>
                                                    {this.state.images.map((image, key) => {
                                                        return  <View key={key}>
                                                                    <Modal
                                                                        visible={this.state.modalNewCommentVisible}
                                                                        transparent={true}
                                                                    >
                                                                        <TouchableWithoutFeedback onPressOut={this.hideNewCommentImgModal}>   
                                                                            <View style={styles.modal}>
                                                                                <Image source={{ uri: this.state.imageNewCommentdUri }} style={styles.fullImage}/>
                                                                            </View>  
                                                                        </TouchableWithoutFeedback>
                                                                    </Modal>
                                                                    <View style={styles.attachNewFile}>
                                                                        <TouchableOpacity 
                                                                            style={styles.attachLeft}
                                                                            onPress={() => this.showNewCommentImgModal(image)}
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
                                                                            <TouchableOpacity 
                                                                                
                                                                                onPress={() => this.deleteImage(image)}
                                                                            >
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
                                                    label='GỬI PHẢN HỒI TICKET'
                                                    action={this.comment}
                                                />
                                            </View>
                                            <View style={styles.cancelBtn}>
                                                <Checkbox
                                                    name='closed'
                                                    setChecked={this.setChecked}
                                                    text='Đóng ticket'
                                                    checked={this.props.route.params.ticket.status == 4 ? true : false}
                                                />
                                            </View>
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