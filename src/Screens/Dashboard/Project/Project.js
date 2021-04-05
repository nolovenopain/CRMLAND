import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Alert, Text } from 'react-native';
import{ loading, fetchToken } from "../../../Helpers/Functions";
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import { getProjectListPagination } from '../../../Api/getProjectList';
import ProjectList from "./ProjectList/ProjectList";
import SearchBar from '../../../Components/Elements/SearchBar/SearchBar';
import postDeleteProject from '../../../Api/postDeleteProject';
import getSearchProject from '../../../Api/getSearchProject';
import NetInfo from "@react-native-community/netinfo";
import InternetConnecNotification from '../../InternetConnecNotification/InternetConnecNotification';
import AsyncStorage from '@react-native-community/async-storage';
import RequestOpenAppAgain from '../../RequestOpenAppAgain/RequestOpenAppAgain';

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            projectList: [],
            page: 1,
            itemLoading: false,
            token: '',
            handleLoadMore: false,
            refresh: true,
            isInternetReachable: false,
            requestOpenAppAgain: false,
        };
        this._isMounted = false;
        this.refresh = this.refresh.bind(this);
        this.search = this.search.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    componentDidMount() {
        NetInfo.addEventListener(async(state) => {
            this.setState({ isInternetReachable: state.isInternetReachable });
            if(state.isInternetReachable) {
                const token = await fetchToken();
                this.getProjectListPagination(
                    token, 
                    this.state.page, 
                );

                this.setState({ 
                    itemLoading: true,
                    token,
                    handleLoadMore: true,
                    refresh: false 
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

    async getProjectListPagination(token, page) {
        const res = await getProjectListPagination(
            token, 
            page, 
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                const arrayProjectList = this.state.projectList.concat(resJson.data.data)
                if(arrayProjectList.length == this.state.projectList.length) {
                    this.setState({
                        handleLoadMore: false, 
                        itemLoading: false
                    })
                }
                else if(arrayProjectList.length > this.state.projectList.length) {
                    this.setState({ projectList: arrayProjectList })
                };
            }
            else if(resJson.code == 204) {
                console.log("Error !!!", resJson.message);
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    async deleteProject(projectId) {
        const res = await postDeleteProject(
            this.state.token, 
            projectId
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                var projectList = this.state.projectList;
                projectList.map((value, key) => {
                    if(value.id == projectId) {
                        projectList.splice(key, 1);
                    }
                });
                this.setState({ projectList });
            }
            else if(resJson.code == 204) {
                Alert.alert('Error !!!', resJson.message);
            } 
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            AsyncStorage
            .clear()
            .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
        }
        else if(res.status == 500) {
            this.setState({ requestOpenAppAgain: true })
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    async search(searchText) {
        if(searchText != '' && searchText != undefined) {
            const res = await getSearchProject(
                this.state.token,
                searchText
            )
            if(res.status == 200) {
                const resJson = await res.json();
                this.setState({ 
                    projectList: resJson.data.data,
                    itemLoading: false,
                    handleLoadMore: false               
                })
            }
            else if(res.status == 401) {
                Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
                AsyncStorage
                .clear()
                .then(() => this.props.navigation.navigate('UserNavigation', {screen: 'Login'}))
            }
            else if(res.status == 500) {
                this.setState({ requestOpenAppAgain: true })
                Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
            }
        }
        else {
            this.refresh();
        }
    }

    refresh() {
        this.setState({ 
            projectList: [],
            page: 1,
            itemLoading: true,
            handleLoadMore: true,
        },  () => {
                this.getProjectListPagination(
                    this.state.token, 
                    this.state.page, 
                );
        });
    }

    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <ProjectList 
                    project={item}
                    navigation={this.props.navigation}
                    deleteProject={this.deleteProject}
                    refreshList={this.refresh}
                    token={this.state.token}        
                />
            </View>
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
        },  async() => { 
                this.getProjectListPagination(
                    this.state.token, 
                    this.state.page,
                );
            }
        );
    }

    scrollToTop() {
        if(this.state.projectList.length > 0) {
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
                                <View style={styles.searchBar}>
                                    <SearchBar 
                                        placeholder='Tìm kiếm dự án...'
                                        search={this.search}
                                    />
                                </View>

                                {this.state.projectList.length > 0 ?
                                    <View style={styles.projectList}>
                                        <FlatList
                                            ref={(ref) => { this.flatListRef = ref; }}
                                            data={this.state.projectList}
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
                                    <Text style={styles.noHaveProject}>Chưa có dự án</Text>
                                }    

                                <TouchableOpacity
                                    style={styles.create}
                                    onPress={() => this.props.navigation.navigate('CreateProject', {
                                        navigation: this.props.navigation,
                                        refreshList: this.refresh,
                                        token: this.state.token
                                    })}
                                >
                                    <Icon
                                        name='ios-add'
                                        size={35}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
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
