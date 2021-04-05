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

        };
    }

    render() {
        var type = {};
        this.props.listType.map((value, key) => {
            if(value.id == this.props.customer.type_id) {
                type = value
            }
        })
        
        return (
            <View style={ styles.container }>
                <View style={styles.classificationWrapper}>
                    <View style={styles.classificationHeader}>
                        <Text style={styles.classificationTitle}>Thông tin phân loại</Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Dự án</Text>
                        <Text style={styles.text}>
                            { 
                                this.props.customer.project.map((project,key) => {
                                    return project.name + "; "
                                })  
                            }
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Loại khách</Text>
                        <Text style={styles.text}>{this.props.customer.type_id == '' ? '' : type.name}</Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Nhóm khách</Text>
                        <Text style={styles.text}>
                            { 
                                this.props.customer.group.map((group,key) => { 
                                    return group.name + "; "
                                }) 
                            }
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Nguồn khách</Text>
                        <Text style={styles.text}>
                            {full_source.map((source, key) => {
                                if(source.id == this.props.customer.source_id) {
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
