import { StyleSheet } from 'react-native';
import {width, height} from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    customerInfo: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    separate: {
        height: 10,
        width: width,
    },
    historyWrapper: {
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyHeader: {
        width: width/1.16,
        marginTop: 20
    },
    historyTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 30
    },
    history: {
        height: 50,
        flexDirection: 'row',
        width: width/1.16,
        marginBottom: 10
    },
    historyTime: {
        width: width/5,
        backgroundColor: 'silver',
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        fontSize: 11,
        fontWeight: 'bold'
    },
    day: {
        fontSize: 10,
    },
    channel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5
    },
    description: {
        fontSize: 11,
    },
    historyNote: {
        justifyContent: 'center',
        marginLeft: 15,
        width: width/1.6
    },
    historyFooter: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        width: width/1.16,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    seeMore: {
        fontSize: 12,
        color: blue,
        marginBottom: 3
    },
    arrowdown: {
        marginLeft: 5
    },
    classification: {
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appendInfo: {
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    updateBtn: {
        backgroundColor: '#fff',
        height: 130,
        justifyContent: 'center'
    },
    noHaveCareHistory: {
        marginBottom: 20
    }
});

export { styles };