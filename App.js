
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar, YellowBox, View} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Store/index';
// import AsyncStorage from '@react-native-community/async-storage';

// // declare var global: { HermesInternal: null | {} };
// import firebase from 'react-native-firebase';
import OfflineNotice from './src/Screens/OfflineNotice/OfflineNotice';
import NetInfo from "@react-native-community/netinfo";
import InitialNavigation from './src/Navigators/InitialNavigation';

YellowBox.ignoreWarnings([
    'Remote debugger',
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
    'componentWillMount has been renamed',
    'componentWillReceiveProps has been renamed',
    'Picker has been extracted from react-native core and will be removed in a future release',
]);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInternetReachable: false
        };
    }

    async componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({ isInternetReachable: state.isInternetReachable });
        });
    }

    render() {
        return (
            <Provider store={store}>
                <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
                {this.state.isInternetReachable == false ? 
                    <View style={{height: 40}}>
                        <OfflineNotice/>
                    </View> : null
                }
                <InitialNavigation/>
            </Provider>
        );
    }  
}

    