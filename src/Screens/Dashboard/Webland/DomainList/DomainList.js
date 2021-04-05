import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { orange } from '../../../../Components/Elements/Color/Color';

export default class DomainList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            statusColor: '',
            statusText: ''
        };
    } 

    componentDidMount() {
        Object.entries(this.props.list_status).map(([key, value])=> {
            if(key == this.props.domain.status) {
                this.setState({ statusText: value });
            }

            if(this.props.domain.status == 0) {
                this.setState({ statusColor: 'skypeblue' })
            } else if(this.props.domain.status == 2) {
                this.setState({ statusColor: 'olivedrab' })
            } else if(this.props.domain.status == 3) {
                this.setState({ statusColor: 'cadetblue' })
            } else if(this.props.domain.status == 4) {
                this.setState({ statusColor: orange })
            } else {
                this.setState({ statusColor: 'darkred' })
            }
        }); 
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DomainDetail', {
                        navigation: this.props.navigation,
                        domain: this.props.domain,
                        token: this.state.token,
                        refreshList: this.props.refreshList,
                        user: this.props.user
                    })}
                >
                    <View style={styles.list}>
                        <View style={styles.bundle}>
                            <Text style={styles.bundleText}> 
                                {this.props.domain.item ? this.props.domain.item.name : ''} 
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <View style={styles.domainNameWrapper}>
                                    <Text 
                                        style={styles.domainName}
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                    > 
                                        {this.props.domain.domain} 
                                    </Text>
                                </View>
                                <View style={[styles.statusColor, { backgroundColor: this.state.statusColor }]}>
                                    <Text style={styles.statusText}>{this.state.statusText}</Text>
                                </View>
                            </View>
                            <View style={styles.createAndExpDate}>
                                <Text style={styles.createDate}>
                                <Text style={styles.bold}>Ngày tạo:</Text> {
                                                moment(this.props.domain.created_at).format("DD/MM/YYYY") } </Text>
                                <Text style={styles.expDate}>
                                <Text style={styles.bold}>Hết hạn:</Text> { this.props.domain.expired_at != null ?
                                                moment(this.props.domain.expired_at).format("DD/MM/YYYY") : 'Vô thời hạn' } </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
