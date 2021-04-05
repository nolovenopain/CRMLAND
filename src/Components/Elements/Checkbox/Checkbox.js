import React, { Component } from "react";
import { View, Text } from "react-native";
import { styles } from "./css";
import CheckBox from '@react-native-community/checkbox';


export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
    }

    changeChecked() {
        this.setState({checked: !this.state.checked}, () => {
            this.props.setChecked(this.props.name, this.state.checked)})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.checkboxWrapper}>
                    <CheckBox 
                        style={styles.checkbox} 
                        value={this.state.checked}
                        onValueChange={() => this.changeChecked() } 
                    />
                    <Text style={styles.checkboxText}>{this.props.text}
                        <Text style={styles.blue}> {this.props.textLink} </Text>
                    </Text>
                </View>
            </View>
        );
    }
}
