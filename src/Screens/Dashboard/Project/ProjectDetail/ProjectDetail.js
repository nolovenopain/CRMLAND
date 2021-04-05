import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { styles } from './css';
import { blue, orange } from '../../../../Components/Elements/Color/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonIndex from '../../../../Components/Elements/Button/Button';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import { loading } from '../../../../Helpers/Functions';
import DocumentPicker from 'react-native-document-picker';
import postUpdateProject from '../../../../Api/postUpdateProject';
import postUpLoadManyFiles from '../../../../Api/postUpLoadManyFiles';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain'

export default class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            filesContract: [],
            filesContractSize: 0,
            filesDesign: [],
            filesDesignSize: 0,
            filesMarketing: [],
            filesMarketingSize: 0,
            totalFilesSize: 0,
            token: this.props.route.params.token,
            oldFilesContract: [],
            oldFilesDesign: [],
            oldFilesMarketing: [],
            isInternetReachable: false,
            refreshScreen: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const oldFilesContract = [];
                var filesContractSize = 0;
                if(Object.keys(this.props.route.params.project.data).length > 0 && this.props.route.params.project.data.file_contract) {
                    this.props.route.params.project.data.file_contract.map((value, key) => {
                        oldFilesContract.push(value),
                        filesContractSize += Number(value.size)
                    });
                } 
                
                const oldFilesDesign = [];
                var filesDesignSize = 0;
                if(Object.keys(this.props.route.params.project.data).length > 0 && this.props.route.params.project.data.file_design) {
                    this.props.route.params.project.data.file_design.map((value, key) => {
                        oldFilesDesign.push(value),
                        filesDesignSize += Number(value.size)
                    });
                } 
        
                const oldFilesMarketing = [];
                var filesMarketingSize = 0;
                if(Object.keys(this.props.route.params.project.data).length > 0 && this.props.route.params.project.data.file_marketing) {
                    this.props.route.params.project.data.file_marketing.map((value, key) => {
                        oldFilesMarketing.push(value),
                        filesMarketingSize += Number(value.size)
                    });
                } 

                this.setState({ 
                    oldFilesContract,
                    oldFilesDesign,
                    oldFilesMarketing,
                    filesContractSize,
                    filesDesignSize,
                    filesMarketingSize,
                    totalFilesSize: filesContractSize + filesDesignSize + filesMarketingSize
                });
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
    
    async upload(fileType) {
        try {
            const result = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });

            var totalFilesSize = this.state.filesContractSize + this.state.filesDesignSize + this.state.filesMarketingSize + result.size;

            if(fileType == 'fileContract') {
                var filesContractSize = this.state.filesContractSize + result.size;

                if(totalFilesSize/(1024*1024) <= 25) {
                    var newArray = [...this.state.filesContract, result]
                    this.setState({ 
                        filesContract: newArray,
                        filesContractSize,
                        totalFilesSize
                    }) 
                }
                else {
                    Alert.alert('Error !!!', 'Tổng dung lượng file đính kèm vượt quá dung lượng cho phép')
                }
            }
            else if(fileType == 'fileDesign') {
                var filesDesignSize = this.state.filesDesignSize + result.size

                if(totalFilesSize/(1024*1024) <= 25) {
                    var newArray = [...this.state.filesDesign, result]
                    this.setState({ 
                        filesDesign: newArray,
                        filesDesignSize,
                        totalFilesSize
                    }) 
                }
                else {
                    Alert.alert('Error !!!', 'Tổng dung lượng file đính kèm vượt quá dung lượng cho phép')
                }
            }
            else if(fileType == 'fileMarketing') {
                var filesMarketingSize = this.state.filesMarketingSize + result.size

                if(totalFilesSize/(1024*1024) <= 25) {
                    var newArray = [...this.state.filesMarketing, result]
                    this.setState({ 
                        filesMarketing: newArray,
                        filesMarketingSize,
                        totalFilesSize
                    }) 
                }
                else {
                    Alert.alert('Error !!!', 'Tổng dung lượng file đính kèm vượt quá dung lượng cho phép')
                }
            }
            
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }

    delete(file, fileType) {
        if(fileType == 'fileContract') {
            var arrayFile = [...this.state.filesContract];
            var index = -1;
            for(let i=0; i<arrayFile.length; i++) {
                if(arrayFile[i] == file) {
                    index = i;
                    break;
                }
            }
            var fileContractSize = arrayFile[index].size;
            if(index != -1) {
                arrayFile.splice(index, 1);
                this.setState({ 
                    filesContract: arrayFile, 
                    filesContractSize: this.state.filesContractSize - fileContractSize,
                    totalFilesSize: this.state.totalFilesSize - fileContractSize
                })
            }
        }
        else if(fileType == 'oldFileContract') {
            var arrayFile = [...this.state.oldFilesContract];
            var index = -1;
            for(let i=0; i<arrayFile.length; i++) {
                if(arrayFile[i] == file) {
                    index = i;
                    break;
                }
            }
            var fileContractSize = arrayFile[index].size;
            if(index != -1) {
                arrayFile.splice(index, 1);
                this.setState({ 
                    oldFilesContract: arrayFile, 
                    filesContractSize: this.state.filesContractSize - fileContractSize,
                    totalFilesSize: this.state.totalFilesSize - fileContractSize
                })
            }
        }
        else if(fileType == 'fileDesign') {
            var arrayFile = [...this.state.filesDesign];
            var index = -1;
            for(let i=0; i<arrayFile.length; i++) {
                if(arrayFile[i] == file) {
                    index = i;
                    break;
                }
            }
            var fileDesignSize = arrayFile[index].size;
            if(index != -1) {
                arrayFile.splice(index, 1);
                this.setState({ 
                    filesDesign: arrayFile, 
                    filesDesignSize: this.state.filesDesignSize - fileDesignSize,
                    totalFilesSize: this.state.totalFilesSize - fileDesignSize
                })
            }
        }
        else if(fileType == 'oldFileDesign') {
            var arrayFile = [...this.state.oldFilesDesign];
            var index = -1;
            for(let i=0; i<arrayFile.length; i++) {
                if(arrayFile[i] == file) {
                    index = i;
                    break;
                }
            }
            var fileDesignSize = arrayFile[index].size;
            if(index != -1) {
                arrayFile.splice(index, 1);
                this.setState({ 
                    oldFilesDesign: arrayFile, 
                    filesDesignSize: this.state.filesDesignSize - fileDesignSize,
                    totalFilesSize: this.state.totalFilesSize - fileDesignSize
                })
            }
        }
        else if(fileType == 'fileMarketing') {
            var arrayFile = [...this.state.filesMarketing];
            var index = -1;
            for(let i=0; i<arrayFile.length; i++) {
                if(arrayFile[i] == file) {
                    index = i;
                    break;
                }
            }
            var fileMarketingSize = arrayFile[index].size;
            if(index != -1) {
                arrayFile.splice(index, 1);
                this.setState({ 
                    filesMarketing: arrayFile, 
                    filesMarketingSize: this.state.filesMarketingSize - fileMarketingSize,
                    totalFilesSize: this.state.totalFilesSize - fileMarketingSize
                })
            }
        }
        else if(fileType == 'oldFileMarketing') {
            var arrayFile = [...this.state.oldFilesMarketing];
            var index = -1;
            for(let i=0; i<arrayFile.length; i++) {
                if(arrayFile[i] == file) {
                    index = i;
                    break;
                }
            }
            var fileMarketingSize = arrayFile[index].size;
            if(index != -1) {
                arrayFile.splice(index, 1);
                this.setState({ 
                    oldFilesMarketing: arrayFile, 
                    filesMarketingSize: this.state.filesMarketingSize - fileMarketingSize,
                    totalFilesSize: this.state.totalFilesSize - fileMarketingSize
                })
            }
        }    
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }
    
    async update() {
        this.setState({loaded: false})
        if(this.state.name == '') {
            this.setState({loaded: true})
            Alert.alert('Thông báo', 'Vui lòng nhập tên dự án')
        }
        else {
            const fileContract_id = [];
            if(this.state.filesContract.length > 0) {
                const responseUpLoadFileContract = await postUpLoadManyFiles(this.state.token, this.state.filesContract);
                if(responseUpLoadFileContract.status == 200) {
                    const responseUpLoadFileContractJson = await responseUpLoadFileContract.json();
                    if(responseUpLoadFileContractJson.code == 200) { 
                        responseUpLoadFileContractJson.data.success.map((value, key) => { 
                            fileContract_id.push(value.id)
                        })
                    }
                    else if(responseUpLoadFileContractJson.code == 204) {
                        Alert.alert("Error !!!", responseUpLoadFileContractJson.message);
                    }
                }
                else if(responseUpLoadFileContract.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(responseUpLoadFileContract.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
            }
            if(this.state.oldFilesContract.length > 0) {
                this.state.oldFilesContract.map((value, key) => {
                    fileContract_id.push(value.id)
                })
            }
                
            const fileDesign_id = [];
            if(this.state.filesDesign.length > 0) {
                const responseUpLoadFileDesign = await postUpLoadManyFiles(this.state.token, this.state.filesDesign);
                if(responseUpLoadFileDesign.status == 200) {
                    const responseUpLoadFileDesignJson = await responseUpLoadFileDesign.json();
                    if(responseUpLoadFileDesignJson.code == 200) {
                        responseUpLoadFileDesignJson.data.success.map((value, key) => {
                            fileDesign_id.push(value.id)
                        })
                    }
                    else if(responseUpLoadFileDesignJson.code == 204) {
                        Alert.alert("Error !!!", responseUpLoadFileDesignJson.message);
                    }
                }
                else if(responseUpLoadFileDesign.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(responseUpLoadFileDesign.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
            }
            if(this.state.oldFilesDesign.length > 0) {
                this.state.oldFilesDesign.map((value, key) => {
                    fileDesign_id.push(value.id)
                })
            } 
                
            const fileMarketing_id = [];
            if(this.state.filesMarketing.length > 0) {
                const responseUpLoadFileMarketing = await postUpLoadManyFiles(this.state.token, this.state.filesMarketing);
                if(responseUpLoadFileMarketing.status == 200) {
                    const responseUpLoadFileMarketingJson = await responseUpLoadFileMarketing.json();
                    if(responseUpLoadFileMarketingJson.code == 200) {
                        responseUpLoadFileMarketingJson.data.success.map((value, key) => {
                            fileMarketing_id.push(value.id)
                        })
                    }
                    else if(responseUpLoadFileMarketingJson.code == 204) {
                        Alert.alert("Error !!!", responseUpLoadFileMarketingJson.message);
                    }
                }
                else if(responseUpLoadFileMarketing.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(responseUpLoadFileMarketing.status == 500) {
                    this.setState({ requestOpenAppAgain: true })
                    Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
                }
            }
            if(this.state.oldFilesMarketing.length > 0) {
                this.state.oldFilesMarketing.map((value, key) => {
                    fileMarketing_id.push(value.id)
                })
            }  
        
            const responseUpdateProject = await postUpdateProject(
                this.state.token,
                this.state.name == undefined ? this.props.route.params.project.name : this.state.name,
                this.state.description != undefined || this.state.description != null ? this.state.description : '',
                fileContract_id,
                fileDesign_id,
                fileMarketing_id,
                this.props.route.params.project.id
            );

            setTimeout(async() => {  
                if(responseUpdateProject.status == 200) {
                    this.setState({loaded: true})
                    const responseUpdateProjectJson = await responseUpdateProject.json();
                    if(responseUpdateProjectJson.code == 200) {
                        this.props.route.params.refreshList();
                        Alert.alert(
                            'Thông báo',
                            responseUpdateProjectJson.message + "\n\n" +
                            'Bạn có muốn quay lại trang danh sách dự án ?',
                            [
                                {text: 'Không', style: 'cancel'},
                                {text: 'Đồng ý', onPress: () => {
                                    this.props.route.params.navigation.goBack();
                                }}
                            ],
                            {cancelable: true}
                        );
                    } 
                    else if(responseUpdateProjectJson.code == 204) {
                        Alert.alert('Error !!!', responseUpdateProjectJson.message)
                    }
                    else if(responseUpdateProjectJson.errors) {
                        responseUpdateProjectJson.errors.name.map((error, key) => {
                            Alert.alert('Lỗi', error)
                        })    
                    }         
                }
                else if(responseUpdateProject.status == 401) {
                    Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                    AsyncStorage
                    .clear()
                    .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
                }
                else if(responseUpdateProject.status == 500) {
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
        this.componentDidMount();
        this.setState({ refreshScreen: true });
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() {
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
                                        <View style={styles.projectName}>
                                            <CustomInput
                                                label='Tên dự án'
                                                name='name'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.project.name}
                                                required={true}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập tên dự án...'
                                            />
                                        </View>
                                        <View style={styles.projectDescription}>
                                        <CustomInput
                                                label='Mô tả dự án'
                                                name='description'
                                                editable={true}
                                                setValue={this.setValue}
                                                hideshowText={false}
                                                oldValue={this.props.route.params.project.description}
                                                required={true}
                                                width={width/1.16 - 40}
                                                marginLeft={10}
                                                multiline={true}
                                                btnGroupWidth={30}
                                                length={40}
                                                placeholder='Nhập mô tả dự án...'
                                            />
                                        </View>

                                        <View style={styles.totalFilesSize}>
                                            <Text style={styles.total}>Total Size <Text style={styles.red}>(Max 25MB)</Text> : {Math.round(this.state.totalFilesSize/(1024*1024) * 100) / 100} MB</Text>
                                        </View>

                                        <View style={styles.uploadProjectContract}>
                                            <View style={styles.header}>
                                                <View style={styles.left}>
                                                    <Text style={styles.label}>Tài liệu dự án</Text>
                                                </View>
                                                {/* <View style={styles.right}>
                                                    <Text style={styles.totalContract}>Total: {Math.round(this.state.filesContractSize/(1024*1024) * 100) / 100} MB</Text>
                                                </View> */}
                                            </View>
                                            <View style={styles.upload}>
                                                <TouchableOpacity 
                                                    style={styles.uploadIcon}
                                                    onPress={() => this.upload('fileContract')}
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
                                                    {this.state.oldFilesContract.map((oldFileContract, key) => {
                                                    return (
                                                        <View style={styles.attachFile} key={key}>
                                                            <View style={styles.attachLeft}>
                                                                <View style={styles.imgIcon}>
                                                                    <Icon 
                                                                        name={oldFileContract.type == 'image/jpeg' || 'jpg' || 'png' ? 'ios-image' : 'ios-document-text'}
                                                                        color={oldFileContract.type == 'image/jpeg' || 'jpg' || 'png' ? orange : blue}
                                                                        size={18}
                                                                    />
                                                                </View>
                                                                <View style={styles.imgName}>
                                                                    <Text 
                                                                        style={styles.fileName}
                                                                        numberOfLines={1}
                                                                        ellipsizeMode='tail'
                                                                    >
                                                                        {oldFileContract.name}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.deleteFile}>
                                                                <TouchableOpacity 
                                                                    style={styles.deleteFile}
                                                                    onPress={() => this.delete(oldFileContract, 'oldFileContract')}
                                                                >
                                                                    <Icon
                                                                        name='ios-trash'
                                                                        color={orange}
                                                                        size={20}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        )
                                                    })}

                                                    {this.state.filesContract.map((fileContract, key) => {
                                                    return (
                                                        <View style={styles.attachFile} key={key}>
                                                            <View style={styles.attachLeft}>
                                                                <View style={styles.imgIcon}>
                                                                    <Icon 
                                                                        name={fileContract.type == 'image/jpeg' || 'jpg' || 'png' ? 'ios-image' : 'ios-document-text'}
                                                                        color={fileContract.type == 'image/jpeg' || 'jpg' || 'png' ? orange : blue}
                                                                        size={18}
                                                                    />
                                                                </View>
                                                                <View style={styles.imgName}>
                                                                    <Text 
                                                                        style={styles.fileName}
                                                                        numberOfLines={1}
                                                                        ellipsizeMode='tail'
                                                                    >
                                                                        {fileContract.name}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.deleteFile}>
                                                                <TouchableOpacity 
                                                                    style={styles.deleteFile}
                                                                    onPress={() => this.delete(fileContract, 'fileContract')}
                                                                >
                                                                    <Icon
                                                                        name='ios-trash'
                                                                        color={orange}
                                                                        size={20}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.uploadProjectDesign}>
                                            <View style={styles.header}>
                                                <View style={styles.left}>
                                                    <Text style={styles.label}>Bảng giá</Text>
                                                </View>
                                                {/* <View style={styles.right}>
                                                    <Text style={styles.totalDesign}>Total: {Math.round(this.state.filesDesignSize/(1024*1024) * 100) / 100} MB</Text>
                                                </View> */}
                                            </View>
                                            <View style={styles.upload}>
                                                <TouchableOpacity 
                                                    style={styles.uploadIcon}
                                                    onPress={() => this.upload('fileDesign')}
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
                                                    {this.state.oldFilesDesign.map((oldFileDesign, key) => {
                                                    return (
                                                        <View style={styles.attachFile} key={key}>
                                                            <View style={styles.attachLeft}>
                                                                <View style={styles.imgIcon}>
                                                                    <Icon 
                                                                        name={oldFileDesign.type == 'image/jpeg' || 'jpg' || 'png' ? 'ios-image' : 'ios-document-text'}
                                                                        color={oldFileDesign.type == 'image/jpeg' || 'jpg' || 'png' ? orange : blue}
                                                                        size={18}
                                                                    />
                                                                </View>
                                                                <View style={styles.imgName}>
                                                                    <Text 
                                                                        style={styles.fileName}
                                                                        numberOfLines={1}
                                                                        ellipsizeMode='tail'
                                                                    >
                                                                        {oldFileDesign.name}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.deleteFile}>
                                                                <TouchableOpacity 
                                                                    style={styles.deleteFile}
                                                                    onPress={() => this.delete(oldFileDesign, 'oldFileDesign')}
                                                                >
                                                                    <Icon
                                                                        name='ios-trash'
                                                                        color={orange}
                                                                        size={20}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        )
                                                    })}

                                                    {this.state.filesDesign.map((fileDesign, key) => {
                                                    return (
                                                        <View style={styles.attachFile} key={key}>
                                                            <View style={styles.attachLeft}>
                                                                <View style={styles.imgIcon}>
                                                                    <Icon 
                                                                        name={fileDesign.type == 'image/jpeg' || 'jpg' || 'png' ? 'ios-image' : 'ios-document-text'}
                                                                        color={fileDesign.type == 'image/jpeg' || 'jpg' || 'png' ? orange : blue}
                                                                        size={18}
                                                                    />
                                                                </View>
                                                                <View style={styles.imgName}>
                                                                    <Text 
                                                                        style={styles.fileName}
                                                                        numberOfLines={1}
                                                                        ellipsizeMode='tail'
                                                                    >
                                                                        {fileDesign.name}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.deleteFile}>
                                                                <TouchableOpacity 
                                                                    style={styles.deleteFile}
                                                                    onPress={() => this.delete(fileDesign, 'fileDesign')}
                                                                >
                                                                    <Icon
                                                                        name='ios-trash'
                                                                        color={orange}
                                                                        size={20}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.uploadMarketing}>
                                            <View style={styles.header}>
                                                <View style={styles.left}>
                                                    <Text style={styles.label}>Chính sách bán hàng</Text>
                                                </View>
                                                {/* <View style={styles.right}>
                                                    <Text style={styles.totalMarketing}>Total: {Math.round(this.state.filesMarketingSize/(1024*1024) * 100) / 100} MB</Text>
                                                </View> */}
                                            </View>
                                            <View style={styles.upload}>
                                                <TouchableOpacity 
                                                    style={styles.uploadIcon}
                                                    onPress={() => this.upload('fileMarketing')}
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
                                                    {this.state.oldFilesMarketing.map((oldFileMarketing, key) => {
                                                    return (
                                                        <View style={styles.attachFile} key={key}>
                                                            <View style={styles.attachLeft}>
                                                                <View style={styles.imgIcon}>
                                                                    <Icon 
                                                                        name={oldFileMarketing.type == 'image/jpeg' || 'jpg' || 'png' ? 'ios-image' : 'ios-document-text'}
                                                                        color={oldFileMarketing.type == 'image/jpeg' || 'jpg' || 'png' ? orange : blue}
                                                                        size={18}
                                                                    />
                                                                </View>
                                                                <View style={styles.imgName}>
                                                                    <Text 
                                                                        style={styles.fileName}
                                                                        numberOfLines={1}
                                                                        ellipsizeMode='tail'    
                                                                    >
                                                                        {oldFileMarketing.name}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.deleteFile}>
                                                                <TouchableOpacity 
                                                                    style={styles.deleteFile}
                                                                    onPress={() => this.delete(oldFileMarketing, 'fileMarketing')}
                                                                >
                                                                    <Icon
                                                                        name='ios-trash'
                                                                        color={orange}
                                                                        size={20}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        )
                                                    })}

                                                    {this.state.filesMarketing.map((fileMarketing, key) => {
                                                    return (
                                                        <View style={styles.attachFile} key={key}>
                                                            <View style={styles.attachLeft}>
                                                                <View style={styles.imgIcon}>
                                                                    <Icon 
                                                                        name={fileMarketing.type == 'image/jpeg' || 'jpg' || 'png' ? 'ios-image' : 'ios-document-text'}
                                                                        color={fileMarketing.type == 'image/jpeg' || 'jpg' || 'png' ? orange : blue}
                                                                        size={18}
                                                                    />
                                                                </View>
                                                                <View style={styles.imgName}>
                                                                    <Text 
                                                                        style={styles.fileName}
                                                                        numberOfLines={1}
                                                                        ellipsizeMode='tail'    
                                                                    >
                                                                        {fileMarketing.name}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.deleteFile}>
                                                                <TouchableOpacity 
                                                                    style={styles.deleteFile}
                                                                    onPress={() => this.delete(fileMarketing, 'fileMarketing')}
                                                                >
                                                                    <Icon
                                                                        name='ios-trash'
                                                                        color={orange}
                                                                        size={20}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.buttonUpdate}>
                                            <ButtonIndex
                                                color={blue}
                                                label='CẬP NHẬT DỰ ÁN'
                                                action={this.update}
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

