import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../Color/Color';
import getSearchGroupOfCustomer from '../../../Api/getSearchGroupOfCustomer';

var timeout = 0;

export default class MultiSelectGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectText: this.props.selectText ? this.props.selectText : 'Select an item...',
            modalVisible: false,
            searchText: '',
            inputWithDots: '',
            items: this.props.items,
            selectedItems: this.props.selectedItems,
            token: this.props.token,
            selected: false,
            selectedIds: []
        };
        this.deleteAll = this.deleteAll.bind(this);
    }

    componentDidMount() {
        this.props.onRef ? this.props.onRef(this) : null
        var selectedIds = [];
        if(this.state.selectedItems.length > 0) {
            this.state.selectedItems.map((item, key) => {
                selectedIds.push(item.id)
            });
            this.setState({ 
                selected: this.state.selectedItems.length > 0 ? true : false, 
                selectedIds
            })
        }  
    }

    componentWillUnmount() {
        this.props.onRef ? this.props.onRef(null) : null
    }

    showModal = () => {
        this.setState({ modalVisible: true })
    }

    hideModal = () => {
        this.setState({ modalVisible: false })
    }

    handleFocus = () => 
        this.setState({ 
            inputWithDots: this.state.searchText
        });

    handleBlur = () =>  
        this.setState({ 
            inputWithDots: this.state.searchText.length > 35 ? this.state.searchText.substr(0,35) + '...' : this.state.searchText 
        });

    toggleItem = (item) => {
        var arrItems = [...this.state.selectedItems]
        var arrIds = [...this.state.selectedIds]
        if(!arrIds.includes(item.id)) {
            arrItems.push(item),
            arrIds.push(item.id)        
        } else {
            const indexItem = arrIds.indexOf(item.id);
            arrItems.splice(indexItem, 1);
            arrIds.splice(indexItem, 1) 
        }
        this.setState({ 
            selectedItems: arrItems,
            selectedIds: arrIds 
        });
    }

    async search(searchText) { 
        const res = await getSearchGroupOfCustomer(
            this.state.token, 
            searchText
        );
        if(res.status == 200) {
            const resJson = await res.json();
            if(resJson.code == 200) {
                this.setState({ items: resJson.data.data })
            }
            else if(resJson.code == 204) {
                Alert.alert('Error !!!', resJson.message)
            }
        }
        else if(res.status == 401) {
            Alert.alert('Thông báo', 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại !!!');
            this.props.getErrorAuthen();
        }
        else if(res.status == 500) {
            this.props.getErrorServer();
            Alert.alert('Error !!!', 'Yêu cầu không thể thực hiện. Vui lòng khởi động lại app !!!');
        }
    }

    confirm = () => {
        this.hideModal();
        if(this.state.selectedItems.length > 0) {
            this.setState({ selected: true })
        }
        else {
            this.setState({ selected: false })
        }
        this.props.returnGroupData(this.state.selectedItems)
    }

    deleteItem(item) { 
        var arrItems = [...this.state.selectedItems];
        var arrIds = [...this.state.selectedIds]
        const indexItem = arrIds.indexOf(item.id);
        arrItems.splice(indexItem, 1);
        arrIds.splice(indexItem, 1);
        this.setState({ 
            selectedItems: arrItems,
            selectedIds: arrIds
        }, () => this.props.returnGroupData(this.state.selectedItems));
    }

    refreshGroup(listGroup) {
        this.setState({ items: listGroup })
    }

    refreshAfterCreate() {
        this.setState({ 
            selectText: this.props.selectText,
            selectedItems: [],
            selectedIds: []
        }, this.confirm);
    }

    deleteAll() {
        this.props.returnGroupData([]);
        this.setState({ selectedItems: [], selectedIds: [] });
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                >
                    <View style={styles.background}>
                        <View style={styles.modal}>
                            <View style={styles.search}>
                                <Icon
                                    name='ios-search'
                                    color='silver'
                                    size={25}
                                    style={styles.iconSearch}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={this.props.placeholder}
                                    onChangeText={(searchText) => {
                                        this.setState({ 
                                            searchText,
                                            inputWithDots: searchText 
                                        });     
                                        clearTimeout(timeout); // clears the old timer
                                        timeout = setTimeout(() => this.search(searchText), 1000);
                                    }}
                                    value={this.state.inputWithDots}
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    autoCapitalize='none'
                                />
                                {this.state.searchText != undefined && this.state.searchText != '' ? 
                                    <TouchableOpacity
                                        style={styles.btnDelete}
                                        onPress={() => {
                                            this.setState({ 
                                                searchText: '', 
                                                inputWithDots: ''
                                            }),
                                            this.search('')
                                        }}
                                    >
                                        <Icon
                                            name='ios-close-circle'
                                            size={18}
                                            color='silver'
                                        />
                                    </TouchableOpacity> : null
                                }
                            </View>

                            <ScrollView>
                                {this.state.items.map((value, key) => {
                                    return (
                                        <View style={styles.itemRow} key={key}>
                                            <TouchableOpacity
                                                onPress={() => this.toggleItem(value)}
                                                style={styles.itemList}
                                            >
                                            
                                                <Text style={styles.itemTitle}>{value.name}</Text>
                                            </TouchableOpacity>
                                            <View style={styles.iconCheckWrapper}>
                                                {this.state.selectedIds.indexOf(value.id) > -1 ? 
                                                    <Icon
                                                        name='ios-checkmark'
                                                        size={20}
                                                        color={blue} 
                                                    /> : null
                                                } 
                                            </View>
                                        </View>    
                                    )
                                })}
                            </ScrollView>

                            <View style={styles.buttonGroup}>
                                <TouchableWithoutFeedback onPress={this.confirm}>
                                    <View style={styles.confirm}>
                                        <Text style={styles.text}>Xác nhận</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                               <TouchableWithoutFeedback onPress={this.hideModal}>
                                    <View style={styles.cancel}>
                                        <Text style={styles.text}>Hủy</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </Modal>

                <TouchableWithoutFeedback  
                    onPress={this.showModal}
                >
                    <View style={styles.wrapper}>
                        <View style={styles.left}>
                            <Text style={styles.selectText}> 
                                {this.state.selectedItems.length > 0 && this.state.selected ? 'Đã chọn (' + this.state.selectedItems.length + ' nhóm khách)' : this.state.selectText} 
                            </Text>
                        </View>
                        <View style={styles.right}>
                            <Icon
                                name='ios-chevron-down'
                                color={blue}
                                size={20}
                                style={styles.iconDown}
                            />
                        </View>
                    </View>                  
                </TouchableWithoutFeedback>
                
                <View style={styles.showItems}>
                    {this.state.selectedItems.length > 0 ? 
                        <TouchableOpacity 
                            style={styles.deleteAll}
                            onPress={this.deleteAll}
                        >
                            <Text style={styles.label}>Xóa hết</Text>
                        </TouchableOpacity> : null
                    }
                    {this.state.selectedItems.length > 0 ?
                        this.state.selectedItems.map((value, key) => { 
                            return  <View style={styles.item} key={key}>
                                        <TouchableOpacity
                                            style={styles.deleteItem}
                                            onPress={() => this.deleteItem(value)}
                                        >
                                            <Icon
                                                name='ios-close-circle'
                                                color='gray'
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.label}>{value.name}</Text>
                                    </View>
                        }) : null
                    }
                </View>
            </View>
        );
    }
}
