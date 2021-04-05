import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './css';
import { loading } from '../../../../../Helpers/Functions';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';
import CustomInput from '../../../../../Components/Elements/CustomInput/CustomInput';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../../Components/Elements/Color/Color';
import ButtonIndex from '../../../../../Components/Elements/Button/Button';
import DocumentPicker from 'react-native-document-picker';
import postCreateBrandName from '../../../../../Api/postCreateBrandName';

export default class CreateBrandName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false,
            files: [],
            fileSize: 0
        };
        this._isMounted = false;
        this.create = this.create.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
        });

        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true });
        }, 2000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
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

    delete(file) {
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

    async create() {
        this.setState({ loaded: false });
        if(!this.state.name || this.state.name == '') {
            this.setState({ loaded: true });
            Alert.alert('Thông báo', 'Vui lòng nhập tên brandname')
        }
        else if(this.state.files.length == 0) {
            this.setState({ loaded: true });
            Alert.alert('Thông báo', 'Vui lòng gửi hợp đồng đính kèm')
        }
        else {
            const res = await postCreateBrandName(
                this.state.token,
                this.state.name,
                this.state.files
            );
            console.log('res', res)    
            setTimeout(async() => {
                this.setState({loaded: true});

                if(res.status == 200) {
                    const resJson = await res.json();
                    console.log('resJson', resJson)
                    if(resJson.code == 200) {
                        this.props.route.params.refreshList();                
                        Alert.alert(
                            'Thông báo',
                            resJson.message + "\n\n" +
                            'Bạn có muốn quay lại trang danh sách khách hàng ?',
                            [
                                {text: 'Không', style: 'cancel', onPress: () => { 
                                    this.childBrandName.clearOldInput(),
                                    this.setState({
                                        files: [],
                                        fileSize: 0
                                    }) 
                                }},
                                {text: 'Đồng ý', onPress: () => {
                                    this.props.route.params.navigation.goBack();
                                }}
                            ],
                            {cancelable: true}
                        );
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
            }, 1000);
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container} >
                    { !this.state.loaded ? loading() : null }
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>
                                    :
                                <View>
                                    <View style={styles.brandName}>
                                        <CustomInput
                                            label='Tên brandname'
                                            name='name'
                                            editable={true}
                                            setValue={this.setValue}
                                            hideshowText={false}
                                            required={true}
                                            width={width/1.16 - 40}
                                            marginLeft={10}
                                            btnGroupWidth={30}
                                            length={40}
                                            placeholder='Nhập tên brandname...'
                                            onRef={ref => (this.childBrandName = ref)}
                                        />
                                    </View>

                                    <View style={styles.uploadFile}>
                                        <View style={styles.header}>
                                            <View style={styles.left}>
                                                <Text style={styles.label}>Hợp đồng đính kèm <Text style={styles.red}>(Max 25MB)</Text></Text>
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.total}>Total: {Math.round(this.state.fileSize/(1024*1024) * 100) / 100} MB</Text>
                                            </View>
                                        </View>
                                        <View style={styles.upload}>
                                            <TouchableOpacity 
                                                style={styles.uploadIcon}
                                                onPress={() => this.upload()}
                                            >
                                                <Icon
                                                    name='ios-cloud-upload'
                                                    color={blue}
                                                    size={30}
                                                />
                                            </TouchableOpacity>
                                            <Text style={styles.uploadText}>Click để chọn file</Text>

                                            <View style={styles.underline}></View>

                                            <View style={styles.listFileUpLoad}>
                                                {this.state.files.map((file, key) => {
                                                return (
                                                    <View style={styles.attachFile} key={key}>
                                                        <View style={styles.attachLeft}>
                                                            <Icon 
                                                                name={file.type == 'image/jpeg' || 'jpg' || 'png' ? 'ios-image' : 'ios-document-text'}
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
                                                                size={20}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.buttonCreate}>
                                        <ButtonIndex
                                            color={blue}
                                            label='THÊM MỚI BRANDNAME'
                                            action={this.create}
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
