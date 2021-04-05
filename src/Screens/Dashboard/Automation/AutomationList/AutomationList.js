import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AutomationList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
        };
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AutomationDetail', {
                        automation: this.props.automation,
                        navigation: this.props.navigation,
                        token: this.state.token,
                        refresh: this.props.refresh
                    })}
                >
                    <View style={styles.list}>
                        <View style={styles.bundle}>
                            <Icon
                                name={this.props.automation.type == 1 ? 'ios-chatbox' : 'ios-mail'}
                                color='#fff'
                                size={25}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text 
                                style={styles.automationName}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            > 
                                {this.props.automation.name} 
                            </Text>
                            <View style={styles.contentBottom}>
                                <Text style={styles.createDate}>
                                <Text style={styles.bold}>Ngày tạo:</Text> {
                                                moment(this.props.automation.created_at).format("DD/MM/YYYY") } </Text>
                                <Text style={styles.automationAmount}>
                                <Text style={styles.bold}>Số lượng:</Text> {this.props.automation.total_sent} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
