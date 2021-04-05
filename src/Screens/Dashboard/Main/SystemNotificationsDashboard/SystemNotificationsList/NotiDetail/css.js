import { StyleSheet } from 'react-native';
import { width } from '../../../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        width: width/1.16,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 50,
    },
    timeText: {
        color: blue,
        fontWeight: 'bold',
        fontSize: 15
    },
    row: {
        width: width/1.16,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'silver'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    content: {
        marginBottom: 5,
        lineHeight: 30,
        fontSize: 15
    },
    image: {
        width: 200,
        height: 200
    },
    bell: {
        marginTop: 30
    }
});

export { styles };