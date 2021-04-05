import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./css";
import Icon from "react-native-vector-icons/Ionicons";
import { blue } from '../Color/Color'

var timeout = 0;

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            inputWithDots: ''
        };
    }

    handleFocus = () => 
        this.setState({ 
            inputWithDots: this.state.searchText
        });

    handleBlur = () =>  
        this.setState({ 
            inputWithDots: this.state.searchText.length > 35 ? this.state.searchText.substr(0,35) + '...' : this.state.searchText 
        });

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon 
                            name="ios-search"
                            color={blue}
                            size={25}
                            onPress={() => this.props.search(this.state.searchText)} 
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.placeholder}
                        onChangeText={(searchText) => {
                            this.setState({ 
                                searchText,
                                inputWithDots: searchText 
                            });     
                            clearTimeout(timeout); // clears the old timer
                            timeout = setTimeout(() => this.props.search(searchText), 1000);
                        }}
                        value={this.state.inputWithDots}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        autoCapitalize='none'
                    />
                    {this.state.searchText != undefined && this.state.searchText != '' ? 
                        <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={() => {
                                this.setState({ 
                                    searchText: '', 
                                    inputWithDots: ''
                                }),
                                this.props.search('')
                            }}
                        >
                            <Icon
                                name='ios-close-circle'
                                size={18}
                                color='silver'
                            />
                        </TouchableOpacity> : null
                    }
                </View>
            </View>
        );
    }
}
