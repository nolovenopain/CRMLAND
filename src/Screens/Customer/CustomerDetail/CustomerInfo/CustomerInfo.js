import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SingleSelect from '../../../../Components/Elements/SingleSelect/SingleSelect';
import CustomInput from '../../../../Components/Elements/CustomInput/CustomInput';

const pronoun = [
    { name: 'Anh', id: '1' },
    { name: 'Em', id: '2' },
    { name: 'Chị', id: '3' },
    { name: 'Cô', id: '4' },
    { name: 'Chú', id: '5' },
    { name: 'Bác', id: '6' },
    { name: 'Ông', id: '7' },
    { name: 'Bà', id: '8' },
]

export default class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birthday: moment(this.props.customer.birthday, 'DD-MM-YYYY').toDate(),
            showCalendar: false,
        };
    }

    onChangeBirthday(event, selectedDate) {
        this.setState({ 
            birthday: selectedDate,
            showCalendar: false
        })
    };

    render() {
        return (
            <View style={ styles.container }>
                <View style={styles.firstPicker}>
                    <Text style={styles.label}>Danh xưng</Text>
                    <SingleSelect
                        selectText={this.props.customer.pronoun ? this.props.customer.pronoun : pronoun[0].name}
                        placeholder='Tìm danh xưng...'
                        items={pronoun}
                        returnData={this.props.returnPronounData}
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Họ tên'
                        name='fullname'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        oldValue={this.props.customer.fullname}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        placeholder='Nhập họ tên...'
                    />
                </View>
                <View style={styles.birthdayWrapper}>
                    <Text style={styles.label}>Ngày sinh</Text>
                    <View style={styles.choseBirthday}>
                        <View style={styles.birthday}>
                            <Text style={styles.birthdayText}>
                                {this.state.birthday != 'Invalid Date' ? moment(this.state.birthday).format('DD/MM/YYYY') : ''}
                            </Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.birthdayIcon}
                            onPress={() => this.setState({ showCalendar: true })}
                        >
                            <Icon
                                name='ios-calendar'
                                size={20}
                                color='gray'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                    {this.state.showCalendar ?
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.birthday != 'Invalid Date' ? this.state.birthday : new Date()}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => {
                                this.onChangeBirthday(event, selectedDate),
                                this.props.returnBirthday(selectedDate)
                            }}
                        /> : null
                    }
                <View style={styles.input}>
                    <CustomInput
                        label='Địa chỉ'
                        name='address'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        oldValue={this.props.customer.address}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        multiline={true}
                        keyboardType='email-address'
                        placeholder='Nhập địa chỉ...'
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Điện thoại'
                        name='phone'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        oldValue={this.props.customer.phone}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        keyboardType='numeric'
                        placeholder='Nhập số điện thoại...'
                    />
                </View>
                <View style={styles.input}>
                    <CustomInput
                        label='Email'
                        name='email'
                        editable={true}
                        setValue={this.props.setValue}
                        hideshowText={false}
                        oldValue={this.props.customer.email}
                        width={width/1.16 - 40}
                        marginLeft={10}
                        btnGroupWidth={30}
                        length={40}
                        keyboardType='email-address'
                        placeholder='Nhập email...'
                    />
                </View>
            </View>
        );
    }
}
