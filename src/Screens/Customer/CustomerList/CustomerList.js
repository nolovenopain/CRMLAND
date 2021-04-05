import React, { PureComponent } from 'react';
import { View, Text, Animated, TouchableOpacity, Alert, Linking } from 'react-native';
import { styles } from './css';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../../../Components/Elements/Color/Color';
import Swipeout from 'react-native-swipeout';

export default class CustomerList extends PureComponent  {
    constructor(props) {
        super(props);
        this.state = {
            showDropdownItems: false,
            fadeValue: new Animated.Value(0),
            activeRowKey: null,
        };
    }

    async dropDown() {
        this.setState({ showDropdownItems: !this.state.showDropdownItems });
        
        Animated.timing(this.state.fadeValue, {
            toValue: this.state.showDropdownItems ? 0 : 1,
            duration: 100,
            useNativeDriver: true
        }).start();  
    }

    render() {
        const rotateDown = this.state.fadeValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg'],
        })
    
        const rotateDownStyles = {
            transform: [
                {
                    rotate: rotateDown
                }
            ]
        }

        const SwipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                this.setState({ activeRowKey: null })
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.customer.id })
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Thông báo',
                            'Bạn có thực sự muốn xóa khách hàng này ?',
                            [
                                {text: 'Hủy', style: 'cancel'},
                                {text: 'Xóa', onPress: () => {
                                    this.props.deleteCustomer(deletingRow);
                                }}
                            ],
                            {cancelable: true}
                        )
                    },
                    text: 'Xóa', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,      
        }

        return (
            <Swipeout {...SwipeSettings} style={{ backgroundColor: '#fff' }}>
                <View style={styles.list}>
                    <TouchableOpacity 
                        style={styles.top}
                        onPress={() => this.dropDown()}
                    >
                        <View style={styles.circleWrapper}>
                            <View style={styles.circle}>
                                <Text style={styles.pronoun}> {this.props.customer.pronoun} </Text>
                            </View>
                        </View>
                        <View style={styles.nameAndPhone}>
                            <Text style={styles.name}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            > 
                                {this.props.customer.fullname} 
                            </Text>
                            <Text style={styles.phone}> {this.props.customer.phone} </Text>
                        </View>
                        <View style={styles.dropdown}>
                            <Animated.View style={rotateDownStyles}>
                                <Icon 
                                    style={styles.dropdownIcon} 
                                    name='ios-chevron-forward'
                                    color={blue}
                                    size={20}  
                                />
                            </Animated.View>
                        </View>  
                    </TouchableOpacity>

                {/* dropdown content */}
                {this.state.showDropdownItems ? (
                    <Animated.View style={[styles.bottom, {opacity: this.state.fadeValue}]}>
                        <TouchableOpacity 
                            style={styles.fistItem}
                            onPress={() => Linking.openURL('tel:' + this.props.customer.phone)}
                        >
                            <Icon style={styles.iconConfigs} name='ios-call'/>
                            <Text style={styles.textConfig}>Gọi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.items}
                            onPress={() => Linking.openURL('sms:' + this.props.customer.phone)}
                        >
                            <Icon 
                                style={styles.iconConfigs} 
                                name='ios-chatbox'
                            />
                            <Text style={styles.textConfig}>Tin nhắn</Text>
                        </TouchableOpacity>

                        {this.props.customer.email_verified == 1 ?
                            <TouchableOpacity 
                                style={styles.items}
                                onPress={() => this.props.navigation.navigate('SendEmail', {
                                    customer: this.props.customer,
                                    user: this.props.user,
                                    token: this.props.token,
                                    refreshList: this.props.refreshList,
                                    navigation: this.props.navigation,
                                })} 
                            >
                                <Icon 
                                    style={styles.iconConfigs} 
                                    name='ios-mail'
                                />
                                <Text style={styles.textConfig}>Email</Text>
                            </TouchableOpacity> : null}

                        {this.props.customer.email_verified == 1 ?
                            <TouchableOpacity 
                                style={styles.items}
                                onPress={() => this.props.navigation.navigate('SendProjectInformation', {
                                    customer: this.props.customer,
                                    navigation: this.props.navigation,
                                    token: this.props.token,
                                    listProject: this.props.listProject,
                                    refreshList: this.props.refreshList,
                                    listEmailCanSend: this.props.listEmailCanSend
                                }) }
                            > 
                                <Icon 
                                    style={styles.iconConfigs} 
                                    name='ios-folder-open'
                                />
                                <Text style={styles.textConfig}>Gửi tài liệu</Text>
                            </TouchableOpacity> : null}

                        <TouchableOpacity 
                            style={styles.items}
                            onPress={() => this.props.navigation.navigate('CustomerDetail', {
                                customer: this.props.customer,
                                navigation: this.props.navigation,
                                listType: this.props.listType,
                                listGroup: this.props.listGroup,
                                listProject: this.props.listProject,
                                refreshList: this.props.refreshList,
                                token: this.props.token
                            })}
                        >
                            <Icon 
                                style={styles.iconConfigs} 
                                name='ios-information-circle'
                            />
                            <Text style={styles.textConfig}>Chi tiết</Text>
                        </TouchableOpacity>
                    </Animated.View> ) : null}
                        
                        <View style={styles.underlineWrapper}>
                            <View style={styles.underline}></View>
                        </View>
                </View>
            </Swipeout>
           
        );
    }
}
