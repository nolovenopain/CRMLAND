import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CampaignList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        token: this.props.token
    };
  }

  render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('CampaignDetail', {
                        campaign: this.props.campaign,
                        navigation: this.props.navigation,
                        token: this.state.token
                    })}
                >
                    <View style={styles.list}>
                        <View style={styles.bundle}>
                            <Icon
                                name={this.props.campaign.type == 1 ? 'ios-chatbox' : 'ios-mail'}
                                color='#fff'
                                size={25}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.campaignName}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            > 
                                {this.props.campaign.name} 
                            </Text>
                            <View style={styles.contentBottom}>
                                <Text style={styles.createDate}>
                                <Text style={styles.bold}>Ngày tạo:</Text> {
                                                moment(this.props.campaign.created_at).format("DD/MM/YYYY") } </Text>
                                <Text style={styles.campaignAmount}>
                                <Text style={styles.bold}>Số lượng:</Text> {this.props.campaign.quantity} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
