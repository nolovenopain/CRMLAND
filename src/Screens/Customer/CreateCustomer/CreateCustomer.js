import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { styles } from './css';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../Components/Elements/Color/Color';
import ButtonIndex from '../../../Components/Elements/Button/Button';
import { loading } from '../../../Helpers/Functions';
import Icon from 'react-native-vector-icons/Ionicons';
import postCreateCustomer from '../../../Api/postCreateCustomer';
import { checkPhoneValidate, checkEmailValidate } from '../../../Helpers/RegularExpression';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import MultiSelectProject from '../../../Components/Elements/MultiSelect/MultiSelectProject';
import MultiSelectGroup from '../../../Components/Elements/MultiSelect/MultiSelectGroup';
import SingleSelect from '../../../Components/Elements/SingleSelect/SingleSelect';
import SingleSelectType from '../../../Components/Elements/SingleSelect/SingleSelectType';
import getTypeOfCustomer from '../../../Api/getTypeOfCustomer';
import getGroupOfCustomer from '../../../Api/getGroupOfCustomer';
import { getReduceProjectList } from '../../../Api/getProjectList';
import CustomInput from '../../../Components/Elements/CustomInput/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class CreateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            selectPronoun: {},
            selectSource: {},
            selectType: {},
            selectedItems: [],
            show: false,
            selectProjects: [],
            listType: this.props.route.params.listType,
            selectGroups: [],
            token: this.props.route.params.token,
            birthday: new Date(),
            showCalendar: false,
            isInternetReachable: false,
            listProject: this.props.route.params.listProject,
            listGroup: this.props.route.params.listGroup,
            refreshScreen: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.returnPronounData = this.returnPronounData.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.returnProjectData = this.returnProjectData.bind(this);
        this.returnTypeData = this.returnTypeData.bind(this);
        this.returnGroupData = this.returnGroupData.bind(this);
        this.returnSourceData = this.returnSourceData.bind(this);
        this.getErrorAuthen = this.getErrorAuthen.bind(this);
        this.getErrorServer = this.getErrorServer.bind(this);
        this.create = this.create.bind(this);
        this.cancel = this.cancel.bind(this);
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

    onChangeBirthday(event, selectedDate) {
        this.setState({ 
            birthday: selectedDate,
            showCalendar: false
        })
    };

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }

    returnProjectData(selectProjects) {
        this.setState({ selectProjects });
    }

    returnGroupData(selectGroups) { 
        this.setState({ selectGroups });
    }

    returnPronounData(selectPronoun) {
        this.setState({ selectPronoun });
    }

    returnSourceData(selectSource) {
        this.setState({ selectSource })
    }

    returnTypeData(selectType) {
        this.setState({ selectType });
    }

    async create() {
        this.setState({ loaded: false })
        if(!this.state.phone || this.state.phone == '') {
            this.setState({ loaded: true })
            Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại khách hàng');
        }
        else {
            if (checkPhoneValidate(this.state.phone) == false) {
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Số điện thoại của bạn không đúng định dạng!');
            }
            else if (checkEmailValidate(this.state.email) == false && this.state.email != '' && this.state.email != undefined) {
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Email của bạn không đúng định dạng!');
            }
            else {
                const projects_id = [];
                this.state.selectProjects.map((value, key) => {
                    projects_id.push(value.id) 
                })
                const groups_id = [];
                this.state.selectGroups.map((value, key) => {
                    groups_id.push(value.id)
                })
                const res = await postCreateCustomer(
                    this.state.token, 
                    Object.keys(this.state.selectPronoun).length > 0 ? this.state.selectPronoun.id : '1', 
                    this.state.fullname, 
                    moment(this.state.birthday).format('DD-MM-YYYY'), 
                    this.state.address, 
                    this.state.phone, 
                    this.state.email,
                    projects_id, 
                    Object.keys(this.state.selectType).length > 0 ? this.state.selectType.id : null, 
                    groups_id, 
                    Object.keys(this.state.selectSource).length > 0 ? this.state.selectSource.id : '1',
                );
                
                setTimeout(async() => {
                    this.setState({ loaded: true })
                    if(res.status == 200) {
                        const resJson = await res.json();
                        if(resJson.code == 200) {
                            this.props.route.params.refreshList();                
                            this.setState({ birthday: new Date() })
                            Alert.alert(
                                'Thông báo',
                                resJson.message + "\n\n" +
                                'Bạn có muốn quay lại trang danh sách khách hàng ?',
                                [
                                    {text: 'Không', style: 'cancel', onPress: () => {
                                        this.childName.clearOldInput();
                                        this.childEmail.clearOldInput();
                                        this.childPhone.clearOldInput();
                                        this.state.show ? this.childAddress.clearOldInput() : null; 
                                        this.state.show ? this.childPronoun.refreshAfterCreate() : null;
                                        this.state.show ? this.childProject.refreshAfterCreate() : null;
                                        this.state.show ? this.childType.refreshAfterCreate() : null;
                                        this.state.show ? this.childGroup.refreshAfterCreate() : null;
                                        this.state.show ? this.childSource.refreshAfterCreate() : null
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
                            resJson.errors.phone.map((value, key) => {
                                Alert.alert('Error !!!', value)
                            })   
                        }
                    }
                    else if(res.status == 422) {
                        const resJson = await res.json();
                        if(resJson.errors.phone) {
                            resJson.errors.phone.map((value, key) => {
                                Alert.alert('Error !!!', value)
                            })
                        }
                        if(resJson.errors.email) {
                            resJson.errors.email.map((value, key) => {
                                Alert.alert('Error !!!', value)
                            })
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
        } 
    }

    cancel() {
        this.props.route.params.navigation.goBack()
    }

    async getTypeOfCustomer(token) {
        const res = await getTypeOfCustomer(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listType: resJson.data.data });
                this.state.show ? this.childType.refreshType(resJson.data.data) : null
            }
            else if(resJson.code == 204) {
                console.log("Error !!!", resJson.message);
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

    async getGroupOfCustomer(token) {
        const res = await getGroupOfCustomer(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listGroup: resJson.data.data });
                this.state.show ? this.childGroup.refreshGroup(resJson.data.data) : null
            }
            else if(resJson.code == 204) {
                console.log("Error !!!", resJson.message);
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

    async getReduceProjectList(token) {
        const res = await getReduceProjectList(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listProject: resJson.data.data });
                this.state.show ?  this.childProject.refreshProject(resJson.data.data) : null
            }
            else if(resJson.code == 204) {
                console.log("Error !!!", resJson.message);
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

    getErrorAuthen() {
        AsyncStorage
        .clear()
        .then(() => this.props.route.params.navigation.navigate('UserNavigation', {screen: 'Login'}))
    }

    getErrorServer() {
        this.setState({ requestOpenAppAgain: true })
    }
    
    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    async onRefresh() {
        this.getTypeOfCustomer(this.state.token);
        this.getGroupOfCustomer(this.state.token);
        this.getReduceProjectList(this.state.token);
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
                                        <View style={styles.basicInfo}>
                                            <View style={styles.basicTitle}>
                                                <Text style={styles.title}>Thông tin cơ bản</Text>
                                            </View>
                                            <View style={styles.firstPicker}>
                                                <Text style={styles.label}>Danh xưng</Text>
                                                <SingleSelect
                                                    selectText="Anh"
                                                    placeholder='Tìm danh xưng...'
                                                    items={[
                                                        { name: 'Anh', id: '1' },
                                                        { name: 'Em', id: '2' },
                                                        { name: 'Chị', id: '3' },
                                                        { name: 'Cô', id: '4' },
                                                        { name: 'Chú', id: '5' },
                                                        { name: 'Bác', id: '6' },
                                                        { name: 'Ông', id: '7' },
                                                        { name: 'Bà', id: '8' },
                                                    ]}
                                                    returnData={this.returnPronounData}
                                                    onRef={ref => (this.childPronoun = ref)}
                                                />
                                            </View>
                                            <View style={styles.input}>
                                                <CustomInput
                                                    label='Họ tên'
                                                    name='fullname'
                                                    editable={true}
                                                    setValue={this.setValue}
                                                    hideshowText={false}
                                                    width={width/1.16 - 40}
                                                    marginLeft={10}
                                                    btnGroupWidth={30}
                                                    length={40}
                                                    placeholder='Nhập họ tên...'
                                                    onRef={ref => (this.childName = ref)}
                                                />
                                            </View>
                                            
                                            <View style={styles.input}>
                                                <CustomInput
                                                    label='Điện thoại'
                                                    name='phone'
                                                    editable={true}
                                                    setValue={this.setValue}
                                                    hideshowText={false}
                                                    required={true}
                                                    width={width/1.16 - 40}
                                                    marginLeft={10}
                                                    btnGroupWidth={30}
                                                    length={40}
                                                    keyboardType='numeric'
                                                    placeholder='Nhập số điện thoại...'
                                                    onRef={ref => (this.childPhone = ref)}
                                                />
                                            </View>
                                            <View style={styles.input}>
                                                <CustomInput
                                                    label='Email'
                                                    name='email'
                                                    editable={true}
                                                    setValue={this.setValue}
                                                    hideshowText={false}
                                                    width={width/1.16 - 40}
                                                    marginLeft={10}
                                                    btnGroupWidth={30}
                                                    length={40}
                                                    keyboardType='email-address'
                                                    placeholder='Nhập email...'
                                                    onRef={ref => (this.childEmail = ref)}
                                                />
                                            </View>
                                        </View>

                                        <View style={styles.advancedInfo}>
                                            <View style={styles.hideForm}>
                                                <TouchableOpacity 
                                                    style={styles.classifiedTitle}
                                                    onPress={() => this.setState({ show: !this.state.show })}
                                                >
                                                    <View style={styles.left}>
                                                        <Text style={styles.title}>Thông tin nâng cao</Text>
                                                    </View>
                                                    <View style={styles.right}>
                                                        <Icon
                                                            name='ios-chevron-down'
                                                            color={blue}
                                                            size={22}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                                {this.state.show ? 
                                                    (<View>
                                                        <View style={styles.birthdayWrapper}>
                                                            <Text style={styles.label}>Ngày sinh</Text>
                                                            <View style={styles.choseBirthday}>
                                                                <View style={styles.birthday}>
                                                                    <Text style={styles.birthdayText}>
                                                                        {moment(this.state.birthday).format('DD/MM/YYYY')}
                                                                    </Text>
                                                                </View>
                                                                <TouchableOpacity 
                                                                    style={styles.birthdayIcon}
                                                                    onPress={() => this.setState({ showCalendar: true })}
                                                                >
                                                                    <Icon
                                                                        name='ios-calendar'
                                                                        size={20}
                                                                        color='gray'
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                            {this.state.showCalendar ?
                                                                <DateTimePicker
                                                                    testID="dateTimePicker"
                                                                    timeZoneOffsetInMinutes={0}
                                                                    value={this.state.birthday}
                                                                    mode='date'
                                                                    is24Hour={true}
                                                                    display="default"
                                                                    onChange={this.onChangeBirthday}
                                                                /> : null
                                                            }
                                                        <View style={styles.address}>
                                                            <CustomInput
                                                                label='Địa chỉ'
                                                                name='address'
                                                                editable={true}
                                                                setValue={this.setValue}
                                                                hideshowText={false}
                                                                width={width/1.16 - 40}
                                                                marginLeft={10}
                                                                btnGroupWidth={30}
                                                                length={40}
                                                                keyboardType='email-address'
                                                                placeholder='Nhập địa chỉ...'
                                                                onRef={ref => (this.childAddress = ref)}
                                                            />
                                                        </View>
                                                        <View style={styles.multiPicker}>
                                                            <Text style={styles.labelProject}>Chọn dự án trong danh sách</Text>
                                                            <MultiSelectProject
                                                                selectText="Chọn dự án..."
                                                                placeholder='Tìm dự án...'
                                                                items={this.state.listProject}
                                                                selectedItems={this.state.selectProjects}
                                                                token={this.state.token}
                                                                returnProjectData={this.returnProjectData}
                                                                onRef={ref => (this.childProject = ref)}
                                                            />
                                                        </View>

                                                        <View style={styles.picker}>
                                                            <Text style={styles.label}>Loại khách</Text>
                                                            <SingleSelectType
                                                                selectText="Chọn loại khách hàng..."
                                                                placeholder='Tìm loại khách hàng...'
                                                                items={this.state.listType}
                                                                token={this.state.token}
                                                                returnData={this.returnTypeData}
                                                                onRef={ref => (this.childType = ref)}
                                                                getErrorAuthen={this.getErrorAuthen}
                                                                getErrorServer={this.getErrorServer}
                                                            />
                                                        </View>

                                                        <View style={styles.multiPicker}>
                                                            <Text style={styles.labelProject}>Nhóm khách</Text>
                                                            <MultiSelectGroup
                                                                selectText="Chọn nhóm khách..."
                                                                placeholder='Tìm nhóm khách...'
                                                                items={this.state.listGroup}
                                                                selectedItems={this.state.selectGroups}
                                                                token={this.state.token}
                                                                returnGroupData={this.returnGroupData}
                                                                onRef={ref => (this.childGroup = ref)}
                                                                getErrorAuthen={this.getErrorAuthen}
                                                                getErrorServer={this.getErrorServer}
                                                            />
                                                        </View>

                                                        <View style={styles.picker}>
                                                            <Text style={styles.label}>Nguồn khách</Text>
                                                            <SingleSelect
                                                                selectText="Tự tìm kiếm"
                                                                placeholder='Tìm danh xưng...'
                                                                items={[
                                                                    { name: 'Tự tìm kiếm', id: '1' },
                                                                    { name: 'From website', id: '2' },
                                                                    { name: 'Facebook', id: '3' },
                                                                    { name: 'Google', id: '4' },
                                                                    { name: 'Hotline', id: '5' },
                                                                    { name: 'Công ty chuyển', id: '6' },
                                                                    { name: 'Giới thiệu', id: '7' },
                                                                ]}
                                                                returnData={this.returnSourceData}
                                                                onRef={ref => (this.childSource = ref)}
                                                            />
                                                        </View>
                                                    </View>) : null }
                                                </View>
                                            </View>
                                            
                                        <View style={styles.createNew}>
                                            <ButtonIndex 
                                                label='TẠO MỚI'
                                                color={blue}
                                                action={this.create}
                                            />
                                        </View>
                                        <View style={styles.cancel}>
                                            <ButtonIndex 
                                                label='HỦY'
                                                color={orange}
                                                action={this.cancel}
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

