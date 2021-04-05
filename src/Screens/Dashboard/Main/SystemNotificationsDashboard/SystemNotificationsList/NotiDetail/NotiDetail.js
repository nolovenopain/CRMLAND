import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles } from './css';
import{ loading } from "../../../../../../Helpers/Functions";
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../../InternetConnecNotification/InternetConnecNotification';

export default class NotiDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isInternetReachable: false
        };
        this._isMounted = false;
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

    render() {
        return (
            <View style={styles.container}>
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.bell}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../../../../../Assets/Image/noti_bell.png')}
                                />
                            </View>
                            <View style={styles.time}>
                                <Text style={styles.timeText}>{this.props.route.params.time}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Tiêu đề:</Text>
                                <Text style={styles.content}>{this.props.route.params.noti.data.title}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Nội dung:</Text>
                                <Text style={styles.content}>{this.props.route.params.noti.data.message}</Text>
                            </View>
                        </View>
                            :
                        <InternetConnecNotification/>
                    }
            </View>
        );
    }
}
