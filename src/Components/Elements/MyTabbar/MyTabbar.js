import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loading } from '../../../Helpers/Functions';
import Icon from 'react-native-vector-icons/Ionicons';

const {
    width, height
} = Dimensions.get('window');

export default class MyTabbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        setTimeout(() => {
            this._isMounted && this.setState({loaded: true});
        }, 1000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        const { navigation, state, descriptors } = this.props;
        return (
            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ width: width / 5, height: 50, backgroundColor: 'red' }}
                        >
                            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                {label}
                            </Text>
                            <Icon name={'ios-briefcase'} size={24} color={'red'} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}