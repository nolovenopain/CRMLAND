import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: '#fff',
        height: 70,
        marginBottom: 10,
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: '#fff',
        height: 70,
        marginBottom: 10
    },
    rowText: {
        width: width/1.02 - 80,
    },
    topRowText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 10,
        marginBottom: 5
    },
    bottomRowText: {
        fontSize: 10,
        color: 'gray',
        marginLeft: 10
    },
    iconWrapper: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forwardArrowWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export { styles }