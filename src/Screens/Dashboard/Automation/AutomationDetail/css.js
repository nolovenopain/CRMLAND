import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstInfo: {
        width: width/1.16,
        marginTop: 30,
        marginBottom: 20,
    },
    info: {
        width: width/1.16,
        marginBottom: 20,
    },
    listReceive: {
        width: width/1.16,
        marginTop: 15
    },
    listLabel: {
        color: '#929caa',
        fontSize: 12,
        marginBottom: 20
    },
    search: {
        marginBottom: 20
    },
    rowTitle: {
        flexDirection: 'row',
        marginBottom: 15
    },
    customer: {
        width: width/(1.16 * 3)
    },
    sendTime: {
        width: width/(1.16 * 2)
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    rowCustomer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    content: {
        color: 'gray',
        fontSize: 11
    },
    navigateToCustomerList: {
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 50
    },
    iconNavigate: {
        position: 'absolute',
        marginLeft: width/ 1.45
    },
    label: {
        fontSize: 12,
        color: '#929caa'
    }
});

export { styles };