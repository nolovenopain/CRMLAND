import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './css';
import { WebView } from 'react-native-webview'; 
import { width, height } from '../../Components/Elements/Dimensions/Dimensions';
import { loading } from '../../Helpers/Functions';

export default class TopUpAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            noPrefixToken: this.props.route.params.noPrefixToken
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={styles.container}>
                { !this.state.loaded ? loading() : null }
                <WebView
                    startInLoadingState={false}
                    useWebKit={true}
                    javaScriptEnabled={true} 
                    style={{ width: width, height: height }} 
                    source={{ uri: 'https://crmland.vn/system/user/recharge/mobile?token=' +  this.state.noPrefixToken}}
                />
            </View>     
        );
    }
}

