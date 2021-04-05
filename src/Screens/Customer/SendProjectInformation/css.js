import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions'
import { blue } from '../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: width/1.16,
        marginBottom: 20
    },
    firstInput: {
        width: width/1.16,
        marginBottom: 20,
        marginTop: 20
    },

    checkboxWrapper: {
        marginBottom: 40,
        width: width/1.15
    },
    checkboxTitle: {
        color: '#999999',
        marginBottom: 15,
        fontSize: 13
    },
    checkbox: {
        marginBottom: 10
    },
    button: {
        marginBottom: 50
    },
    label: {
        fontSize: 12,
        color: '#929caa'
    },
    picker: {
        width: width/1.16,
        marginBottom: 20,
        position: 'relative',
    },
});

export { styles };