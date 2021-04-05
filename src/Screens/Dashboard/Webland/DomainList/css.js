import { StyleSheet } from 'react-native';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../Components/Elements/Color/Color';

const SIZE = 60;

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
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width/15
    },
    bundleText: {
        color: '#fff',
        fontSize: 9
    },
    content: {
        marginLeft: 25
    },
    domainName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: blue,
    },
    header: {
        marginBottom: 7,
        flexDirection: 'row',
        width: width/1.5
    },
    createAndExpDate: {
        flexDirection: 'row'
    },
    createDate: {
        fontSize: 10,
        color: '#666666'
    },
    expDate: {
        fontSize: 10,
        marginLeft: 25,
        color: '#666666'
    },
    bold: {
        fontWeight: 'bold'
    },
    domainNameWrapper: {
        width: width/2.5,
    },
    statusColor: {
        width:  90,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 22,
        marginTop: -7
    },
    statusText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold'
    }
})

export {styles}