import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './css';
import Input from '../../../../Components/Elements/Input/Input';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';

export default class AppendInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    setValue = (name, value) => {
        this.setState({ [name]: value }, () => { })
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={styles.appendWrapper}>
                    <Text style={styles.appendTitle}>Thông tin bổ sung</Text>
                    <View style={styles.inputAppend}>
                        <Input
                            label='Mục bổ sung 1'
                            name="field"
                            setValue={this.setValue}
                            marginLeft={width/1.25}
                            editable={true}
                            multiline={true}
                            width={width/1.3}
                        />  
                    </View>
                    <View style={styles.inputAppend}>
                        <Input
                            label='Mục bổ sung 2'
                            name="field1"
                            setValue={this.setValue}
                            marginLeft={width/1.25}
                            editable={true}
                            multiline={true}
                            width={width/1.3}
                        />
                    </View>
                    <View style={styles.inputAppend}>
                        <Input
                            label='Mục bổ sung 3'
                            name="field2"
                            setValue={this.setValue}
                            marginLeft={width/1.25}
                            editable={true}
                            multiline={true}
                            width={width/1.3}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
