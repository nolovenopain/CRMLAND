import { StyleSheet } from 'react-native';
import { width, height } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../../Components/Elements/Color/Color';

const SIZE = 65;

const styles = StyleSheet.create({
    container: {
        width: width
    },
    list: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7
    },
    bundle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE/2,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35
    },
    bundleText: {
        color: '#fff',
        fontSize: 10
    },
    content: {
        marginLeft: 20
    },
    contentHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        color: blue,
        marginBottom: 7
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
    }
})

export {styles}