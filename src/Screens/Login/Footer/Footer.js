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
            <Text style={styles.register}> Chưa có tài khoản?{" "}
                <Text
                    style={styles.blue}
                    onPress={() =>  this.props.navigation.push('Register')}
                >
                    Đăng ký ngay !!!
                </Text>
            </Text>
            <Text style={styles.forgotPassword}> Quên mật khẩu?{" "}
                <Text
                    style={styles.blue}
                    onPress={() => this.props.navigation.push('ForgotPassword')}
                >
                    Lấy lại mật khẩu !!!
                </Text>
            </Text>
        </View>
        );
    }
}
