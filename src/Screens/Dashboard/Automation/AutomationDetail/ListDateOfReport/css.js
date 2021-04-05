import { StyleSheet } from 'react-native';
import { orange } from '../../../../../Components/Elements/Color/Color';
import { width, height } from '../../../../../Components/Elements/Dimensions/Dimensions';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10
    },
    dateOfReportList: {
        width: width,
        height: height - 150,
    },
    list: {
        width: width,
        height: 70,
        backgroundColor: '#fff',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
    },
    date: {
        flexDirection: 'row',
        marginLeft: 20
    },
    sendAmount: {
        flexDirection: 'row',
        marginLeft: 30
    },
    reportDetail: {
        flexDirection: 'row',
        marginLeft: 45,
        alignItems: 'center'
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.42,
        left: width/1.15,
        opacity: 0.6
    },
    noHaveReport: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    }

});

export { styles };