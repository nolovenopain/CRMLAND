import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

export default class TicketList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var type = Object.entries(this.props.list_type).map(([key, type]) => {
            if(key == this.props.ticket.type) {
                return type;
            }
        });
        var status = Object.entries(this.props.list_status).map(([key, status]) => {
            if(key == this.props.ticket.status) {
                return status;
            }
        });
        var color = '';
        var borderColor = '';
        var borderWith = 0;
        if(this.props.ticket.status == 1) {
            color = '#fff';
            borderColor = blue;
            borderWith = 2
        } else if(this.props.ticket.status == 2) {
            color = blue
        } else if(this.props.ticket.status == 3) {
            color = orange
        } else if(this.props.ticket.status == 4) {
            color = 'red'
        }
        
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('TicketDetail', {
                        ticket: this.props.ticket,
                        navigation: this.props.navigation,
                        token: this.props.token,
                        refresh: this.props.refresh
                    })}
                >
                    <View style={styles.list}>
                        <View style={[styles.bundle, {backgroundColor: color, borderWidth: borderWith, borderColor: borderColor}]}>
                            <Icon
                                name='ios-help-buoy'
                                color={this.props.ticket.status == 1 ? blue : '#fff'}
                                size={25}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text 
                                style={styles.ticketName}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                {this.props.ticket.title}
                            </Text>
                            <View style={styles.contentBottom}>
                                <Text style={styles.createDate}>
                                <Text style={styles.bold}>Ngày tạo:</Text> {moment(this.props.ticket.created_at).format("DD/MM/YYYY")} </Text>
                                <Text style={styles.ticketAmount}>
                                <Text style={styles.bold}>Loại:</Text> {type} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
