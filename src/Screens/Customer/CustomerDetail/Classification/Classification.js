import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../../../../Components/Elements/Color/Color';
import getCustomerDetail from '../../../../Api/getCustomerDetail';
import AsyncStorage from '@react-native-community/async-storage';

const full_source = [
    { name: 'Tự tìm kiếm', id: '1'},
    { name: 'From website', id: '2' },
    { name: 'Facebook', id: '3' },
    { name: 'Google', id: '4' },
    { name: 'Hotline', id: '5' },
    { name: 'Công ty chuyển', id: '6' },
    { name: 'Giới thiệu', id: '7' },
]

export default class Classification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectProjects: [],
            selectGroups: [],
            token: this.props.token,
            type_id: '',
            selectSource: {},
            selectType: {},
            oldSource_id: this.props.customer.source_id,
        };
    }

    async componentDidMount() {
        this.getCustomerDetail();
    }

    async getCustomerDetail() {
        const res = await getCustomerDetail(
            this.state.token, 
            this.props.customer.id
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ 
                    selectProjects: resJson.data.customer.project,
                    selectGroups: resJson.data.customer.group,
                    type_id: this.props.customer.type_id
                });
                this.props.checkRequestOpenApp(false);
            }
            else if(resJson.code == 204) {
                console.log('Error !!!', resJson.message);
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.props.checkRequestOpenApp(true);
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }

    returnData = (selectProjects, selectGroups, selectType, selectSource) => {
        this.setState({
            selectType,
            selectSource,
            oldSource_id: selectSource.id, 
            selectProjects,
            selectGroups, 
            type_id: selectType.id
        });
        this.props.returnDataClassification(selectProjects, selectType, selectGroups, selectSource)
    }

    render() { 
        var type = {};
        this.props.listType.map((value, key) => {
            if(value.id == this.state.type_id ) {
                type = value
            }
        })
        
        return (
            <View style={ styles.container }>
                <View style={styles.classificationWrapper}>
                    <View style={styles.classificationHeader}>
                        <Text style={styles.classificationTitle}>Thông tin phân loại</Text>
                        <TouchableOpacity
                                style={styles.icon}
                                onPress={() => this.props.navigation.navigate('EditCustomer', {
                                    customer: this.props.customer,
                                    returnData: this.returnData,
                                    navigation: this.props.navigation,
                                    token: this.state.token,
                                    listType: this.props.listType,
                                    listGroup: this.props.listGroup,
                                    listProject: this.props.listProject,
                                    oldProjects: this.state.selectProjects,
                                    oldGroups: this.state.selectGroups
                                })}
                            >
                                <Icon
                                    name='ios-build'
                                    size={25}
                                    color={blue}
                                /> 
                        </TouchableOpacity> 
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Dự án</Text>
                        <Text style={styles.text}>
                            {this.state.selectProjects.map((project,key) => {
                                return project.name + "; "
                            })}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Loại khách</Text>
                        <Text style={styles.text}>{this.state.type_id == '' ? '' : type.name}</Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Nhóm khách</Text>
                        <Text style={styles.text}>
                            {this.state.selectGroups.map((group,key) => {
                                return group.name + "; "
                            })}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Nguồn khách</Text>
                        <Text style={styles.text}>
                            {full_source.map((source, key) => {
                                if(source.id == this.state.oldSource_id) {
                                    return source.name
                                }
                            })}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
