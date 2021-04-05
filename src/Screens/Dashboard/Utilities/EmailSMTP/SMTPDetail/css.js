import { StyleSheet } from 'react-native';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstInput: {
        marginTop: 20,
        marginBottom: 20,
        width: width/1.16,
    },
    input: {
        marginBottom: 20,
        width: width/1.16,
    },
    saveBtn: {
        marginTop: 20,
        marginBottom: 15
    },
    cancelBtn: {
        marginBottom: 50
    }
});

export { styles };

