import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, Alert } from "react-native";
import { styles } from "./css";
import{ loading } from "../../../../../Helpers/Functions";
import Icon from 'react-native-vector-icons/Ionicons';
import { getThemeListCategory_1 } from '../../../../../Api/getThemeList';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class ThemeCategory1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            themeList: [],
            page: 1,
            itemLoading: false,
            token: this.props.route.params.token,
            handleLoadMore: false,
            refresh: true,
            isInternetReachable: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                this.getThemeListCategory_1(
                    this.state.token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true,
                    handleLoadMore: true,
                    refresh: false,
                });
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

    async getThemeListCategory_1(token, page) {
        const res = await getThemeListCategory_1(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayThemeList = this.state.themeList.concat(resJson.data.themes.data)
                if(arrayThemeList.length == this.state.themeList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayThemeList.length > this.state.themeList.length) {
                    this.setState({ themeList: arrayThemeList })
                };
            }
            else if(resJson.code == 204) {
                Alert.alert("Error !!!", resJson.message);
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

    refresh() {
        this.setState({ 
            themeList: [],
            page: 1,
            itemLoading: true,
            handleLoadMore: true,
        },  () => {
                this.getThemeListCategory_1(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );
    }

    renderRow = ({item}) => {
        return(
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ThemeDetail', {
                    navigation: this.props.route.params.navigation,
                    domain: this.props.route.params.domain,
                    token: this.state.token,
                    theme: item,
                    refresh: this.refresh,
                    refreshList: this.props.route.params.refreshList
                })}
            >
                <View style={styles.list}>
                    <View style={styles.top}>
                        <Text 
                            style={styles.themeName}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.display_name}
                        </Text>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.free}>
                            <Text style={styles.freeText}>Miễn phí</Text>
                        </View>
                        <View style={styles.freeIcon}>
                            <Icon
                                name='ios-star'
                                size={20}
                                color='#e4e400'
                                style={{ marginLeft: 5 }}
                            />
                            <Icon
                                name='ios-star'
                                size={20}
                                color='#e4e400'
                                style={{ marginLeft: 5 }}
                            />
                            <Icon
                                name='ios-star'
                                size={20}
                                color='#e4e400'
                                style={{ marginLeft: 5 }}
                            />
                            <Icon
                                name='ios-star'
                                size={20}
                                color='#e4e400'
                                style={{ marginLeft: 5 }}
                            />
                            <Icon
                                name='ios-star'
                                size={20}
                                color='#e4e400'
                                style={{ marginLeft: 5 }}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderFooter = () => {
        return( 
            <View style={styles.itemLoader}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        }, () => {
                this.getThemeListCategory_1(
                    this.state.token, 
                    this.state.page, 
                );
            }
        );           
    }

    scrollToTop() {
        if(this.state.themeList.length > 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }
    
    render() {
        return (      
            <View style={styles.container}>
                { !this.state.loaded ? loading() : null }
                    {this.state.isInternetReachable ?
                        (this.state.requestOpenAppAgain ? 
                            <View style={{ marginTop: -70 }}>
                                <RequestOpenAppAgain/>  
                            </View>
                                : 
                            <View style={{ alignItems: 'center' }}>
                                {this.state.themeList.length > 0 ?
                                    <View style={styles.themeList}>
                                        <FlatList 
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.themeList}
                                            refreshing={this.state.refresh}
                                            onRefresh={this.refresh}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                            disableVirtualization={true}
                                        />
                                    </View> 
                                        :
                                    <Text style={styles.noHaveDomainTheme}>Chưa có list giao diện</Text>
                                }
                                
                                <TouchableOpacity
                                    style={styles.scrollToTop}
                                    onPress={() => this.scrollToTop()}
                                >
                                    <Icon
                                        name='ios-chevron-up'
                                        size={35}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                            </View>)
                        :
                    <InternetConnecNotification/>
                }
            </View>
        );
    }
}
