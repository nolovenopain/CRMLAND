import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    noConnection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'gray'
    },
    advise: {
        fontSize: 16,
        marginTop: 15,
        color: 'gray'
    },
    step: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center'
    },
    stepText: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    }
});

export { styles };