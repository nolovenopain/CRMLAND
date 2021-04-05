import { StyleSheet } from 'react-native';
import { width, height } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { orange } from '../../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    listReceive: {
        width: width,
        alignItems: 'center',
    },
    rowTitle: {
        flexDirection: 'row',
        backgroundColor: orange,
        width: width
    },
    customer: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,  
    },
    cost: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    contactTitle: {
        width: width - 190,
        justifyContent: 'center',
        marginVertical: 10,
    },
    contactTitleText: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10
    },
    contact: {
        width: width - 190,
        justifyContent: 'center',
        marginVertical: 10
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10
    },
    rowCustomer: {
        flexDirection: 'row',
        borderBottomColor: 'silver',
        borderBottomWidth: 0.8,
        width: width
    },
    customerText: {
        color: 'gray',
        fontSize: 12,
        marginLeft: 10,
        marginRight: 5
    },
    contactText: {
        color: 'gray',
        fontSize: 12,
        marginLeft: 10,
        marginRight: 5
    },
    costText: {
        fontSize: 12,
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.45,
        left: width/1.15,
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
    listCustomerOfAutomation: {
        width: width,
        height: height - 200,
    }
});

export { styles };