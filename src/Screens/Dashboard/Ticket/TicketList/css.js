import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const SIZE = 50;

const styles = StyleSheet.create({
    container: {},
    list: {
        width: width,
        height: 70,
        backgroundColor: '#fff',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
    },
    bundle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE/2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width/15
    },
    content: {
        marginLeft: 25,
        width: width/1.45,
    },
    ticketName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: blue,
        marginBottom: 7
    },
    contentBottom: {
        flexDirection: 'row'
    },
    createDate: {
        fontSize: 10,
        color: '#666666'
    },
    ticketAmount: {
        fontSize: 10,
        marginLeft: 40,
        color: '#666666'
    },
    bold: {
        fontWeight: 'bold'
    }
})

export {styles}