import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { fetchToken } from '../../../../Helpers/Functions';
import moment from 'moment/min/moment-with-locales';

moment.locale('vi')
export default class SystemNotificationsDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            noti: []
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
                <View style={styles.headerBody}>
                    <View style={styles.left}>
                        <Text style={styles.leftHeaderBody}>Thông báo hệ thống</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.rightHeaderBody}
                        onPress={() => this.props.navigation.navigate('NotificationStackScreen', {
                            screen: 'SystemNotificationsList',
                            params: {
                                token: this.state.token,
                                navigation: this.props.navigation,
                                getDashBoard: this.props.getDashBoard
                            }
                        })}
                    >
                        <Text style={styles.rightHeaderText}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.systemNoti}>
                    <View style={styles.systemNotiInside}>
                        { Object.entries(this.props.listNotification).length > 0 ?
                            this.props.listNotification.data.length > 0 ?
                                this.props.listNotification.data.map((value, key) => {
                                    return(
                                        <View style={styles.row} key={key}>
                                            <View style={[styles.statusCircle, {backgroundColor: value.read_at == null ? '#2e89ff' : null}]}></View>
                                            <View style={styles.content}>
                                                <Text 
                                                    style={styles.topContent}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                >
                                                    {value.data.title}
                                                </Text>
                                                <Text 
                                                    style={styles.bottomContent}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                >
                                                    {value.data.message}
                                                </Text>
                                            </View>
                                            <View style={styles.timeDate}>
                                                <Text style={styles.time}>
                                                    { moment.utc(value.updated_at).local().startOf('seconds').fromNow() }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }) : <Text style={styles.noSystemNoti}>Không có thông báo</Text> : null 
                        } 
                    </View>
                </View>        
            </View>
        );
    }
}
