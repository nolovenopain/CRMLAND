import { StyleSheet } from 'react-native';
import {width, height} from '../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
    },
    appendWrapper: {
        marginVertical: 20,
        width: width/1.15,
    },
    appendTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15
    },
    inputAppend: {
        width: width/1.16,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 20
    },
});

export { styles };