import { StyleSheet } from 'react-native';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
    },
    brandName: {
        width: width/1.16,
        marginBottom: 50,
        marginTop: 30
    },
    uploadFile: {
        width: width/1.16,
        marginBottom: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    left: {
        width: width/1.16 - 90
    },
    right: {
        width: 90,
    },
    label: {
        color: '#929caa',
        fontSize: 12,
    },
    red: {
        color: 'red',
        fontSize: 11
    },
    total: {
        color: blue,
        fontSize: 11,
    },
    upload: {
        width: width/1.16,
        borderColor: 'silver',
        borderWidth: 0.5,
        alignItems: 'center'
    },
    uploadIcon: {
        marginTop: 10,
        marginBottom: 5
    },
    uploadText: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 10
    },
    underline: {
        width: width/1.45,
        borderColor: 'silver',
        borderWidth: 0.5,
        marginBottom: 20
    },
    listFileUpLoad: {
        marginBottom: 10
    },
    attachFile: {
        flexDirection: 'row',
        marginBottom: 5,
        width: width/1.16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    attachLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/1.4,
    },
    fileName: {
        marginLeft: 10,
        fontSize: 11,
        color: '#929caa'
    },
    deleteFile: {
        width: 30,
        alignItems: 'center',
    },
});

export {styles}