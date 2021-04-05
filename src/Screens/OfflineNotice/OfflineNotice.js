import React from 'react';
import { Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { width } from '../../Components/Elements/Dimensions/Dimensions';

const OfflineNotice = () => {
    const fadeValue = new Animated.Value(0);

    Animated.timing(fadeValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
    }).start();  

    return (
        <Animated.View>
            <SafeAreaView style={styles.offlineContainer}>
                <Text style={styles.offlineText}>Không có kết nối Internet</Text>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: 'gray',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: width,
        position: 'absolute',
        fontWeight: 'bold'
    },
    offlineText: { 
        color: '#fff'
    }
});

export default OfflineNotice;