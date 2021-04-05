import { StyleSheet } from 'react-native';
import {width, height} from '../../../../Components/Elements/Dimensions/Dimensions'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    picker: {
        width: width/1.16,
        marginBottom: 10,
    },
    firstInput: {
        width: width/1.16,
        marginBottom: 20,
        marginTop: 30
    },
    input: {
        width: width/1.16,
        marginBottom: 20
    },
});

export { styles };