import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import { PieChart } from 'react-native-svg-charts';

export default class CustomerChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setState({ count: +1 });
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    refreshScreen() {
        this.componentDidMount();
    }

    render() {
        const contact = this.props.listContactOnProject;
 
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        
        const pieData = Object.entries(contact).map(([index, value]) => ({
                value: value.total_contact,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                name: value.name,
                key: index,
            }))

        return (
            <View style={styles.container}>
                <View style={styles.headerBody}>
                    <Text style={styles.leftHeaderBody}>Biểu đồ khách hàng</Text>
                </View>
                <View style={[styles.chartWrapper, Object.entries(this.props.listContactOnProject).length > 0 ? null : {alignItems: 'center'}]}>
                    {Object.entries(this.props.listContactOnProject).length > 0 ?
                        <View>  
                            <View style={styles.chartTitle}>
                                <Text style={styles.topChartTitle}>Khách hàng theo dự án</Text>
                                <Text style={styles.bottomChartTitle}>Biểu đồ phần loại khách hàng theo dự án</Text>
                            </View>
                            <View style={styles.chart}>
                                <PieChart
                                    style={ { height: 170, width: 180 } }

                                    data={ pieData }
                                />
                                <View style={styles.noteChart}>
                                    { pieData.map((value, key) => {
                                        return (
                                        <View style={styles.noteRow} key={key}>
                                            <View style={[styles.color, { backgroundColor: value.svg.fill }]}></View>
                                            <Text style={styles.textNote}>
                                                {value.name}
                                        </Text>
                                        </View>
                                        )
                                    })} 
                                </View>
                            </View>
                        </View>
                            :
                        <Text style={styles.noChart}>Chưa có dữ liệu phân loại khách hàng</Text>
                    }    
                </View>         
            </View>
        );
    }
}
