import React, { Component } from 'react';
import { View } from 'react-native';
import Logo from './Logo/Logo';
import Content from './Content/Content';
import Footer from './Footer/Footer';
import ButtonIndex from '../../Components/Elements/Button/Button';
import { loading } from '../../Helpers/Functions';
import * as actions from '../../Actions/index';
import { connect } from 'react-redux';
import { styles } from './css'
import { ScrollView } from 'react-native-gesture-handler';
import { blue, orange } from '../../Components/Elements/Color/Color';

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        this._isMounted = false;
    }

    async componentDidMount() { 
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
            <ScrollView>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Logo/>
                        </View>
                        <View style={styles.content}>
                            <Content/>
                        </View>
                        <View style={styles.buttonGroup}>
                            <View style={styles.loginButton}>
                                <ButtonIndex
                                    color={blue}
                                    label='ĐĂNG NHẬP'
                                    action={() => this.props.navigation.navigate('Login')}
                                />
                            </View>
                            <View style={styles.registerButton}>
                                <ButtonIndex
                                    color={orange}
                                    label='ĐĂNG KÝ'
                                    action={() => this.props.navigation.navigate('Register')}
                                />
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Footer/>
                        </View> 
                    </View>
            </ScrollView> 
        );
    }
}
const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, actions)(UserPanel);
