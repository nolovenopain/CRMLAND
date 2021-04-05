import { StyleSheet } from 'react-native';
import { width } from '../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flex: 1
    },
    picker: {
        width: width/1.16,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 30,
        position: 'relative',
        marginTop: 30
    },
    label: {
        fontSize: 12,
        color: '#929caa'
    },
    label2: {
        fontSize: 12,
        color: '#929caa',
        marginBottom: 15
    },
    total: {
        width: width/1.16,
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    totalBottom: {
        width: width/1.16,
        height: 40,
        flexDirection: 'row',
        marginBottom: 20,
    },
    left: {
        flex: 1
    },
    right: {
        flex: 1,
        alignItems: 'flex-end'
    },
    text: {
        fontSize: 12,
    },
    radio: {
        width: width/1.16,
        marginBottom: 30
    },
    infoWrapper: {
        width: width/1.16,
        height: 60,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 15
    },
    info: {
        fontSize: 12
    },
    lastInfo: {
        marginBottom: 50
    },
    btnTopup: {
        marginBottom: 100
    },
    radioBtn: {
        flexDirection: 'row'
    },
    btnYes: {
        flexDirection: 'row',
        flex: 1
    },
    btnNo: {
        flexDirection: 'row',
        flex: 2
    },
    radioLabel: {
        fontSize: 12,
        marginLeft: 10
    },
});

export { styles };