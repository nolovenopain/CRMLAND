import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { fetchToken } from '../../../../Helpers/Functions';
import HTML from 'react-native-render-html';
import moment from 'moment/min/moment-with-locales';

moment.locale('vi')
export default class TicketDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }

    async componentDidMount() {
        this.props.onRef(this);
        const token = await fetchToken();
        this.setState({ token });
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    refreshScreen() {
        this.componentDidMount();
    }

    style(status) {
        var style;
        switch(status) {
            case 1: 
                style = styles.statusCircle;
                break;
            case 2: 
                style = styles.statusBlueCircle;
                break;
            case 3: 
                style = styles.statusOrangeCircle;
                break;
            case 4: 
                style = styles.statusRedCircle;
        }
        return style;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBody}>
                <View style={styles.left}>
                        <Text style={styles.leftHeaderBody}>Ticket hỗ trợ</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.rightHeaderBody}
                        onPress={() => this.props.navigation.navigate('TicketStack')}
                    >
                        <Text style={styles.rightHeaderText}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ticket}>
                    <View style={styles.ticketInside}>
                        {Object.entries(this.props.listTicket).length > 0 ?
                            this.props.listTicket.data.length > 0 ?
                                this.props.listTicket.data.map((value, key) => {
                                    return(
                                        <View style={styles.row} key={key}>
                                            <View style={this.style(value.status)}></View>
                                            <View style={styles.content}>
                                                <Text 
                                                    style={styles.topContent}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                >
                                                    {value.title}
                                                </Text>
                                                {value.content != null ? 
                                                    (value.content.includes('<p>') ? 
                                                        <HTML
                                                            html={
                                                                value.content != null && value.content != 'null' ? (value.content.length > 50 ? value.content.substr(0,50) + '...' : value.content) : '<p></p>'
                                                            } 
                                                            tagsStyles={{p: {fontSize: 10, color: '#666666'}, body: { fontSize: 10, color: '#666666' }}}
                                                        /> 
                                                        :
                                                        <Text 
                                                            style={styles.bottomContent}
                                                            numberOfLines={1}
                                                            ellipsizeMode='tail'
                                                        >
                                                            {value.content != null && value.content != 'null' ? value.content : ''}
                                                        </Text>
                                                    )
                                                    : 
                                                    null
                                                }         
                                            </View>
                                            <View style={styles.timeDate}>
                                                <Text style={styles.time}>
                                                    {moment.utc(value.updated_at).local().startOf('seconds').fromNow()}
                                                </Text>
                                            </View>
                                        </View>
                                    ) 
                                }) : <Text style={styles.noTicket}>Không có ticket</Text> : null
                        }   
                    </View>
                </View>
            </View>
        );
    }
}
