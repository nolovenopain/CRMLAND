import { StyleSheet } from 'react-native';
import {width, height} from '../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        
    },
    classificationWrapper: {
        marginVertical: 20,
        width: width/1.15,
    },
    classificationHeader: {
        flexDirection: 'row'
    },
    classificationTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        position: 'relative',
        justifyContent: 'center',
        width: width/1.16,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 20
    },
    icon: {
        position: 'absolute',
        marginLeft: width/1.27,
        width: 30,
        alignItems: 'center'
    },
    label: {
        fontSize: 12,
        color: '#929caa'
    },
    text: {
        marginVertical: 15,
        fontSize: 12,
    },
});

export { styles };