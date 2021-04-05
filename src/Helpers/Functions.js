import React from 'react';
import {
    Dimensions,
    Linking,
    View,
    Text,
    Modal,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const {
    width, height
} = Dimensions.get('window');


export function loading() {
    return (
        <Modal
            animationType='fade'
            visible={true}
            transparent={true}
        >
            <View style={styles.wrapper}>
                <View style={styles.loaderContainer}>
                    <Image 
                        style={styles.loaderImage}
                        source={require('../Assets/Image/loading.gif')}
                    />
                </View>
            </View>
        </Modal>
       
    );
}

export function showError() {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>Vui lòng thử lại...</Text>
        </View>
    );
}

export async function fetchToken() {
    try{
        const fetchToken = await AsyncStorage.getItem('token');
        const token_type = await AsyncStorage.getItem('token_type');
        const token = token_type + ' ' + fetchToken;
        return token;
    } catch(error) {
        console.log(error)
    }  
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 9,
        backgroundColor: '#00000040',
        position: 'relative',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderContainer: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 15,
        position: 'absolute',
        opacity: 0.5,
    },
    loaderImage: {
        width: 70,
        height: 70,
        borderRadius: 15
    }

})
