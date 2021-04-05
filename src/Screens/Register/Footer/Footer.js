import React, { Component } from "react";
import { View, Text } from "react-native";
import { styles } from "./css";

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.backToLogin}> Bạn đã có tài khoản?{" "}
                    <Text
                        style={styles.blue}
                        onPress={() => this.props.navigation.push('Login')}
                    >
                        Đăng nhập ngay !!!
                    </Text>
                </Text>
            </View>
        );
    }
}
