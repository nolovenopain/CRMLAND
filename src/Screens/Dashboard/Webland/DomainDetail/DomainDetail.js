import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './css';
import { loading } from '../../../../Helpers/Functions';
import Config from './Config/Config';
import Header from './Header/Header';
import Detail from './Detail/Detail';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import RequestOpenAppAgain from '../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class DomainDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.checkRequestOpenAppAgain = this.checkRequestOpenAppAgain.bind(this);
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

    checkRequestOpenAppAgain(requestOpenAppAgain) {
        this.setState({ requestOpenAppAgain });
    }

    render() {
        return (
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        {this.state.isInternetReachable ?
                            (this.state.requestOpenAppAgain ? 
                                <View style={{ marginTop: -70 }}>
                                    <RequestOpenAppAgain/>  
                                </View>
                                    :
                                <View>
                                    <View style={styles.header}>
                                        <Header domain={this.props.route.params.domain}/>
                                    </View>
                                    <View style={styles.config}>
                                        <Config 
                                            navigation={this.props.route.params.navigation}
                                            domain={this.props.route.params.domain}
                                            token={this.state.token}
                                            refreshList={this.props.route.params.refreshList}
                                            user={this.props.route.params.user}
                                            checkRequestOpenAppAgain={this.checkRequestOpenAppAgain}
                                        />
                                    </View>
                                    <View style={styles.detail}>
                                        <Detail
                                            navigation={this.props.route.params.navigation} 
                                            domain={this.props.route.params.domain}
                                            token={this.state.token}
                                            checkRequestOpenAppAgain={this.checkRequestOpenAppAgain}
                                        />
                                    </View>
                                </View>)
                                    :
                            <InternetConnecNotification/>
                        }
                    </View>
            </ScrollView>
        );
    }
}
