import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    oldPassword: {
        width: width/1.16,
        marginTop: 20,
        marginBottom: 20
    },
    newPassword: {
        width: width/1.16,
        marginBottom: 20
    },
    confirmPassword: {
        width: width/1.16,
        marginBottom: 50
    },
    button: {
        marginBottom: 200
    }
});

export { styles };