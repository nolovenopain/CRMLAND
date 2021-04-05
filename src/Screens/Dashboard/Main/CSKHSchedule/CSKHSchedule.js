import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { fetchToken } from '../../../../Helpers/Functions';
import moment from 'moment';

const list_chanel = {
    '1' : 'Gọi điện',
    '2' : 'Gặp tư vấn trực tiếp',
    '3' : 'Nhắn tin',
    '4' : 'Gửi email',
    '5' : 'Tương tác social'
}

export default class CSKHSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }

    async componentDidMount() {
        this.props.onRef(this);
        const token = await fetchToken();
        this.setState({ token });
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    refreshScreen() {
        this.componentDidMount();
    }

    render() {
        return (
            <View style={styles.container}>
            {/* CSKH */}
                <View style={styles.headerBody}>
                    <View style={styles.left}>
                        <Text style={styles.leftHeaderBody}>Lịch chăm sóc khách hàng</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.rightHeaderBody}
                        onPress={() => this.props.navigation.navigate('CSKHScheduleList', {
                            token: this.state.token,
                            listHistoryToday: this.props.listHistoryToday
                        })}
                    >
                        <Text style={styles.rightHeaderText}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.CSKHSchedule}>
                    <View style={styles.CSKHScheduleInside}>
                        { Object.entries(this.props.listHistoryToday).length > 0 ?
                            this.props.listHistoryToday.map((value, key) => {
                                if(key < 5) {
                                    return(
                                        <View style={styles.row} key={key}>
                                            <View style={styles.statusCircle}></View>
                                            <View style={styles.content}>
                                                <Text 
                                                    style={styles.topContent}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                >
                                                    {Object.entries(list_chanel).map(([key, channel]) => {
                                                        if(value.channel_id == key) {
                                                            return channel;
                                                        }
                                                    })}
                                                </Text>
                                                <Text 
                                                    style={styles.bottomContent}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                >
                                                    {(value.pronoun != null ? value.pronoun : '') + ' ' + (value.fullname != null ? value.fullname.toUpperCase() : '')}
                                                </Text>
                                            </View>
                                            <View style={styles.timeDate}>
                                                <Text style={styles.time}>
                                                    {moment(value.next_time).format('H:mm')}
                                                </Text>
                                                <Text style={styles.date}>Hôm nay</Text>
                                            </View>
                                        </View>
                                    )
                                }  
                            }) 
                            : 
                            <Text style={styles.noSchedule}>Không có lịch chăm sóc KH ngày hôm nay</Text>
                        }
                    </View>
                </View>
            </View>
        );
    }
}
