import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    listReceive: {
        width: width,
        alignItems: 'center',
        marginTop: 20
    },
    search: {
        marginBottom: 30, 
        marginTop: 20,
        width: width/1.02,
        height: 60,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    rowTitle: {
        flexDirection: 'row',
        marginBottom: 15
    },
    phone: {
        width: width/3.3,
        alignItems: 'center',
    },
    telco: {
        width: width/3.3,
        alignItems: 'center',
    },
    sendTime: {
        width: width - (width * 2)/3.3,
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 25
    },
    content: {
        color: 'gray',
        fontSize: 11
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
        left: width/1.2,
        opacity: 0.6
    },
    noHaveCustomer: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30
    },
    listCustomerOfCampaign: {
        height: height - 190,
    }
});

export { styles };