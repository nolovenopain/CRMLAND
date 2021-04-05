import React, { Component } from 'react';
import { View, Text, RefreshControl, Alert } from 'react-native';
import { styles } from './css';
import Button from '../../../Components/Elements/Button/Button'
import { ScrollView } from 'react-native-gesture-handler';
import { loading } from '../../../Helpers/Functions';
import { blue } from '../../../Components/Elements/Color/Color';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import SingleSelect from '../../../Components/Elements/SingleSelect/SingleSelect';
import SingleSelectType from '../../../Components/Elements/SingleSelect/SingleSelectType';
import MultiSelectProject from '../../../Components/Elements/MultiSelect/MultiSelectProject';
import MultiSelectGroup from '../../../Components/Elements/MultiSelect/MultiSelectGroup';
import getTypeOfCustomer from '../../../Api/getTypeOfCustomer';
import getGroupOfCustomer from '../../../Api/getGroupOfCustomer';
import { getReduceProjectList } from '../../../Api/getProjectList';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';

export default class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listProject: this.props.route.params.listProject,
            selectProjects: this.props.route.params.oldProjects,
            listGroup: this.props.route.params.listGroup,
            selectGroups: this.props.route.params.oldGroups,
            listType: this.props.route.params.listType,
            token: this.props.route.params.token,
            isInternetReachable: false,
            selectSource: {},
            selectType: {},
            oldType: {},
            oldSource: {},
            full_source: [
                { name: 'Tự tìm kiếm', id: '1'},
                { name: 'From website', id: '2' },
                { name: 'Facebook', id: '3' },
                { name: 'Google', id: '4' },
                { name: 'Hotline', id: '5' },
                { name: 'Công ty chuyển', id: '6' },
                { name: 'Giới thiệu', id: '7' },
            ],
            refreshScreen: false,
            requestOpenAppAgain: false
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
        this.returnProjectData = this.returnProjectData.bind(this);
        this.returnTypeData = this.returnTypeData.bind(this);
        this.returnGroupData = this.returnGroupData.bind(this);
        this.returnSourceData = this.returnSourceData.bind(this);
        this.getErrorAuthen = this.getErrorAuthen.bind(this);
        this.getErrorServer = this.getErrorServer.bind(this);
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                if(this.state.listType.length > 0) {
                    this.state.listType.map((type, key) => {
                        if(type.id == this.props.route.params.customer.type_id) {
                            this.setState({ oldType: type });
                        }
                    });
                }
        
                this.state.full_source.map((source, key) => {
                    if(source.id == this.props.route.params.customer.source_id) {
                        this.setState({ oldSource: source });
                    }
                }) 
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

    returnProjectData = (selectProjects) => {
        this.setState({ selectProjects });
    };

    returnGroupData = (selectGroups) => {
        this.setState({ selectGroups });
    };

    returnSourceData(selectSource) {
        this.setState({ selectSource });
    }

    returnTypeData(selectType) {
        this.setState({ selectType });
    }

    async getTypeOfCustomer(token) {
        const res = await getTypeOfCustomer(token);
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ listType: resJson.data.data });
                this.childType.refreshType(resJson.data.data);
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
                this.childGroup.refreshGroup(resJson.data.data);
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
                this.childProject.refreshProject(resJson.data.data);
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

    async update() {
        this.props.route.params.returnData(
           this.state.selectProjects, 
           this.state.selectGroups, 
           Object.keys(this.state.selectType).length > 0 ? this.state.selectType : this.state.oldType, 
           Object.keys(this.state.selectSource).length > 0 ? this.state.selectSource : this.state.oldSource
        );
       this.props.route.params.navigation.goBack();
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
                                        <View style={styles.header}>
                                            <Text style={styles.headerText}>Khách hàng {' '}
                                                <Text style={styles.blue}>
                                                    {this.props.route.params.customer.fullname != null ? this.props.route.params.customer.fullname.toUpperCase() : this.props.route.params.customer.phone}
                                                </Text> thuộc
                                            </Text>
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
                                                selectText={this.state.oldType.name ? this.state.oldType.name : 'Chọn loại khách hàng...'}
                                                placeholder='Tìm loại khách hàng...'
                                                items={this.state.listType}
                                                returnData={this.returnTypeData}
                                                onRef={ref => (this.childType = ref)}
                                                getErrorAuthen={this.getErrorAuthen}
                                                getErrorServer={this.getErrorServer}
                                            />
                                        </View>

                                        <View style={styles.multiPicker}>
                                            <Text style={styles.label}>Nhóm khách</Text>
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
                                            <Text style={styles.label}> Nguồn khách</Text>
                                            <SingleSelect
                                                selectText={this.state.oldSource.name}
                                                placeholder='Tìm nguồn khách...'
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
                                            />
                                        </View>

                                        <View style={styles.btnUpdate}>
                                            <Button
                                                label='Cập nhật'
                                                color={blue}
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

