import { StyleSheet } from 'react-native';
import { blue, orange } from '../../../Components/Elements/Color/Color';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    filter: {
        width: width,
        backgroundColor: blue,
        alignItems: 'center',
        marginBottom: 20
    },
    keyword: {
        height: 35,
        marginTop: 25,
        marginBottom: 20
    },
    keywordInput: {
        width: width / 1.16,
        height: 36,
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 10,
        paddingLeft: 20   
    },
    fromTo: {
        flexDirection: 'row',
        width: width / 1.16,
        marginBottom: 20
    },
    from: {
        width: width/2.32,
    },
    fromPicker: {
        width: width / 2.5,
        height: 36,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row'
    },
    showDate: {
        width: width/3.2,
        alignItems: 'center'
    },
    fromDate: {
        fontSize: 12,
        marginLeft: 10,
        color: 'gray'
    },
    iconDatePicker: {
        height: 36,
        backgroundColor: '#f5f5f5',
        width: width/11,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    to: {
        width: width/2.32,
        alignItems: 'flex-end'
    }, 
    toPicker: {
        width: width / 2.5,
        height: 36,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row'  
    },
    toDate: {
        fontSize: 12,
        marginLeft: 10,
        color: 'gray'
    },
    tableHeader: {
        flexDirection: 'row',
        width: width,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    number: {
        width: 70,
        alignItems: 'center',
        marginVertical: 10,
    },
    numberTextHeader: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    numberText: {
        fontSize: 10
    },
    date: {
        width: 80,
        alignItems: 'center',
        marginVertical: 10,
    },
    dateTextHeader: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    dateText: {
        fontSize: 10
    },
    amount: {
        width: 100,
        alignItems: 'center',
        marginVertical: 10,
    },
    amountTextHeader: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    amountText: {
        fontSize: 10,
        color: blue,
        fontWeight: 'bold'
    },
    channelTextHeader: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    channelHeader: {
        width: width - 250,
        alignItems: 'center',
    },
    channel: {
        width: width - 250,
        marginVertical: 10
    },
    channelText: {
        fontSize: 10,
        marginLeft: 15,
        marginRight: 5
    },
    tableRow: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'silver',
        borderBottomWidth: 0.8
    },
    picker: {
        width: width/1.16, 
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 50,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 5
    },
    noHavePayment: {
        fontSize: 16,
        color: 'gray',
        marginTop: 50
    },
    table: {
        alignItems: 'center',
        width: width,
    },
    listPayment: {
        width: width,
        height: height - 180
    },
    btnSearch: {
        position: 'absolute',
        top: 195
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        marginTop: height/1.4,
        left: width/1.15,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6
    }
})

export { styles };