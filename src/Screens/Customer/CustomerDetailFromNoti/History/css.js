import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1
    },
    noHaveCareHistory: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center'
    },
    body: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: width
    },
    careHistoryList: {
       width: width,
       height: height - 160,
    },
    historyItem: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.5,
        left: width/1.15,
        opacity: 0.6
    },
    history: {
        alignItems: 'center',
        flexDirection: 'row',
        width: width/1.16,
        marginBottom: 10
    },
    historyTime: {
        width: width/4.5,
        height: 60,
        backgroundColor: 'silver',
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5
    },
    day: {
        fontSize: 11,
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
});

  export {styles}