import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../Color/Color';
import getSearchProject from '../../../Api/getSearchProject';

var timeout = 0;

export default class SingleSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectText: this.props.selectText ? this.props.selectText : 'Select an item...',
            modalVisible: false,
            searchText: '',
            inputWithDots: '',
            items: this.props.items,
            selectedItem: {},
            token: this.props.token
        };
    }

    componentDidMount() {
        this.props.onRef ? this.props.onRef(this) : null
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

    selectItem = (item) => {
        this.props.returnData(item);
        this.setState({ selectedItem: item });
        this.hideModal();
    }

    async search(searchText) {
        if(searchText == '') {
            this.setState({ items: this.props.items })
        }
        else {
            const response = await getSearchProject(this.state.token, searchText);
            this.setState({ items: response })
        } 
    }

    refreshListItems(listProject) {
        this.setState({ items: listProject })
    }

    refreshAfterCreate() {
        this.setState({ 
            selectText: this.props.selectText,
            selectedItem: {}
        }, () => this.selectItem(this.state.selectedItem));
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
                                            inputWithDots: searchText,
                                        });     
                                        clearTimeout(timeout); // clears the old timer
                                        timeout = setTimeout(() => this.search(searchText), 1000);
                                    }}
                                    value={this.state.inputWithDots}
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
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
                                                onPress={() => this.selectItem(value)}
                                                style={styles.itemList}
                                            >
                                            
                                                <Text style={styles.itemTitle}>{value.name}</Text>
                                            </TouchableOpacity>
                                        </View>    
                                    )
                                })}
                            </ScrollView>
                            
                            <TouchableOpacity
                                style={styles.cancel}
                                onPress={() => this.hideModal()}
                            >
                                <Text style={styles.cancelText}>HỦY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableWithoutFeedback  
                    onPress={this.showModal}
                >
                    <View style={styles.wrapper}>
                        <View style={styles.left}>
                            <Text style={styles.selectText}> 
                                {Object.keys(this.state.selectedItem).length > 0 ? this.state.selectedItem.name : this.state.selectText} 
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
            </View>
        );
    }
}
