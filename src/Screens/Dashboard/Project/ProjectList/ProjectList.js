import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './css';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

export default class ProjectList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        token: this.props.token
    };
  }

  render() {
    const SwipeSettings = {
        autoClose: true,
        onClose: (secId, rowId, direction) => {
            this.setState({ activeRowKey: null })
        },
        onOpen: (secId, rowId, direction) => {
            this.setState({ activeRowKey: this.props.project.id })
        },
        right: [
            {
                onPress: () => {
                    const deletingRow = this.state.activeRowKey;
                    Alert.alert(
                        'Thông báo',
                        'Bạn có thực sự muốn xóa dự án này?',
                        [
                            {text: 'Hủy', style: 'cancel'},
                            {text: 'Xóa', onPress: () => {
                                this.props.deleteProject(deletingRow);
                            }}
                        ],
                        {cancelable: true}
                    )
                },
                text: 'Xóa', type: 'delete'
            }
        ],
        rowId: this.props.index,
        sectionId: 1,
        
    }
    return (
        <Swipeout {...SwipeSettings} style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.listWrapper}
                    onPress={() => this.props.navigation.navigate('ProjectDetail', {
                        project: this.props.project,
                        refreshList: this.props.refreshList,
                        token: this.state.token,
                        navigation: this.props.navigation
                    })}
                >
                    <View style={styles.list}>
                        <View style={styles.bundle}>
                            <Icon
                                name='ios-business'
                                color='#fff'
                                size={25}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text 
                                style={styles.projectName}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            > 
                                {this.props.project.name} 
                            </Text>
                            <View style={styles.contentBottom}>
                                <Text style={styles.createDate}>
                                <Text style={styles.bold}>Ngày tạo:</Text> {
                                                moment(this.props.project.created_at).format("DD/MM/YYYY") } </Text>
                                <Text style={styles.customerAmount}>
                                <Text style={styles.bold}>Số khách hàng:</Text> {this.props.project.customers.length} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Swipeout>    
    );
  }
}
