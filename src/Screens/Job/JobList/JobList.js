import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { styles } from './css';
import moment from 'moment/min/moment-with-locales';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';

moment.locale('vi')

export default class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInternetReachable: false,
            loaded: false,
            refreshScreen: false
        };
        this._isMounted = false;
        this.onRefresh = this.onRefresh.bind(this);
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

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh() {
        this.props.route.params.refreshList ? this.props.route.params.refreshList(this.props.route.params.mainDate) : null;
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() {
        const date = moment(this.props.route.params.date[0].alarm_at).format('Do MMMM')
        const dayName = moment(this.props.route.params.date[0].alarm_at).format('dddd')
        const today = moment(new Date()).format('Do MMMM')

        return (
            <View>
                <View style={styles.container}>
                    {this.state.isInternetReachable ?
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefresh} />
                            }
                            style={{ width: width }}
                        >  
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.header}>
                                    <View style={styles.dayNameWrapper}>
                                        <Text style={styles.dayName}>{dayName.toUpperCase()}</Text>
                                    </View>
                                    <View style={styles.dateWrapper}>
                                        <Text style={styles.date}>
                                            {date == today ? 'Hôm nay' : date}
                                        </Text>
                                    </View>
                                </View>

                                {this.props.route.params.date.map((value, key) =>
                                    <View style={styles.jobListItem} key={key}>
                                        <View style={styles.left}>
                                            <Text style={styles.time}>{moment(value.alarm_at).format('H:mm')}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Text style={styles.title}>
                                                {value.title != null ? value.title : 'Không có tiêu đề'}
                                            </Text>
                                            <View style={styles.underline}></View>
                                            <Text style={styles.description}>
                                                {value.content != null ? value.content : 'Không có nội dung'}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                            :
                        <InternetConnecNotification/>
                    }
                </View>
            </View>
        );
    }
}
