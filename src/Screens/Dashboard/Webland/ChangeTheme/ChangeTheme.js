import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./css";
import{ loading } from "../../../../Helpers/Functions";
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../InternetConnecNotification/InternetConnecNotification';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../../../../Components/Elements/Color/Color';

export default class ChangeTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: this.props.route.params.token,
            isInternetReachable: false,
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
                        <View style={styles.menu}>
                            <TouchableOpacity 
                                style={styles.firstRow}
                                onPress={() => this.props.navigation.navigate('ThemeCategory1', {
                                    token: this.state.token,
                                    navigation: this.props.route.params.navigation,
                                    domain: this.props.route.params.domain,
                                    refreshList: this.props.route.params.refreshList
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-apps'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>WEBSITE DỰ ÁN</Text>
                                    {/* <Text style={styles.bottomRowText}>Theo dõi và cấu hình form thông tin khách hàng...</Text> */}
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.row}
                                onPress={() => this.props.navigation.navigate('ThemeCategory2', {
                                    token: this.state.token,
                                    navigation: this.props.route.params.navigation,
                                    domain: this.props.route.params.domain,
                                    refreshList: this.props.route.params.refreshList
                                })}
                            >
                                <View style={styles.iconWrapper}>
                                    <Icon
                                        style={styles.icon}
                                        name='ios-apps'
                                        color={blue}
                                        size={35}
                                    />
                                </View>                             
                                <View style={styles.rowText}>
                                    <Text style={styles.topRowText}>WEBSITE ĐA DỰ ÁN</Text>
                                    {/* <Text style={styles.bottomRowText}>Theo dõi và cấu hình form thông tin khách hàng...</Text> */}
                                </View>
                                <View style={styles.forwardArrowWrapper}>
                                    <Icon
                                        style={styles.forwardArrow}
                                        name='ios-chevron-forward'
                                        size={25}
                                        color='#686868'
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                            :
                        <InternetConnecNotification/>
                    }
            </View>
        );
    }
}
